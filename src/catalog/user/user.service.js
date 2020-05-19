import * as userRepo from './user.repository'

export const findUserById = async (userId) => {
  return await userRepo.findUserById(userId)
}
