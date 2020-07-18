'use strict';
import {sequelize, Sequelize} from '../src/db'

const PartnerRequestLogs = sequelize.define('partner_request_logs', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  partnerCode: {
    allowNull: false,
    type: Sequelize.STRING
  },
  params: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  query: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  headers: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  body: {
    allowNull: false,
    type: Sequelize.TEXT
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

export default PartnerRequestLogs
