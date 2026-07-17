const {
    getStats,
    getFileTypes,
    getStorageByType,
    getLargestFiles,
    getRecentFiles,
    getFolderStats
} = require("../models/dashboardModel");

const dashboardStats = (req, res) => {
    try {
        res.json(getStats());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const fileTypes = (req, res) => {
    try {
        res.json(getFileTypes());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const storageStats = (req, res) => {
    try {
        res.json(getStorageByType());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const largestFiles = (req, res) => {
    try {
        res.json(getLargestFiles());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const recentFiles = (req, res) => {
    try {
        res.json(getRecentFiles());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const folderStats = (req, res) => {
    try {
        const files = getFolderStats();

        const folders = {};

        files.forEach(file => {
            const parts = file.path.split("/");

            // Parent folder name
            const folder = parts[parts.length - 2] || "Unknown";

            folders[folder] = (folders[folder] || 0) + file.size;
        });

        const result = Object.entries(folders).map(([folder, size]) => ({
            folder,
            size
        }));

        res.json(result);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

module.exports = {
    dashboardStats,
    fileTypes,
    storageStats,
    largestFiles,
    recentFiles,
    folderStats
};