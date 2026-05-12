require("dotenv").config();

const CONFIG = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  authentication: {
    type: process.env.DB_AUTH_TYPE || "ntlm",
    options: {
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      domain: process.env.DB_DOMAIN,
    },
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
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
