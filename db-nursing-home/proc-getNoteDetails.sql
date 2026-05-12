create PROCEDURE [dbo].[getNoteDetails]
(
    @Id INT
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Select all notes for the person, sorted so favorites are at the top, and the rest sorted by modified date
    SELECT 
        [Id] = n.Id,
        [Title] = n.Title,
        [Text] = n.[Text],
        [CreationDate] = n.CreationDate,
        [LastModified] = n.LastModified,
        [PersonId] = n.PersonId,
        [PersonFirstName] = CASE 
                                WHEN n.UserId IS NOT NULL THEN u.FirstName 
                                ELSE p.FirstName 
                             END,
        [PersonLastName] = CASE 
                                WHEN n.UserId IS NOT NULL THEN u.LastName 
                                ELSE p.LastName 
                             END,
        [IsFavorite] = CASE WHEN t1.NoteId IS NULL THEN 0 ELSE 1 END,
        [Attachments] = ISNULL(t2.NoOfDocs, 0),
        [UserId] = n.UserId
    FROM dbo.Note AS n
    LEFT JOIN dbo.Person AS p ON n.PersonId = p.Id
    LEFT JOIN dbo.[User] AS u ON n.UserId = u.Id -- Join with User table
    LEFT JOIN dbo.FavoriteNotes AS t1 ON n.Id = t1.NoteId AND t1.NoteId IS NOT NULL
    LEFT JOIN (SELECT COUNT(Id) as NoOfDocs, NoteId FROM dbo.NoteDocumentRelation GROUP BY NoteId) as t2 ON t2.NoteId = n.Id
    WHERE n.Id = @Id;
    
    -- Select all note tags
    SELECT 
        [NoteId] = n.Id,
        [Id] = ntr.TagId,
        [Name] = nt.[Name],
        [Color] = nt.Color
    FROM dbo.Note AS n
    LEFT JOIN dbo.NoteTagRelation AS ntr ON n.Id = ntr.NoteId
    LEFT JOIN dbo.NotesTag AS nt ON ntr.TagId = nt.Id
    WHERE n.Id = @Id AND nt.Active = 1;

    -- Select all note documents
    SELECT 
        [NoteId] = n.Id,
        [Id] = ndr.DocumentId,
        [Name] = d.[Name],
        [DocumentTypeId] = d.DocumentTypeId,
        [DocumentTypeName] = dt.[Name],
        [Path] = d.[Path],
        [StorageName] = d.StorageName,
        [CreationDate] = d.CreationDate,
        [Extension] = d.Extension,
        [FileType] = d.FileType
    FROM dbo.Note AS n
    JOIN dbo.NoteDocumentRelation AS ndr ON n.Id = ndr.NoteId
    LEFT JOIN dbo.Document AS d ON ndr.DocumentId = d.Id
    LEFT JOIN dbo.DocumentType AS dt ON d.DocumentTypeId = dt.Id
    WHERE n.Id = @Id;
END
