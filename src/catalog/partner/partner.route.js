import express from 'express'
import * as userController from '../user/user.controller'
import { schemaValidator, expiryValidator, secureHashValidator } from '../../middlewares/requestValidators'
import { getUserInfoQuerySchema } from '../../schemas/partnerRequest'

const router = express.Router()

router.get('/user/:id',
  schemaValidator(getUserInfoQuerySchema, 'query'),
  expiryValidator('query'),
  secureHashValidator('query'),
  userController.findUserByIdForPartner
)

export default router
