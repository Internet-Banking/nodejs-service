import express from 'express'
import * as userController from './user.controller'
import * as accountController from '../account/account.controller'
import * as recipientAccountController from '../recipient_account/recipient_account.controller'
import {auth, requestValidation} from '../../middlewares'

const router = express.Router()

router.get('/', auth.employee(), userController.findAllUsers)
router.post('/', auth.employee(), userController.createUser)
router.post('/login', userController.login)
router.get('/account', auth.user(), userController.findAllAccountsOfUser)
router.get('/:id/account', auth.employee(), userController.findAllAccountsOfUserById)
router.get('/me', auth.user(), userController.getUserBasicInfo)
router.put('/password', auth.user(), userController.changePassword)
router.put('/forgot_password', requestValidation.OTPVerificationWithoutAuth(), userController.changePassword)

router.get('/account', auth.user(), accountController.findAllAccountsOfUser)

router.get('/recipient_account', auth.user(), recipientAccountController.findAllRecipientAccountsOfUser)
router.post('/recipient_account', auth.user(), recipientAccountController.createRecipientAccount)
router.put('/recipient_account/:id', auth.user(), recipientAccountController.updateRecipientAccountById)
router.delete('/recipient_account/:id', auth.user(), recipientAccountController.deleteRecipientAccountById)

//this route use to generate and send OTP to user email after auth
router.post('/otp', auth.user(), userController.generateAndSendOTP)

//this route use to generate and send OTP to user email without auth
router.post('/otp_without_auth', userController.generateAndSendOTPWithoutAuth)

//this route use to test middlewares verify OTP
router.post('/verify_otp', auth.user(), requestValidation.OTPVerification(), (req, res) => {
  return res.status(200).json({
    message: 'OTP verification successfully',
    payload: req.user
  })
})

//this route use to test middlewares verify OTP without auth
router.post('/verify_otp_without_auth', requestValidation.OTPVerificationWithoutAuth(), (req, res) => {
  return res.status(200).json({
    message: 'OTP verification successfully'
  })
})

export default router
