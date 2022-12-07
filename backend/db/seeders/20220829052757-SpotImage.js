'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/5e56aff5-969c-4994-aab5-fc0d6b8a2b33.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://a0.muscache.com/im/pictures/2a5994a6-4480-41ae-9a25-f0a81d74a872.jpg?im_w=720',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49194945/original/c49456c8-8608-446c-9f01-3843adc81945.jpeg?im_w=720',
          preview: true,
        },
        {
          spotId: 4,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34692739/original/3a75ba1b-e9cb-4b93-b6eb-b757bbcbfa1e.jpeg?im_w=720',
          preview: true,
        },
        {
          spotId: 5,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46472449/original/0337d704-1a84-47d6-a051-e8ce121b8a70.jpeg?im_w=480',
          preview: true,
        },
        {
          spotId: 6,
          url: 'https://a0.muscache.com/im/pictures/599f6894-3103-4cfb-bc13-6b0143f439a5.jpg?im_w=720',
          preview: true,
        },
      ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
