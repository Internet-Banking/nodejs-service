import express from 'express'
import * as transactionController from './transaction.controller'
import {auth} from '../../middlewares'

const router = express.Router()

router.post('/inner', auth.user(), transactionController.createInnerTransaction)

export default router
