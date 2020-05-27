import express from 'express'
import * as employeeController from './employee.controller'
import { adminAuthentication } from '../../middlewares/authentication'

const router = express.Router()

router.get('/', adminAuthentication(), employeeController.findAllEmployees)
router.post('/', adminAuthentication(), employeeController.createEmployee)
router.put('/:id', adminAuthentication(), employeeController.updateEmployeeById)
router.delete('/:id', adminAuthentication(), employeeController.deleteEmployeeById)

export default router
