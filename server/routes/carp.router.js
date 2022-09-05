const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all designs for the logged in user
router.get("/", rejectUnauthenticated, (req, res) => {
  const query = `SELECT * FROM "design" WHERE user_id=$1 ORDER BY id DESC;`;
  const value = [req.user.id];
  pool
    .query(query, value)
    .then((result) => {
      console.log("CARP RESULTS", result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error", error);
      res.sendStatus(500);
    });
});

module.exports = router;
