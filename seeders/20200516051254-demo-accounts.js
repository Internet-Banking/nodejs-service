'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts', [{
      userId: 1,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      balance: 0,
      type: 'SAVING',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      balance: 0,
      type: 'SAVING',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      individualHooks: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};
