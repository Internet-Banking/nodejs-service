import {VN_DESIGNATION_CODE, BANK_CODE} from '../constants'

const generateAccountID = () => {
  return VN_DESIGNATION_CODE + BANK_CODE + Math.random().toString().slice(2, 12)
  /*
  Math.random()     ->  0.12345678901234
      .toString()   -> "0.12345678901234"
      .slice(2,12)  ->   "1234567890"
 */
}

const generateOTPDigit = () => {
  return Math.random().toString().slice(2, 8) // generates 6 digit Numeric OTP
}

const generateHTMLEmail = (userName, otpDigit) => { //userName === user.name

  return `
    Dear ${userName}, <br/>
    Please use the OTP token below to complete your online request.
    <br/>
    Your OTP token: &nbsp <b>${otpDigit}</b>
    <br/>
    Please note: You have 2 minutes to complete this OTP verification session.
    Have a pleasant day!
  `
}

export default {generateAccountID, generateOTPDigit, generateHTMLEmail}
