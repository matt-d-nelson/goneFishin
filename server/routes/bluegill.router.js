const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
// Save new design
router.post("/", rejectUnauthenticated, (req, res) => {
  const user_id = req.user.id;
  const svg_colors = req.body.svg_colors;
  const description = req.body.description;
  const title = req.body.title;
  const image = req.body.image;
  const public = req.body.public;
  const queryText = `INSERT INTO "design" (user_id, svg_colors, description, title, image, public)
  VALUES ($1, $2, $3, $4, $5, $6);`;
  pool
    .query(queryText, [user_id, svg_colors, description, title, image, public])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log("error in adding design POST", error);
      res.sendStatus(500);
    });
});

module.exports = router;
