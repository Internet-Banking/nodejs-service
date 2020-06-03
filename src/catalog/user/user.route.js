import express from 'express'
import * as userController from './user.controller'
import * as recipientAccountController from '../recipient_account/recipient_account.controller'
import {auth} from '../../middlewares'

const router = express.Router()

router.post('/', auth.employee(), userController.createUser)
router.post('/login', userController.login)
router.get('/account', auth.user(), userController.findAllAccountsOfUser)
router.get('/recipient_account', auth.user(), recipientAccountController.findAllRecipientAccountsOfUser)

export default router
