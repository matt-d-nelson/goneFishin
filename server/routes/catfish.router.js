const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route catfish
 */
router.get("/", (req, res) => {
  // Get all cart items where fulfilled = false and ordered = true
  const queryString = `SELECT * FROM cart_items WHERE fulfilled = false AND ordered = true`;
  pool
    .query(queryString)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: In Catfish router", err);
      res.sendStatus(500);
    });
});

/**
 * POST route catfish
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
