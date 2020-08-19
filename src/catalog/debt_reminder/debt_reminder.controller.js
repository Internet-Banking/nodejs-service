import {isNil, isObject} from 'lodash'
import * as accountService from '../account/account.service'
import {MESSAGE, ACCOUNT_TYPES} from '../../constants'
import {debug} from '../../utils'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import * as debtReminderService from './debt_reminder.service'

const NAMESPACE = `debtReminderController-${moment.utc().toISOString()}`

export const createDebtReminder = async (req, res, next) => {
  try {
    const {sendingAccountId, receivingAccountId, amount, content} = req.body
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

    const receivingAccount = await accountService.findAccountById(receivingAccountId)
    if (!receivingAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Receiving account does not exist.'
      })
    }

    if (receivingAccount.type !== ACCOUNT_TYPES.PAYMENT) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Receiving account is not payment account.'
      })
    }

    await debtReminderService.createDebtReminder(sendingAccountId, receivingAccountId, amount, content)

    delete receivingAccount.balance //do not show balance to sender
    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      receivingAccount
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating debt reminder', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const solveDebtReminder = async (req, res, next) => {
  try {
    const {id} = req.params
    
    const debtReminder = await debtReminderService.solveDebtReminder(id)

    if (!isObject(debtReminder)) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: debtReminder
      })
    }

    return res.status(httpStatusCodes.OK).json({
      payload: debtReminder
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while solving debt reminder', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const deleteDebtReminder = async (req, res, next) => {
  try {
    const {id} = req.params
    await debtReminderService.deleteDebtReminder(id)
    
    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while deleting debt reminder', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const getDebtReminderByUserId = async (req, res, next) => {
  try {
    const {page = 1, limit = null, isSending} = req.query
    const offset = isNil(limit) ? 0 : (page - 1) * limit
    const {id: userId} = req.user

    const accounts = await accountService.findAllAccountsOfUser(userId)
    const accountIds = accounts.map(acc => acc.id)
    let accountInstances
    if (isNil(isSending)) {
      accountInstances = {
        sendingAccountIds: accountIds,
        receivingAccountIds: accountIds
      }
    }
    else if (isSending == 'true') {
      accountInstances = {
        sendingAccountIds: accountIds,
        receivingAccountIds: []
      }
    }
    else {
      accountInstances = {
        sendingAccountIds: [],
        receivingAccountIds: accountIds
      }
    }

    const debtReminder = await debtReminderService.getDebtReminderByAccounts(accountInstances, {
      offset, limit
    })

    return res.status(httpStatusCodes.OK).json({
      payload: debtReminder
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while getting debt reminder by userId', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
