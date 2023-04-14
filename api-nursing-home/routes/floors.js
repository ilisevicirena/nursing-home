const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');
const { Floor } = require('../models/Floor');

router.get('/', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[getFloors]");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/add', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Floor, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('name', objectToSave.Name)
            .query("EXEC [dbo].[insertFloor] @Name=@name");
        if (result != null) response.json(result.recordset[0]);
        else response.send(getError(1001));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.delete('/delete', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Floor, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .query("EXEC [dbo].[deleteFloor] @Id=@id");
        if (result != null) response.json(result.recordset);
        else response.send(getError(1002));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/update', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Floor, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .input('name', objectToSave.Name)
            .query("EXEC [dbo].[updateFloor] @Id=@id, @Name=@name");
        if (result != null) response.json(result.recordset);
        else response.send(getError(1003));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;