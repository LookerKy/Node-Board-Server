var express = require("express");
var router = express.Router();

const board = require("./board");
router.use("/board", board);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
