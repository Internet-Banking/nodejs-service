import express from 'express'
import * as userController from './user.controller'
import * as recipientAccountController from '../recipient_account/recipient_account.controller'
import {auth} from '../../middlewares'

const router = express.Router()

router.post('/', auth.employee(), userController.createUser)
router.post('/login', userController.login)
router.get('/account', auth.user(), userController.findAllAccountsOfUser)

router.get('/recipient_account', auth.user(), recipientAccountController.findAllRecipientAccountsOfUser)
router.post('/recipient_account', auth.user(), recipientAccountController.createRecipientAccount)
router.put('/recipient_account/:id', auth.user(), recipientAccountController.updateRecipientAccountById)
router.delete('/recipient_account/:id', auth.user(), recipientAccountController.deleteRecipientAccountById)

//this route used to generate and send OTP to user email
//router.get('/otp', auth.user(), userController.generateAndSendOTP)

//this route used to test send email otp with not login & auth
router.get('/otp', userController.generateAndSendOTP)

export default router
