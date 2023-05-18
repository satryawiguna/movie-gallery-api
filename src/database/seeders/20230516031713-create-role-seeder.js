'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('roles', [
      {
        title: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'GUEST',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('roles', null, {});
  }
};
