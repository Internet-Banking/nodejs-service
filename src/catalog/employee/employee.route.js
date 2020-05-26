import express from 'express'
import { adminAuthentication } from '../../middlewares/authentication'

const router = express.Router()

router.get('/', adminAuthentication(), (req, res) => {
  return res.status(200).json({
    message: 'ok'
  })
})

export default router
