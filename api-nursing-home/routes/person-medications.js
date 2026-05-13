const express = require("express");
const router = express.Router();
const { db, authedRequest } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { PersonMedication } = require("../models/PersonMedication");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", request.query.PersonId)
      .query("EXEC [dbo].[getPersonMedications] @PersonId=@personId");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonMedication(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("personId", objectToSave.PersonId)
      .input("medicationName", objectToSave.MedicationName)
      .input("dosage", objectToSave.Dosage)
      .input("frequency", objectToSave.Frequency)
      .input("route", objectToSave.Route)
      .input("startDate", objectToSave.StartDate)
      .input("endDate", objectToSave.EndDate)
      .input("indication", objectToSave.Indication)
      .input("notes", objectToSave.Notes)
      .input("status", objectToSave.Status)
      .input("prescriberName", objectToSave.PrescriberName)
      .query(
        "EXEC [dbo].[insertPersonMedication] @PersonId=@personId, @MedicationName=@medicationName, @Dosage=@dosage, @Frequency=@frequency, @Route=@route, @StartDate=@startDate, @EndDate=@endDate, @Indication=@indication, @Notes=@notes, @Status=@status, @PrescriberName=@prescriberName, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset[0]);
    } else response.send(getError(9021));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonMedication(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .input("medicationName", objectToSave.MedicationName)
      .input("dosage", objectToSave.Dosage)
      .input("frequency", objectToSave.Frequency)
      .input("route", objectToSave.Route)
      .input("startDate", objectToSave.StartDate)
      .input("endDate", objectToSave.EndDate)
      .input("indication", objectToSave.Indication)
      .input("notes", objectToSave.Notes)
      .input("status", objectToSave.Status)
      .input("prescriberName", objectToSave.PrescriberName)
      .query(
        "EXEC [dbo].[updatePersonMedication] @Id=@id, @MedicationName=@medicationName, @Dosage=@dosage, @Frequency=@frequency, @Route=@route, @StartDate=@startDate, @EndDate=@endDate, @Indication=@indication, @Notes=@notes, @Status=@status, @PrescriberName=@prescriberName, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset[0]);
    } else response.send(getError(9022));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonMedication(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .query(
        "EXEC [dbo].[deletePersonMedication] @Id=@id, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset);
    } else response.send(getError(9023));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
