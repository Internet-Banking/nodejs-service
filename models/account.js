'use strict';
import {sequelize, Sequelize} from '../src/db'
import {ACCOUNT_TYPES} from '../src/constants/index'

const Accounts = sequelize.define('accounts', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING
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
    type: Sequelize.ENUM([ACCOUNT_TYPES.SAVING, ACCOUNT_TYPES.PAYMENT]),
    defaultValue: ACCOUNT_TYPES.SAVING,
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

export default Accounts
