import express from 'express'
import * as transactionController from './transaction.controller'
import {auth, requestValidation} from '../../middlewares'

const router = express.Router()

router.post('/inner',
  auth.user(),
  requestValidation.OTPVerification(),
  transactionController.createInnerTransaction)

router.get('/inner', auth.user(), transactionController.getInnerTransactionByUserId)

router.post('/outer/pgp',
  auth.user(),
  requestValidation.OTPVerification(),
  transactionController.createOuterTransactionToPGPPartner)

router.post('/outer/rsa',
  auth.user(),
  requestValidation.OTPVerification(),
  transactionController.createOuterTransactionToRSAPartner)

router.get('/outer', auth.user(), transactionController.getOuterTransactionByUserId)

export default router
