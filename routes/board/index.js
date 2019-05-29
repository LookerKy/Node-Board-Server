const express = require("express");
const router = express.Router();
const edit = require("./edit");
const del = require("./del");
const modified = require("./modified");
const details = require("./details");

router.use("/edit", edit);
router.use("/modified", modified);
router.use("/detail", details);
router.use("/del", del);

module.exports = router;
