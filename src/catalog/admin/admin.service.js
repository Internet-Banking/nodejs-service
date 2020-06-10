import * as adminRepo from './admin.repository'

export const authenticateAdmin = async (email, password) => {
  const adminInstance = await adminRepo.findAdminByEmail(email, false)

  if (adminInstance && adminInstance.validPassword(password)) {
    delete adminInstance.dataValues.password
    delete adminInstance.dataValues.createdAt
    delete adminInstance.dataValues.updatedAt
    return adminInstance
  }

  return null
}

export const findAdminById = async (adminId) => {
  return await adminRepo.findAdminById(adminId)
}
