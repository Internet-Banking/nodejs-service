import Models from '../../../models/all'

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

export const createUser = async (email, name, username, phone, password) => {
  return await Models.Users.create({email, name, username, phone, password})
}
