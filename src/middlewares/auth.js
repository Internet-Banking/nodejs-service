import httpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config'
import {findAdminById} from '../catalog/admin/admin.repository'
import {findEmployeeById} from '../catalog/employee/employee.repository'
import {findUserById} from '../catalog/user/user.repository'
import {MESSAGE} from '../constants'
import {debug} from '../utils'

const admin = () => {
  return async (req, res, next) => {
    try {
      const {authorization} = req.headers

      if (!authorization) {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({
          message: 'Authentication of administrator is required.'
        })
      }

      const jwtToken = authorization.substring('Bearer '.length)
    
      const decoded = jwt.verify(jwtToken, JWT_SECRET)
      const adminInstance = await findAdminById(decoded.adminId)

      if (!adminInstance) {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({
          message: 'Authentication of administrator is required.'
        })
      }

      req.admin = adminInstance

      next()
    }
    catch (err) {
      debug.error('Auth middlewares', 'Error occured while logging admin in', err)
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: MESSAGE.INTERNAL_SERVER_ERROR
      })
    }
  }
}

const employee = () => {
  return async (req, res, next) => {
    try {
      const {authorization} = req.headers

      if (!authorization) {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({
          message: 'Authentication of employee is required.'
        })
      }

      const jwtToken = authorization.substring('Bearer '.length)
    
      const decoded = jwt.verify(jwtToken, JWT_SECRET)
      const empInstance = await findEmployeeById(decoded.empId)

      if (!empInstance) {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({
          message: 'Authentication of employee is required.'
        })
      }

      req.employee = empInstance

      next()
    }
    catch (err) {
      debug.error('Auth middlewares', 'Error occured while logging employee in', err)
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: MESSAGE.INTERNAL_SERVER_ERROR
      })
    }
  }
}

const user = () => {
  return async (req, res, next) => {
    try {
      const {authorization} = req.headers

      if (!authorization) {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({
          message: 'Authentication of user is required.'
        })
      }

      const jwtToken = authorization.substring('Bearer '.length)
    
      const decoded = jwt.verify(jwtToken, JWT_SECRET)
      const userInstance = await findUserById(decoded.userId)

      if (!userInstance) {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({
          message: 'Authentication of user is required.'
        })
      }

      req.user = userInstance

      next()
    }
    catch (err) {
      debug.error('Auth middlewares', 'Error occured while logging user in', err)
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: MESSAGE.INTERNAL_SERVER_ERROR
      })
    }
  }
}

export default {
  admin,
  employee,
  user
}
