const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route guppy
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  // Get all cart items from a specific user where ordered = false
  const queryString = `SELECT * FROM cart_items WHERE ordered = false AND WHERE cart_items.user_id = $1`;
  const value = [req.user.id];
  pool
    .query(queryString, value)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in guppy GET router", err);
      res.sendStatus(500);
    });
});

/**
 * POST route guppy
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
