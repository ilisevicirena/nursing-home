-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.6.2023.
-- Description:	get calculation documents
-- =============================================
CREATE PROCEDURE [dbo].[getCalculationDocuments]
	-- Add the parameters for the stored procedure here
	(
		@CalculationId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   --documents
	select 
	[Id]=cdr.Id,
	[CalculationId]=cdr.CalculationId,
	[DocumentId]=cdr.DocumentId,
	[PersonId]=doc.PersonId,
	[PersonFirstName]=p.FirstName,
	[PersonLastName]=p.LastName,
	[DocumentTypeId]=doc.DocumentTypeId,
	[DocumentTypeName]=dt.[Name],
	[Path]=doc.[Path],
	[Name]=doc.[Name],
	[StorageName]=doc.StorageName,
	[CreationDate]=doc.CreationDate,
	[Extension]=doc.Extension,
	[FileType]=doc.FileType
	from 
	dbo.CalculationDocumentRelation as cdr
	left join dbo.Document as doc on doc.Id=cdr.DocumentId
	left join dbo.Person as p on p.Id=doc.PersonId
	left join dbo.DocumentType as dt on doc.DocumentTypeId=dt.Id
	where cdr.CalculationId=@CalculationId;
END