'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      'Spots',
      [
        {
          ownerId: 1,
          address: '100 park lane',
          city: 'Phoenix',
          state: 'Arizona',
          country: 'USA',
          lat: 45.45,
          lng: 55.55,
          name: 'Cardinal Estate',
          description: 'home of the cardinals',
          price: 750,
        },
        {
          ownerId: 2,
          address: '200 park lane',
          city: 'Dallas',
          state: 'Texas',
          country: 'USA',
          lat: 25.25,
          lng: 25.25,
          name: 'Cowboy Estate',
          description: 'home of the cowboys',
          price: 1250,
        },
        {
          ownerId: 3,
          address: '300 park lane',
          city: 'Chicago',
          state: 'Illionois',
          country: 'USA',
          lat: 65.65,
          lng: 65.65,
          name: 'Bear Estate',
          description: 'home of the bears',
          price: 1550,
        },
        {
          ownerId: 4,
          address: '156 Maripoca Drive',
          city: 'Pinetop',
          state: 'Arizona',
          country: 'USA',
          lat: 65.63,
          lng: 65.61,
          name: 'Wagon Wheel',
          description: 'home of the mountains',
          price: 375,
        },
        {
          ownerId: 5,
          address: '315 fort point ln',
          city: 'Portland',
          state: 'Oregon',
          country: 'USA',
          lat: 65.75,
          lng: 65.75,
          name: 'The Reach',
          description: 'home of the ducks',
          price: 600,
        },
        {
          ownerId: 2,
          address: 'Main Street 4th',
          city: 'Los Angeles',
          state: 'California',
          country: 'USA',
          lat: 25.65,
          lng: 15.65,
          name: 'The Hills',
          description: 'home of the rams and 49ers',
          price: 2000,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
