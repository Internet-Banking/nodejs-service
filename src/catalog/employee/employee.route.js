import express from 'express'
import * as employeeController from './employee.controller'
import {auth} from '../../middlewares'

const router = express.Router()

router.get('/', auth.admin(), employeeController.findAllEmployees)
router.post('/', auth.admin(), employeeController.createEmployee)
router.put('/:id', auth.admin(), employeeController.updateEmployeeById)
router.delete('/:id', auth.admin(), employeeController.deleteEmployeeById)
router.post('/login', employeeController.loginEmployee)
router.get('/me', auth.employee(), employeeController.getEmployeeBasicInfo)

export default router
