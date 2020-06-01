'use strict';
import {sequelize, Sequelize} from '../src/db'

const Accounts = sequelize.define('charges', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  accountId: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  amount: {
    type: Sequelize.NUMBER,
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

export default Accounts
