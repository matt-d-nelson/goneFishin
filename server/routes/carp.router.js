const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET carp route
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM "design" WHERE user_id=$1;`;
  const value = [req.user.id]
  pool.query(query, value)
  .then(result => {
    console.log('CARP RESULTS', result.rows);
    res.send(result.rows);
  }).catch(error => {
    console.log('error', error);
    res.sendStatus(500)
  })
});



module.exports = router;
