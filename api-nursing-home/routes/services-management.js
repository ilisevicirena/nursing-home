const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { ServicesManagement } = require("../models/ServicesManagement");

router.get("/getPackageAndServicesForPerson", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.PersonId)
      .query("EXEC [dbo].[getServicesAndPackagesForPerson] @Id=@id");
    if (result.recordsets.length == 5)
      response.json({
        Packages: result.recordsets[0],
        PackagesServices: result.recordsets[1],
        Services: result.recordsets[2],
        Discounts: result.recordsets[3],
        OfferMeasureUnit: result.recordsets[4],
      });
    else response.send(getError(9001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getDiscountsForPerson", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.PersonId)
      .query("EXEC [dbo].[getDiscountsForPerson] @PersonId=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/update", async (request, response) => {
  try {
    var objectToSave = Object.assign(new ServicesManagement(), request.body);
    const pool = await db;

    var packagesToDeactivate = objectToSave.Packages.filter(
      (x) => x.IsDeleted == true
    );
    var servicesToDeactivate = objectToSave.Services.filter(
      (x) => x.IsDeleted == true || x.IsChanged
    );
    var discountsToDeactivate = objectToSave.Discounts.filter(
      (x) => x.IsDeleted == true
    );
    var packagesToAdd = objectToSave.Packages.filter((x) => x.IsNew == true);
    var discountsToAdd = objectToSave.Discounts.filter(
      (x) => x.IsNew == true && !x.IsDeleted
    );
    var servicesToAdd = objectToSave.Services.filter(
      (x) => x.IsNew == true || x.IsChanged
    );
    var promises = [];

    packagesToDeactivate.forEach((element) => {
      promises.push(
        pool
          .request()
          .input("id", element.Id)
          .input("person", objectToSave.PersonId)
          .query(
            "exec [dbo].[deactivatePackageForPerson] @PackageId=@id, @PersonId=@person"
          )
      );
    });

    servicesToDeactivate.forEach((element) => {
      promises.push(
        pool
          .request()
          .input("id", element.Id)
          .input("person", objectToSave.PersonId)
          .query(
            "exec [dbo].[deactivateServiceForPerson] @ServiceId=@id, @PersonId=@person"
          )
      );
    });

    discountsToDeactivate.forEach((element) => {
      promises.push(
        pool
          .request()
          .input("id", element.Id)
          .input("person", objectToSave.PersonId)
          .query(
            "exec [dbo].[deactivateDiscountForPerson] @DiscountId=@id, @PersonId=@person"
          )
      );
    });

    packagesToAdd.forEach((element) => {
      promises.push(
        pool
          .request()
          .input("packageId", element.Id)
          .input("person", objectToSave.PersonId)
          .query(
            "exec [dbo].[insertPackageForPerson] @PackageId=@packageId, @PersonId=@person"
          )
      );
    });

    discountsToAdd.forEach((element) => {
      promises.push(
        pool
          .request()
          .input("id", element.Id)
          .input("person", objectToSave.PersonId)
          .query(
            "exec [dbo].[insertDiscountForPerson] @DiscountId=@id, @PersonId=@person"
          )
      );
    });

    servicesToAdd.forEach((element) => {
      promises.push(
        pool
          .request()
          .input("service", element.Id)
          .input("person", objectToSave.PersonId)
          .input("qty", element.Quantity)
          .query(
            "exec [dbo].[insertServiceForPerson] @ServiceId=@service, @PersonId=@person, @Quantity=@qty"
          )
      );
    });

    promises.push(
      pool
        .request()
        .input("person", objectToSave.PersonId)
        .input("unit", objectToSave.MeasureUnitId)
        .query(
          "exec [dbo].[insertOfferMeasureUnitForPerson] @PersonId=@person, @MeasureUnitId=@unit"
        )
    );

    Promise.all(promises).then(() => {
      response.json({ error: false });
    });
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
