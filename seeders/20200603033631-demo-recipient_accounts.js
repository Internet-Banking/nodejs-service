'use strict';
const faker = require('faker')
const {accountIdSeeds} = require('../idSeeds')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recipient_accounts', [{
      userId: 1,
      accountId: accountIdSeeds[0],
      nickname: faker.internet.userName(),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      accountId: accountIdSeeds[1],
      nickname: faker.internet.userName(),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3,
      accountId: accountIdSeeds[2],
      nickname: faker.internet.userName(),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      accountId: accountIdSeeds[4],
      nickname: faker.internet.userName(),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      accountId: accountIdSeeds[5],
      nickname: faker.internet.userName(),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      individualHooks: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recipient_accounts', null, {});
  }
};
