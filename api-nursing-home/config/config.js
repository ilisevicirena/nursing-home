const CONFIG = {
    driver: "msnodesqlv8",
    connectionString: 'Driver={SQL Server Native Client 11.0};Server=LAPTOP-F98M3C9R;Database=ENV01_NURSING_HOME;Trusted_Connection=yes;',
    connectionTimeout: 30000,
};

const FILES_FOLDER = "files";
module.exports = { CONFIG, FILES_FOLDER };