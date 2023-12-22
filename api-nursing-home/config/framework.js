var config = require("./config");
var sql = require("mssql/msnodesqlv8");

const db = new sql.ConnectionPool(config.CONFIG)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    pool.request().query("EXEC [dbo].[dailyNotificationCheck]");

    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
  sql,
  db,
};
