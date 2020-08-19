'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('debt_reminders', [{
      sendingAccountId: '9704880845960482',
      receivingAccountId: '9704881403126955',
      amount: 10000,
      content: 'Bạn nhớ trả nợ mình đúng hẹn nhé!',
      isSolved: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sendingAccountId: '9704881403126955',
      receivingAccountId: '9704880845960482',
      amount: 20000,
      content: 'Bạn nhớ trả nợ!',
      isSolved: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sendingAccountId: '9704881523151799',
      receivingAccountId: '9704880845960482',
      amount: 30000,
      content: 'Khi nào có tiền thì trả mình nhé!',
      isSolved: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sendingAccountId: '9704881523151799',
      receivingAccountId: '9704880845960482',
      amount: 40000,
      content: 'Khi nào có tiền thì trả mình nhé!',
      isSolved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      individualHooks: true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('debt_reminders', null, {})
  }
};
