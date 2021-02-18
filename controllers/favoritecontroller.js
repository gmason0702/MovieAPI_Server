const express = require("express");
const router = express.Router();
// const validateSession = require("../middleware/validate-session")
const Favorite = require("../db").import("../models/favorite");

router.get("/practice", function (req, res) {
  res.send("Hey! This is a practice route!");
});

router.post("/create", async (req, res) => {
  const favoriteCreate = {
    review: req.body.favorite.review,
    rating: req.body.favorite.rating,
  };
  Favorite.create(favoriteCreate)
    .then((favorite) => res.status(200).json(favorite))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
  Favorite.findAll()
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: err }));
});

//Async version?
// router.get("/", async (req, res) => {
//     try {
//       const res = await Favorite.findAll();
//       const data = await res.status(200).json(data);
//     } catch (err) {
//       (err) => res.status(500).json({ error: err });
//     }
//   });
module.exports = router;
