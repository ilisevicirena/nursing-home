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
    new CodeMessage(1002, "Error while deleting new floor from database."),
    new CodeMessage(1003, "Error while updating new floor in database."),
];

module.exports = {
    getError,
}