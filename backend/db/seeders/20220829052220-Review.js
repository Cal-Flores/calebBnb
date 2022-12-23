'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 13,
          userId: 1,
          review: 'Everything was just as described. Great place to stay!',
          stars: 4.5,
        },
        {
          spotId: 2,
          userId: 1,
          review: 'This home is so much fun and very cozy! Will definitely be staying here again!',
          stars: 4,
        },
        {
          spotId: 17,
          userId: 1,
          review: 'Not enjoyable at ALL! Please reconsider before booking',
          stars: .5,
        },
        {
          spotId: 1,
          userId: 10,
          review: 'Everything was more than expected! Only wish the weather was warmer to enjoy the pool',
          stars: 3.7,
        },
        {
          spotId: 5,
          userId: 4,
          review: 'Definitely recommend she was very nice and house was great as well',
          stars: 5,
        },
        {
          spotId: 2,
          userId: 9,
          review: 'The accommodations were clean. However, the refrigerator was not working so it missed the mark of being “a home away from home”. This caused disappointment. Check-in and check-out was easy.',
          stars: 1,
        },
        {
          spotId: 4,
          userId: 8,
          review: 'Our stay was better than we could have expected. Very nice neighborhood, the house is beautiful and the pool were beyond what we had in mind.',
          stars: 3.7,
        },
        {
          spotId: 7,
          userId: 7,
          review: 'Definitely recommend this lovely Airbnb! The hosts were nice and responsive. The house itself was clean and beautiful inside and out.'
        },
        {
          spotId: 6,
          userId: 6,
          review: 'Not enjoyable at ALL! Please reconsider before booking',
          stars: 1.7,
        },
        {
          spotId: 8,
          userId: 3,
          review: 'The house was not as described and it stinked.',
          stars: 2,
        },
        {
          spotId: 9,
          userId: 2,
          review: 'Definitely recommend this lovely Airbnb! The hosts were nice and responsive. The house itself was clean and beautiful inside and out.',
          stars: 4,
        },
        {
          spotId: 10,
          userId: 7,
          review: 'This home is so much fun and very cozy! Will definitely be staying here again!',
          stars: 3,
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, null, {});
  }
};
