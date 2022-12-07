'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    await queryInterface.bulkInsert(
      options,
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
    options.tableName = 'ReviewImages'
    await queryInterface.bulkDelete(options, null, {});
  }
};
