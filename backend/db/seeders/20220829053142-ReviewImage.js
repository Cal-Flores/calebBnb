'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      'ReviewImages',
      [
        {
          reviewId: 1,
          url: 'spot1.com',
        },
        {
          reviewId: 2,
          url: 'spot2.com',
        },
        {
          reviewId: 3,
          url: 'spot3.com',
        }
      ]
      , {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
