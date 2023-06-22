class CodeMessage {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

function getError(code) {
    var err = errors.find(x => x.code == code);
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
    new CodeMessage(2004, "Error while fetching avaliable rooms from database. Invalid number of datasets."),

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
    new CodeMessage(5004, "Error while fetching documents for person from database."),
    new CodeMessage(5005, "Error while fetching documents for person by document type from database."),
    new CodeMessage(5006, "Error while fetching document types from database."),
    new CodeMessage(5007, "Error while fetching document types for person from database."),
    new CodeMessage(5008, "Error while deleting document from storage folder."),
    new CodeMessage(5009, "Error while deleting document in database."),
    new CodeMessage(5010, "Error while fetching document for delete in database."),

    // notification error codes starting with 6000
    new CodeMessage(6001, "Error while marking notification as read in database."),
    new CodeMessage(6002, "Error while marking ass notifications as read in database."),

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
    new CodeMessage(8006, "Error while deactivating room for person in database."),

    // services management error codes starting with 9000
    new CodeMessage(9001, "Error while fetching packages and services for person from database. Fetching resulted with invalid number of datasets"),

    // services error codes starting with 10000
    new CodeMessage(10001, "Error while inserting new service into database."),
    new CodeMessage(10002, "Error while updateing service in database."),
    new CodeMessage(10003, "Error while deleting service from database."),

    // note error codes starting with 20000
    new CodeMessage(20001, "Error while fetching notes for person from database. Fetching resulted with invalid number of datasets."),
    new CodeMessage(20002, "Error while while inserting new tag for note into database."),
    new CodeMessage(20003, "Error while deleting document from note in database."),
    new CodeMessage(20004, "Error while inserting document for note into database."),
    new CodeMessage(20005, "Error while inserting new note into database."),
    new CodeMessage(20006, "Error while updateing note in database."),

    // tags error codes starting with 30000
    new CodeMessage(30001, "Error while while deactivating tag in database."),
    new CodeMessage(30002, "Error while inserting new tag into database."),
    new CodeMessage(30003, "Error while updateing tag in database."),

    // events error codes starting with 40000
    new CodeMessage(40001, "Error while inserting new event into database."),
    new CodeMessage(40002, "Error while updateing event in database."),

];

module.exports = {
    getError,
}