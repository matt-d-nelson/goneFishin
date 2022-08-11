const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// UPDATE a design
router.put('/', rejectUnauthenticated, (req, res) => {
  console.log('in anglerfish PUT', req.body);
  const query = `UPDATE "design"	SET svg_colors=$1, 
    description=$2, title=$3, image=$4, public=$5 WHERE id=$6 AND user_id=$7;`;
    const values = [req.body.svg_colors, req.body.description, req.body.title, 
      req.body.image, req.body.public, req.body.id, req.user.id];
    pool.query(query, values).then((results)=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log('ERROR in update design - anglerfish', err);
        res.sendStatus(500);
    })
});

// GET a specific design
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const query = `SELECT * FROM "design" WHERE id=$1;`;
  const value = [req.params.id];
  pool.query(query, value).then((result)=>{
    res.send(result.rows);
  }).catch((err=>{
    console.log('ERROR in get design by id - anglerfish', err);
    res.sendStatus(500);
  }))
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;