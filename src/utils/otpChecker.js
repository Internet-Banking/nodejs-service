import moment from 'moment'

const verifyOTP = (reqDigits, otpDigitsDB, otpCreatedAtDB, otpExpiredTime, isUsed) => {

  const reqSendAt = moment.utc()
  const otpCreatedAt = moment.utc(otpCreatedAtDB)

  const elapsedTimeInMilliseconds = reqSendAt.diff(otpCreatedAt)

  if (elapsedTimeInMilliseconds > otpExpiredTime) {
    return {
      valid: false,
      message: 'The OTP verify session has expired !!!'
    }
  }

  if (reqDigits !== otpDigitsDB) {
    return {
      valid: false,
      message: 'The OTP digits is not correct !!!'
    }
  }

  if (isUsed) {
    return {
      valid: false,
      message: 'The OTP was used in the previous verify session !!!'
    }
  }

  return {
    valid: true,
    message: 'OTP verification successfully !!!'
  }
}
export default {verifyOTP}
