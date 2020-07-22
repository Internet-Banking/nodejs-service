'use strict';
import {sequelize, Sequelize} from '../src/db'

const DebtReminders = sequelize.define('debt_reminders', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  fromUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  toUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  debtAmount: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  contentOfDebt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contentOfRemoveDebt: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  isPay: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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

export default DebtReminders
