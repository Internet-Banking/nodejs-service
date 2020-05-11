'use strict'
import { sequelize, Sequelize } from '../src/db'
import crypt from '../src/utils/crypt.utils'

const Users = sequelize.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  email: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  username: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  password: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {})

//hash password before being created on database
Users.beforeCreate((userInstance, optionsObject) => {
  userInstance.password = crypt.hashPassword(userInstance.password)
})

Users.prototype.validPassword = function (password) {
  return crypt.comparePassword(password, this.password)
}

export default Users
