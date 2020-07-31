import * as accountService from '../account/account.service'
import {MESSAGE, ACCOUNT_TYPES} from '../../constants'
import {debug} from '../../utils'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import * as transactionService from './transaction.service'
import {pgpPartnerFetcher, rsaPartnerFetcher} from '../../fetches'

const NAMESPACE = `transactionController-${moment.utc().toISOString()}`

export const createInnerTransaction = async (req, res, next) => {
  try {
    const {sendingAccountId, receivingAccountId, amount, feePayer, content} = req.body
    const {id} = req.user

    if (sendingAccountId === receivingAccountId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account and receiving account must not be the same.'
      })
    }

    const sendingAccount = await accountService.findAccountById(sendingAccountId)
    if (!sendingAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not exist.'
      })
    }

    if (sendingAccount.userId !== id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not belong to this user.'
      })
    }

    if (sendingAccount.type !== ACCOUNT_TYPES.PAYMENT) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account is not payment account.'
      })
    }

    if (sendingAccount.balance < amount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not have enough money.'
      })
    }

    const receivingAccount = await accountService.findAccountById(receivingAccountId)
    if (!receivingAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Receiving account does not exist.'
      })
    }

    await transactionService.createInnerTransactions(sendingAccountId, receivingAccountId, amount, content, feePayer)

    delete receivingAccount.balance //do not show balance to sender
    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      receivingAccount
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating inner transaction', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const createOuterTransactionToPGPPartner = async (req, res, next) => {
  try {
    const {sendingAccountId, receivingAccountId, amount, feePayer, content} = req.body
    const {id} = req.user
    
    const sendingAccount = await accountService.findAccountById(sendingAccountId)
    if (!sendingAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not exist.'
      })
    }

    if (sendingAccount.userId !== id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not belong to this user.'
      })
    }

    if (sendingAccount.type !== ACCOUNT_TYPES.PAYMENT) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account is not payment account.'
      })
    }

    if (sendingAccount.balance < amount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not have enough money.'
      })
    }

    const response = await pgpPartnerFetcher.getAccountInfo(receivingAccountId)
    if (!response.isSuccess) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Receiving account does not exist.'
      })
    }

    const result = await transactionService.transferToPGPPartner(
      sendingAccountId,
      receivingAccountId,
      amount,
      feePayer,
      content
    )

    if (!result.isSuccess) {
      return res.status(httpStatusCodes.OK).json({
        message: result.error.message
      })
    }

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating outer transaction to PGP partner', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const createOuterTransactionToRSAPartner = async (req, res, next) => {
  try {
    const {sendingAccountId, receivingAccountId, amount, feePayer, content} = req.body
    const {id} = req.user
    
    const sendingAccount = await accountService.findAccountById(sendingAccountId)
    if (!sendingAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not exist.'
      })
    }

    if (sendingAccount.userId !== id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not belong to this user.'
      })
    }

    if (sendingAccount.type !== ACCOUNT_TYPES.PAYMENT) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account is not payment account.'
      })
    }

    if (sendingAccount.balance < amount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not have enough money.'
      })
    }

    const response = await rsaPartnerFetcher.getAccountInfo(receivingAccountId)
    if (!response.isSuccess) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Receiving account does not exist.'
      })
    }

    const result = await transactionService.transferToRSAPartner(
      sendingAccountId,
      receivingAccountId,
      amount,
      feePayer,
      content
    )
    
    if (!result.isSuccess) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Request failed, please check your input.'
      })
    }

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating outer transaction to RSA partner', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
