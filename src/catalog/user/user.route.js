import express from 'express'
import * as userController from './user.controller'
import {auth} from '../../middlewares'

const router = express.Router()

router.post('/', auth.user(), userController.createUser)
router.post('/login', userController.login)

export default router
