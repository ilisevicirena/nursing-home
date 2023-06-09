USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[insertNote]    Script Date: 9.6.2023. 13:50:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	inserts new note
-- =============================================
CREATE PROCEDURE [dbo].[insertNote] 
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@Title varchar(1000),
		@Text varchar(MAX),
		@Tags varchar(MAX)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @noteId int;
    -- Insert statements for procedure here
	INSERT INTO dbo.Note (PersonId, Title, [Text], CreationDate, LastModified)
	VALUES (@PersonId, @Title, @Text, GETDATE(), GETDATE());

	SET @noteId=SCOPE_IDENTITY();

	IF LEN(@tags) > 0
    BEGIN
	DECLARE @tagList TABLE (Tag VARCHAR(100))
    INSERT INTO @tagList (Tag)
    SELECT value FROM STRING_SPLIT(@tags, ',');
	END;

	
	INSERT INTO dbo.NoteTagRelation(NoteId, TagId)
    SELECT @noteId, Tag
    FROM @tagList;
	
	SELECT @noteId AS [NoteId];
END
GO

