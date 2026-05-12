const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");

router.get("/getBasicData", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", request.query.UserId)
      .execute("getMyProfileBasicData");
    response.json(result.recordsets[0][0]);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getContactInfoForUser", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("UserId", request.query.UserId)
      .execute("getContactInfoForUser");
    response.json(result.recordsets[0][0]);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
