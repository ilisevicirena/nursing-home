class DocumentFile {
  constructor(
    id,
    personId,
    documentTypeId,
    name,
    extension,
    fileType,
    base64,
    noteId,
    userId
  ) {
    this.Id = id;
    this.Name = name;
    this.PersonId = personId;
    this.DocumentTypeId = documentTypeId;
    this.Extension = extension;
    this.FileType = fileType;
    this.Base64 = base64;
    this.NoteId = noteId;
    this.UserId = userId;
  }
}

module.exports = {
  DocumentFile,
};
