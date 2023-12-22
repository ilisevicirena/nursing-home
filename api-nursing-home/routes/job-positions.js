const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { JobPosition } = require("../models/JobPosition");
const { getError } = require("../resources/error-codes");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getJobPositions]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new JobPosition(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .input("desc", objectToSave.Description)
      .query("EXEC [dbo].[insertJobPosition] @Name=@name, @Description=@desc");
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(130001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new JobPosition(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deleteJobPosition] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(130002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new JobPosition(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("name", objectToSave.Name)
      .input("desc", objectToSave.Description)
      .query(
        "EXEC [dbo].[updateJobPosition] @Id=@id, @Name=@name, @Description=@desc"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(130003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
