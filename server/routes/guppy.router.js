const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all cart items from a specific user where ordered = false
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT cart_items.id, design_id, svg_colors, description, title, image, qty FROM cart_items 
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

// PUT mark a cart item as ordered and give it an order date
router.put("/", rejectUnauthenticated, (req, res) => {
  const queryString = `UPDATE "cart_items" SET order_date = CURRENT_DATE, 
    ordered = true WHERE ordered = false AND user_id=$1;`;
  const value = [req.user.id];
  pool
    .query(queryString, value)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in guppy PUT", err);
      res.sendStatus(500);
    });
});

// UPDATE quantity of existing item in user's cart
router.put("/:id/:qty", rejectUnauthenticated, (req, res) => {
  const queryString = `UPDATE "cart_items" SET qty=$1 WHERE id=$2 AND user_id=$3;`;
  const values = [req.params.qty, req.params.id, req.user.id];
  pool
    .query(queryString, values)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in guppy PUT qty", err);
      res.sendStatus(500);
    });
});

module.exports = router;
