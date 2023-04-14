const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');
const { Room } = require('../models/Room');

router.get('/', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[getRooms]");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/add', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Room, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('name', objectToSave.Name)
            .input('capacity', objectToSave.Capacity)
            .input('floorId', objectToSave.FloorId)
            .query("EXEC [dbo].[insertRoom] @Name=@name, @Capacity=@capacity, @FloorId=@floorId");
        if (result != null) response.json(result.recordset[0]);
        else response.send(getError(2001));
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
            .query("EXEC [dbo].[deleteRoom] @Id=@id");
        if (result != null) response.json(result.recordset);
        else response.send(getError(2002));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/update', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Room, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .input('name', objectToSave.Name)
            .input('capacity', objectToSave.Capacity)
            .input('floorId', objectToSave.FloorId)
            .query("EXEC [dbo].[updateRoom] @Id=@id, @Name=@name, @Capacity=@capacity, @FloorId=@floorId");
        if (result != null) response.json(result.recordset);
        else response.send(getError(2003));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;