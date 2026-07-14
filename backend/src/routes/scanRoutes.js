const express = require("express");
const router = express.Router();

const scanController = require("../controllers/scanController");


router.get("/", scanController.scanFolder);


module.exports = router;