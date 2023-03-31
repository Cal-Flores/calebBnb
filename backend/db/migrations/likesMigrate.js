// 'use strict';
// let options = {};
// if (process.env.NODE_ENV === 'production') {
//     options.schema = process.env.SCHEMA;  // define your schema in options object
// }
// module.exports = {
//     async up(queryInterface, Sequelize) {
//         await queryInterface.createTable('Likes', {
//             id: {
//                 allowNull: false,
//                 autoIncrement: true,
//                 primaryKey: true,
//                 type: Sequelize.INTEGER
//             },
//             spotId: {
//                 type: Sequelize.INTEGER,
//                 references: { model: 'Spots' }
//             },
//             userId: {
//                 type: Sequelize.INTEGER,
//                 references: { model: 'Users' }
//             }
//         }, options);
//     },
//     async down(queryInterface, Sequelize) {
//         await queryInterface.dropTable('Bookings', options);
//     }
// };
