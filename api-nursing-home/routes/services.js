const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');
const { Service } = require('../models/Service');

router.get('/', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[getServices]");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/add', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Service, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('name', objectToSave.Name)
            .input('description', objectToSave.Description)
            .input('measure', objectToSave.MeasureUnitId)
            .input('cost', objectToSave.CostPerUnit)
            .input('default', objectToSave.DefaultNumberOfUnits)
            .input('price', objectToSave.PriceUnitId)
            .query("EXEC [dbo].[insertService] @Name=@name, @Description=@description, @MeasureUnitId=@measure, @CostPerUnit=@cost, @DefaultNumberOfUnits=@default, @PriceUnitId=@price");
        if (result != null) response.json(result.recordset[0]);
        else response.send(getError(1001));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/update', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Service, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .input('name', objectToSave.Name)
            .input('description', objectToSave.Description)
            .input('measure', objectToSave.MeasureUnitId)
            .input('cost', objectToSave.CostPerUnit)
            .input('default', objectToSave.DefaultNumberOfUnits)
            .input('price', objectToSave.PriceUnitId)
            .query("EXEC [dbo].[updateService] @Id=@id, @Name=@name, @Description=@description, @MeasureUnitId=@measure, @CostPerUnit=@cost, @DefaultNumberOfUnits=@default, @PriceUnitId=@price");
        if (result != null) response.json(result.recordset);
        else response.send(getError(1003));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.delete('/delete', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Service, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .query("EXEC [dbo].[deactivateService] @Id=@id");
        if (result != null) response.json(result.recordset);
        else response.send(getError(2002));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/getServicesForPackage', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input('id', request.query.PackageId)
            .query("EXEC [dbo].[getServicesForPackage] @Id=@id");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;