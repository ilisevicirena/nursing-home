const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");

router.get("/getDashboardSummary", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getDashboardSummary]");
    if (result.recordsets.length == 10)
      response.json({
        Summary: result.recordsets[0],
        Events: result.recordsets[1],
        OldestPerson: result.recordsets[2],
        LongestPerson: result.recordsets[3],
        ActivePersons: result.recordsets[4],
        EmployeesByGender: result.recordsets[5],
        AllTimeEmployees: result.recordsets[6],
        Employees: result.recordsets[7],
        EmployeesByJobPosition: result.recordsets[8],
        PersonWithLongestLastVisit: result.recordsets[9],
      });
    else response.send(getError(60001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
