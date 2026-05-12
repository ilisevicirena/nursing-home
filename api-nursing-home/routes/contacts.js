const express = require("express");
const router = express.Router();
const { db, authedRequest } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { Contact } = require("../models/Contact");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", request.query.PersonId)
      .query("EXEC [dbo].[getContacts] @PersonId=@personId");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Contact(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("firstName", objectToSave.FirstName)
      .input("lastName", objectToSave.LastName)
      .input("email", objectToSave.Email)
      .input("telephone", objectToSave.Telephone)
      .input("mobile", objectToSave.Mobile)
      .input("personId", objectToSave.PersonId)
      .input("jmbg", objectToSave.Jmbg)
      .input("residanceCityId", objectToSave.ResidanceCityId)
      .input("residanceStreetName", objectToSave.ResidanceStreetName)
      .input("residanceHouseNumber", objectToSave.ResidanceHouseNumber)
      .input("isObligeeToPay", objectToSave.IsObligeeToPay)
      .input("isGuardian", objectToSave.IsGuardian)
      .query(
        "EXEC [dbo].[insertContact] @FirstName=@firstName, @LastName=@lastName, @Email=@email, @Telephone=@telephone, @Mobile=@mobile, @PersonId=@personId, @Jmbg=@jmbg, @ResidanceCityId=@residanceCityId, @ResidanceHouseNumber=@residanceHouseNumber, @ResidanceStreetName=@residanceStreetName, @IsObligeeToPay=@isObligeeToPay, @IsGuardian=@isGuardian, @ActingUserId=@ActingUserId"
      );
    if (result != null) {
      var contactId = result.recordset[0].ContactId;

      if (objectToSave.UserId && contactId) {
        await pool
          .request()
          .input("UserId", objectToSave.UserId)
          .input("ContactId", contactId)
          .execute("insertUserContactRelation");
      }

      response.json(result.recordset[0]);
    } else response.send(getError(3001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Contact(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deleteContact] @Id=@id, @ActingUserId=@ActingUserId");
    if (result != null) response.json(result.recordset);
    else response.send(getError(3002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Contact(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .input("userId", objectToSave.UserId)
      .input("firstName", objectToSave.FirstName)
      .input("lastName", objectToSave.LastName)
      .input("email", objectToSave.Email)
      .input("telephone", objectToSave.Telephone)
      .input("mobile", objectToSave.Mobile)
      .input("jmbg", objectToSave.Jmbg)
      .input("residanceCityId", objectToSave.ResidanceCityId)
      .input("residanceStreetName", objectToSave.ResidanceStreetName)
      .input("residanceHouseNumber", objectToSave.ResidanceHouseNumber)
      .input("isObligeeToPay", objectToSave.IsObligeeToPay)
      .input("isGuardian", objectToSave.IsGuardian)
      .query(
        "EXEC [dbo].[updateContact] @Id=@id, @UserId=@userId, @FirstName=@firstName, @LastName=@lastName, @Email=@email, @Telephone=@telephone, @Mobile=@mobile, @Jmbg=@jmbg, @ResidanceCityId=@residanceCityId, @ResidanceHouseNumber=@residanceHouseNumber, @ResidanceStreetName=@residanceStreetName, @IsObligeeToPay=@isObligeeToPay, @IsGuardian=@isGuardian, @ActingUserId=@ActingUserId"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(3003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
