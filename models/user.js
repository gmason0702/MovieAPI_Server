const {DataTypes} = require('sequelize');
const { sequelize } = require('sequelize/lib/model');


  const User = sequelize.define("user", {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
     }
   
  });
module.exports = User;

