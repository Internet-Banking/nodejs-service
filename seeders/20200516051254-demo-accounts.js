'use strict';
const generateAccountID = () => {
  return '9704' + '88' + Math.random().toString().slice(2, 12)
}
//cannot import from utils because of "Cannot use import statement outside a module" error

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts', [{
      id: generateAccountID(),
      userId: 1,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: generateAccountID(),
      userId: 1,
      balance: 0,
      type: 'SAVING',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: generateAccountID(),
      userId: 2,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: generateAccountID(),
      userId: 3,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: generateAccountID(),
      userId: 4,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: generateAccountID(),
      userId: 5,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: generateAccountID(),
      userId: 6,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: generateAccountID(),
      userId: 7,
      balance: 0,
      type: 'PAYMENT',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: generateAccountID(),
      userId: 8,
      balance: 0,
      type: 'PAYMENT',
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
