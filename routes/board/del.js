const express = require("express");
const router = express.Router();
const dbpool = require("../../model");

router.get("/:id", async (req, res) => {
  const dbconnection = await dbpool();
  const sql = `delete from test where id = ?`;
  dbconnection.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    dbconnection.commit(err => {
      if (err) throw err;
      dbconnection.release();
      return res.status(201).json({ message: "ok", data: {} });
    });
  });
});

module.exports = router;
