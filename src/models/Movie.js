const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      this.belongsToMany(models.user, {
        through: models.favorite
      });
    }
  }

  Movie.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      release_date: DataTypes.DATE,
      runtime: DataTypes.STRING,
      revenue: DataTypes.INTEGER,
      poster: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "movie",
      underscored: true
    }
  );

  return Movie;
};
