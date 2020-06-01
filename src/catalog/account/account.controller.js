import * as accountService from './account.service'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import {debug} from '../../utils'
import {MESSAGE} from '../../constants'

const NAMESPACE = `accountController-${moment.utc().toISOString()}`

export const increaseBalanceById = async (req, res, next) => {
  try {
    const {id} = req.params
    const accountInstance = await accountService.findAccountById(id)
    if (!accountInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `Account with id ${id} does not exist.`
      })
    }

    const {amount} = req.body

    const result = await accountService.increaseBalanceById(id, amount)
    delete result.isDeleted
    delete result.createdAt
    delete result.updatedAt

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: result
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while increasing balance of account', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const chargeAccountById = async (req, res, next) => {
  try {
    const {id} = req.params
    const accountInstance = await accountService.findAccountById(id)
    if (!accountInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `Account with id ${id} does not exist.`
      })
    }

    const {amount} = req.body

    const result = await accountService.chargeAccountById(id, amount)
    delete result.isDeleted
    delete result.createdAt
    delete result.updatedAt

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: result
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while charging account', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
