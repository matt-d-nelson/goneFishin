const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Get all public designs
router.get("/", (req, res) => {
  // GET route code here
  const queryString = `SELECT * FROM "design" where public = true;`;
  pool
    .query(queryString)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
