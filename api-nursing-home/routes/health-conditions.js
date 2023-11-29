const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getHealthConditions]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/insertForPerson", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("condition", objectToSave.HealthConditionId)
      .input("person", objectToSave.PersonId)
      .input("desc", objectToSave.Description)
      .query(
        "EXEC [dbo].[insertHealthConditionForPerson] @HealthConditionId=@condition, @PersonId=@person, @Description=@desc"
      );
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(1001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getForPerson", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.PersonId)
      .query("EXEC [dbo].[getHealthConditionsForPerson] @PersonId=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.delete("/delete", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("id", objectToSave.Id)
      .query("EXEC [dbo].[deleteHealthConditionsForPerson] @Id=@id");
    if (result != null) response.json(result.recordset);
    else response.send(getError(1002));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
