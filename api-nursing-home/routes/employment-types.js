const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { EmploymentType } = require("../models/EmploymentType");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getEmploymentTypes]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new EmploymentType(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .query("EXEC [dbo].[insertEmploymentType] @Name=@name");
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(2001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new EmploymentType(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deleteEmploymentType] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(2002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new EmploymentType(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("name", objectToSave.Name)
      .query("EXEC [dbo].[updateEmploymentType] @Id=@id, @Name=@name");
    if (result != null) response.json(result.recordset);
    else response.send(getError(2003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
