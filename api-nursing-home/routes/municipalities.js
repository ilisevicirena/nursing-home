const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { Municipality } = require("../models/Municipality");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getMunicipalities]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Municipality(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .input("country", objectToSave.CountryId)
      .query(
        "EXEC [dbo].[insertMunicipality] @Name=@name, @CountryId=@country"
      );
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(140001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Municipality(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deleteMunicipality] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(140002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Municipality(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("name", objectToSave.Name)
      .input("country", objectToSave.CountryId)
      .query(
        "EXEC [dbo].[updateMunicipality] @Id=@id, @Name=@name, @CountryId=@country"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(140003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
