'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      'SpotImages',
      [
        {
          spotId: 1,
          url: 'idk1.com',
          preview: false,
        },
        {
          spotId: 2,
          url: 'idk2.com',
          preview: true,
        },
        {
          spotId: 3,
          url: 'idk3.com',
          preview: true,
        }
      ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
