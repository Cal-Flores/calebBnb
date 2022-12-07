'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          startDate: '2022-12-20',
          endDate: '2022-12-27',
        },
        {
          spotId: 2,
          userId: 2,
          startDate: '2022-2-19',
          endDate: '2022-2-26',
        },
        {
          spotId: 3,
          userId: 3,
          startDate: '2022-3-14',
          endDate: '2022-3-21',
        }


      ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options, null, {});
  }
};
