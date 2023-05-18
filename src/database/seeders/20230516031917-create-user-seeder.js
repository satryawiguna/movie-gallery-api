'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 8),
        status: 1,
        email_verified: 1,
        created_at: new Date(),
        updated_at: new Date(),
        role_id: 1
      }
    ]);

    const users = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );

    const userRows = users[0];

    return await queryInterface.bulkInsert('contacts', [
      {
        first_name: 'Satrya',
        last_name: 'Wiguna',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userRows[0].id
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contacts', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
