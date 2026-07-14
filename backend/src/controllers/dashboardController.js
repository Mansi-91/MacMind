const { 
    getStats,
    getFileTypes,
    getStorageByType, 
    getLargestFiles,
    getRecentFiles
} = require("../models/dashboardModel");



// Dashboard cards data
const dashboardStats = (req, res) => {

    try {

        const stats = getStats();

        res.status(200).json(stats);

    } 
    catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};




// File type distribution analytics
const fileTypes = (req,res)=>{

    try {

        const data = getFileTypes();

        console.log("FILE TYPES:", data);

        res.status(200).json(data);

    }
    catch(err){

        console.log("FILE TYPES ERROR:", err);

        res.status(500).json({
            error:err.message
        });

    }

};




// Storage analytics
const storageByType = (req, res) => {

    try {

        const data = getStorageByType();

        res.status(200).json(data);

    } 
    catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};

const largestFiles = (req,res)=>{

    try{

        const data = getLargestFiles();

        res.status(200).json(data);

    }
    catch(err){

        res.status(500).json({
            error:err.message
        });

    }

};

const recentFiles = (req,res)=>{

    try{

        const data = getRecentFiles();

        res.status(200).json(data);

    }
    catch(err){

        res.status(500).json({
            error:err.message
        });

    }

};



module.exports = {

    dashboardStats,
    fileTypes,
    storageByType,
    largestFiles,
    recentFiles

};