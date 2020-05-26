import httpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { findAdminById } from '../catalog/admin/admin.repository'
import debug from '../utils/debug'

export const adminAuthentication = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers

      if (!authorization) {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({
          message: 'Quản trị viên phải đăng nhập mới có thể vào được trang này'
        })
      }

      const jwtToken = authorization.substring('Bearer '.length)
    
      const decoded = jwt.verify(jwtToken, JWT_SECRET)
      const adminInstance = await findAdminById(decoded.adminId)

      if (!adminInstance) {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({
          message: 'Quản trị viên phải đăng nhập mới có thể vào được trang này'
        })
      }

      req.admin = adminInstance

      next()
    }
    catch (err) {
      debug.error('', 'Error occured while logging admin in', err)
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Hệ thống gặp lỗi.'
      })
    }
  }
}
