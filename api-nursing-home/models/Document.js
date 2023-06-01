class DocumentFile {
    constructor(id, personId, documentTypeId, name, extension, fileType, base64) {
        this.Id = id;
        this.Name = name;
        this.PersonId = personId;
        this.DocumentTypeId = documentTypeId;
        this.Extension = extension;
        this.FileType = fileType;
        this.Base64 = base64;
    }
}

module.exports = {
    DocumentFile
}