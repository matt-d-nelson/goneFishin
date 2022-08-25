const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//POST design and add copy to user's cart
router.post("/", rejectUnauthenticated, (req, res) => {
  //Create a copy of the design before adding it to the cart
  const designCopyValues = [
    req.body.svg_colors,
    req.body.description,
    req.body.title,
    req.body.image,
    false,
  ];
  const designCopyQuery = `INSERT INTO "design" (svg_colors, description, title, image, public)
    VALUES ($1, $2, $3, $4, $5) RETURNING "id";`;

  pool
    .query(designCopyQuery, designCopyValues)
    .then((results) => {
      //Add the copied design to a user’s cart
      console.log("POST ADD TO CART", results.rows[0].id);
      const addToCartQuery = `INSERT INTO cart_items ( design_id, user_id) VALUES ( $1, $2 );`;
      const addToCartValues = [results.rows[0].id, req.user.id];
      pool
        .query(addToCartQuery, addToCartValues)
        .then((results) => {
          console.log("results from POST", results);
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// DELETE item from cart, works for admin and users
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
