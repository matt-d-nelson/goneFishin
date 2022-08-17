const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET bass route
 */
router.get("/", (req, res) => {
  // GET route code here
});

/**
 * POST bass route
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  //Add a design to a user’s cart

  console.log("req.body.id", req.body);
  const queryString = `INSERT INTO cart_items ( design_image, user_id) VALUES ( $1, $2 )`;
  values = [req.body.design_image, req.user.id];

  pool
    .query(queryString, values)
    .then((results) => {
      console.log("results from POST", results);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//----DELETE ITEM FROM CART, works for admin and users----//
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  // Delete an item from cart_items where id = id (serial key)
  // Default queryString and values for users to only delete from their own cart
  let queryString = `DELETE FROM "cart_items" WHERE "id" = $1 AND "user_id" = $2;`;
  let values = [req.params.id, req.user.id];
  // if user is an admin, allow them to delete any items from cart
  if (req.user.role > 0) {
    queryString = `DELETE FROM "cart_items" WHERE "id" = $1`;
    values = [req.params.id];
  }
  pool
    .query(queryString, values)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
