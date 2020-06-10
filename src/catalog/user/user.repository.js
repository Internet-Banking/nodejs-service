import Models from '../../../models/all'
import Sequelize from 'sequelize'

export const findAllUsers = async (raw = true) => {
  return await Models.Users.findAll({where: {isDeleted: false}, raw})
}

export const findUserById = async (userId, raw = true) => {
  return await Models.Users.findOne({
    where: {
      id: userId,
      isDeleted: false
    },
    attributes: {
      exclude: ['password']
    },
    raw
  })
}

export const findUserByEmail = async (email, raw = true) => {
  return await Models.Users.findOne({
    where: {
      email,
      isDeleted: false
    },
    raw
  })
}

export const findUserByUsername = async (username, raw = true) => {
  return await Models.Users.findOne({
    where: {
      username,
      isDeleted: false
    },
    raw
  })
}

export const findUserByPhone = async (phone, raw = true) => {
  return await Models.Users.findOne({
    where: {
      phone,
      isDeleted: false
    },
    raw
  })
}

export const findUserInfoByAccountIdForPartner = async (accountId, raw = true) => {
  return await Models.Accounts.findOne({
    attributes: [
      'id',
      [Sequelize.col('user.name'), 'userName'],
      [Sequelize.col('user.email'), 'userEmail'],
      [Sequelize.col('user.phone'), 'userPhone']
    ],
    where: {
      id: accountId,
      isDeleted: false
    },
    include: [
      {
        model: Models.Users,
        required: true,
        attributes: ['name', 'email', 'phone']
      }
    ],
    raw
  })
}

export const createUser = async (email, name, username, phone, password) => {
  return await Models.Users.create({email, name, username, phone, password})
}
