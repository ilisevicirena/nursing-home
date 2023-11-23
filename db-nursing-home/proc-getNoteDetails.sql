-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 23.6.2023.
-- Description:	gets note details
-- =============================================
CREATE PROCEDURE [dbo].[getNoteDetails]
	-- Add the parameters for the stored procedure here
	(
	@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SET NOCOUNT ON;

	-- select all notes for person, sorted so favorites are at top, and rest sorted by modified date
	SELECT 
	[Id] = n.Id,
	[Title] = n.Title,
	[Text] = n.[Text],
	[CreationDate] = n.CreationDate,
	[LastModified] = n.LastModified,
	[PersonId] = n.PersonId,
	[PersonFirstName] = p.FirstName,
	[PersonLastName] = p.LastName,
	[IsFavorite] = CASE WHEN t1.NoteId IS NULL THEN 0 ELSE 1 END,
	[Attachments]=ISNULL(t2.NoOfDocs,0)
	FROM dbo.Note AS n
	LEFT JOIN dbo.Person AS p ON n.PersonId = p.Id
	LEFT JOIN dbo.FavoriteNotes AS t1 ON n.Id = t1.NoteId AND t1.NoteId IS NOT NULL
	LEFT JOIN (SELECT COUNT(Id) as NoOfDocs, NoteId from dbo.NoteDocumentRelation group by NoteId) as t2 on t2.NoteId=n.Id
	WHERE n.Id = @Id
	

	-- select all notes tags
	SELECT 
	[NoteId]=n.Id,
	[Id]=ntr.TagId,
	[Name]=nt.[Name],
	[Color]=nt.Color
	FROM dbo.Note AS n
	left join dbo.NoteTagRelation as ntr on n.Id=ntr.NoteId
	left join dbo.NotesTag as nt on ntr.TagId=nt.Id
	where n.Id=@Id and nt.Active=1;

	-- select all notes documents
	SELECT 
	[NoteId]=n.Id,
	[Id]=ndr.DocumentId,
	[Name]=d.[Name],
	[DocumentTypeId]=d.DocumentTypeId,
	[DocumentTypeName]=dt.[Name],
	[Path]=d.[Path],
	[StorageName]=d.StorageName,
	[CreationDate]=d.CreationDate,
	[Extension]=d.Extension,
	[FileType]=d.FileType
	FROM dbo.Note as n
	join dbo.NoteDocumentRelation as ndr on n.Id=ndr.NoteId
	left join dbo.Document as d on ndr.DocumentId=d.Id
	left join dbo.DocumentType as dt on d.DocumentTypeId=dt.Id
	where n.Id=@Id;
END