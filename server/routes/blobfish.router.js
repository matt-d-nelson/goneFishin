const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// DELETE A DESIGN
router.get("/:id/:designer_id", rejectUnauthenticated, (req, res) => {
  console.log("DELETE", req.params.id, req.params.designer_id);
  console.log(req.user.id);
  // ensure the currently logged in user is the user that created the design
  if (req.user.id === Number(req.params.designer_id)) {
    // DELETE ASSOCIATED ROWS FROM cart_items TABLE
    const deleteCardItemsId = [req.params.id];
    const deleteCartItemsQuery = `DELETE FROM "cart_items" where "cart_items".design_id = $1;`;
    pool
      .query(deleteCartItemsQuery, deleteCardItemsId)
      .then((result) => {
        // DELETE DESIGN FROM design TABLE
        const deleteDesignId = [req.params.id];
        const deleteDesignQuery = `DELETE FROM "design" where id = $1`;
        pool
          .query(deleteDesignQuery, deleteDesignId)
          .then((result) => {
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
  } else {
    // if not, send forbidded status
    res.sendStatus(403);
  }
});

module.exports = router;
