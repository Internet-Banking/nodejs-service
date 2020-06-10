import express from 'express'
import * as adminController from './admin.controller'
import {auth} from '../../middlewares'

const router = express.Router()

router.post('/login', adminController.loginAdmin)
router.get('/me', auth.admin(), adminController.getAdminBasicInfo)

export default router
