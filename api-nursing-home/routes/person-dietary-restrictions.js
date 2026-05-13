const express = require("express");
const router = express.Router();
const { db, authedRequest } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const {
  PersonDietaryRestriction,
} = require("../models/PersonDietaryRestriction");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", request.query.PersonId)
      .query("EXEC [dbo].[getPersonDietaryRestrictions] @PersonId=@personId");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/types", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getDietaryTypes]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(
      new PersonDietaryRestriction(),
      request.body,
    );
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("personId", objectToSave.PersonId)
      .input("dietaryTypeId", objectToSave.DietaryTypeId)
      .input("restrictions", objectToSave.Restrictions)
      .input("notes", objectToSave.Notes)
      .input("startDate", objectToSave.StartDate)
      .input("endDate", objectToSave.EndDate)
      .query(
        "EXEC [dbo].[insertPersonDietaryRestriction] @PersonId=@personId, @DietaryTypeId=@dietaryTypeId, @Restrictions=@restrictions, @Notes=@notes, @StartDate=@startDate, @EndDate=@endDate, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset[0]);
    } else response.send(getError(9041));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(
      new PersonDietaryRestriction(),
      request.body,
    );
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .input("restrictions", objectToSave.Restrictions)
      .input("notes", objectToSave.Notes)
      .input("endDate", objectToSave.EndDate)
      .query(
        "EXEC [dbo].[updatePersonDietaryRestriction] @Id=@id, @Restrictions=@restrictions, @Notes=@notes, @EndDate=@endDate, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset[0]);
    } else response.send(getError(9042));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(
      new PersonDietaryRestriction(),
      request.body,
    );
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .query(
        "EXEC [dbo].[deletePersonDietaryRestriction] @Id=@id, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset);
    } else response.send(getError(9043));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
