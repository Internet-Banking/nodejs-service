'use strict'
import {sequelize, Sequelize} from '../src/db'
import moment from 'moment'
import {OTP_EXPIRED_TIME} from '../src/config'

const OTP = sequelize.define('otps', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userID: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  digits: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isUsed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {})

OTP.prototype.verifyOTP = function (reqOtpDigits) {

  const reqSendAt = moment.utc()
  const otpCreatedAt = moment.utc(this.createdAt)

  const elapsedTimeInMilliseconds = reqSendAt.diff(otpCreatedAt)

  if (elapsedTimeInMilliseconds > OTP_EXPIRED_TIME) {
    return {
      valid: false,
      message: 'The OTP verify session has expired !!!'
    }
  }

  if (reqOtpDigits !== this.digits) {
    return {
      valid: false,
      message: 'The OTP digits is not correct !!!'
    }
  }

  if (this.isUsed) {
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

export default OTP
