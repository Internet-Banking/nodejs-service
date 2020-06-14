import httpStatusCodes from 'http-status-codes'
import crypto from 'crypto'
import NodeRSA from 'node-rsa'
import moment from 'moment'
import {
  HASH_SECRET, PARTNER_REQUEST_EXPIRED_TIME, OTP_EXPIRED_TIME,
  RSA_PUBLIC_KEY, PGP_PARTNER_PUBLIC_KEY, PARTNER_CODE_RSA
} from '../config'
//dev team replace RSA_PARTNER_PUBLIC_KEY with RSA_PUBLIC_KEY when testing with partnerInstruction.js
import * as otpRepo from '../catalog/otp/otp.repository'
import {debug} from '../utils'
import {MESSAGE} from '../constants'

//validate property of req by schema
const schemaValidator = (schema, property) => {
  //property: body, params, query,...
  return async (req, res, next) => {
    const {error} = await schema.validate(req[property])

    if (!error) {
      next()
    }
    else {
      const {details} = error
      const errMessage = details.map(detail => detail.message).join(',')
      res.status(httpStatusCodes.BAD_REQUEST).json({message: errMessage})
    }
  }
}

//check if req is expired with createdAt field in req[property]
const expiryValidator = (property) => {
  return async (req, res, next) => {
    const {createdAt} = req[property]
    const now = moment.utc()
    const reqCreatedAt = moment.utc(createdAt)

    const elapsedTimeInMilliseconds = now.diff(reqCreatedAt)

    if (elapsedTimeInMilliseconds > PARTNER_REQUEST_EXPIRED_TIME) {
      res.status(httpStatusCodes.BAD_REQUEST).json({message: 'Request is expired.'})
    }
    else {
      next()
    }
  }
}

//validate if other keys was modified or not
const secureHashValidator = (property) => {
  return async (req, res, next) => {
    const propertyObject = req[property]
    const queryHash = propertyObject.secureHash
    delete propertyObject.secureHash

    const stringifiedPropertyObject = JSON.stringify(propertyObject)
    const hash = crypto.createHmac('sha256', HASH_SECRET).update(stringifiedPropertyObject).digest('hex')

    if (crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(queryHash))) {
      next()
    }
    else {
      res.status(httpStatusCodes.BAD_REQUEST).json({message: 'This request is not secured.'})
    }
  }
}

const asymmetricSignatureVerification = () => {
  return async (req, res, next) => {
    const {signature, partnerCode} = req.body
    delete req.body.signature

    const partnerPublicKey =
      partnerCode === PARTNER_CODE_RSA
        ? new NodeRSA(RSA_PUBLIC_KEY)
        : new NodeRSA(PGP_PARTNER_PUBLIC_KEY)

    const isVerified = partnerPublicKey.verify(req.body, signature, 'base64', 'base64')

    if (isVerified) {
      next()
    }
    else {
      res.status(httpStatusCodes.UNAUTHORIZED).json({message: 'Invalid signature'})
    }
  }
}

const OTPVerification = () => {
  return async (req, res, next) => {
    try {
      const userID = req.user.id
      const reqDigits = req.body.otpDigits

      const otpInstance = await otpRepo.findOTPByUserID(userID)

      if (!otpInstance) {
        return res.status(400).json({message: 'User have no OTP verification session !!!'})
      }

      const verifyObj = otpInstance.verifyOTP(reqDigits, OTP_EXPIRED_TIME)

      if (verifyObj.valid) {
        await otpInstance.update({isUsed: true})
        next()
      }
      else {
        return res.status(400).json({message: verifyObj.message})
      }
    }
    catch (err) {
      debug.error('OTP', 'Error occured while verify OTP', err)
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: MESSAGE.INTERNAL_SERVER_ERROR
      })
    }
  }
}

export default {
  schemaValidator,
  expiryValidator,
  secureHashValidator,
  asymmetricSignatureVerification,
  OTPVerification
}
