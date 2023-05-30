const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');
const { FILES_FOLDER } = require('../config/config');
const fs = require('fs');
const { resolve } = require('path');

//const contents = fs.readFileSync('/path/to/file.jpg', {encoding: 'base64'});

router.post('/add', async (request, response) => {
    try {
        var objectToSave = request.body;
        // var objectToSave = Object.assign(new Package, request.body);
        var folderPath = './' + FILES_FOLDER;
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
        const absolutePath = resolve(folderPath) + "\\";
        const pool = await db;
        const result = await pool.request()
            .input('personId', objectToSave.PersonId)
            .input('type', objectToSave.DocumentTypeId)
            .input('name', objectToSave.Name)
            .input('extension', objectToSave.Extension)
            .input('fileType', objectToSave.FileType)
            .input('savePath', absolutePath)
            .query("EXEC [dbo].[insertDocument] @Name=@name, @PersonId=@personId, @DocumentTypeId=@type, @Extension=@extension, @FileType=@fileType, @SavePath=@savePath");
        if (result != null) {
            var documentId = result.recordset[0].Id;
            if (documentId) {
                fs.writeFile(result.recordset[0].Path, objectToSave.Base64, 'base64', function (err) {
                    if (err) response.send(err);
                    else response.json(result.recordset[0]);
                });
            }
        }
        else response.send(getError(1001));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});



module.exports = router;