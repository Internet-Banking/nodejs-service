'use strict';
import {sequelize, Sequelize} from '../src/db'

const DebtReminders = sequelize.define('debt_reminders', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  sendingAccountId: {
    allowNull: false,
    type: Sequelize.STRING,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  receivingAccountId: {
    allowNull: false,
    type: Sequelize.STRING,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  isSolved: {
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
