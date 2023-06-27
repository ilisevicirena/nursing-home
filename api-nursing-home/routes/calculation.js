const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');
const { CalculationPaid, CalculationRealPrice, Calculation } = require('../models/Calculation');
const { DocumentFile } = require('../models/Document');

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
            .query("EXEC [dbo].[insertCalculation] @Month=@month, @Year=@year, @PersonId=@personId, @SystemPrice=@systemPrice, @DateFrom=@dateFrom, @DateTo=@dateTo, @PaymentDaysDeadline=@deadline, @PriceUnitId=@priceUnit, @MeasureUnitId=@mesure");

        if (result != null) {
            var calculationId = result.recordset[0].CalculationId;
            var promises = [];

            objectToSave.Packages.forEach(p => {
                promises.push(
                    pool.request()
                        .input('name', p.Name)
                        .input('desc', p.Description)
                        .input('price', p.DefaultPackagePrice)
                        .input('calculated', p.PackagePriceCalculated)
                        .input('defUnit', p.DefaultPackagePriceUnitId)
                        .input('measure', p.CalculationMeasureUnitId)
                        .input('calc', calculationId)
                        .input('totalPrice', p.TotalPrice)
                        .input('priceUnit', p.PriceUnitId)
                        .query("exec [dbo].[insertCalculationPackage] @Name=@name, @Description=@desc, @DefaultPackagePrice=@price, @PackagePriceCalculated=@calculated, @DefaultPackagePriceUnitId=@defUnit, @CalculationMeasureUnitId=@measure, @CalculationId=@calc, @TotalPrice=@totalPrice, @PriceUnitId=@priceUnit")
                );
            });

            objectToSave.Services.forEach(p => {
                promises.push(
                    pool.request()
                        .input('name', p.Name)
                        .input('desc', p.Description)
                        .input('measure', p.MeasureUnitId)
                        .input('cost', p.CostPerUnit)
                        .input('units', p.DefaultNumberOfUnits)
                        .input('qty', p.Quantity)
                        .input('calc', calculationId)
                        .input('totalPrice', p.TotalPrice)
                        .input('priceUnit', p.PriceUnitId)
                        .query("exec [dbo].[insertCalculationService] @Name=@name, @Description=@desc, @CostPerUnit=@cost, @DefaultNumberOfUnits=@units, @Quantity=@qty, @MeasureUnitId=@measure, @CalculationId=@calc, @TotalPrice=@totalPrice, @PriceUnitId=@priceUnit")
                );
            });

            objectToSave.Discounts.forEach(p => {
                promises.push(
                    pool.request()
                        .input('name', p.Name)
                        .input('desc', p.Description)
                        .input('qty', p.Quantity)
                        .input('calc', calculationId)
                        .input('percent', p.PercentCalculation)
                        .query("exec [dbo].[insertCalculationDiscount] @Name=@name, @Description=@desc, @Quantity=@qty, @CalculationId=@calc, @PercentCalculation=@percent")
                );
            });

            Promise.all(promises).then(() => {
                response.json({ Error: false, CalculationId: calculationId });
            });

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