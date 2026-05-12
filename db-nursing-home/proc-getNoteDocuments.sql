create PROCEDURE [dbo].[getNoteDocuments]
(
    @NoteId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        [NoteId] = n.[Id],
        [Id] = ndr.[DocumentId],
        [Name] = d.[Name],
        [DocumentTypeId] = d.[DocumentTypeId],
        [DocumentTypeName] = dt.[Name],
        [Path] = d.[Path],
        [StorageName] = d.[StorageName],
        [CreationDate] = d.[CreationDate],
        [Extension] = d.[Extension],
        [FileType] = d.[FileType],
        [PersonFirstName] = CASE 
                                WHEN d.[UserId] IS NOT NULL THEN u.[FirstName] 
                                ELSE p.[FirstName] 
                            END,
        [PersonLastName] = CASE 
                               WHEN d.[UserId] IS NOT NULL THEN u.[LastName] 
                               ELSE p.[LastName] 
                           END
    FROM 
        dbo.[NoteDocumentRelation] AS ndr
    LEFT JOIN 
        dbo.[Note] AS n ON n.[Id] = ndr.[NoteId]
    LEFT JOIN 
        dbo.[Document] AS d ON ndr.[DocumentId] = d.[Id]
    LEFT JOIN 
        dbo.[DocumentType] AS dt ON d.[DocumentTypeId] = dt.[Id]
    LEFT JOIN 
        dbo.[Person] AS p ON d.[PersonId] = p.[Id]
    LEFT JOIN 
        dbo.[User] AS u ON d.[UserId] = u.[Id]
    WHERE 
        ndr.[NoteId] = @NoteId;

END
