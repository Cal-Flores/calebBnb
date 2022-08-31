'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Reviews',
      [
        {
          spotId: 1,
          userId: 1,
          review: 'Kyler was great',
          stars: 5,
        },
        {
          spotId: 2,
          userId: 2,
          review: 'Dak could do better',
          stars: 4,
        },
        {
          spotId: 3,
          userId: 3,
          review: 'Justin could use improvment',
          stars: 2,
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
