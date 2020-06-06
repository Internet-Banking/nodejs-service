
import * as userRepo from './user.repository'
import * as accountRepo from '../account/account.repository'
import {SENDGRID_API_KEY} from '../../config'
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(`${SENDGRID_API_KEY}`);

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
  await accountRepo.createPaymentAccountByUserId(userInstance.id)
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

export const sendOTPMail = async (userEmail, html) => {
  const msg = {
    to: userEmail,
    from: 'team29internetbanking@gmail.com', // This email have to equal to email of sender in account sendgrid
    subject: 'INTERNET_BANKING_29 - OTP',
    html
  };
  await sgMail.send(msg)
}
