import express from 'express'
import * as adminController from './admin.controller'

const router = express.Router()

router.post('/login', adminController.loginAdmin)

export default router
