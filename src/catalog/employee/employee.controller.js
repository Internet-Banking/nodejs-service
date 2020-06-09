import * as employeeService from './employee.service'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import {debug, crypt} from '../../utils'
import {MESSAGE} from '../../constants'

const NAMESPACE = `employeeController-${moment.utc().toISOString()}`

export const findAllEmployees = async (req, res, next) => {
  try {
    const employeeList = await employeeService.findAllEmployee()

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: employeeList
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while finding all employees', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const createEmployee = async (req, res, next) => {
  try {
    const {email, name, password} = req.body

    const employeeInstance = await employeeService.findEmployeeByEmail(email)
    if (employeeInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'This email was used.'
      })
    }

    const employeeCreated = await employeeService.createEmployee(email, name, password)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: employeeCreated
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating employee', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const updateEmployeeById = async (req, res, next) => {
  try {
    const {id} = req.params
    const {name} = req.body

    const employeeInstance = await employeeService.findEmployeeById(id)
    if (!employeeInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'This employee does not exist.'
      })
    }

    const employeeUpdated = await employeeService.updateEmployeeById(id, name)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: employeeUpdated
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while updating employee', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const deleteEmployeeById = async (req, res, next) => {
  try {
    const {id} = req.params

    const employeeInstance = await employeeService.findEmployeeById(id)
    if (!employeeInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: MESSAGE.INTERNAL_SERVER_ERROR
      })
    }

    const employeeDeleted = await employeeService.deleteEmployeeById(id)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: employeeDeleted
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while updating employee', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const loginEmployee = async (req, res, next) => {
  try {
    const {email, password} = req.body

    const employeeInstance = await employeeService.authenticateEmployee(email, password)

    if (!employeeInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Invalid email or password'
      })
    }

    const token = crypt.createEmployeeAuthToken(employeeInstance.id)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: employeeInstance,
      token
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while logging employee in', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
