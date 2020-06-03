import express from 'express'
import * as recipientAccountController from './recipient_account.controller'
import {auth} from '../../middlewares'

const router = express.Router()

router.get('/', auth.user(), recipientAccountController.findAllRecipientAccountsOfUser)

export default router
