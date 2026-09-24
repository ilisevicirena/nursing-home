const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");

// GET /?Entity=&Action=&DateFrom=&DateTo=&Search=&Top=
router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("logEntity", request.query.Entity || null)
      .input("logType", request.query.Action || null)
      .input("dateFrom", request.query.DateFrom || null)
      .input("dateTo", request.query.DateTo || null)
      .input("search", request.query.Search || null)
      .input("top", parseInt(request.query.Top, 10) || 500)
      .query(
        "EXEC [dbo].[getAuditLog] @LogEntity=@logEntity, @LogType=@logType, @DateFrom=@dateFrom, @DateTo=@dateTo, @Search=@search, @Top=@top",
      );
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

// GET /user-activity?DateFrom=&DateTo=&Search=&Top=  (who did what, when)
router.get("/user-activity", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("dateFrom", request.query.DateFrom || null)
      .input("dateTo", request.query.DateTo || null)
      .input("search", request.query.Search || null)
      .input("top", parseInt(request.query.Top, 10) || 500)
      .query(
        "EXEC [dbo].[getUserActivity] @DateFrom=@dateFrom, @DateTo=@dateTo, @Search=@search, @Top=@top",
      );
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
