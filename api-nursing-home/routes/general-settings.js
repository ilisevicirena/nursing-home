const express = require("express");
const router = express.Router();
const { db, authedRequest } = require("../config/framework");

router.post("/updateGeneralSetting", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await authedRequest(pool, request.user?.userId)
      .input("tag", objectToSave.Tag)
      .input("value", objectToSave.Value)
      .query("EXEC [dbo].[updateGeneralSetting] @Tag=@tag, @Value=@value, @ActingUserId=@ActingUserId");
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
