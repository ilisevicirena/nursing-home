const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { Employee } = require("../models/Employee");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("active", request.query.active)
      .query("EXEC [dbo].[getEmployees] @Active=@active");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/add", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Employee(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("firstName", objectToSave.FirstName)
      .input("lastName", objectToSave.LastName)
      .input("jmbg", objectToSave.JMBG)
      .input("birthDate", objectToSave.BirthDate)
      .input("qualification", objectToSave.QualificationId)
      .input("genderId", objectToSave.GenderId)
      .input("tel", objectToSave.Telephone)
      .input("mob", objectToSave.Mobile)
      .input("email", objectToSave.Email)
      .input("residanceCityId", objectToSave.ResidanceCityId)
      .input("residanceStreetName", objectToSave.ResidanceStreetName)
      .input("residanceHouseNumber", objectToSave.ResidanceHouseNumber)
      .input("empDate", objectToSave.EmploymentDate)
      .input("bank", objectToSave.BankName)
      .input("bankAcc", objectToSave.BankAccountNumber)
      .input("jp", objectToSave.JobPositionId)
      .input("et", objectToSave.EmploymentTypeId)
      .input("fatherFirstName", objectToSave.FatherName)
      .input("years", objectToSave.YearsOfExperiance)
      .input("empEnd", objectToSave.EmploymentEndDate)
      .input("daysVcc", objectToSave.DaysOfVacation)
      .input("school", objectToSave.SchoolName)
      .input("schoolQ", objectToSave.SchoolQualificationName)
      .input("birthCityId", objectToSave.BirthCityId)
      .input("birthMunicipalityId", objectToSave.BirthMunicipalityId)
      .input("birthCountryId", objectToSave.BirthCountryId)
      .query(
        "EXEC [dbo].[insertEmployee] @FirstName=@firstName, @LastName=@lastName, @JMBG=@jmbg, @BirthDate=@birthDate, @GenderId=@genderId, @FatherName=@fatherFirstName,@BirthCityId=@birthCityId, @BirthMunicipalityId=@birthMunicipalityId, @BirthCountryId=@birthCountryId, @ResidanceCityId=@residanceCityId,@ResidanceStreetName=@residanceStreetName, @ResidanceHouseNumber=@residanceHouseNumber, @Telephone=@tel, @Mobile=@mob, @Email=@email, @EmploymentDate=@empDate, @BankName=@bank, @BankAccountNumber=@bankAcc, @JobPositionId=@jp, @EmploymentTypeId=@et, @YearsOfExperiance=@years, @EmploymentEndDate=@empEnd, @DaysOfVacation=@daysVcc, @SchoolName=@school, @SchoolQualificationName=@schoolQ, @QualificationId=@qualification"
      );
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(100001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Employee(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("firstName", objectToSave.FirstName)
      .input("lastName", objectToSave.LastName)
      .input("jmbg", objectToSave.JMBG)
      .input("birthDate", objectToSave.BirthDate)
      .input("genderId", objectToSave.GenderId)
      .input("tel", objectToSave.Telephone)
      .input("mob", objectToSave.Mobile)
      .input("email", objectToSave.Email)
      .input("residanceCityId", objectToSave.ResidanceCityId)
      .input("residanceStreetName", objectToSave.ResidanceStreetName)
      .input("residanceHouseNumber", objectToSave.ResidanceHouseNumber)
      .input("empDate", objectToSave.EmploymentDate)
      .input("bank", objectToSave.BankName)
      .input("bankAcc", objectToSave.BankAccountNumber)
      .input("jp", objectToSave.JobPositionId)
      .input("et", objectToSave.EmploymentTypeId)
      .input("fatherFirstName", objectToSave.FatherName)
      .input("years", objectToSave.YearsOfExperiance)
      .input("empEnd", objectToSave.EmploymentEndDate)
      .input("daysVcc", objectToSave.DaysOfVacation)
      .input("school", objectToSave.SchoolName)
      .input("schoolQ", objectToSave.SchoolQualificationName)
      .input("birthCityId", objectToSave.BirthCityId)
      .input("birthMunicipalityId", objectToSave.BirthMunicipalityId)
      .input("birthCountryId", objectToSave.BirthCountryId)
      .input("qualification", objectToSave.QualificationId)
      .query(
        "EXEC [dbo].[updateEmployee] @Id=@id, @FirstName=@firstName, @LastName=@lastName, @JMBG=@jmbg, @BirthDate=@birthDate, @GenderId=@genderId, @FatherName=@fatherFirstName,@BirthCityId=@birthCityId, @BirthMunicipalityId=@birthMunicipalityId, @BirthCountryId=@birthCountryId, @ResidanceCityId=@residanceCityId,@ResidanceStreetName=@residanceStreetName, @ResidanceHouseNumber=@residanceHouseNumber, @Telephone=@tel, @Mobile=@mob, @Email=@email, @EmploymentDate=@empDate, @BankName=@bank, @BankAccountNumber=@bankAcc, @JobPositionId=@jp, @EmploymentTypeId=@et, @YearsOfExperiance=@years, @EmploymentEndDate=@empEnd, @DaysOfVacation=@daysVcc, @SchoolName=@school, @SchoolQualificationName=@schoolQ, @QualificationId=@qualification"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(100003));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/changeStatusEmployee", async (request, response) => {
  try {
    var objectToSave = Object.assign(new Employee(), request.body);
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .input("status", objectToSave.Active)
      .input("endDate", objectToSave.EndDate)
      .query(
        "EXEC [dbo].[changeStatusEmployee] @Id=@id, @Status=@status, @Date=@endDate"
      );
    if (result != null) response.json(result.recordset);
    else response.send(getError(100004));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/EmployeeDetails", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.id)
      .query("EXEC [dbo].[getEmployee] @Id=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/employeesBasic", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getEmployeesBasic]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
