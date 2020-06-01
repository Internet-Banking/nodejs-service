import express from 'express'
import * as userController from './user.controller'
import {auth} from '../../middlewares'

const router = express.Router()

router.post('/', auth.employee(), userController.createUser)

export default router
