import Models from '../../../models/all'
//import Sequelize from 'sequelize'

export const createOTP = async (userID, digits) => {
  return await Models.OTP.create({userID, digits})
}

export const findOTPByUserID = async (userID, raw = true) => {
  return await Models.OTP.findOne({
    where: {
      userID
    }
  })
}
