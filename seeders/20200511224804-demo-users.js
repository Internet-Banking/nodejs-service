'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'miketuannguyen@gmail.com',
      name: 'Lưu Tuấn Nguyên',
      username: 'nhoknguyen00',
      avatar: 'https://c7.uihere.com/files/592/884/975/programmer-computer-programming-computer-software-computer-icons-programming-language-avatar.jpg',
      phone: '0903593963',
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'shine020198@gmail.com',
      name: 'Phạm Hoàng Minh',
      username: 'hminh21',
      avatar: 'https://c7.uihere.com/files/592/884/975/programmer-computer-programming-computer-software-computer-icons-programming-language-avatar.jpg',
      phone: '0123456789',
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'hoangnghia.binhthuan@gmail.com',
      name: 'Hoàng Nghĩa',
      username: 'hoangnghia',
      avatar: 'https://c7.uihere.com/files/592/884/975/programmer-computer-programming-computer-software-computer-icons-programming-language-avatar.jpg',
      phone: '0123456987',
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: 'https://c7.uihere.com/files/592/884/975/programmer-computer-programming-computer-software-computer-icons-programming-language-avatar.jpg',
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: 'https://c7.uihere.com/files/592/884/975/programmer-computer-programming-computer-software-computer-icons-programming-language-avatar.jpg',
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: 'https://c7.uihere.com/files/592/884/975/programmer-computer-programming-computer-software-computer-icons-programming-language-avatar.jpg',
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: 'https://c7.uihere.com/files/592/884/975/programmer-computer-programming-computer-software-computer-icons-programming-language-avatar.jpg',
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: 'https://c7.uihere.com/files/592/884/975/programmer-computer-programming-computer-software-computer-icons-programming-language-avatar.jpg',
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      individualHooks: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
