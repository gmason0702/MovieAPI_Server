const express = require("express");
const router = express.Router();
const User = require("../db").import("../models/user")

const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");


/* SIGN UP*/
router.post("/signup", async (req, res) => {
    User.create({
      firstname: req.body.user.firstname,
      lastname: req.body.user.lastname,
      email: req.body.user.email,
      username: req.body.user.username,
      password: bcrypt.hashSync(req.body.user.password, 13),
    })
      .then(function createSuccess(user) {
        let token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: 60 * 60 * 24,
          }
        );
        res.json({
          user: user,
          message: "User successfully created",
          sessionToken: token,
        });
      })
      .catch(function (err) {
        res.status(500).json({ error: err });
      });
  });

/*LOGIN*/
router.post("/login", async (req, res) => {
  User.findOne({ where: { email: req.body.user.email } })
  .then(function loginSuccess(user) {
    if (user) {
      bcrypt.compare(
        req.body.user.password,
        user.password,
        function (err, matches) {
          if (matches) {
            let token = jwt.sign({ id: user.id  }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.status(200).json({
              user: user,
              message: "user successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Login failed" });
          }
        }
      );
    } else {
      res.status(500).send("User not found");
    }
  })
  .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
