import Models from '../../../models/all'

export const findUserById = async (userId) => {
  return await Models.Users.findOne({
    where: {
      id: userId,
      isDeleted: false
    },
    attributes: {
      exclude: ['password']
    },
    raw: true
  })
}
