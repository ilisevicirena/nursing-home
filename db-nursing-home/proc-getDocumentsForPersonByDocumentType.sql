-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 30.5.2023.
-- Description:	gets all documents for person by document type
-- =============================================
CREATE PROCEDURE [dbo].[getDocumentsForPersonByDocumentType]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@DocumentTypeId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

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
	where d.PersonId=@PersonId and d.DocumentTypeId=@DocumentTypeId
	order by CreationDate desc;
END