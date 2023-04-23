const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');
const { Contact } = require('../models/Contact');

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

router.post('/add', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Contact, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('firstName', objectToSave.FirstName)
            .input('lastName', objectToSave.LastName)
            .input('email', objectToSave.Email)
            .input('telephone', objectToSave.Telephone)
            .input('mobile', objectToSave.Mobile)
            .input('personId', objectToSave.PersonId)
            .query("EXEC [dbo].[insertContact] @FirstName=@firstName, @LastName=@lastName, @Email=@email, @Telephone=@telephone, @Mobile=@mobile, @PersonId=@personId");
        if (result != null) response.json(result.recordset[0]);
        else response.send(getError(4001));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.delete('/delete', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Contact, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .query("EXEC [dbo].[deleteContact] @Id=@id");
        if (result != null) response.json(result.recordset);
        else response.send(getError(4002));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/update', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Contact, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .input('firstName', objectToSave.FirstName)
            .input('lastName', objectToSave.LastName)
            .input('email', objectToSave.Email)
            .input('telephone', objectToSave.Telephone)
            .input('mobile', objectToSave.Mobile)
            .query("EXEC [dbo].[updateContact] @Id=@id, @FirstName=@firstName, @LastName=@lastName, @Email=@email, @Telephone=@telephone, @Mobile=@mobile");
        if (result != null) response.json(result.recordset);
        else response.send(getError(4003));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;