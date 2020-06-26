import express from 'express'
import * as transactionController from './transaction.controller'
import {auth, requestValidation} from '../../middlewares'

const router = express.Router()

router.post('/inner',
  auth.user(),
  requestValidation.OTPVerification(),
  transactionController.createInnerTransaction)

export default router
