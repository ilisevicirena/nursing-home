-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 11.6.2023.
-- Description:	deletes note and all note tags and documents
-- =============================================
CREATE PROCEDURE [dbo].[deleteNote] 
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- delete note tags relation
    DELETE FROM dbo.NoteTagRelation where NoteId=@Id;

	-- delete note from favorites
	DELETE FROM dbo.FavoriteNotes where NoteId=@Id;

	CREATE TABLE #NoteDocuments (
		[NoteId] int,
		[Id] int,
		[Name] varchar(50),
		[DocumentTypeId] int,
		[DocumentTypeName] varchar(50),
		[Path] varchar(max),
		[StorageName] varchar(200),
		[CreationDate] datetime,
		[Extension] varchar(50),
		[FileType] varchar(50)
    );

    INSERT INTO #NoteDocuments
    EXEC dbo.getNoteDocuments @NoteId=@Id;

    -- Delete rows from dbo.NoteDocumentRelation table where NoteId is the input parameter and DocumentIds are in #NoteDocuments
    DELETE FROM dbo.NoteDocumentRelation
    WHERE NoteId = @Id AND DocumentId IN (SELECT Id FROM #NoteDocuments);

    -- Delete rows from dbo.Document table where Ids are in #NoteDocuments
    DELETE FROM dbo.Document
    WHERE Id IN (SELECT Id FROM #NoteDocuments);

    -- Delete the note from dbo.Note table
    DELETE FROM dbo.Note
    WHERE Id = @Id;

    -- Return the dataset from dbo.getNoteDocuments procedure
    SELECT *
    FROM #NoteDocuments;

    -- Drop the temporary table
    DROP TABLE #NoteDocuments;
END