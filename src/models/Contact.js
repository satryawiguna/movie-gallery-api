const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        as: "user",
        foreignKey: "user_id"
      });
    }
  }

  Contact.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      address: DataTypes.TEXT,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      postcode: DataTypes.INTEGER,
      mobile: DataTypes.STRING,
      avatar: DataTypes.STRING,
      user_id: DataTypes.NUMBER
    },
    {
      sequelize,
      modelName: "contact",
      underscored: true
    }
  );

  return Contact;
};
