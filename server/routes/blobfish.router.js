const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// DELETE a design
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  console.log("DELETE", "design id", req.params.id);
  console.log(req.user.id);
  const values = [req.params.id, req.user.id];
  const queryString = `DELETE FROM "design" where id = $1 AND user_id=$2;`;
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
