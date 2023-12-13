const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { Event } = require("../models/Event");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getCompletedDoctorVisitsWithDetails]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getDoctorsAndNurses", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.id)
      .query("EXEC [dbo].[getDoctorsAndNursesForVisit] @Id=@id");
    response.json({
      doctors: result.recordsets[0],
      nurses: result.recordsets[1],
    });
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getPersons", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.id)
      .query("EXEC [dbo].[getPersonsForVisit] @Id=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getSummary", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.id)
      .query("EXEC [dbo].[getSummaryForVisit] @Id=@id");
    response.json({
      Visited: result.recordsets[0][0],
      TimePassed: result.recordsets[1][0],
      DoctorStats: result.recordsets[2],
    });
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getNotesForDoctorVisitTour", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.id)
      .query("EXEC [dbo].[getNotesForDoctorVisitTour] @Id=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
