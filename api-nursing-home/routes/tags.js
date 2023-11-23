const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { Tag } = require("../models/Tag");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getNotesTags]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Tag(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deactivateTag] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(30001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Tag(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .input("color", objectToSave.Color)
      .query("EXEC [dbo].[insertTag] @Name=@name, @Color=@color");
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(30002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Tag(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .input("color", objectToSave.Color)
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[updateTag] @Id=@id, @Name=@name, @Color=@color");
    if (result != null) response.json(result.recordset);
    else response.send(getError(30003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
