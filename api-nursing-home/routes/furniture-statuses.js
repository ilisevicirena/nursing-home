const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { FurnitureStatus } = require("../models/FurnitureStatus");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getFurnitureStatuses]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new FurnitureStatus(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deactivateFurnitureStatus] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(180003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new FurnitureStatus(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .input("color", objectToSave.Color)
      .query("EXEC [dbo].[insertFurnitureStatus] @Name=@name, @Color=@color");
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(180001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new FurnitureStatus(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .input("color", objectToSave.Color)
      .input("id", objectToSave.Id)
      .query(
        "EXEC [dbo].[updateFurnitureStatus] @Id=@id, @Name=@name, @Color=@color"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(180002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
