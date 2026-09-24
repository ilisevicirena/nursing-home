const express = require("express");
const router = express.Router();
const { db, authedRequest } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { PersonAssessment } = require("../models/PersonAssessment");

router.get("/assessments", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", request.query.PersonId)
      .query("EXEC [dbo].[getPersonAssessments] @PersonId=@personId");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonAssessment(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("personId",       objectToSave.PersonId)
      .input("assessmentDate", objectToSave.AssessmentDate)
      .input("bradenScore",    objectToSave.BradenScore)
      .input("fallRiskScore",  objectToSave.FallRiskScore)
      .input("mobilityScore",  objectToSave.MobilityScore)
      .input("nutritionScore", objectToSave.NutritionScore)
      .input("notes",          objectToSave.Notes)
      .input("assessorName",   objectToSave.AssessorName)
      .query(
        "EXEC [dbo].[insertPersonAssessment] @PersonId=@personId, @AssessmentDate=@assessmentDate, @BradenScore=@bradenScore, @FallRiskScore=@fallRiskScore, @MobilityScore=@mobilityScore, @NutritionScore=@nutritionScore, @Notes=@notes, @AssessorName=@assessorName, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset[0]);
    } else response.send(getError(200001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonAssessment(), request.body);
    const pool = await db;
    await authedRequest(pool, request.user?.userId)
      .input("id",             objectToSave.Id)
      .input("assessmentDate", objectToSave.AssessmentDate)
      .input("bradenScore",    objectToSave.BradenScore)
      .input("fallRiskScore",  objectToSave.FallRiskScore)
      .input("mobilityScore",  objectToSave.MobilityScore)
      .input("nutritionScore", objectToSave.NutritionScore)
      .input("notes",          objectToSave.Notes)
      .input("assessorName",   objectToSave.AssessorName)
      .query(
        "EXEC [dbo].[updatePersonAssessment] @Id=@id, @AssessmentDate=@assessmentDate, @BradenScore=@bradenScore, @FallRiskScore=@fallRiskScore, @MobilityScore=@mobilityScore, @NutritionScore=@nutritionScore, @Notes=@notes, @AssessorName=@assessorName, @ActingUserId=@ActingUserId",
      );
    response.json({});
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonAssessment(), request.body);
    const pool = await db;
    await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deletePersonAssessment] @Id=@id, @ActingUserId=@ActingUserId");
    response.json({});
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
