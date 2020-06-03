import express from 'express'
import * as userController from './user.controller'
import {auth} from '../../middlewares'

const router = express.Router()

router.post('/', auth.employee(), userController.createUser)
router.post('/login', userController.login)
router.get('/account', auth.user(), userController.findAllAccountsOfUser)

export default router
