const db = require("../database/db");


function getStats() {

    const totalFiles = db.prepare(`
        SELECT COUNT(*) AS totalFiles
        FROM files
    `).get();


    const totalStorage = db.prepare(`
        SELECT SUM(size) AS totalStorage
        FROM files
    `).get();


    const pdfCount = db.prepare(`
        SELECT COUNT(*) AS pdfCount
        FROM files
        WHERE extension = '.pdf'
    `).get();


    const imageCount = db.prepare(`
        SELECT COUNT(*) AS imageCount
        FROM files
        WHERE extension IN (
            '.png',
            '.jpg',
            '.jpeg',
            '.gif',
            '.webp'
        )
    `).get();


    return {
        totalFiles: totalFiles.totalFiles,
        totalStorage: totalStorage.totalStorage || 0,
        pdfCount: pdfCount.pdfCount,
        imageCount: imageCount.imageCount
    };

}



function getFileTypes(){

    return db.prepare(`
        SELECT 
            extension,
            COUNT(*) AS count
        FROM files
        GROUP BY extension
        ORDER BY count DESC
    `).all();

}



function getStorageByType(){

    return db.prepare(`
        SELECT
            extension,
            SUM(size) AS storage
        FROM files
        GROUP BY extension
        ORDER BY storage DESC
    `).all();

}

function getLargestFiles(){

    return db.prepare(`

        SELECT
            name,
            extension,
            size,
            path

        FROM files

        ORDER BY size DESC

        LIMIT 10

    `).all();

}
function getRecentFiles(){

    return db.prepare(`

        SELECT
            name,
            extension,
            size,
            modifiedAt,
            path

        FROM files

        ORDER BY modifiedAt DESC

        LIMIT 10

    `).all();

}

function getFolderStats() {
    return db.prepare(`
        SELECT
            path,
            size
        FROM files
    `).all();
}



module.exports = {

    getStats,
    getFileTypes,
    getStorageByType,
    getLargestFiles,
    getRecentFiles,
    getFolderStats

};