const express = require("express");
const router = express.Router();
const { db, authedRequest } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { PersonInsuranceData } = require("../models/PersonInsuranceData");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", request.query.PersonId)
      .query("EXEC [dbo].[getPersonInsuranceData] @PersonId=@personId");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonInsuranceData(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("personId", objectToSave.PersonId)
      .input("insuranceCompany", objectToSave.InsuranceCompany)
      .input("policyNumber", objectToSave.PolicyNumber)
      .input("groupNumber", objectToSave.GroupNumber)
      .input("coverageStartDate", objectToSave.CoverageStartDate)
      .input("coverageEndDate", objectToSave.CoverageEndDate)
      .input("coverageType", objectToSave.CoverageType)
      .input("status", objectToSave.Status)
      .query(
        "EXEC [dbo].[insertPersonInsuranceData] @PersonId=@personId, @InsuranceCompany=@insuranceCompany, @PolicyNumber=@policyNumber, @GroupNumber=@groupNumber, @CoverageStartDate=@coverageStartDate, @CoverageEndDate=@coverageEndDate, @CoverageType=@coverageType, @Status=@status, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json(result.recordset[0]);
    } else response.send(getError(9051));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonInsuranceData(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .input("insuranceCompany", objectToSave.InsuranceCompany)
      .input("policyNumber", objectToSave.PolicyNumber)
      .input("groupNumber", objectToSave.GroupNumber)
      .input("coverageStartDate", objectToSave.CoverageStartDate)
      .input("coverageEndDate", objectToSave.CoverageEndDate)
      .input("coverageType", objectToSave.CoverageType)
      .input("status", objectToSave.Status)
      .query(
        "EXEC [dbo].[updatePersonInsuranceData] @Id=@id, @InsuranceCompany=@insuranceCompany, @PolicyNumber=@policyNumber, @GroupNumber=@groupNumber, @CoverageStartDate=@coverageStartDate, @CoverageEndDate=@coverageEndDate, @CoverageType=@coverageType, @Status=@status, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json({});
    } else response.send(getError(9052));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = Object.assign(new PersonInsuranceData(), request.body);
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("id", objectToSave.Id)
      .query(
        "EXEC [dbo].[deletePersonInsuranceData] @Id=@id, @ActingUserId=@ActingUserId",
      );
    if (result != null) {
      response.json({});
    } else response.send(getError(9053));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
