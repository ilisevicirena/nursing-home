const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");

router.post("/updateGeneralSetting", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("tag", objectToSave.Tag)
      .input("value", objectToSave.Value)
      .query("EXEC [dbo].[updateGeneralSetting] @Tag=@tag, @Value=@value");
    if (result != null) response.json(result);
    else response.send("GENERAL SETTING ERROR");
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getGeneralSetting", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("name", request.query.Name)
      .query("EXEC [dbo].[getGeneralSetting] @Name=@name");
    response.json(result.recordsets[0][0]);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
