create PROCEDURE [dbo].[insertDocumentForNote]
(
    @PersonId INT,
    @DocumentTypeId INT,
    @DocumentName VARCHAR(50),
    @Extension VARCHAR(10),
    @FileType VARCHAR(50),
    @SavePath VARCHAR(MAX),
    @NoteId INT,
    @UserId UNIQUEIDENTIFIER, -- Added parameter for UserId
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DocumentId INT;
    DECLARE @NoteDocumentRelationId INT;

    -- Declare a table variable to store the result of the insertDocument procedure
    DECLARE @DocumentTable TABLE (
        Id INT,
        Path VARCHAR(MAX),
        StorageName VARCHAR(200)
    );

    -- Insert document and get the document ID and path
    INSERT INTO @DocumentTable
    EXEC [dbo].[insertDocument] @PersonId, @DocumentTypeId, @DocumentName, @Extension, @FileType, @SavePath, @UserId;

    -- Get the document ID from the first row of the result
    SELECT TOP 1 @DocumentId = Id
    FROM @DocumentTable;

    -- Insert into NoteDocumentRelation
    INSERT INTO dbo.NoteDocumentRelation (NoteId, DocumentId)
    VALUES (@NoteId, @DocumentId);

    -- Get the scope ID of the inserted NoteDocumentRelation row
    SET @NoteDocumentRelationId = SCOPE_IDENTITY();

    -- Return the inserted document details and NoteDocumentRelationId
    SELECT * FROM @DocumentTable;
    SELECT @NoteDocumentRelationId AS NoteDocumentRelationId;

    EXEC dbo.logUserActivity 'INSERT_DOCUMENT_FOR_NOTE', 'Document added to note', @ActingUserId;
END
