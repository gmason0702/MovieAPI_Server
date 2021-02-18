module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("favorite", {
      review: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    return Favorite;
  };