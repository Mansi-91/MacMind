const express = require("express");
const router = express.Router();

const {
    dashboardStats,
    fileTypes,
    storageStats,
    largestFiles,
    recentFiles,
    folderStats
} = require("../controllers/dashboardController");

router.get("/stats", dashboardStats);

router.get("/file-types", fileTypes);

router.get("/storage", storageStats);

router.get("/largest-files", largestFiles);

router.get("/recent-files", recentFiles);

router.get("/folder-stats", folderStats);

module.exports = router;