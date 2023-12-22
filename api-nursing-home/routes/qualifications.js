const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { Qualification } = require("../models/Qualification");
const { getError } = require("../resources/error-codes");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getQualifications]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Qualification(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .input("degree", objectToSave.Degree)
      .query("EXEC [dbo].[insertQualification] @Name=@name, @Degree=@degree");
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(160001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Qualification(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deleteQualification] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(160002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Qualification(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("name", objectToSave.Name)
      .input("degree", objectToSave.Degree)
      .query(
        "EXEC [dbo].[updateQualification] @Id=@id, @Name=@name, @Degree=@degree"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(160003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
