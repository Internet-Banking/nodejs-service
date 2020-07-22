import * as debtReminderService from './debt_reminder.service'
import * as accountService from '../account/account.service'
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
