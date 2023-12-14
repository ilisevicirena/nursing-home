const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { Room } = require("../models/Room");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("capacity", request.query.UseCapacity)
      .query("EXEC [dbo].[getRooms] @UseCapacity=@capacity");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Room(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("name", objectToSave.Name)
      .input("capacity", objectToSave.Capacity)
      .input("floorId", objectToSave.FloorId)
      .input("width", objectToSave.Width)
      .input("height", objectToSave.Height)
      .input("top", objectToSave.Top)
      .input("left", objectToSave.Left)
      .query(
        "EXEC [dbo].[insertRoom] @Name=@name, @Capacity=@capacity, @FloorId=@floorId, @Width=@width, @Height=@height, @Top=@top, @Left=@left"
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
    var objectToSave = Object.assign(new Room(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deleteRoom] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(2002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Room(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("name", objectToSave.Name)
      .input("capacity", objectToSave.Capacity)
      .input("floorId", objectToSave.FloorId)
      .input("width", objectToSave.Width)
      .input("height", objectToSave.Height)
      .input("top", objectToSave.Top)
      .input("left", objectToSave.Left)
      .query(
        "EXEC [dbo].[updateRoom] @Id=@id, @Name=@name, @Capacity=@capacity, @FloorId=@floorId, @Width=@width, @Height=@height, @Top=@top, @Left=@left"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(2003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getRoomsForFloor", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.FloorId)
      .query("EXEC [dbo].[getRoomsForFloor] @FloorId=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getAvaliableRooms", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getAvaliableRooms]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getAccomodationManagementRooms", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getAccomodationManagementRooms]");
    if (result.recordsets.length == 3)
      response.json({
        Floors: result.recordsets[0],
        Rooms: result.recordsets[1],
        Persons: result.recordsets[2],
      });
    else response.send(getError(2004));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
