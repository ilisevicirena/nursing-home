const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');
const { Person } = require('../models/Person');

router.get('/', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input('active', request.query.active)
            .query("EXEC [dbo].[getPersons] @Active=@active");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});


router.post('/add', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Person, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('firstName', objectToSave.FirstName)
            .input('lastName', objectToSave.LastName)
            .input('jmbg', objectToSave.JMBG)
            .input('birthDate', objectToSave.BirthDate)
            .input('startDate', objectToSave.StartDate)
            .input('address', objectToSave.Address)
            .input('genderId', objectToSave.GenderId)
            .query("EXEC [dbo].[insertPerson] @FirstName=@firstName, @LastName=@lastName, @JMBG=@jmbg, @BirthDate=@birthDate, @StartDate=@startDate, @Address=@address, @GenderId=@genderId");
        if (result != null) response.json(result.recordset[0]);
        else response.send(getError(3001));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.delete('/delete', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Person, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .query("EXEC [dbo].[deletePerson] @Id=@id");
        if (result != null) response.json(result.recordset);
        else response.send(getError(3002));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/update', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Person, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .input('firstName', objectToSave.FirstName)
            .input('lastName', objectToSave.LastName)
            .input('jmbg', objectToSave.JMBG)
            .input('birthDate', objectToSave.BirthDate)
            .input('startDate', objectToSave.StartDate)
            .input('endDate', objectToSave.EndDate)
            .input('address', objectToSave.Address)
            .input('genderId', objectToSave.GenderId)
            .query("EXEC [dbo].[updatePerson] @Id=@id, @FirstName=@firstName, @LastName=@lastName, @JMBG=@jmbg, @BirthDate=@birthDate, @StartDate=@startDate, @EndDate=@endDate, @Address=@address, @GenderId=@genderId");
        if (result != null) response.json(result.recordset);
        else response.send(getError(2003));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/roomsHistoryForPerson', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input('id', request.query.PersonId)
            .query("EXEC [dbo].[getRoomsHistoryForPerson] @PersonId=@id");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/changeStatusPerson', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Person, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .input('status', objectToSave.Active)
            .input('endDate', objectToSave.EndDate)
            .query("EXEC [dbo].[changeStatusPerson] @Id=@id, @Status=@status, @Date=@endDate");
        if (result != null) response.json(result.recordset);
        else response.send(getError(3004));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/changeRoomPerson', async (request, response) => {
    try {
        var objectToSave = request.body;
        const pool = await db;
        const result = await pool.request()
            .input('personId', objectToSave.PersonId)
            .input('roomId', objectToSave.RoomId)
            .query("EXEC [dbo].[changeRoomPerson] @PersonId=@personId, @RoomId=@roomId");
        if (result != null) response.json(result.recordset);
        else response.send(getError(3005));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/deactivateRoomPerson', async (request, response) => {
    try {
        var objectToSave = request.body;
        const pool = await db;
        const result = await pool.request()
            .input('personId', objectToSave.PersonId)
            .query("EXEC [dbo].[deactivateRoomPerson] @PersonId=@personId");
        if (result != null) response.json(result.recordset);
        else response.send(getError(3005));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/personDetails', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input('id', request.query.id)
            .query("EXEC [dbo].[getPerson] @Id=@id");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/searchPersons', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input('searchTerm', request.query.searchTerm)
            .query("EXEC [dbo].[searchPersons] @searchTerm=@searchTerm");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/getLogForPerson', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input('personId', request.query.PersonId)
            .query("EXEC [dbo].[getLogForPerson] @Id=@personId");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;