import * as accountService from './account.service'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import debug from '../../utils/debug'
import { MESSAGE } from '../../constants'

const NAMESPACE = `accountController-${moment.utc().toISOString()}`

export const increaseBalanceById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { amount } = req.body

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
      message: 'Hệ thống gặp lỗi khi nộp tiền vào tài khoản.'
    })
  }
}
