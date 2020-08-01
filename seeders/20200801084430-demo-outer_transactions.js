'use strict';
const {accountIdSeeds} = require('../idSeeds')

const PARTNER_BANK_NAMES = {
  RSA: 'Sacombank',
  PGP: 'Nhom28Bank'
}

const outerTransactionSeeds = []

const init = () => {
  accountIdSeeds.forEach((accountId) => {
    const transactionToRSABank = {
      sendingAccountId: accountId,
      receivingAccountId: 1987027976,
      bankName: PARTNER_BANK_NAMES.RSA,
      amount: 10000,
      content: 'Trả nợ',
      feePayer: 'SENDER',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const transactionToPGPBank = {
      sendingAccountId: accountId,
      receivingAccountId: 10000000,
      bankName: PARTNER_BANK_NAMES.PGP,
      amount: 10000,
      content: 'Trả nợ',
      feePayer: 'SENDER',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    outerTransactionSeeds.push(transactionToPGPBank, transactionToRSABank)
  })
}

init()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('outer_transactions', outerTransactionSeeds, {individualHooks: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('outer_transactions', null, {});
  }
};
