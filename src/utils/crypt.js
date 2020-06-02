import bcrypt from 'bcrypt-nodejs'
import {SALT_ROUNDS, JWT_SECRET, TOKEN_EXPIRED_TIME} from '../config'
import jwt from 'jsonwebtoken'

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS))
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

const createAdminAuthToken = (adminId) => {
  return jwt.sign({adminId}, JWT_SECRET, {expiresIn: TOKEN_EXPIRED_TIME})
}

const createEmployeeAuthToken = (empId) => {
  return jwt.sign({empId}, JWT_SECRET, {expiresIn: TOKEN_EXPIRED_TIME})
}

const createUserAuthToken = (userId) => {
  return jwt.sign({userId}, JWT_SECRET, {expiresIn: TOKEN_EXPIRED_TIME})
}

export default {
  hashPassword,
  comparePassword,
  createAdminAuthToken,
  createEmployeeAuthToken,
  createUserAuthToken
}
