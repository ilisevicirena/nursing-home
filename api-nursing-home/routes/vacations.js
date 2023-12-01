const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { Vacation } = require("../models/Vacation");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getVacationStatuses]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/vacatonsForEmployee", async (request, response) => {
  try {
    var year =
      request.query.Year != "null"
        ? parseInt(request.query.Year)
        : new Date().getFullYear();
    const pool = await db;
    const result = await pool
      .request()
      .input("id", parseInt(request.query.EmployeeId))
      .input("year", year)
      .query(
        "EXEC [dbo].[getVacationsForEmployee] @EmployeeId=@id, @Year=@year"
      );
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Vacation(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("emp", objectToSave.EmployeeId)
      .input("year", objectToSave.Year)
      .input("from", objectToSave.FromDate)
      .input("to", objectToSave.ToDate)
      .input("taken", objectToSave.DaysTaken)
      .input("total", objectToSave.DaysTotal)
      .query(
        "EXEC [dbo].[insertVacationForEmployee] @EmployeeId=@emp, @Year=@year, @FromDate=@from, @ToDate=@to, @DaysTotal=@total, @DaysTaken=@taken"
      );
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(8001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/changeVacationStatus", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Vacation(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("status", objectToSave.StatusId)
      .query(
        "EXEC [dbo].[changeVacationStatus] @VacationId=@id, @StatusId=@status"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(8003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getRemainingVacationDays", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.EmployeeId)
      .query("EXEC [dbo].[getRemainingVacationDays] @EmployeeId=@id");
    response.json(result.recordset[0]);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
