const router = require("express").Router();
const User = require("../db").import("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UniqueConstraintError } = require("sequelize/lib/errors");

// /* SIGN UP*/
// router.post("/signup", async (req, res) => {
//   let { firstname, lastname, username, email, password } = req.body;
//   console.log(req.body);

//   try {
//     const newUser = await User.create({
//       firstname,
//       lastname,
//       username,
//       email,
//       password: bcrypt.hashSync(password, 13),
//     });
//     res.status(201).json({
//       message: "User Created!",
//       user: newUser,
//     });
//   } catch (error) {
//     if (error instanceof UniqueConstraintError) {
//       res.status(409).json({
//         message: "Email already in use.",
//       });
//     } else {
//       res.status(500).json({
//         error: error,
//       });
//     }
//   }
// });

router.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

router.post("/signup", (req, res) => {
  User.create({
    firstname: req.body.user.firstname,
    lastname: req.body.user.lastname,
    username: req.body.user.username,
    email: req.body.user.email,
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
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

/*LOGIN*/
// router.post("/login", async (req, res) => {
//   let { username, password } = req.body;
//   console.log(req.body);

//   try {
//     let loginUser = await User.findOne({
//       where: { username },
//     });

//     if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
//       const token = jwt.sign(
//         { id: loginUser.id, username: loginUser.username },
//         process.env.JWT_SECRET,
//         { expiresIn: 60 * 60 * 24 }
//       );

//       res.status(200).json({
//         message: "Login Successful!",
//         user: loginUser,
//         sessionToken: token,
//       });
//     } else {
//       res.status(401).json({
//         message: "Login Failed: User information incorrect.",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: "Error logging in!",
//     });
//   }
// });

router.post("/login", function (req, res) {
  User.findOne({ where: { email: req.body.user.email } })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
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
