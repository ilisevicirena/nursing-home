const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { resolve } = require("path");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const util = require("util");
const fontkit = require("@pdf-lib/fontkit");
const { TEMPLATES_FOLDER } = require("../config/config");

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
    else response.send(getError(1001));
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
    const inputFile = resolve(
      "./" + TEMPLATES_FOLDER + "/popis-kategorija-template.pdf"
    );
    const font = resolve("./" + TEMPLATES_FOLDER + "/Roboto-Medium.ttf");
    const pool = await db;
    const result = await pool
      .request()
      .query("EXEC [dbo].[getPersonCategories]");

    if (result.recordset) {
      var data = formatDataObject(result.recordset);

      var outputFileName =
        "popis-kateogorija-" + new Date().toISOString() + ".pdf";
      const readFile = util.promisify(fs.readFile);
      function getStuff() {
        return readFile(inputFile);
      }
      const file = await getStuff();
      const pdfDoc = await PDFDocument.load(file);
      const fontBytes = await new Promise((resolve) =>
        fs.readFile(font, (err, data) => {
          if (err) resolve(null);
          else resolve(data);
        })
      );

      let customFont;
      if (fontBytes) {
        pdfDoc.registerFontkit(fontkit);
        await pdfDoc.embedFont(fontBytes);
        customFont = await pdfDoc.embedFont(fontBytes);
      }

      const form = pdfDoc.getForm();
      const rawUpdateFieldAppearances = form.updateFieldAppearances.bind(form);
      form.updateFieldAppearances = function () {
        return rawUpdateFieldAppearances(customFont);
      };

      Object.keys(data).forEach((element) => {
        if (data[element].type === "text") {
          var field = form.getTextField(element);
          field.setText(data[element].value);
        } else if (data[element].type === "bool") {
          var field = form.getCheckBox(element);
          if (data[element].value == 1) field.check();
        }
      });

      const pdfBytes = await pdfDoc.save();
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

function bytesToBase64(bytes) {
  const buffer = Buffer.from(bytes);
  const base64String = buffer.toString("base64");

  return base64String;
}

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
