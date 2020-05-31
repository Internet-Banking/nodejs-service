import Models from '../../../models/all'

export const findAllEmployees = async (raw = true) => {
  return await Models.Employees.findAll({where: {isDeleted: false}, raw})
}

export const findEmployeeByEmail = async (email, raw = true) => {
  return await Models.Employees.findOne({where: {email, isDeleted: false}, raw})
}

export const findEmployeeById = async (empId, raw = true) => {
  return await Models.Employees.findOne({where: {id: empId, isDeleted: false}, raw})
}

export const createEmployee = async (email, name, password) => {
  return await Models.Employees.create({email, name, password})
}

export const updateEmployeeById = async (empId, name, returning = true) => {
  return await Models.Employees.update(
    {name},
    {where: {id: empId, isDeleted: false}, returning}
  )
}

export const deleteEmployeeById = async (empId, returning = true) => {
  return await Models.Employees.update(
    {isDeleted: true},
    {where: {id: empId, isDeleted: false}, returning}
  )
}
