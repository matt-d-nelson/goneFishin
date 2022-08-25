const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// UPDATE toggle cart_items fulfilled boolean
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "cart_items" SET fulfilled = NOT fulfilled WHERE id=$1;`;
  const values = [req.params.id];
  pool
    .query(queryText, values)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log("update fulfilled failed", error);
      res.sendStatus(500);
    });
});

module.exports = router;
