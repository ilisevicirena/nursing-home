const fs = require("fs");
const { resolve } = require("path");
const {
  TEMPLATES_FOLDER,
  FILES_FOLDER,
  FONT_FILENAME,
} = require("../config/config");
const { PDFDocument } = require("pdf-lib");
const util = require("util");
const fontkit = require("@pdf-lib/fontkit");

function getAbsolutePathToFilesFolder() {
  var folderPath = "./" + FILES_FOLDER;
  // if folder doesn't exist create it first
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
  //get full path to new folder
  const absolutePath = resolve(folderPath) + "\\";

  return absolutePath;
}

function readInputFile(inputFile) {
  const readFile = util.promisify(fs.readFile);
  return readFile(inputFile);
}

function getFileBytes(file) {
  return new Promise((resolve) =>
    fs.readFile(file, (err, data) => {
      if (err) resolve(null);
      else resolve(data);
    })
  );
}

async function getCustomFont(pdfDoc) {
  const font = resolve("./" + TEMPLATES_FOLDER + "/" + FONT_FILENAME);
  const fontBytes = await getFileBytes(font);
  pdfDoc.registerFontkit(fontkit);
  await pdfDoc.embedFont(fontBytes);

  return await pdfDoc.embedFont(fontBytes);
}

async function fillPdfForm(data, inputFile) {
  const file = await readInputFile(inputFile);
  const pdfDoc = await PDFDocument.load(file);
  const customFont = await getCustomFont(pdfDoc);
  const form = pdfDoc.getForm();
  const rawUpdateFieldAppearances = form.updateFieldAppearances.bind(form);

  form.updateFieldAppearances = function () {
    return rawUpdateFieldAppearances(customFont);
  };

  Object.keys(data).forEach((element) => {
    if (form.getFieldMaybe(element)) {
      if (data[element].type === "text") {
        var field = form.getTextField(element);
        field.setText(data[element].value);
      } else if (data[element].type === "bool") {
        var field = form.getCheckBox(element);
        if (data[element].value == 1) field.check();
      }
    }
  });

  return await pdfDoc.save();
}

function bytesToBase64(bytes) {
  const buffer = Buffer.from(bytes);
  const base64String = buffer.toString("base64");

  return base64String;
}

module.exports = {
  getAbsolutePathToFilesFolder,
  readInputFile,
  getFileBytes,
  getCustomFont,
  fillPdfForm,
  bytesToBase64,
};
