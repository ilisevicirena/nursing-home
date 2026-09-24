const express = require("express");
const router = express.Router();
const { db, authedRequest } = require("../config/framework");

// GET /?PersonId=&Date=YYYY-MM-DD
// The proc returns one flat row per medication x time-slot; we group them into
// { Id, MedicationName, Dosage, Route, slots: [{ slot, scheduled, dose, time, status }] }.
router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("personId", request.query.PersonId)
      .input("date", request.query.Date)
      .query("EXEC [dbo].[getMedicationAdministration] @PersonId=@personId, @Date=@date");

    const map = new Map();
    for (const row of result.recordset) {
      if (!map.has(row.MedicationId)) {
        map.set(row.MedicationId, {
          Id: row.MedicationId,
          MedicationName: row.MedicationName,
          Dosage: row.Dosage,
          Route: row.Route,
          slots: [],
        });
      }
      map.get(row.MedicationId).slots.push({
        slot: row.Slot,
        scheduled: row.Scheduled === true || row.Scheduled === 1,
        dose: row.Dosage,
        time: row.SlotTime,
        status: row.Status,
      });
    }

    response.json(Array.from(map.values()));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

// POST /record  { PersonId, MedicationId, Slot, Date, Status }
router.post("/record", async (request, response) => {
  try {
    const pool = await db;
    await authedRequest(pool, request.user?.userId)
      .input("personId",           request.body.PersonId)
      .input("personMedicationId", request.body.MedicationId)
      .input("slot",               request.body.Slot)
      .input("date",               request.body.Date)
      .input("status",             request.body.Status)
      .query(
        "EXEC [dbo].[recordMedicationAdministration] @PersonId=@personId, @PersonMedicationId=@personMedicationId, @Slot=@slot, @AdministrationDate=@date, @Status=@status, @ActingUserId=@ActingUserId",
      );
    response.json({});
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
