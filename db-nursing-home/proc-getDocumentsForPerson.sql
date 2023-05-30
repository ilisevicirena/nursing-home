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
-- Create date: 30.5.2023.
-- Description:	gets document for person 
-- =============================================
CREATE PROCEDURE [dbo].[getDocumentsForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
	[Id]=d.Id,
	[Name]=d.[Name],
	[PersonId]=PersonId,
	[PersonFirstName]=p.FirstName,
	[PersonLastName]=p.LastName,
	[DocumentTypeId]=DocumentTypeId,
	[DocumentTypeName]=dt.[Name],
	[Path]=[Path],
	[StorageName]=StorageName,
	[CreationDate]=d.CreationDate,
	[Extension]=Extension,
	[FileType]=FileType
	from dbo.Document as d
	left join dbo.DocumentType as dt on d.DocumentTypeId=dt.Id
	left join dbo.Person as p on d.PersonId=p.Id
	where d.PersonId=@PersonId;

END
GO
