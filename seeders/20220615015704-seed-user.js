'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'aaa',
      email: 'aaa@example.com',
      password: 'aaa',
      img: "lv3.jpg",
      delete_flag: "0",
      createdAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }),
      updatedAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
    }, {
      name: 'bbb',
      email: 'bbb@example.com',
      password: 'aaa',
      img: "lv3.jpg",
      delete_flag: "0",
      createdAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }),
      updatedAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
    }, {
      name: 'ccc',
      email: 'ccc@example.com',
      password: 'ccc',
      img: "lv3.jpg",
      delete_flag: "0",
      createdAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }),
      updatedAt: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
