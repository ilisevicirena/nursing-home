const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');
const { CalculationPaid, CalculationRealPrice, Calculation } = require('../models/Calculation');
const { DocumentFile } = require('../models/Document');
const { FILES_FOLDER } = require('../config/config');
const fs = require('fs');
const { resolve } = require('path');

router.post('/calculationPaid', async (request, response) => {
    try {
        var objectToSave = Object.assign(new CalculationPaid, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .input('price', objectToSave.PaidPrice)
            .input('date', objectToSave.PaidDate)
            .query("EXEC [dbo].[calculationPaid] @CalculationId=@id, @PaidDate=@date, @PaidPrice=@price");
        if (result != null) response.json(result.recordset);
        else response.send(getError(50001));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/calculationRealPriceSave', async (request, response) => {
    try {
        var objectToSave = Object.assign(new CalculationRealPrice, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .input('price', objectToSave.RealPrice)
            .query("EXEC [dbo].[calculationRealPrice] @CalculationId=@id, @RealPrice=@price");
        if (result != null) response.json(result.recordset);
        else response.send(getError(50002));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/cancelCalculation', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Calculation, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .query("EXEC [dbo].[cancelCalculation] @CalculationId=@id");
        if (result != null) response.json(result.recordset);
        else response.send(getError(50003));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/calculationDetails', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input("id", request.query.Id)
            .query("EXEC [dbo].[getCalculationDetails] @CalculationId=@id");
        if (result.recordsets.length == 6) response.json({ Calculation: result.recordsets[0], Packages: result.recordsets[1], PackageServices: result.recordsets[2], Services: result.recordsets[3], Discounts: result.recordsets[4], Documents: result.recordsets[5] });
        else response.send(getError(50004));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/calculationDocuments', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input("id", request.query.Id)
            .query("EXEC [dbo].[getCalculationDocuments] @CalculationId=@id");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/calculations', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input("month", request.query.Month)
            .input("year", request.query.Year)
            .query("EXEC [dbo].[getCalculationsForMonth] @Month=@month, @Year=@year");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/getCalculationsForPerson', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .input("id", request.query.PersonId)
            .query("EXEC [dbo].[getCalculationsForPerson] @PersonId=@id");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.get('/getCalculationStatuses', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[getCalculationStatuses]");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/add', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Calculation, request.body);

        const pool = await db;
        const result = await pool.request()
            .input('month', objectToSave.Month)
            .input('year', objectToSave.Year)
            .input('person', objectToSave.PersonId)
            .input('systemPrice', objectToSave.SystemPrice)
            .input('dateFrom', objectToSave.DateFrom)
            .input('dateTo', objectToSave.DateTo)
            .input('deadline', objectToSave.PaymentDaysDeadline)
            .input('priceUnit', objectToSave.PriceUnitId)
            .input('measure', objectToSave.MeasureUnitId)
            .query("EXEC [dbo].[insertCalculation] @Month=@month, @Year=@year, @PersonId=@person, @SystemPrice=@systemPrice, @DateFrom=@dateFrom, @DateTo=@dateTo, @PaymentDaysDeadline=@deadline, @PriceUnitId=@priceUnit, @MeasureUnitId=@measure");

        if (result != null) {
            var calculationId = result.recordset[0].CalculationId;

            await Promise.all(objectToSave.Packages.map(async (p) => {
                const res = await pool.request()
                    .input('name', p.Name)
                    .input('desc', p.Description)
                    .input('price', p.DefaultPackagePrice)
                    .input('calculated', p.PackagePriceCalculated)
                    .input('defUnit', p.DefaultPackagePriceUnitId)
                    .input('measure', p.MeasureUnitId)
                    .input('calc', calculationId)
                    .input('totalPrice', p.TotalPrice)
                    .input('priceUnit', p.DefaultPackagePriceUnitId)
                    .query("exec [dbo].[insertCalculationPackage] @Name=@name, @Description=@desc, @DefaultPackagePrice=@price, @PackagePriceCalculated=@calculated, @DefaultPackagePriceUnitId=@defUnit, @CalculationMeasureUnitId=@measure, @CalculationId=@calc, @TotalPrice=@totalPrice, @PriceUnitId=@priceUnit");

                if (res.recordset[0]) {
                    var packageId = res.recordset[0].CalculationPackageRelationId;

                    await Promise.all(p.Services.map(async (s) => {
                        s.TotalPrice = isNaN(parseFloat(s.PriceRounded)) ? null : s.PriceRounded;

                        await pool.request()
                            .input('name', s.ServiceName ?? s.Name)
                            .input('desc', s.ServiceDescription ?? s.Description)
                            .input('measure', s.MeasureUnitId)
                            .input('cost', s.CostPerUnit)
                            .input('units', s.DefaultNumberOfUnits)
                            .input('qty', s.Quantity)
                            .input('calc', calculationId)
                            .input('totalPrice', s.TotalPrice)
                            .input('priceUnit', s.PriceUnitId)
                            .input('pack', packageId)
                            .query("exec [dbo].[insertCalculationService] @Name=@name, @PackageId=@pack, @Description=@desc, @CostPerUnit=@cost, @DefaultNumberOfUnits=@units, @Quantity=@qty, @MeasureUnitId=@measure, @CalculationId=@calc, @TotalPrice=@totalPrice, @PriceUnitId=@priceUnit")
                    }))
                }
            }));

            await Promise.all(objectToSave.Services.map(async (s) => {
                await pool.request()
                    .input('name', s.ServiceName ?? s.Name)
                    .input('desc', s.ServiceDescription ?? s.Description)
                    .input('measure', s.MeasureUnitId)
                    .input('cost', s.CostPerUnit)
                    .input('units', s.DefaultNumberOfUnits)
                    .input('qty', s.Quantity)
                    .input('calc', calculationId)
                    .input('totalPrice', s.TotalPrice)
                    .input('priceUnit', s.PriceUnitId)
                    .input('pack', undefined)
                    .query("exec [dbo].[insertCalculationService] @Name=@name, @PackageId=@pack, @Description=@desc, @CostPerUnit=@cost, @DefaultNumberOfUnits=@units, @Quantity=@qty, @MeasureUnitId=@measure, @CalculationId=@calc, @TotalPrice=@totalPrice, @PriceUnitId=@priceUnit")
            }));

            await Promise.all(objectToSave.Discounts.map(async (p) => {
                await pool.request()
                    .input('name', p.Name)
                    .input('desc', p.Description)
                    .input('qty', p.Quantity)
                    .input('calc', calculationId)
                    .input('percent', p.PercentCalculation)
                    .query("exec [dbo].[insertCalculationDiscount] @Name=@name, @Description=@desc, @Quantity=@qty, @CalculationId=@calc, @PercentCalculation=@percent")
            }))

            response.json({ Error: false, CalculationId: calculationId });

        } else response.send(getError(50005));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});


router.post('/insertDocumentForCalculation', async (request, response) => {
    try {
        var objectToSave = Object.assign(new DocumentFile, request.body);
        var folderPath = './' + FILES_FOLDER;
        // if folder doesn't exist create it first
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
        //get full path to new folder
        const absolutePath = resolve(folderPath) + "\\";
        const pool = await db;
        const result = await pool.request()
            .input('personId', objectToSave.PersonId)
            .input('name', objectToSave.Name)
            .input('extension', objectToSave.Extension)
            .input('fileType', objectToSave.FileType)
            .input('savePath', absolutePath)
            .input('calculation', objectToSave.CalculationId)
            .query("EXEC [dbo].[insertCalculationDocument] @DocumentName=@name, @PersonId=@personId, @Extension=@extension, @FileType=@fileType, @SavePath=@savePath, @CalculationId=@calculation");
        if (result != null) {
            var documentId = result.recordset[0].Id;
            if (documentId) {
                fs.writeFile(result.recordset[0].Path, objectToSave.Base64, 'base64', function (err) {
                    if (err) response.send(err);
                    else response.json(result.recordset[0]);
                });
            } else response.send(getError(20004));
        }
        else response.send(getError(20004));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;