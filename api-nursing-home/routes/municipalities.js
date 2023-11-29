const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool.request().query("EXEC [dbo].[getMunicipalities]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
