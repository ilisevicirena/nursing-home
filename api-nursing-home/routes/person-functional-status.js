const express = require("express");
const router = express.Router();
const { db, authedRequest } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { PersonFunctionalStatus } = require("../models/PersonFunctionalStatus");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", request.query.PersonId)
      .query("EXEC [dbo].[getPersonFunctionalStatus] @PersonId=@personId");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(
      new PersonFunctionalStatus(),
      request.body,
    );
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("personId", objectToSave.PersonId)
      .input("mobilityStatus", objectToSave.MobilityStatus)
      .input("cognitiveStatus", objectToSave.CognitiveStatus)
      .input("fallRisk", objectToSave.FallRisk)
      .input("visualStatus", objectToSave.VisualStatus)
      .input("hearingStatus", objectToSave.HearingStatus)
      .input("assessmentDate", objectToSave.AssessmentDate)
      .input("notesDescription", objectToSave.NotesDescription)
      .query(
        "EXEC [dbo].[insertPersonFunctionalStatus] @PersonId=@personId, @MobilityStatus=@mobilityStatus, @CognitiveStatus=@cognitiveStatus, @FallRisk=@fallRisk, @VisualStatus=@visualStatus, @HearingStatus=@hearingStatus, @AssessmentDate=@assessmentDate, @NotesDescription=@notesDescription, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset[0]);
    } else response.send(getError(9031));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(
      new PersonFunctionalStatus(),
      request.body,
    );
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .input("mobilityStatus", objectToSave.MobilityStatus)
      .input("cognitiveStatus", objectToSave.CognitiveStatus)
      .input("fallRisk", objectToSave.FallRisk)
      .input("visualStatus", objectToSave.VisualStatus)
      .input("hearingStatus", objectToSave.HearingStatus)
      .input("assessmentDate", objectToSave.AssessmentDate)
      .input("notesDescription", objectToSave.NotesDescription)
      .query(
        "EXEC [dbo].[updatePersonFunctionalStatus] @Id=@id, @MobilityStatus=@mobilityStatus, @CognitiveStatus=@cognitiveStatus, @FallRisk=@fallRisk, @VisualStatus=@visualStatus, @HearingStatus=@hearingStatus, @AssessmentDate=@assessmentDate, @NotesDescription=@notesDescription, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset[0]);
    } else response.send(getError(9032));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(
      new PersonFunctionalStatus(),
      request.body,
    );
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .query(
        "EXEC [dbo].[deletePersonFunctionalStatus] @Id=@id, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset);
    } else response.send(getError(9033));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
