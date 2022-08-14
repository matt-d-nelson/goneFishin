const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route guppy
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // Get all cart items from a specific user where ordered = false
  const queryString = `SELECT cart_items.id, design_id, svg_colors, description, title, image FROM cart_items 
	  JOIN "design" ON design.id = cart_items.design_id
	  WHERE ordered = false AND cart_items.user_id = $1`;
  const value = [req.user.id];
  pool
    .query(queryString, value)
    .then((result) => {
      res.send(result.rows);
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
