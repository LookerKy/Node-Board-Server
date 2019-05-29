const express = require("express");
const router = express.Router();
const dbpool = require("../../model");

router.get("/:id", async (req, res) => {
  const dbconnection = await dbpool();
  const sql = `select * from test where id = ?`;
  dbconnection.query(sql, [req.params.id], (err, result) => {
    dbconnection.release();
    if (err) throw err;
    const temp = JSON.parse(JSON.stringify(result));
    return res.status(200).json({ message: "ok", data: temp });
  });
});

router.post("/:id", async (req, res) => {
  const { content } = req.body;
  const dbconnection = await dbpool();
  const sql = `update test set body = ? where id = ? `;
  dbconnection.query(sql, [content, req.params.id], (err, result) => {
    if (err) throw err;
    dbconnection.commit(err => {
      if (err) throw err;
      dbconnection.release();
      return res.status(200).json({ message: "ok" });
    });
  });
});

module.exports = router;
