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
