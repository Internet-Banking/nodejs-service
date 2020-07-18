'use strict';
const {accountIdSeeds} = require('../idSeeds')

const innerTransactionSeeds = []

const init = () => {
  for (let accountIndex = 0; accountIndex < 8; accountIndex = accountIndex + 2) {
    //create 4 transaction from accountIndex to accountIndex++
    for (let i = 0; i < 4; i++) {
      const nextAccountIndex = accountIndex + 1
      const transaction = {
        sendingAccountId: accountIdSeeds[accountIndex],
        receivingAccountId: accountIdSeeds[nextAccountIndex],
        amount: 10000,
        content: 'Trả nợ',
        feePayer: 'SENDER',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      innerTransactionSeeds.push(transaction)
    }

    //create 4 transaction from accountIndex++ to accountIndex
    for (let j = 0; j < 4; j++) {
      const nextAccountIndex = accountIndex + 1
      const transaction = {
        sendingAccountId: accountIdSeeds[nextAccountIndex],
        receivingAccountId: accountIdSeeds[accountIndex],
        amount: 10000,
        content: 'Trả nợ',
        feePayer: 'SENDER',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      innerTransactionSeeds.push(transaction)
    }
  }
}

init()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('inner_transactions', innerTransactionSeeds, {individualHooks: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('inner_transactions', null, {});
  }
};
