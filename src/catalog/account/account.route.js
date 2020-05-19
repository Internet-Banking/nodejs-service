import express from 'express'
import { schemaValidator, expiryValidator, secureHashValidator } from '../../middlewares/requestValidators'
import { getAccountInfoQuerySchema } from '../../schemas/partnerRequest'

const router = express.Router()

router.get('/',
  schemaValidator(getAccountInfoQuerySchema, 'query'),
  expiryValidator('query'),
  secureHashValidator('query'),
  async (req, res) => {
    return res.status(200).json({ body: req.body, query: req.query, params: req.params })
  }
)

export default router
