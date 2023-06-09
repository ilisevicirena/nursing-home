USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getNoteDocuments]    Script Date: 9.6.2023. 19:59:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	get documents for note
-- =============================================
CREATE PROCEDURE [dbo].[getNoteDocuments]
	-- Add the parameters for the stored procedure here
	(
		@NoteId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
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

	FROM dbo.NoteDocumentRelation as ndr 
	left join dbo.Note as n on n.Id=ndr.NoteId
	left join dbo.Document as d on ndr.DocumentId=d.Id
	left join dbo.DocumentType as dt on d.DocumentTypeId=dt.Id
	where ndr.NoteId=@NoteId;

END
GO

