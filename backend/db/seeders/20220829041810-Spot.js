'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkInsert(
      options,
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
          image: 'https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/5e56aff5-969c-4994-aab5-fc0d6b8a2b33.jpeg?im_w=720',
          imageTwo: 'https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/5e56aff5-969c-4994-aab5-fc0d6b8a2b33.jpeg?im_w=720',
          imageThree: 'https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/5e56aff5-969c-4994-aab5-fc0d6b8a2b33.jpeg?im_w=720'
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
          image: 'https://a0.muscache.com/im/pictures/2a5994a6-4480-41ae-9a25-f0a81d74a872.jpg?im_w=720',
          imageTwo: 'https://a0.muscache.com/im/pictures/2a5994a6-4480-41ae-9a25-f0a81d74a872.jpg?im_w=720',
          imageThree: 'https://a0.muscache.com/im/pictures/2a5994a6-4480-41ae-9a25-f0a81d74a872.jpg?im_w=720',
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
          image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49194945/original/c49456c8-8608-446c-9f01-3843adc81945.jpeg?im_w=720',
          imageTwo: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49194945/original/c49456c8-8608-446c-9f01-3843adc81945.jpeg?im_w=720',
          imageThree: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49194945/original/c49456c8-8608-446c-9f01-3843adc81945.jpeg?im_w=720',
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
          image: 'https://a0.muscache.com/im/pictures/miso/Hosting-34692739/original/3a75ba1b-e9cb-4b93-b6eb-b757bbcbfa1e.jpeg?im_w=720',
          imageTwo: 'https://a0.muscache.com/im/pictures/miso/Hosting-34692739/original/3a75ba1b-e9cb-4b93-b6eb-b757bbcbfa1e.jpeg?im_w=720',
          imageThree: 'https://a0.muscache.com/im/pictures/miso/Hosting-34692739/original/3a75ba1b-e9cb-4b93-b6eb-b757bbcbfa1e.jpeg?im_w=720',
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
          image: 'https://a0.muscache.com/im/pictures/miso/Hosting-46472449/original/0337d704-1a84-47d6-a051-e8ce121b8a70.jpeg?im_w=480',
          imageTwo: 'https://a0.muscache.com/im/pictures/miso/Hosting-46472449/original/0337d704-1a84-47d6-a051-e8ce121b8a70.jpeg?im_w=480',
          imageThree: 'https://a0.muscache.com/im/pictures/miso/Hosting-46472449/original/0337d704-1a84-47d6-a051-e8ce121b8a70.jpeg?im_w=480',
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
          image: 'https://a0.muscache.com/im/pictures/599f6894-3103-4cfb-bc13-6b0143f439a5.jpg?im_w=720',
          imageTwo: 'https://a0.muscache.com/im/pictures/599f6894-3103-4cfb-bc13-6b0143f439a5.jpg?im_w=720',
          imageThree: 'https://a0.muscache.com/im/pictures/599f6894-3103-4cfb-bc13-6b0143f439a5.jpg?im_w=720',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, null, {});
  }
};
