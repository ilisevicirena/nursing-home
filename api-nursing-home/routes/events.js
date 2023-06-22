const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { Event } = require('../models/Event');

router.get('/', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input('month', request.query.Month)
            .input('year', request.query.Year)
            .query("EXEC [dbo].[getCalendarEventsForMonth] @Month=@month, @Year=@year");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/add', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Event, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('title', objectToSave.Title)
            .input('desc', objectToSave.Description)
            .input('start', objectToSave.Start)
            .input('end', objectToSave.End)
            .input('color', objectToSave.Color)
            .input('rec', objectToSave.Recurring ? 1 : 0)
            .input('rem', objectToSave.Reminder ? 1 : 0)
            .query("EXEC [dbo].[insertCalendarEvent] @Title=@title, @Description=@desc, @Start=@start, @End=@end, @Color=@color, @PersonId=NULL, @Recurring=@rec, @Reminder=@rem");
        if (result != null) response.json(result.recordset[0]);
        else response.send(getError(40001));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/update', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Event, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .input('title', objectToSave.Title)
            .input('desc', objectToSave.Description)
            .input('start', objectToSave.Start)
            .input('end', objectToSave.End)
            .input('color', objectToSave.Color)
            .input('rec', objectToSave.Recurring ? 1 : 0)
            .input('rem', objectToSave.Reminder ? 1 : 0)
            .query("EXEC [dbo].[updateCalendarEvent] @Id=@id, @Title=@title, @Description=@desc, @Start=@start, @End=@end, @Color=@color, @Recurring=@rec, @Reminder=@rem");
        if (result != null) response.json(result.recordset);
        else response.send(getError(40002));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;