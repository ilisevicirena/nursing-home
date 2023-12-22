const CONFIG = {
  driver: "msnodesqlv8",
  connectionString:
    "Driver={SQL Server Native Client 11.0};Server=LAPTOP-F98M3C9R;Database=ENV04_NURSING_HOME;Trusted_Connection=yes;",
  connectionTimeout: 30000,
};

const FILES_FOLDER = "files";
const TEMPLATES_FOLDER = "templates";
const ACCOMMODATION_REQUEST_FILENAME = "zahtjev-za-smjestaj";
const ACCOMMODATION_REQUEST_TEMPLATE = "zahtjev-za-smjestaj.pdf";
const CATEGORIES_TEMPLATE = "popis-kategorija-template.pdf";
const CATEGORIES_FILENAME = "popis-kateogorija";
const FONT_FILENAME = "Roboto-Medium.ttf";

module.exports = {
  CONFIG,
  FILES_FOLDER,
  TEMPLATES_FOLDER,
  ACCOMMODATION_REQUEST_FILENAME,
  ACCOMMODATION_REQUEST_TEMPLATE,
  FONT_FILENAME,
  CATEGORIES_TEMPLATE,
  CATEGORIES_FILENAME,
};
