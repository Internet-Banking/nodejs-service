'use strict';
import {sequelize, Sequelize} from '../src/db'

const InnerTransactions = sequelize.define('inner_transactions', {
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
  feePayer: {
    type: Sequelize.ENUM(['SENDER', 'RECEIVER']),
    defaultValue: 'SENDER',
    allowNull: false
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

export default InnerTransactions
