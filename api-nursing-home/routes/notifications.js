const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');

router.get('/', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[getNotifications]");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/checkNotificationsStatus', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[checkNotificationsStatus]");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/getLatestNotifications', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[getLatestNotifications]");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/markNotificationAsRead', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input('id', request.body.Id)
            .query("EXEC [dbo].[markNotificationAsRead] @Id=@id");
        if (result != null) response.json(result);
        else response.send(getError(6001));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/markAllNotificationsAsRead', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[markAllNotificationsAsRead]");
        if (result != null) response.json(result);
        else response.send(getError(6002));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;