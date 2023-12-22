const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { resolve } = require("path");
const {
  TEMPLATES_FOLDER,
  CATEGORIES_TEMPLATE,
  CATEGORIES_FILENAME,
} = require("../config/config");
const { fillPdfForm, bytesToBase64 } = require("../resources/functions");

router.get("/", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getPersonCategories]");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.post("/insertForPerson", async (request, response) => {
  try {
    var objectToSave = request.body;
    const pool = await db;
    const result = await pool
      .request()
      .input("category", objectToSave.PersonCategoryId)
      .input("person", objectToSave.PersonId)
      .query(
        "EXEC [dbo].[insertCategoryForPerson] @CategoryId=@category, @PersonId=@person"
      );
    if (result != null) response.json(result.recordset[0]);
    else response.send(getError(150001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/getForPerson", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.query.PersonId)
      .query("EXEC [dbo].[getCategoryForPerson] @PersonId=@id");
    response.json(result.recordset);
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

router.get("/generateTemplate", async (request, response) => {
  try {
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getPersonCategories]");

    if (result.recordset) {
      var data = formatDataObject(result.recordset);

      const inputFile = resolve(
        "./" + TEMPLATES_FOLDER + "/" + CATEGORIES_TEMPLATE
      );
      const outputFileName =
        CATEGORIES_FILENAME + "-" + new Date().toISOString() + ".pdf";
      const pdfBytes = await fillPdfForm(data, inputFile);
      const base64Result = bytesToBase64(pdfBytes);

      response.send({
        filename: outputFileName,
        base64: base64Result,
      });
    }
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

function formatDataObject(response) {
  var data = {};

  response.forEach((element, index) => {
    var keyName1 = "Name_" + parseInt(index + 1);
    var keyName2 = "Description_" + parseInt(index + 1);
    data[keyName1] = { value: element.Name, type: "text" };
    data[keyName2] = { value: element.Description, type: "text" };
  });

  return data;
}

module.exports = router;
