const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// router.get('/', rejectUnauthenticated, (req, res) => {
//  const queryText = `SELECT * FROM "cart_items" WHERE fulfilled = true AND ordered = true;`;
//  pool.query(queryText)
//  .then((result) =>{
//    res.send(result.rows);
//  })
//  .catch((error) => {
//    console.log('error in swordfish router GET', error);
//    res.sendStatus(500);
//  });
// });

router.put('/:id', rejectUnauthenticated, (req, res) =>{
  const queryText = `UPDATE "cart_items" SET fulfilled = NOT fulfilled WHERE user_id = $2 AND id=$1;`;
  const values = [req.params.id, req.user.id];
  pool.query( queryText, values)
  .then(()=> res.sendStatus(200))
  .catch((error)=>{
    console.log('update fulfilled failed', error);
    res.sendStatus(500);
  })
})


module.exports = router;


/// Get all cart items where fulfilled = true and ordered = true