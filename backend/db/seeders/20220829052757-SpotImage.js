'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      'SpotImages',
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
        }
      ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
