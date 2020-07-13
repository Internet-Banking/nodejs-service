import * as accountService from '../account/account.service'
import {MESSAGE, ACCOUNT_TYPES} from '../../constants'
import {debug} from '../../utils'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import * as transactionService from './transaction.service'

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
