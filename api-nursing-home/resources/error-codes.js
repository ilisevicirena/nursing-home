class CodeMessage {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

function getError(code) {
  var err = errors.find((x) => x.code == code);
  var error = "Error " + code + ": " + err?.message;
  return err ? error : "Unknown error " + code;
}

var errors = [
  // floor error codes starting with 1000
  new CodeMessage(1001, "Error while iserting new floor into database."),
  new CodeMessage(1002, "Error while deleting floor from database."),
  new CodeMessage(1003, "Error while updating floor in database."),

  // room error codes starting with 2000
  new CodeMessage(2001, "Error while iserting new room into database."),
  new CodeMessage(2002, "Error while deleting room from database."),
  new CodeMessage(2003, "Error while updating room in database."),
  new CodeMessage(
    2004,
    "Error while fetching avaliable rooms from database. Invalid number of datasets."
  ),

  // contact error codes starting with 3000
  new CodeMessage(3001, "Error while iserting new contact into database."),
  new CodeMessage(3002, "Error while deleting contact from database."),
  new CodeMessage(3003, "Error while updating contact in database."),

  // discount error codes starting with 4000
  new CodeMessage(4001, "Error while iserting new discount into database."),
  new CodeMessage(4002, "Error while deleting discount from database."),

  // document error codes starting with 5000
  new CodeMessage(5001, "Document not found in storage folder."),
  new CodeMessage(5002, "Document not found in database."),
  new CodeMessage(5003, "Error while inserting new document in database."),
  new CodeMessage(
    5004,
    "Error while fetching documents for person from database."
  ),
  new CodeMessage(
    5005,
    "Error while fetching documents for person by document type from database."
  ),
  new CodeMessage(5006, "Error while fetching document types from database."),
  new CodeMessage(
    5007,
    "Error while fetching document types for person from database."
  ),
  new CodeMessage(5008, "Error while deleting document from storage folder."),
  new CodeMessage(5009, "Error while deleting document in database."),
  new CodeMessage(
    5010,
    "Error while fetching document for delete in database."
  ),

  // notification error codes starting with 6000
  new CodeMessage(
    6001,
    "Error while marking notification as read in database."
  ),
  new CodeMessage(
    6002,
    "Error while marking ass notifications as read in database."
  ),

  // packages error codes starting with 7000
  new CodeMessage(7001, "Error while inserting new package into database."),
  new CodeMessage(7002, "Error while updating package in database."),
  new CodeMessage(7003, "Error while deleting package from database."),

  // person error codes starting with 8000
  new CodeMessage(8001, "Error while inserting new person into database."),
  new CodeMessage(8002, "Error while deleting person from database."),
  new CodeMessage(8003, "Error while updating person in database."),
  new CodeMessage(8004, "Error while changeing person status in database."),
  new CodeMessage(8005, "Error while changeing person room in database."),
  new CodeMessage(
    8006,
    "Error while deactivating room for person in database."
  ),

  // services management error codes starting with 9000
  new CodeMessage(
    9001,
    "Error while fetching packages and services for person from database. Fetching resulted with invalid number of datasets"
  ),

  // services error codes starting with 10000
  new CodeMessage(10001, "Error while inserting new service into database."),
  new CodeMessage(10002, "Error while updateing service in database."),
  new CodeMessage(10003, "Error while deleting service from database."),

  // note error codes starting with 20000
  new CodeMessage(
    20001,
    "Error while fetching notes for person from database. Fetching resulted with invalid number of datasets."
  ),
  new CodeMessage(
    20002,
    "Error while while inserting new tag for note into database."
  ),
  new CodeMessage(
    20003,
    "Error while deleting document from note in database."
  ),
  new CodeMessage(
    20004,
    "Error while inserting document for note into database."
  ),
  new CodeMessage(20005, "Error while inserting new note into database."),
  new CodeMessage(20006, "Error while updateing note in database."),

  // tags error codes starting with 30000
  new CodeMessage(30001, "Error while while deactivating tag in database."),
  new CodeMessage(30002, "Error while inserting new tag into database."),
  new CodeMessage(30003, "Error while updateing tag in database."),

  // events error codes starting with 40000
  new CodeMessage(40001, "Error while inserting new event into database."),
  new CodeMessage(40002, "Error while updateing event in database."),
  new CodeMessage(40003, "Error while deleting event in database."),

  // calculation error codes starting with 50000
  new CodeMessage(
    50001,
    "Error while marking calculation as paid in database."
  ),
  new CodeMessage(
    50002,
    "Error while insertnig calculation real price in database."
  ),
  new CodeMessage(50003, "Error while cancelling calculation in database."),
  new CodeMessage(
    50004,
    "Error while fetching calculation details from database. Invalid number of datasets."
  ),
  new CodeMessage(
    50005,
    "Error while inserting new calculation into database."
  ),
  new CodeMessage(
    50006,
    "Error while fetching calculation summary from database. Invalid number of datasets."
  ),

  // summary error codes starting with 60000
  new CodeMessage(
    60001,
    "Error while fetching dashboard summary from database. Invalid number of datasets."
  ),

  // accomodation pdf request error codes starting with 70000
  new CodeMessage(
    70001,
    "Error while fetching dashboard summary from database. Invalid number of datasets."
  ),

  // cities error codes starting with 80000
  new CodeMessage(80001, "Error while iserting new city into database."),
  new CodeMessage(80002, "Error while deleting city from database."),
  new CodeMessage(80003, "Error while updating city in database."),

  // doctor visits error codes starting with 90000
  new CodeMessage(
    90001,
    "Error while fetching doctors and nurses from database. Invalid number of datasets."
  ),
  new CodeMessage(
    90002,
    "Error while fetching doctor visit summary from database. Invalid number of datasets."
  ),
  new CodeMessage(
    90003,
    "Error while iserting new doctor visit into database."
  ),
  new CodeMessage(90004, "Error while deleting doctor visit from database."),
  new CodeMessage(90005, "Error while completing doctor visit in database."),
  new CodeMessage(
    90006,
    "Error while fetching doctors visit tour details from database. Invalid number of datasets."
  ),
  new CodeMessage(
    90007,
    "Error while inserting doctor visit for person in database."
  ),

  // employees error codes starting with 100000
  new CodeMessage(100001, "Error while iserting new employee into database."),
  new CodeMessage(100002, "Error while deleting employee from database."),
  new CodeMessage(100003, "Error while updating employee in database."),
  new CodeMessage(
    100004,
    "Error while changing status of employee in database."
  ),

  // employment types codes starting with 110000
  new CodeMessage(
    110001,
    "Error while iserting new employment type into database."
  ),
  new CodeMessage(
    110002,
    "Error while deleting employment type from database."
  ),
  new CodeMessage(110003, "Error while updating employment type in database."),

  // health conditions codes starting with 120000
  new CodeMessage(
    120001,
    "Error while iserting new health condition into database."
  ),
  new CodeMessage(
    120002,
    "Error while deleting health condition from database."
  ),
  new CodeMessage(120003, "Error while updating health condition in database."),
  new CodeMessage(
    120004,
    "Error while inserting health condition for person in database."
  ),

  // job positions error codes starting with 130000
  new CodeMessage(
    130001,
    "Error while iserting new job position into database."
  ),
  new CodeMessage(130002, "Error while deleting job position from database."),
  new CodeMessage(130003, "Error while updating job position in database."),

  // municipalities error codes starting with 140000
  new CodeMessage(
    140001,
    "Error while iserting new municipality into database."
  ),
  new CodeMessage(140002, "Error while deleting municipality from database."),
  new CodeMessage(140003, "Error while updating municipality in database."),

  // person categories codes starting with 150000
  new CodeMessage(
    150001,
    "Error while iserting new person category for person into database."
  ),
  new CodeMessage(
    150002,
    "Error while deleting person category from database."
  ),
  new CodeMessage(150003, "Error while updating person category in database."),

  // qualifications error codes starting with 160000
  new CodeMessage(
    160001,
    "Error while iserting qualification position into database."
  ),
  new CodeMessage(160002, "Error while deleting qualification from database."),
  new CodeMessage(160003, "Error while updating qualification in database."),

  // vacations error codes starting with 170000
  new CodeMessage(170001, "Error while iserting new vacation into database."),
  new CodeMessage(170002, "Error while deleting vacation from database."),
  new CodeMessage(170003, "Error while updating vacation in database."),
  new CodeMessage(170004, "Error while changing vacation status in database."),
];

module.exports = {
  getError,
};
