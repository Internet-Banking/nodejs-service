'use strict';
import {sequelize, Sequelize} from '../src/db'

const RecipientAccounts = sequelize.define('recipient_accounts', {
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
  accountId: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  nickname: {
    type: Sequelize.STRING,
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

export default RecipientAccounts
