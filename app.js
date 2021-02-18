// require("dotenv").config();
let express = require("express");
let app = express();
const sequelize = require("./db");

let favorite = require("./controllers/favoritecontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();
// app.use(require("./middleware/headers"));

app.use(express.json());

// app.use("/user", user);

app.use("/favorite", favorite);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
