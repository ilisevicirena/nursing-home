const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");

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

    if (response.recordsets.length == 2) {
      response.json({
        doctors: result.recordsets[0],
        nurses: result.recordsets[1],
      });
    } else response.send(getError(90001));
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
    if (response.recordsets.length == 3) {
      response.json({
        Visited: result.recordsets[0][0],
        TimePassed: result.recordsets[1][0],
        DoctorStats: result.recordsets[2],
      });
    } else response.send(getError(90002));
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

router.post("/add", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("date", objectToSave.VisitDate)
      .input("doctors", objectToSave.Doctors)
      .input("nurses", objectToSave.Nurses)
      .query(
        "EXEC [dbo].[insertDoctorVisitTour] @visitDate=@date, @doctors=@doctors, @nurses=@nurses"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(90003));
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
      .query("EXEC [dbo].[deleteDoctorVisitTour] @Id=@id");
    if (result != null) response.send({ error: false });
    else response.send(getError(90004));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/completeDoctorVisit", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("total", objectToSave.Total)
      .query(
        "EXEC [dbo].[completeDoctorVisitTour] @Id=@id, @TotalPersons=@total"
      );
    if (result != null) response.send({ error: false });
    else response.send(getError(90005));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getVisitTourDetails", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.id)
      .query("EXEC [dbo].[getDoctorVisitTourDetails] @Id=@id");
    if (result.recordsets.length == 3)
      response.json({
        Tour: result.recordsets[0],
        Doctors: result.recordsets[1],
        Nurses: result.recordsets[2],
      });
    else response.send(getError(90006));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/insertDoctorVisitForPerson", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("person", objectToSave.PersonId)
      .input("note", objectToSave.NoteId)
      .query(
        "EXEC [dbo].[insertDoctorVisitTourForPerson] @id=@id, @noteId=@note, @personId=@person"
      );
    if (result != null) response.send({ error: false });
    else response.send(getError(90007));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
