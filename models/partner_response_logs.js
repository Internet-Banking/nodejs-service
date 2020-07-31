'use strict';
import {sequelize, Sequelize} from '../src/db'

const PartnerResponseLogs = sequelize.define('partner_response_logs', {
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
  responseData: {
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

export default PartnerResponseLogs
