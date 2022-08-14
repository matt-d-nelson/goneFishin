const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");


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

// Mark a cart item as ordered and give it an order date
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const queryString = `UPDATE "cart_items" SET order_date = CURRENT_DATE, 
    ordered = true WHERE id=$1 AND user_id=$2;`;
  const value = [req.params.id, req.user.id];
  pool
    .query(queryString, value)
    .then((result)=>{
      res.sendStatus(200);
    }).catch((err)=>{
      console.log('error in guppy PUT', err);
      res.sendStatus(500);
    });
});

module.exports = router;
