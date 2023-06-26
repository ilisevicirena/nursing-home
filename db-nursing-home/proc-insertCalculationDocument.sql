USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[insertCalculationDocument]    Script Date: 26.6.2023. 13:58:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.6.2023.
-- Description:	inserts document for calculation
-- =============================================
CREATE PROCEDURE [dbo].[insertCalculationDocument]
	-- Add the parameters for the stored procedure here
	(
		
		@PersonId int,
		@DocumentName varchar(50),
		@Extension varchar(10),
		@FileType varchar(50),
		@SavePath varchar(max),
		@CalculationId int
	
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @DocumentId int;
	DECLARE @CalculationDocumentRelationId int;

	DECLARE @DocumentTable TABLE (
		Id int,
		Path varchar(max),
		StorageName varchar(200)
	);

	INSERT INTO @DocumentTable
	EXEC [dbo].[insertDocument] @PersonId, 3, @DocumentName, @Extension, @FileType, @SavePath;

	SELECT TOP 1 @DocumentId = Id
	FROM @DocumentTable;

	INSERT INTO dbo.CalculationDocumentRelation(CalculationId, DocumentId)
	VALUES (@CalculationId, @DocumentId);

	SET @CalculationDocumentRelationId = SCOPE_IDENTITY();

	SELECT * FROM @DocumentTable;
	SELECT @CalculationDocumentRelationId AS CalculationDocumentRelationId;

END
GO

