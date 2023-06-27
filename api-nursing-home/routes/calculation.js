const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');

router.get('/', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input("personId", request.query.PersonId)
            .query("EXEC [dbo].[getContacts] @PersonId=@personId");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;