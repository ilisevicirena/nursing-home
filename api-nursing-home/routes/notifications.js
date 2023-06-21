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

router.get('/notificationTypes', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[getNotificationTypes]");
        var res = result.recordset.map(x => {
            x.Notifications = [];
            x.UnreadNotificationCount = 0;
            return x;
        });
        response.json(res);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/getNotificationsForType', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input('id', request.query.Id)
            .query("EXEC [dbo].[getNotificationsForType] @Id=@id");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/getNotificationsSettings', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[getNotificationsSettings]");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/updateNotificationType', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input('id', request.body.Id)
            .input('enabled', request.body.Enabled)
            .input('daysReminder', request.body.DaysReminder)
            .query("EXEC [dbo].[updateNotificationType] @Id=@id, @Enabled=@enabled, @DaysReminder=@daysReminder");
        if (result != null) response.json(result);
        else response.status(500);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;