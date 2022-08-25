const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const upload = require("../modules/multer.js");

// POST a new design
router.post(
  "/",
  upload.single("designPng"),
  rejectUnauthenticated,
  (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const user_id = req.user.id;
    const svg_colors = {
      bodyColor: req.body.bodyColor,
      finColor: req.body.finColor,
      dorsalColor: req.body.dorsalColor,
      eyeColor: req.body.eyeColor,
    };
    const description = req.body.description;
    const title = req.body.title;
    const image = req.file.path.slice(7);
    const public = req.body.public;
    const queryText = `INSERT INTO "design" (user_id, svg_colors, description, title, image, public)
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool
      .query(queryText, [
        user_id,
        svg_colors,
        description,
        title,
        image,
        public,
      ])
      .then(() => res.sendStatus(201))
      .catch((error) => {
        console.log("error in adding design POST", error);
        res.sendStatus(500);
      });
  }
);

module.exports = router;
