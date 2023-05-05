const express = require('express');
const router = express.Router();
const { db } = require('../config/framework');
const { getError } = require('../resources/error-codes');
const { Package } = require('../models/Package');

router.get('/', async (request, response) => {
    try {
        const pool = await db;
        const result = await pool.request()
            .query("EXEC [dbo].[getPackages]");
        response.json(result.recordset);
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/add', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Package, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('name', objectToSave.Name)
            .input('description', objectToSave.Description)
            .input('priceCalculated', objectToSave.PackagePriceCalculated)
            .input('default', objectToSave.DefaultPackagePriceUnitId)
            .input('price', objectToSave.DefaultPackagePrice)
            .input('measure', objectToSave.CalculationMeasureUnitId)
            .query("EXEC [dbo].[insertPackage] @Name=@name, @Description=@description, @PackagePriceCalculated=@priceCalculated, @DefaultPackagePriceUnitId=@default, @DefaultPackagePrice=@price, @CalculationMeasureUnitId=@measure");
        if (result != null) {
            var packageId = result.recordset[0].PackageId;
            var promises = [];
            if (packageId) {
                objectToSave.Services.forEach(element => {
                    promises.push(pool.request()
                        .input('service', element.ServiceId)
                        .input('package', packageId)
                        .input('qty', element.Quantity)
                        .query("exec [dbo].[insertServiceForPackage] @ServiceId=@service, @PackageId=@package, @Quantity=@qty")
                    );
                });

                Promise.all(promises).then(() => {
                    response.json(result.recordset[0]);
                });
            }

        }
        else response.send(getError(1001));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.post('/update', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Package, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .input('name', objectToSave.Name)
            .input('description', objectToSave.Description)
            .input('priceCalculated', objectToSave.PackagePriceCalculated)
            .input('default', objectToSave.DefaultPackagePriceUnitId)
            .input('price', objectToSave.DefaultPackagePrice)
            .input('measure', objectToSave.CalculationMeasureUnitId)
            .query("EXEC [dbo].[updatePackage] @Id=@id, @Name=@name, @Description=@description, @PackagePriceCalculated=@priceCalculated, @DefaultPackagePriceUnitId=@default, @DefaultPackagePrice=@price, @CalculationMeasureUnitId=@measure");
        if (result != null) response.json(result.recordset);
        else response.send(getError(1003));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

router.delete('/delete', async (request, response) => {
    try {
        var objectToSave = Object.assign(new Package, request.body);
        const pool = await db;
        const result = await pool.request()
            .input('id', objectToSave.Id)
            .query("EXEC [dbo].[deactivatePackage] @Id=@id");
        if (result != null) response.json(result.recordset);
        else response.send(getError(2002));
    } catch (err) {
        response.status(500);
        response.send(err.message);
    }
});

module.exports = router;