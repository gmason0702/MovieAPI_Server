const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validate-session");
const Favorite = require("../db").import("../models/favorite");

router.post("/create", validateSession, (req, res) => {
  const favoriteCreate = {
    review: req.body.favorite.review,
    rating: req.body.favorite.rating,
    owner: req.user.id,
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

router.get("/mine", validateSession, (req, res) => {
  let userId = req.user.id;
  Favorite.findAll({
    where: { owner: userId },
  })
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:entryId", validateSession, (req, res) => {
  const updateFavorites = {
    review: req.body.favorite.review,
    rating: req.body.favorite.rating,
  };
  const query = { where: { id: req.params.entryId, owner: req.user.id } };

  Favorite.update(updateFavorites, query)
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Favorite.destroy(query)
    .then(() => res.status(200).json({ message: "Favorite removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
