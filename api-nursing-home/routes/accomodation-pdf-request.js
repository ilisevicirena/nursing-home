const express = require("express");
const router = express.Router();
const { db } = require("../config/framework");
const { getError } = require("../resources/error-codes");
const {
  TEMPLATES_FOLDER,
  ACCOMMODATION_REQUEST_FILENAME,
  ACCOMMODATION_REQUEST_TEMPLATE,
} = require("../config/config");
const { resolve } = require("path");
const fs = require("fs");
const {
  getAbsolutePathToFilesFolder,
  fillPdfForm,
} = require("../resources/functions");

const HealthConditionOtherId = 8;

router.post("/generateRequest", async (request, response) => {
  try {
    // get data for request form DB
    const pool = await db;
    const result = await pool
      .request()
      .input("id", request.body.id)
      .query("EXEC [dbo].[getAccommodationRequestData] @PersonId=@id");

    if (result.recordsets.length == 6) {
      var person = result.recordsets[0][0];
      var data = formatDataObject(
        person,
        result.recordsets[1][0],
        result.recordsets[2][0],
        result.recordsets[3],
        result.recordsets[4][0],
        result.recordsets[5][0],
        request.body.city
      );

      // resolve paths and fill form
      const inputFile = resolve(
        "./" + TEMPLATES_FOLDER + "/" + ACCOMMODATION_REQUEST_TEMPLATE
      );
      const outputFileName =
        ACCOMMODATION_REQUEST_FILENAME + "-" + person.JMBG + ".pdf";
      const pdfBytes = await fillPdfForm(data, inputFile);

      // save file to db and to filesystem
      const absolutePath = getAbsolutePathToFilesFolder();

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
    } else response.send(getError(70001));
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});

// ---------------------------------------------------------------- HELPER FUNCTIONS ----------------------------------------------------------------

function formatDataObject(
  person,
  payPerson,
  guardian,
  conditions,
  category,
  accommodationType,
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
    else if (key == "JMBG" && person[key]) {
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
      if (key == "Jmbg" && payPerson[key]) {
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
      if (key == "Jmbg" && guardian[key]) {
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

  if (category) {
    var cat = "Category_" + category.PersonCategoryId;
    data[cat] = { value: 1, type: "bool" };
  }

  if (accommodationType) {
    var typ = "Accommodation_" + accommodationType.AccommodationTypeId;
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

module.exports = router;
