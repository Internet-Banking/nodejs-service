'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admins', [{
      email: '1612434@admin.bank.vn',
      name: 'Lưu Tuấn Nguyên',
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: '1612380@admin.bank.vn',
      name: 'Phạm Hoàng Minh',
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: '1612426@admin.bank.vn',
      name: 'Hoàng Nghĩa',
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      individualHooks: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {});
  }
};
