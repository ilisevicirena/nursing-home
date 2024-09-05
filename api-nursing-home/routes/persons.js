const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { Person } = require("../models/Person");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("active", request.query.active)
      .input("userId", request.query.userId)
      .query("EXEC [dbo].[getPersons] @Active=@active, @UserId=@userId");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getActivePersonsByMonthYear", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("month", request.query.Month)
      .input("year", request.query.Year)
      .query(
        "EXEC [dbo].[getActivePersonsByMonthYear] @Month=@month, @Year=@year"
      );
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Person(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("firstName", objectToSave.FirstName)
      .input("lastName", objectToSave.LastName)
      .input("jmbg", objectToSave.JMBG)
      .input("birthDate", objectToSave.BirthDate)
      .input("startDate", objectToSave.StartDate)
      .input("address", objectToSave.Address)
      .input("genderId", objectToSave.GenderId)
      .input("maidenLastName", objectToSave.MaidenLastName)
      .input("fatherFirstName", objectToSave.FatherFirstName)
      .input("motherFirstName", objectToSave.MotherFirstName)
      .input("motherMaidenLastName", objectToSave.MotherMaidenLastName)
      .input("birthCityId", objectToSave.BirthCityId)
      .input("birthMunicipalityId", objectToSave.BirthMunicipalityId)
      .input("birthCountryId", objectToSave.BirthCountryId)
      .input("residanceCityId", objectToSave.ResidanceCityId)
      .input("residanceStreetName", objectToSave.ResidanceStreetName)
      .input("residanceHouseNumber", objectToSave.ResidanceHouseNumber)
      .input("tel", objectToSave.Telephone)
      .input("mob", objectToSave.Mobile)
      .input("email", objectToSave.Email)
      .input("doc", objectToSave.DoctorName)
      .query(
        "EXEC [dbo].[insertPerson] @FirstName=@firstName, @LastName=@lastName, @JMBG=@jmbg, @BirthDate=@birthDate, @StartDate=@startDate, @Address=@address, @GenderId=@genderId, @MaidenLastName=@maidenLastName, @FatherFirstName=@fatherFirstName, @MotherFirstName=@motherFirstName, @MotherMaidenLastName=@motherMaidenLastName, @BirthCityId=@birthCityId, @BirthMunicipalityId=@birthMunicipalityId, @BirthCountryId=@birthCountryId, @ResidanceCityId=@residanceCityId, @ResidanceStreetName=@residanceStreetName, @ResidanceHouseNumber=@residanceHouseNumber, @Telephone=@tel, @Mobile=@mob, @Email=@email, @DoctorName=@doc"
      );
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(8001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Person(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deletePerson] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(8002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/updateDetailed", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Person(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("firstName", objectToSave.FirstName)
      .input("lastName", objectToSave.LastName)
      .input("jmbg", objectToSave.JMBG)
      .input("birthDate", objectToSave.BirthDate)
      .input("startDate", objectToSave.StartDate)
      .input("endDate", objectToSave.EndDate)
      .input("address", objectToSave.Address)
      .input("genderId", objectToSave.GenderId)
      .input("maidenLastName", objectToSave.MaidenLastName)
      .input("fatherFirstName", objectToSave.FatherFirstName)
      .input("motherFirstName", objectToSave.MotherFirstName)
      .input("motherMaidenLastName", objectToSave.MotherMaidenLastName)
      .input("birthCityId", objectToSave.BirthCityId)
      .input("birthMunicipalityId", objectToSave.BirthMunicipalityId)
      .input("birthCountryId", objectToSave.BirthCountryId)
      .input("residanceCityId", objectToSave.ResidanceCityId)
      .input("residanceStreetName", objectToSave.ResidanceStreetName)
      .input("residanceHouseNumber", objectToSave.ResidanceHouseNumber)
      .input("tel", objectToSave.Telephone)
      .input("mob", objectToSave.Mobile)
      .input("email", objectToSave.Email)
      .input("doc", objectToSave.DoctorName)
      .query(
        "EXEC [dbo].[updatePersonDetailed] @Id=@id, @FirstName=@firstName, @LastName=@lastName, @JMBG=@jmbg, @BirthDate=@birthDate, @StartDate=@startDate, @Address=@address, @GenderId=@genderId, @MaidenLastName=@maidenLastName, @FatherFirstName=@fatherFirstName, @MotherFirstName=@motherFirstName, @MotherMaidenLastName=@motherMaidenLastName, @BirthCityId=@birthCityId, @BirthMunicipalityId=@birthMunicipalityId, @BirthCountryId=@birthCountryId, @ResidanceCityId=@residanceCityId, @ResidanceStreetName=@residanceStreetName, @ResidanceHouseNumber=@residanceHouseNumber, @Telephone=@tel, @Mobile=@mob, @Email=@email, @DoctorName=@doc"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(8003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Person(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("firstName", objectToSave.FirstName)
      .input("lastName", objectToSave.LastName)
      .input("jmbg", objectToSave.JMBG)
      .input("birthDate", objectToSave.BirthDate)
      .input("startDate", objectToSave.StartDate)
      .input("endDate", objectToSave.EndDate)
      .input("address", objectToSave.Address)
      .input("genderId", objectToSave.GenderId)
      .query(
        "EXEC [dbo].[updatePersonDetailed] @Id=@id, @FirstName=@firstName, @LastName=@lastName, @JMBG=@jmbg, @BirthDate=@birthDate, @StartDate=@startDate, @EndDate=@endDate, @Address=@address, @GenderId=@genderId"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(8003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/roomsHistoryForPerson", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.PersonId)
      .query("EXEC [dbo].[getRoomsHistoryForPerson] @PersonId=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/changeStatusPerson", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Person(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("status", objectToSave.Active)
      .input("endDate", objectToSave.EndDate)
      .query(
        "EXEC [dbo].[changeStatusPerson] @Id=@id, @Status=@status, @Date=@endDate"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(8004));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/changeRoomPerson", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", objectToSave.PersonId)
      .input("roomId", objectToSave.RoomId)
      .query(
        "EXEC [dbo].[changeRoomPerson] @PersonId=@personId, @RoomId=@roomId"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(8005));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/deactivateRoomPerson", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", objectToSave.PersonId)
      .query("EXEC [dbo].[deactivateRoomPerson] @PersonId=@personId");
    if (result != null) response.json(result.recordset);
    else response.send(getError(8006));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/personDetails", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.id)
      .query("EXEC [dbo].[getPerson] @Id=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/personDetailed", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.id)
      .query("EXEC [dbo].[getPersonDetailed] @Id=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/searchPersons", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("searchTerm", request.query.searchTerm)
      .input("userId", request.query.userId)
      .query(
        "EXEC [dbo].[searchPersons] @searchTerm=@searchTerm, @UserId=@userId"
      );
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getLogForPerson", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", request.query.PersonId)
      .query("EXEC [dbo].[getLogForPerson] @Id=@personId");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getPersonsForUserDashboard", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", request.query.UserId)
      .execute("getPersonsForUserDashboard");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getPersonsForUser", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", request.query.UserId)
      .execute("getPersonsForUser");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
