USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getDocumentTypesForPerson]    Script Date: 31.5.2023. 11:17:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 31.5.2023.
-- Description:	gets document types for person with files number
-- =============================================
CREATE PROCEDURE [dbo].[getDocumentTypesForPerson] 
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
	SELECT 
	[Id]=dt.Id,
	[Name]=dt.[Name],
	[FileNumber]=isnull(t1.FileNumber, 0)
	FROM dbo.DocumentType as dt
	left join (select COUNT(Id) as FileNumber, DocumentTypeId from dbo.Document where PersonId=@PersonId group by DocumentTypeId) as t1 
	on dt.Id=t1.DocumentTypeId;
END
GO

