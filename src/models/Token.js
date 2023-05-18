const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
    }
  }

  Token.init(
    {
      token: DataTypes.STRING,
      type: DataTypes.STRING,
      expires: DataTypes.DATE,
      blacklisted: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "token",
      underscored: true
    }
  );

  return Token;
};
