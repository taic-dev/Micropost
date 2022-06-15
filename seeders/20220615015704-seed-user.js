'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'aaa',
      email: 'aaa@example.com',
      password: 'aaa',
      createdAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }),
      updatedAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
    }, {
      name: 'bbb',
      email: 'bbb@example.com',
      password: 'aaa',
      createdAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }),
      updatedAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
    }, {
      name: 'ccc',
      email: 'ccc@example.com',
      password: 'ccc',
      createdAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }),
      updatedAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
