const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * GET route catfish
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // Get all cart items where ordered = true
  const queryString = `SELECT cart_items.id, design_id, cart_items.user_id, order_date, fulfilled, ordered, svg_colors, description, title, image, email FROM cart_items
    JOIN "design" ON design.id = cart_items.design_id
    JOIN "user" ON "user".id = cart_items.user_id
    WHERE ordered = true;`;
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
