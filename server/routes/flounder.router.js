const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all public designs
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryString = `SELECT * FROM "design" WHERE public = true;`;
  pool
    .query(queryString)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: In flounder router", err);
      res.sendStatus(500);
    });
});

module.exports = router;
