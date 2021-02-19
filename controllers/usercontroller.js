const router = require("express").Router();
const {User} = require("../models");

const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");
const {UniqueConstraintError} = require ("sequelize/lib/errors");


/* SIGN UP*/
router.post("/signup", async (req, res) => {
    let {firstname, lastname, username, email, password} = req.body;
    console.log(req.body);

    try {
        const newUser = await User.create({
          firstname,
          lastname,
          username,
          email,
          password: bcrypt.hashSync(password, 13),
        });
        res.status(201).json({
          message: "User Created!",
          user: newUser,
        });
      } catch (error) {
        if (error instanceof UniqueConstraintError) {
          res.status(409).json({
            message: "Email already in use.",
          });
        } else {
          res.status(500).json({
            error: "Failed to create user.",
          });
        }
      }
});

/*LOGIN*/
router.post("/login", async (req, res) => {
    let { username, password } = req.body;
    console.log(req.body);
  
    try {
      let loginUser = await User.findOne({
        where: { username },
      });
  
      if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
        const token = jwt.sign(
          { id: loginUser.id, username: loginUser.username },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 * 24 }
        );
  
        res.status(200).json({
          message: "Login Successful!",
          user: loginUser,
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: "Login Failed: User information incorrect.",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error logging in!",
      });
    }
  });
  

module.exports = router;
