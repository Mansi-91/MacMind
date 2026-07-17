const express = require("express");
const router = express.Router();

const {
  getFiles,
  search,
  filterFiles,
  duplicates
} = require("../controllers/fileController");

router.get("/", getFiles);

router.get("/search", search);

router.get("/filter", filterFiles);

router.get("/duplicates", duplicates);

module.exports = router;
