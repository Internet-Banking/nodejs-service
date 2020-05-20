import express from 'express'
import * as userController from '../user/user.controller'
import * as accountController from '../account/account.controller'
import {
  schemaValidator, expiryValidator, secureHashValidator, asymmetricSignatureVerification
} from '../../middlewares/requestValidators'
import {
  getUserInfoQuerySchema, increaseBalanceSchema
} from '../../schemas/partnerRequest'

const router = express.Router()

router.get('/user/:id',
  schemaValidator(getUserInfoQuerySchema, 'query'),
  expiryValidator('query'),
  secureHashValidator('query'),
  userController.findUserByIdForPartner
)

router.patch('/account/:id',
  asymmetricSignatureVerification(),
  schemaValidator(increaseBalanceSchema, 'body'),
  expiryValidator('body'),
  secureHashValidator('body'),
  accountController.increaseBalanceById
)

export default router
