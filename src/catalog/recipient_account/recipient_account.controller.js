import * as recipientAccountService from './recipient_account.service'
import * as accountService from '../account/account.service'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import {debug} from '../../utils'
import {MESSAGE} from '../../constants'

const NAMESPACE = `recipientAccountController-${moment.utc().toISOString()}`

export const findAllRecipientAccountsOfUser = async (req, res, next) => {
  try {
    const {id} = req.user
    
    const recipientAccountList = await recipientAccountService.findAllRecipientAccountsOfUser(id)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: recipientAccountList
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while finding all recipient accounts of user', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const createRecipientAccount = async (req, res, next) => {
  try {
    const {id} = req.user
    const {accountId, nickname} = req.body
    
    const accountInstance = await accountService.findAccountById(accountId)
    if (!accountInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `Account with id ${accountId} does not exist.`
      })
    }

    const recipientAccountInstance = await recipientAccountService.findRecipientAccountOfUserByAccountId(id, accountId)
    if (recipientAccountInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'User has added this account as a recipient account.'
      })
    }

    const result = await recipientAccountService.createRecipientAccount(id, accountId, nickname)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: result
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating recipient account', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const updateRecipientAccountById = async (req, res, next) => {
  try {
    const {id} = req.params
    const {accountId, nickname} = req.body
    
    const accountInstance = await accountService.findAccountById(accountId)
    if (!accountInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `Account with id ${accountId} does not exist.`
      })
    }

    const result = await recipientAccountService.updateRecipientAccountById(id, accountId, nickname)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: result
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while updating recipient account', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const deleteRecipientAccountById = async (req, res, next) => {
  try {
    const {id} = req.params

    const recipientAccountIns = await recipientAccountService.findRecipientAccountById(id)
    if (!recipientAccountIns) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `Recipient account with id ${id} does not exist.`
      })
    }

    const result = await recipientAccountService.deleteRecipientAccountById(id)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: result
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while deleting recipient account', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
