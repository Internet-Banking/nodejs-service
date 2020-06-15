import * as otpRepo from './otp.repository'

export const createOTP = async (userID, digits) => {
  return await otpRepo.createOTP(userID, digits)
}

export const findOTPByUserID = async (userID) => {
  return await otpRepo.findOTPByUserID(userID)
}
