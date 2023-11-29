const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getPersonCategories]");
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
      .input("category", objectToSave.PersonCategoryId)
      .input("person", objectToSave.PersonId)
      .query(
        "EXEC [dbo].[insertCategoryForPerson] @CategoryId=@category, @PersonId=@person"
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
      .query("EXEC [dbo].[getCategoryForPerson] @PersonId=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
