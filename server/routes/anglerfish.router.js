const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const upload = require("../modules/multer.js");

// UPDATE a design
router.put(
  "/",
  upload.single("designPng"),
  rejectUnauthenticated,
  (req, res) => {
    console.log("in anglerfish PUT", req.body);
    // verify that logged in user created the design
    if (req.user.id === Number(req.body.user_id)) {
      const svg_colors = {
        bodyColor: req.body.bodyColor,
        finColor: req.body.finColor,
        dorsalColor: req.body.dorsalColor,
        eyeColor: req.body.eyeColor,
      };
      const values = [
        svg_colors,
        req.body.description,
        req.body.title,
        req.file.location,
        req.body.public,
        req.body.id,
      ];
      const query = `UPDATE "design"	SET svg_colors=$1, 
    description=$2, title=$3, image=$4, public=$5 WHERE id=$6;`;
      pool
        .query(query, values)
        .then((results) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log("ERROR in update design - anglerfish", err);
          res.sendStatus(500);
        });
    } else {
      res.sendStatus(403);
    }
  }
);

// GET a specific design
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const query = `SELECT * FROM "design" WHERE id=$1;`;
  const value = [req.params.id];
  pool
    .query(query, value)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR in get design by id - anglerfish", err);
      res.sendStatus(500);
    });
});

module.exports = router;
