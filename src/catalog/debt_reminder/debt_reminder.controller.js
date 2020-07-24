import * as debtReminderService from './debt_reminder.service'
import * as accountService from '../account/account.service'
import * as transactionService from '../transaction/transaction.service'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import {debug} from '../../utils'
import {MESSAGE} from '../../constants'

const NAMESPACE = `debtReminderController-${moment.utc().toISOString()}`

export const createDebtReminder = async (req, res, next) => {
  try {
    const fromUserId = req.user.id
    const {accountId, debtAmount, contentOfDebt} = req.body

    const accountInstance = await accountService.findAccountById(accountId)
    if (!accountInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `Account with id ${accountId} does not exist.`
      })
    }

    const toUserId = accountInstance.userId
    const result = await debtReminderService.createDebtReminder(fromUserId, toUserId, debtAmount, contentOfDebt)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: result
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating debt reminder', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const getListOfDebtReminderUserSent = async (req, res, next) => {
  try {
    const userId = req.user.id

    const debtReminderArr = await debtReminderService.getListOfDebtReminderUserSent(userId)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: debtReminderArr
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while getting sent debt reminder list.', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const getListOfDebtReminderUserRecive = async (req, res, next) => {
  try {
    const userId = req.user.id

    const debtReminderArr = await debtReminderService.getListOfDebtReminderUserRecive(userId)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: debtReminderArr
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while getting recive debt reminder list.', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const payForDebtReminderById = async (req, res, next) => {
  try {
    const {debtReminderId, content, feePayer} = req.body

    const debtReminderInstance = await debtReminderService.findDebtReminderById(debtReminderId)
    if (!debtReminderInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `DebtReminder with id ${debtReminderId} does not exist.`
      })
    }

    const sendingAccount = await accountService.findPaymentAccountsByUserId(debtReminderInstance.toUserId)
    if (!sendingAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `Sending account with id ${debtReminderInstance.toUserId} does not exist.`
      })
    }

    if (sendingAccount.balance < debtReminderInstance.debtAmount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not have enough money.'
      })
    }

    const receivingAccount = await accountService.findPaymentAccountsByUserId(debtReminderInstance.fromUserId)
    if (!receivingAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `Receiving account with id ${debtReminderInstance.fromUserId} does not exist.`
      })
    }

    await transactionService.createInnerTransactions(
      sendingAccount.id,
      receivingAccount.id,
      debtReminderInstance.debtAmount,
      content,
      feePayer
    )

    await debtReminderService.setDebtReminderIsPayById(debtReminderId)
  
    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: {
        debtReminderId,
        sendingAccountId: sendingAccount.id,
        receivingAccountId: receivingAccount.id,
        amount: debtReminderInstance.debtAmount
      }
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while paying for debt reminder', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const deleteDebtReminderById = async (req, res, next) => {
  try {
    const {id, contentOfRemoveDebt} = req.body

    const debtReminderInstance = await debtReminderService.findDebtReminderById(id)
    if (!debtReminderInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: MESSAGE.INTERNAL_SERVER_ERROR
      })
    }

    const debtReminderDeleted = await debtReminderService.deleteDebtReminderById(id, contentOfRemoveDebt)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: debtReminderDeleted
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while updating debt reminder', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
