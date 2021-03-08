const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: false,
  //     },
  //   },
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
