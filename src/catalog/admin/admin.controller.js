import * as adminService from './admin.service'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import {debug, crypt} from '../../utils'
import {MESSAGE} from '../../constants'

const NAMESPACE = `adminController-${moment.utc().toISOString()}`

export const loginAdmin = async (req, res, next) => {
  try {
    const {email, password} = req.body

    const adminInstance = await adminService.authenticateAdmin(email, password)

    if (!adminInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Invalid email or password'
      })
    }

    const token = crypt.createAdminAuthToken(adminInstance.id)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: adminInstance,
      token
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while logging admin in', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const getAdminBasicInfo = async (req, res, next) => {
  try {
    const {id} = req.admin

    const adminInstance = await adminService.findAdminById(id)
    if (!adminInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: `Admin with id ${id} does not exist.`
      })
    }

    delete adminInstance.password
    delete adminInstance.createdAt
    delete adminInstance.updatedAt

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: adminInstance
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while getting admin basic info', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
