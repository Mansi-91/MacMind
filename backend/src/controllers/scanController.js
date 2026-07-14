const scanner = require("../services/scanner");
const db = require("../database/db");


exports.scanFolder = async (req, res) => {

    const folderPath = req.query.path;

    if (!folderPath) {
        return res.status(400).json({
            message: "Folder path required"
        });
    }


    try {

        const files = scanner.scanDirectory(folderPath);


        const insert = db.prepare(`
            INSERT INTO files
            (
                name,
                path,
                extension,
                size,
                createdAt,
                modifiedAt
            )
            VALUES (?,?,?,?,?,?)
        `);


        let count = 0;


        files.forEach(file => {

            insert.run(
                file.name,
                file.path,
                file.extension,
                file.size,
                file.createdAt,
                file.modifiedAt
            );

            count++;

        });


        res.json({

            message:"Scan completed",
            filesAdded:count

        });


    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};