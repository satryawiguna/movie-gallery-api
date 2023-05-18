const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.contact, {
        as: "contact"
      });

      this.belongsToMany(models.movie, {
        through: models.favorite
      });

      this.belongsTo(models.role, {
        as: "role",
        foreignKey: "role_id"
      });
    }
  }

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    email_verified: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "user",
    underscored: true
  });

  return User;
};
