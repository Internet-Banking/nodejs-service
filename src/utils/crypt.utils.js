import bcrypt from 'bcrypt-nodejs'
import { SALT_ROUNDS } from '../config'

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS))
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

export default { hashPassword, comparePassword }
