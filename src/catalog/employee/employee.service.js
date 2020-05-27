import * as employeeRepo from './employee.repository'

export const findAllEmployee = async () => {
  return await employeeRepo.findAllEmployees()
}

export const findEmployeeByEmail = async (email) => {
  return await employeeRepo.findEmployeeByEmail(email)
}

export const findEmployeeById = async (empId) => {
  return await employeeRepo.findEmployeeById(empId)
}

export const createEmployee = async (email, name, password) => {
  return await employeeRepo.createEmployee(email, name, password)
}

export const updateEmployeeById = async (empId, name) => {
  const result = await employeeRepo.updateEmployeeById(empId, name)
  return result[1][0]
}

export const deleteEmployeeById = async (empId) => {
  const result = await employeeRepo.deleteEmployeeById(empId)
  return result[1][0]
}
