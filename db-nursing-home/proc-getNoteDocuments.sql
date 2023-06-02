-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
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

	FROM dbo.Note as n
	left join dbo.NoteDocumentRelation as ndr on n.Id=ndr.NoteId
	left join dbo.Document as d on ndr.DocumentId=d.Id
	left join dbo.DocumentType as dt on d.DocumentTypeId=dt.Id
	where n.Id=@NoteId;

END
GO
