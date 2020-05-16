'use strict';
'use strict'
import { sequelize, Sequelize } from '../src/db'

const Accounts = sequelize.define('accounts', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  balance: {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  type: {
    type: Sequelize.ENUM(['SAVING', 'PAYMENT']),
    defaultValue: 'SAVING',
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

Accounts.sync({ alter: true }) //create table if not exist

export default Accounts
