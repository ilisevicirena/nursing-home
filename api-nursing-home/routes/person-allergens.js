const express = require("express");
const router = express.Router();
const { db, authedRequest } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { PersonAllergen } = require("../models/PersonAllergen");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", request.query.PersonId)
      .query("EXEC [dbo].[getPersonAllergens] @PersonId=@personId");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/severities/all", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getAllergenSeverities]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonAllergen(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("personId", objectToSave.PersonId)
      .input("allergenName", objectToSave.AllergenName)
      .input("severityId", objectToSave.SeverityId)
      .input("reactionDescription", objectToSave.ReactionDescription)
      .input("startDate", objectToSave.StartDate)
      .input("endDate", objectToSave.EndDate)
      .query(
        "EXEC [dbo].[insertPersonAllergen] @PersonId=@personId, @AllergenName=@allergenName, @SeverityId=@severityId, @ReactionDescription=@reactionDescription, @StartDate=@startDate, @EndDate=@endDate, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset[0]);
    } else response.send(getError(9011));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonAllergen(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .input("allergenName", objectToSave.AllergenName)
      .input("severityId", objectToSave.SeverityId)
      .input("reactionDescription", objectToSave.ReactionDescription)
      .input("startDate", objectToSave.StartDate)
      .input("endDate", objectToSave.EndDate)
      .query(
        "EXEC [dbo].[updatePersonAllergen] @Id=@id, @AllergenName=@allergenName, @SeverityId=@severityId, @ReactionDescription=@reactionDescription, @StartDate=@startDate, @EndDate=@endDate, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset[0]);
    } else response.send(getError(9012));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonAllergen(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .query(
        "EXEC [dbo].[deletePersonAllergen] @Id=@id, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset);
    } else response.send(getError(9013));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
