require("dotenv").config();
let express = require("express");
let app = express();
const sequelize = require("./db");

let favorite = require("./controllers/favoritecontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();
app.use(require("./middleware/headers"));

app.options("*", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.use(express.json());

app.use("/user", user);

// const validateSession = require("../middleware/validate-session");

app.use("/favorite", favorite);

app.listen(process.env.PORT, function () {
  console.log(`server is listening on port ${process.env.PORT}`);
});
