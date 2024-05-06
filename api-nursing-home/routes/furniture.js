const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { Furniture, FurnitureStatusChange } = require("../models/Furniture");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getFurniture]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getFurnitureCountByStatus", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getFurnitureCountByStatus]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Furniture(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .input("description", objectToSave.Description)
      .input("inventoryCode", objectToSave.InventoryCode)
      .input("roomId", objectToSave.RoomId)
      .query(
        "EXEC [dbo].[insertFurniture] @Name=@name, @Description=@description, @InventoryCode=@inventoryCode, @RoomId=@roomId"
      );
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(190001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Furniture(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("name", objectToSave.Name)
      .input("description", objectToSave.Description)
      .input("inventoryCode", objectToSave.InventoryCode)
      .input("roomId", objectToSave.RoomId)
      .query(
        "EXEC [dbo].[updateFurniture] @Id=@id, @Name=@name, @Description=@description, @InventoryCode=@inventoryCode, @RoomId=@roomId"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(190002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deleteFurniture] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(190003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/changeFurnitureStatus", async (request, response) => {
  try {
    var objectToSave = Object.assign(new FurnitureStatusChange(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("statusId", objectToSave.StatusId)
      .input("date", objectToSave.Date)
      .query(
        "EXEC [dbo].[changeFurnitureStatus] @Id=@id, @StatusId=@statusId, @StatusDate=@date"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(190004));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
