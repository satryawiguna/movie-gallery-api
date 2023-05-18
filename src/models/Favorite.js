const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "user_id"
      });

      this.belongsTo(models.movie, {
        foreignKey: "movie_id"
      });
    }
  }

  Favorite.init(
    {
      user_id: DataTypes.INTEGER,
      movie_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "favorite",
      underscored: true
    }
  );

  return Favorite;
};
