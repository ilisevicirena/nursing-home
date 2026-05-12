var config = require("./config");
var sql = require("mssql");

const db = new sql.ConnectionPool(config.CONFIG)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

function authedRequest(pool, userId) {
  const req = pool.request();
  if (userId) {
    req.input("ActingUserId", sql.NChar(36), userId);
  }
  return req;
}

module.exports = {
  sql,
  db,
  authedRequest,
};
