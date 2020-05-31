import Models from '../../../models/all'

export const findAdminByEmail = async (email, raw = true) => {
  return await Models.Admins.findOne({where: {email}, raw})
}

export const findAdminById = async (adminId, raw = true) => {
  return await Models.Admins.findOne({where: {id: adminId}, raw})
}
