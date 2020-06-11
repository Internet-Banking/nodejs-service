'use strict';
const {accountIdSeeds} = require('../idSeeds')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts', [{
      id: accountIdSeeds[0],
      userId: 1,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: accountIdSeeds[1],
      userId: 2,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: accountIdSeeds[2],
      userId: 3,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: accountIdSeeds[3],
      userId: 4,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: accountIdSeeds[4],
      userId: 5,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: accountIdSeeds[5],
      userId: 6,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: accountIdSeeds[6],
      userId: 7,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: accountIdSeeds[7],
      userId: 8,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: accountIdSeeds[8],
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
