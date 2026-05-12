const express = require("express");
const router = express.Router();
const { db, authedRequest } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { DocumentFile } = require("../models/Document");
const { FILES_FOLDER } = require("../config/config");
const fs = require("fs");
const { resolve } = require("path");
const { Note } = require("../models/Note");
const { getAbsolutePathToFilesFolder } = require("../resources/functions");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", request.query.PersonId)
      .query("EXEC [dbo].[getNotesForPerson] @PersonId=@personId");
    if (result.recordsets.length == 3)
      response.json({
        Notes: result.recordsets[0],
        Tags: result.recordsets[1],
        Documents: result.recordsets[2],
      });
    else response.send(getError(20001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deleteNote] @Id=@id, @ActingUserId=@ActingUserId");
    if (result != null) {
      var documents = result.recordset;
      for (let index = 0; index < documents.length; index++) {
        const doc = documents[index];
        fs.unlink(doc.Path, function (err) {
          if (err) response.send(getError(5008));
          if (index == documents.length - 1) response.send({ error: false });
        });
      }

      response.send({ error: false });
    } else response.send(getError(5010));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/addTagToNote", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("note", objectToSave.NoteId)
      .input("tag", objectToSave.TagId)
      .query("EXEC [dbo].[addTagToNote] @NoteId=@note, @TagId=@tag");
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(20002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/deleteDocumentFromNote", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.DocumentId)
      .query("EXEC [dbo].[getDocumentDetails] @Id=@id");
    if (result != null) {
      var documentId = result.recordset[0].Id;

      if (documentId) {
        const del = await authedRequest(pool, request.user?.userId)
          .input("id", objectToSave.DocumentId)
          .input("note", objectToSave.NoteId)
          .query(
            "EXEC [dbo].[deleteDocumentFromNote] @DocumentId=@id, @NoteId=@note, @ActingUserId=@ActingUserId"
          );
        if (del != null) {
          fs.unlink(result.recordset[0].Path, function (err) {
            if (err) response.send(getError(5008));
            response.send({ error: false });
          });
        } else response.send(getError(20003));
      } else response.send(getError(5010));
    } else response.send(getError(5010));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getNoteDocuments", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("note", request.query.NoteId)
      .query("EXEC [dbo].[getNoteDocuments] @NoteId=@note");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getNoteTags", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("note", request.query.NoteId)
      .query("EXEC [dbo].[getNoteTags] @NoteId=@note");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/insertDocumentForNote", async (request, response) => {
  try {
    var objectToSave = Object.assign(new DocumentFile(), request.body);
    const absolutePath = getAbsolutePathToFilesFolder();
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("personId", objectToSave.PersonId)
      .input("type", objectToSave.DocumentTypeId)
      .input("name", objectToSave.Name)
      .input("extension", objectToSave.Extension)
      .input("fileType", objectToSave.FileType)
      .input("savePath", absolutePath)
      .input("note", objectToSave.NoteId)
      .input("userId", objectToSave.UserId)
      .query(
        "EXEC [dbo].[insertDocumentForNote] @UserId=@userId, @DocumentName=@name, @PersonId=@personId, @DocumentTypeId=@type, @Extension=@extension, @FileType=@fileType, @SavePath=@savePath, @NoteId=@note, @ActingUserId=@ActingUserId"
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
      } else response.send(getError(20004));
    } else response.send(getError(20004));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Note(), request.body);
    var tagsString = objectToSave.Tags.toString();
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("title", objectToSave.Title)
      .input("text", objectToSave.Text)
      .input("tags", tagsString)
      .input("personId", objectToSave.PersonId)
      .input("userId", objectToSave.UserId)
      .query(
        "EXEC [dbo].[insertNote] @UserId=@userId, @PersonId=@personId, @Title=@title, @Text=@text, @Tags=@tags, @ActingUserId=@ActingUserId"
      );
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(20005));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Note(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("title", objectToSave.Title)
      .input("text", objectToSave.Text)
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[updateNote] @Id=@id, @Title=@title, @Text=@text, @ActingUserId=@ActingUserId");
    if (result != null) response.json(result.recordset);
    else response.send(getError(20006));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/markNoteAsFavorite", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.body.Id)
      .query("EXEC [dbo].[markNoteAsFavorite] @Id=@id");
    if (result != null) response.json(result);
    else response.send(getError(6001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/removeNoteFromFavorites", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.body.Id)
      .query("EXEC [dbo].[removeNoteFromFavorites] @Id=@id");
    if (result != null) response.json(result);
    else response.send(getError(6001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/removeTagFromNote", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("note", request.body.NoteId)
      .input("tag", request.body.TagId)
      .query("EXEC [dbo].[removeTagFromNote] @TagId=@tag, @NoteId=@note");
    if (result != null) response.json(result);
    else response.send(getError(6001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getNoteDetails", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("note", request.query.NoteId)
      .query("EXEC [dbo].[getNoteDetails] @Id=@note");
    var note = result.recordsets[0][0];
    note.Tags = result.recordsets[1];
    note.Documents = result.recordsets[2];
    response.json(note);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
