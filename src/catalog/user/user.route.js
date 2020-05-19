import express from 'express'
import * as userController from './user.controller'
import { schemaValidator, expiryValidator, secureHashValidator } from '../../middlewares/requestValidators'
import { getUserInfoQuerySchema } from '../../schemas/partnerRequest'

const router = express.Router()

router.get('/:id',
  schemaValidator(getUserInfoQuerySchema, 'query'),
  expiryValidator('query'),
  secureHashValidator('query'),
  userController.findUserById
)

export default router
