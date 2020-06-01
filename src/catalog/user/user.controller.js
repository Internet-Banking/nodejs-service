import * as userService from './user.service'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import {debug} from '../../utils'
import {MESSAGE} from '../../constants'

const NAMESPACE = `userController-${moment.utc().toISOString()}`

export const findUserByIdForPartner = async (req, res, next) => {
  try {
    const {id} = req.params

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
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const createUser = async (req, res, next) => {
  try {
    const {email, name, username, phone, password} = req.body

    const userFoundByEmail = await userService.findUserByEmail(email)
    if (userFoundByEmail) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'This email was used.'
      })
    }

    const userFoundByUsername = await userService.findUserByUsername(username)
    if (userFoundByUsername) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'This username was used.'
      })
    }

    const userFoundByPhone = await userService.findUserByPhone(phone)
    if (userFoundByPhone) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'This phone was used.'
      })
    }

    const userInstance = await userService.createUser(email, name, username, phone, password)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: userInstance
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating user', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
