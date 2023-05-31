class Document {
    constructor(personId, documentTypeId, name, extension, fileType) {
        this.Name = name;
        this.PersonId = personId;
        this.DocumentTypeId = documentTypeId;
        this.Extension = extension;
        this.FileType = fileType;
    }
}

module.exports = {
    Document
}