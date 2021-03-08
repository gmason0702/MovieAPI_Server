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
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    overview: {
      type: DataTypes.STRING(10000),
      allowNull: true,
    },

    poster_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vote_average: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Favorite;
};
