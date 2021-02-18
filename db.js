const Sequelize = require("sequelize");

const sequelize = new Sequelize("movie-radar", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to movie-radar postgres database");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

module.exports = sequelize;
