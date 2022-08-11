const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET bass route 
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST bass route 
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  //Add a design to a user’s cart
  const queryString = `INSERT INTO cart_items ( design_id, user_id, order_date, fulfilled, ordered ) VALUES ( $1, $2 )`;
  values = [req.body.id, req.user.id, req.body.order_date , req.body.fulfilled , req.body.ordered ];
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

/**
 * DELETE bass route 
 */
 router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // Delete an item from cart_items where id = id (serial key)
  const queryString = `DELETE FROM "cart_items" WHERE "design_id" = $1 AND "user_id" = $2;`;
  values = [req.params.id, req.user.id];
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
