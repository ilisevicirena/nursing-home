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
];

module.exports = {
    getError,
}