module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("favorite", {
    review: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    personalRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    movieTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    overview: {
      type: DataTypes.STRING(10000),
      allowNull: true,
    },

    posterPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vote_average: {
      type: DataTypes.NUMERIC(2, 1),
      allowNull: true,
    },
  });
  return Favorite;
};
