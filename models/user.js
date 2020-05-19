'use strict'
import { sequelize, Sequelize } from '../src/db'
import crypt from '../src/utils/crypt'

const Users = sequelize.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    defaultValue: 'https://c7.uihere.com/files/592/884/975/programmer-computer-programming-computer-software-computer-icons-programming-language-avatar.jpg'
    //default avatar
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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
