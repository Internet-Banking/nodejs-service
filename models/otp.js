'use strict'
import {sequelize, Sequelize} from '../src/db'
import {otpChecker} from '../src/utils'

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
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {})

OTP.prototype.verifyOTP = function (reqDigits, otpExpiredTime) {
  return otpChecker.verifyOTP(reqDigits, this.digits, this.createdAt, otpExpiredTime)
}

export default OTP
