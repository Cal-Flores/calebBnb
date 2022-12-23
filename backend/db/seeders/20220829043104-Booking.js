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
          spotId: 3,
          userId: 1,
          startDate: new Date(),
          endDate: new Date("2023-1-30"),
        },
        {
          spotId: 7,
          userId: 1,
          startDate: (new Date("2022-12-25")),
          endDate: new Date(("2023-01-15")),
        },
        {
          spotId: 15,
          userId: 1,
          startDate: (new Date("2023-2-19")),
          endDate: new Date(("2023-03-14")),
        },


      ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options, null, {});
  }
};
