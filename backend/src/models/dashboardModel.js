const db = require("../database/db");


function getStats() {

    return db.prepare(`
        SELECT
            COUNT(*) AS totalFiles,
            COALESCE(SUM(size),0) AS totalStorage,

            SUM(
                CASE
                    WHEN extension='.pdf'
                    THEN 1
                    ELSE 0
                END
            ) AS pdfCount,

            SUM(
                CASE
                    WHEN extension IN
                    (
                        '.png',
                        '.jpg',
                        '.jpeg',
                        '.gif',
                        '.webp'
                    )
                    THEN 1
                    ELSE 0
                END
            ) AS imageCount

        FROM files
    `).get();

}


function getFileTypes(){

    return db.prepare(`
        SELECT 
            extension,
            COUNT(*) AS count
        FROM files
        GROUP BY extension
        ORDER BY count DESC
        LIMIT 10
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
        LIMIT 10
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