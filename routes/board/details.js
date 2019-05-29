const express = require("express");
const router = express.Router();
const dbpool = require("../../model");

router.get("/:id", async (req, res) => {
  const dbconnection = await dbpool();
  const sql = `select * from test where id = ?`;
  dbconnection.query(sql, [req.params.id], (err, result) => {
    dbconnection.release();
    if (err) throw err;
    return res.status(200).json({ message: "ok" });
  });
});

module.exports = router;
