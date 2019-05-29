const express = require("express");
const router = express.Router();
const dbpool = require("../../model");

router.post("/", async (req, res) => {
  const dbconnection = await dbpool();
  const { content } = req.body;
  const sql = `insert into test (body) values (?)`;
  dbconnection.query(sql, [content], (err, result) => {
    if (err) throw err;
    dbconnection.commit(err => {
      if (err) {
        throw err;
      }
      dbconnection.release();
      return res.status(200).json({ message: "ok", data: {} });
    });
  });
});

module.exports = router;
