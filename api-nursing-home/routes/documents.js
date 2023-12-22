const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { FILES_FOLDER } = require("../config/config");
const fs = require("fs");
const { resolve } = require("path");
const { DocumentFile } = require("../models/Document");
const { getAbsolutePathToFilesFolder } = require("../resources/functions");

router.get("/getDocumentContent", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.DocumentId)
      .query("EXEC [dbo].[getDocumentDetails] @Id=@id");
    if (result != null) {
      var documentId = result.recordset[0].Id;
      if (documentId) {
        const contents = fs.readFileSync(result.recordset[0].Path, {
          encoding: "base64",
        });
        response.json({ document: result.recordset[0], content: contents });
      } else response.send(getError(5001));
    } else response.send(getError(5002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new DocumentFile(), request.body);
    const absolutePath = getAbsolutePathToFilesFolder();
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", objectToSave.PersonId)
      .input("type", objectToSave.DocumentTypeId)
      .input("name", objectToSave.Name)
      .input("extension", objectToSave.Extension)
      .input("fileType", objectToSave.FileType)
      .input("savePath", absolutePath)
      .query(
        "EXEC [dbo].[insertDocument] @Name=@name, @PersonId=@personId, @DocumentTypeId=@type, @Extension=@extension, @FileType=@fileType, @SavePath=@savePath"
      );
    if (result != null) {
      var documentId = result.recordset[0].Id;
      if (documentId) {
        fs.writeFile(
          result.recordset[0].Path,
          objectToSave.Base64,
          "base64",
          function (err) {
            if (err) response.send(err);
            else response.json(result.recordset[0]);
          }
        );
      } else response.send(getError(5003));
    } else response.send(getError(5003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getDocumentsForPerson", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.PersonId)
      .query("EXEC [dbo].[getDocumentsForPerson] @PersonId=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(5004));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getDocumentsForPersonByType", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.PersonId)
      .input("type", request.query.DocumentTypeId)
      .query(
        "EXEC [dbo].[getDocumentsForPersonByDocumentType] @PersonId=@id, @DocumentTypeId=@type"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(5005));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getDocumentTypes", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getDocumentTypes]");
    if (result != null) response.json(result.recordset);
    else response.send(getError(5006));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getDocumentTypesForPerson", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.PersonId)
      .query("EXEC [dbo].[getDocumentTypesForPerson] @PersonId=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(5007));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new DocumentFile(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[getDocumentDetails] @Id=@id");
    if (result != null) {
      var documentId = result.recordset[0].Id;

      if (documentId) {
        const del = await pool
          .request()
          .input("id", objectToSave.Id)
          .query("EXEC [dbo].[deleteDocument] @Id=@id");
        if (del != null) {
          fs.unlink(result.recordset[0].Path, function (err) {
            if (err) response.send(getError(5008));
            else response.send({ error: false });
          });
        } else response.send(getError(5009));
      } else response.send(getError(5010));
    } else response.send(getError(5010));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
