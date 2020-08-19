import express from 'express'
import * as debtReminder from './debt_reminder.controller'
import {auth, requestValidation} from '../../middlewares'

const router = express.Router()

router.post('/', auth.user(), debtReminder.createDebtReminder)
router.get('/all', auth.user(), debtReminder.getDebtReminderByUserId)
router.delete('/:id', auth.user(), debtReminder.deleteDebtReminder)
router.post('/solve/:id',
  auth.user(),
  requestValidation.OTPVerification(),
  debtReminder.solveDebtReminder)

export default router
