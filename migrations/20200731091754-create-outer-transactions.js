'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('outer_transactions', {
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
        type: Sequelize.STRING
      },
      bankName: {
        type: Sequelize.ENUM(['Sacombank', 'Nhom28Bank']),
        allowNull: false
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('outer_transactions');
  }
};