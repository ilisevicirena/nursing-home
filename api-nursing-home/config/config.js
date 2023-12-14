const CONFIG = {
  driver: "msnodesqlv8",
  connectionString:
    "Driver={SQL Server Native Client 11.0};Server=LAPTOP-F98M3C9R;Database=ENV04_NURSING_HOME;Trusted_Connection=yes;",
  connectionTimeout: 30000,
};

const FILES_FOLDER = "files";
const TEMPLATES_FOLDER = "templates";
module.exports = { CONFIG, FILES_FOLDER, TEMPLATES_FOLDER };
