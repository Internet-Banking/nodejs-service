import express from 'express'
import { schemaValidator, expiryValidator } from '../../middlewares/requestValidator'
import { getAccountInfoQuerySchema } from '../../schemas/index'

const router = express.Router()

router.get('/', expiryValidator('query'), schemaValidator(getAccountInfoQuerySchema, 'query'), async (req, res) => {
  return res.status(200).json({ body: req.body, query: req.query, params: req.params })
})

export default router
