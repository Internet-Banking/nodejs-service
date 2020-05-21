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
    delete result[0][0][0].isDeleted
    delete result[0][0][0].createdAt
    delete result[0][0][0].updatedAt

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: result[0][0][0]
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while increasing balance of account', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Hệ thống gặp lỗi khi nộp tiền vào tài khoản.'
    })
  }
}
