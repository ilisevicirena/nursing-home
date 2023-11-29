const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { City } = require("../models/City");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getCities]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new City(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .input("postal", objectToSave.PostalCode)
      .input("country", objectToSave.CountryId)
      .input("municipality", objectToSave.MunicipalityId)
      .query(
        "EXEC [dbo].[insertCity] @Name=@name, @PostalCode=@postal, @CountryId=@country, @MunicipalityId=@municipality"
      );
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(2001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new City(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deleteCity] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(2002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new City(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("name", objectToSave.Name)
      .input("postal", objectToSave.PostalCode)
      .input("country", objectToSave.CountryId)
      .input("municipality", objectToSave.MunicipalityId)
      .query(
        "EXEC [dbo].[updateCity] @Id=@id, @Name=@name, @PostalCode=@postal, @CountryId=@country, @MunicipalityId=@municipality"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(2003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
