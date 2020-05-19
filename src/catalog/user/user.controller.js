import * as userService from './user.service'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import debug from '../../utils/debug'
import { MESSAGE } from '../../constants'

const NAMESPACE = `userController-${moment.utc().toISOString()}`

export const findUserByIdForPartner = async (req, res, next) => {
  try {
    const { id } = req.params

    const userInstance = await userService.findUserById(id)
    delete userInstance.isDeleted
    delete userInstance.createdAt
    delete userInstance.updatedAt

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: userInstance
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while finding user by id', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Hệ thống gặp lỗi khi truy vấn thông tin người dùng'
    })
  }
}
