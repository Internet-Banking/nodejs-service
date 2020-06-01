'use strict';
const {accountIdSeeds} = require('../idSeeds')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('account_charges', [{
      accountId: accountIdSeeds[0],
      amount: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      accountId: accountIdSeeds[0],
      amount: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      accountId: accountIdSeeds[1],
      amount: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      accountId: accountIdSeeds[1],
      amount: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      accountId: accountIdSeeds[2],
      amount: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      accountId: accountIdSeeds[3],
      amount: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      accountId: accountIdSeeds[4],
      amount: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      individualHooks: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('account_charges', null, {});
  }
};
