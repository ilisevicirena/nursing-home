const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');
const { Discount } = require('../models/Discount');

router.get('/', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[getDiscounts]");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/add', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Discount, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('name', objectToSave.Name)
            .input('description', objectToSave.Description)
            .input('qty', objectToSave.Quantity)
            .input('percent', objectToSave.PercentCalculation)
            .query("EXEC [dbo].[insertDiscount] @Name=@name, @Description=@description, @Quantity=@qty, @PercentCalculation=@percent");
        if (result != null) response.json(result.recordset[0]);
        else response.send(getError(4001));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.delete('/delete', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Discount, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .query("EXEC [dbo].[deactivateDiscount] @Id=@id");
        if (result != null) response.json(result.recordset);
        else response.send(getError(4002));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;