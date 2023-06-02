USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[insertDocumentForNote]    Script Date: 2.6.2023. 9:27:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[insertDocumentForNote]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@DocumentTypeId int,
		@DocumentName varchar(50),
		@Extension varchar(10),
		@FileType varchar(50),
		@SavePath varchar(max),
		@NoteId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @DocumentId int;
	DECLARE @NoteDocumentRelationId int;

	-- Declare a table variable to store the result of the insertDocument procedure
	DECLARE @DocumentTable TABLE (
		Id int,
		Path varchar(max),
		StorageName varchar(200)
	);

	-- Insert document and get the document ID and path
	INSERT INTO @DocumentTable
	EXEC [dbo].[insertDocument] @PersonId, @DocumentTypeId, @DocumentName, @Extension, @FileType, @SavePath;

	-- Get the document ID from the first row of the result
	SELECT TOP 1 @DocumentId = Id
	FROM @DocumentTable;

	-- Insert into noteDocumentRelation
	INSERT INTO dbo.NoteDocumentRelation (NoteId, DocumentId)
	VALUES (@NoteId, @DocumentId);

	-- Get the scope ID of the inserted noteDocumentRelation row
	SET @NoteDocumentRelationId = SCOPE_IDENTITY();

	-- Return the noteDocumentRelation ID
	SELECT * FROM @DocumentTable;
	SELECT @NoteDocumentRelationId AS NoteDocumentRelationId;
END
GO

