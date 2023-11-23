const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const { TEMPLATES_FOLDER, FILES_FOLDER } = require("../config/config");
const { resolve } = require("path");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const util = require("util");
const fontkit = require("@pdf-lib/fontkit");

router.post("/generateRequest", async (request, response) => {
  try {
    const inputFile = resolve(
      "./" + TEMPLATES_FOLDER + "/zahtjev-za-smjestaj.pdf"
    );
    const font = resolve("./" + TEMPLATES_FOLDER + "/Roboto-Medium.ttf");
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.body.id)
      .query("EXEC [dbo].[getPerson] @Id=@id");

    if (result.recordset.length > 0) {
      var person = result.recordset[0];
      var data = {
        FirstName: { value: person.FirstName, type: "text" },
        LastName: { value: person.LastName, type: "text" },
        Health_1: { value: 1, type: "bool" },
      };
      var outputFileName = "zahtjev-za-smjestaj-" + person.JMBG + ".pdf";
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
      var folderPath = "./" + FILES_FOLDER;
      // if folder doesn't exist create it first
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
      //get full path to new folder
      const absolutePath = resolve(folderPath) + "\\";
      const res = await pool
        .request()
        .input("personId", person.Id)
        .input("type", 2)
        .input("name", outputFileName)
        .input("extension", "pdf")
        .input("fileType", "data:application/pdf;base64")
        .input("savePath", absolutePath)
        .query(
          "EXEC [dbo].[insertDocument] @Name=@name, @PersonId=@personId, @DocumentTypeId=@type, @Extension=@extension, @FileType=@fileType, @SavePath=@savePath"
        );
      if (res != null) {
        var documentId = res.recordset[0].Id;
        if (documentId) {
          fs.writeFile(res.recordset[0].Path, pdfBytes, (err) => {
            if (err) response.send(err);
            else response.json(res.recordset[0]);
          });
        } else response.send(getError(5003));
      } else response.send(getError(5003));
    }
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

module.exports = router;
