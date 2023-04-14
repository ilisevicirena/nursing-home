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

];

module.exports = {
    getError,
}