import express from 'express'
import * as userController from '../user/user.controller'
import * as accountController from '../account/account.controller'
import {requestValidation} from '../../middlewares'
import {
  getUserInfoQuerySchema,
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

router.get('/user/:id',
  schemaValidator(getUserInfoQuerySchema, 'query'),
  expiryValidator('query'),
  secureHashValidator('query'),
  userController.findUserByIdForPartner
)

router.patch('/account/:id',
  schemaValidator(increaseBalanceParamsSchema, 'params'),
  schemaValidator(increaseBalanceSchema, 'body'),
  asymmetricSignatureVerification(),
  expiryValidator('body'),
  secureHashValidator('body'),
  accountController.increaseBalanceById
)

export default router
