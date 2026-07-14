const express = require("express");
const router = express.Router();


const { 
    dashboardStats,
    fileTypes,
    storageByType,
    largestFiles,
    recentFiles
} = require("../controllers/dashboardController");



// Dashboard summary cards
router.get(
    "/stats",
    dashboardStats
);



// File distribution analytics
router.get(
    "/file-types",
    fileTypes
);



// Storage analytics
router.get(
    "/storage",
    storageByType
);

router.get(
    "/largest-files",
    largestFiles
);

router.get(
    "/recent-files",
    recentFiles
);



module.exports = router;