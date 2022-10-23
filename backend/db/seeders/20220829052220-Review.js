'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Reviews',
      [
        {
          spotId: 1,
          userId: 2,
          review: 'Beautiful Destination, would return.',
          stars: 4.5,
        },
        {
          spotId: 2,
          userId: 3,
          review: 'Wonderful location, love the View!',
          stars: 4,
        },
        {
          spotId: 3,
          userId: 1,
          review: 'Leaves room for improvment and upkeep.',
          stars: 2,
        },
        {
          spotId: 4,
          userId: 5,
          review: 'Amazing spot, very clean and hospital.',
          stars: 3.7,
        },
        {
          spotId: 5,
          userId: 4,
          review: 'Lots of family fun. A vacation MUST!',
          stars: 5,
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
