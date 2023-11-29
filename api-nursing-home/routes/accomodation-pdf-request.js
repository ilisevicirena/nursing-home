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

const HealthConditionOtherId = 8;

function formatDataObject(
  person,
  payPerson,
  guardian,
  conditions,
  category,
  type,
  city
) {
  var data = {};
  var options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  Object.keys(person).forEach(function (key) {
    if (key == "Id") return;
    else if (key == "JMBG") {
      var jmbgParsed = person[key].split("");
      for (let index = 0; index < jmbgParsed.length; index++) {
        const element = jmbgParsed[index];
        var keyName = "Jmbg_" + parseInt(index + 1);
        data[keyName] = { value: element, type: "text" };
      }
    } else if (key == "BirthDate") {
      var birthDate = new Date(person.BirthDate)
        .toLocaleDateString("en-US", options)
        .replaceAll("/", "")
        .split("");
      for (let index = 0; index < birthDate.length; index++) {
        const element = birthDate[index];
        var keyName = "BirthDate_" + parseInt(index + 1);
        data[keyName] = { value: element, type: "text" };
      }
    } else data[key] = { value: person[key] ?? "-", type: "text" };
  });

  if (payPerson) {
    Object.keys(payPerson).forEach(function (key) {
      if (key == "Jmbg") {
        var jmbgParsed = payPerson[key].split("");
        for (let index = 0; index < jmbgParsed.length; index++) {
          const element = jmbgParsed[index];
          var keyName = "PayJmbg_" + parseInt(index + 1);
          data[keyName] = { value: element, type: "text" };
        }
      } else data[key] = { value: payPerson[key] ?? "-", type: "text" };
    });
  }

  if (guardian) {
    Object.keys(guardian).forEach(function (key) {
      if (key == "Jmbg") {
        var jmbgParsed = guardian[key].split("");
        for (let index = 0; index < jmbgParsed.length; index++) {
          const element = jmbgParsed[index];
          var keyName = "GuardianJmbg_" + parseInt(index + 1);
          data[keyName] = { value: element, type: "text" };
        }
      } else data[key] = { value: guardian[key] ?? "-", type: "text" };
    });
  }

  if (conditions) {
    conditions.forEach((element) => {
      var keyName = "Health_" + element.HealthConditionId;
      data[keyName] = { value: 1, type: "bool" };
      if (element.HealthConditionId == HealthConditionOtherId)
        data["Health_Other"] = {
          value: element.Description ?? "-",
          type: "text",
        };
    });
  }

  if (cat) {
    var cat = "Category_" + category.PersonCategoryId;
    data[cat] = { value: 1, type: "bool" };
  }

  if (type) {
    var typ = "Accommodation_" + type.AccommodationTypeId;
    data[typ] = { value: 1, type: "bool" };
  }

  data["CreatedCity"] = { value: city, type: "text" };
  var date = new Date()
    .toLocaleDateString("hr-HR", options)
    .replaceAll(" ", "");
  data["CreatedDate"] = {
    value: date,
    type: "text",
  };

  return data;
}

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
      .query("EXEC [dbo].[getAccommodationRequestData] @PersonId=@id");

    if (result.recordsets.length > 0) {
      var person = result.recordsets[0][0];
      var obligeeToPay = result.recordsets[1][0];
      var guardian = result.recordsets[2][0];
      var conditions = result.recordsets[3];
      var category = result.recordsets[4][0];
      var accommodation = result.recordsets[5][0];

      var data = formatDataObject(
        person,
        obligeeToPay,
        guardian,
        conditions,
        category,
        accommodation,
        request.body.city
      );

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
