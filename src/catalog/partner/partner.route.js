import express from 'express'
import * as userController from '../user/user.controller'
import * as accountController from '../account/account.controller'
import * as partnerController from './partner.controller'
import {requestValidation} from '../../middlewares'
import {
  getUserInfoByAccountIdQuerySchema,
  increaseBalanceSchema,
  increaseBalanceParamsSchema
} from '../../schemas/partnerRequest'

const {
  schemaValidator,
  expiryValidator,
  secureHashValidator,
  asymmetricSignatureVerification
} = requestValidation

const router = express.Router()

//for partner
router.get('/user/account/:id',
  schemaValidator(getUserInfoByAccountIdQuerySchema, 'query'),
  expiryValidator('query'),
  secureHashValidator('query'),
  userController.findUserInfoByAccountIdForPartner
)

//for partner
router.patch('/account/:id',
  schemaValidator(increaseBalanceParamsSchema, 'params'),
  schemaValidator(increaseBalanceSchema, 'body'),
  asymmetricSignatureVerification(),
  expiryValidator('body'),
  secureHashValidator('body'),
  accountController.increaseBalanceByIdForPartner
)

//for bank
router.get('/pgp/account/:id', partnerController.findAccountInPGPPartnerByAccountId)
router.get('/rsa/account/:id', partnerController.findAccountInRSAPartnerByAccountId)

export default router
