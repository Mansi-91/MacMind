const express = require("express");
const router = express.Router();

const { getFiles, search } = require("../controllers/fileController");

router.get("/", getFiles);

router.get("/search", search);

module.exports = router;