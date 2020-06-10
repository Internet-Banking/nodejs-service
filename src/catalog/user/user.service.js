import * as userRepo from './user.repository'
import * as accountRepo from '../account/account.repository'

export const findAllUsers = async () => {
  return await userRepo.findAllUsers()
}

export const findUserById = async (userId) => {
  return await userRepo.findUserById(userId)
}

export const findUserByEmail = async (email) => {
  return await userRepo.findUserByEmail(email)
}

export const findUserByUsername = async (username) => {
  return await userRepo.findUserByUsername(username)
}

export const findUserByPhone = async (phone) => {
  return await userRepo.findUserByPhone(phone)
}

export const createUser = async (email, name, username, phone, password) => {
  const userInstance = await userRepo.createUser(email, name, username, phone, password)
  delete userInstance.dataValues.password
  delete userInstance.dataValues.isDeleted
  delete userInstance.dataValues.createdAt
  delete userInstance.dataValues.updatedAt
  const accountInstance = await accountRepo.createPaymentAccountByUserId(userInstance.id)
  userInstance.dataValues.paymentAccount = accountInstance.dataValues
  return userInstance
}

export const authenticateUser = async (username, password) => {
  const userInstance = await userRepo.findUserByUsername(username, false)
  
  if (userInstance && userInstance.validPassword(password)) {
    delete userInstance.dataValues.password
    delete userInstance.dataValues.isDeleted
    delete userInstance.dataValues.createdAt
    delete userInstance.dataValues.updatedAt
    return userInstance
  }

  return null
}

export const findUserInfoByAccountIdForPartner = async (accountId) => {
  return await userRepo.findUserInfoByAccountIdForPartner(accountId)
}
