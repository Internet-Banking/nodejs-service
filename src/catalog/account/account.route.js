import express from 'express'
import * as accountController from './account.controller'
import {auth} from '../../middlewares'

const router = express.Router()

router.patch('/:id/charge', auth.employee(), accountController.chargeAccountById)

export default router
