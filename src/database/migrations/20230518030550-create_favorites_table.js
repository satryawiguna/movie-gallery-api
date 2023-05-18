"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("favorites", {
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      },
      movie_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "movies",
          key: "id"
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ["user_id", "movie_id"]
        }
      ]
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("favorites");
  }
};
