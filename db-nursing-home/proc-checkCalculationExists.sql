-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 28.6.2023.
-- Description:	check person already has calculation for month and year
-- =============================================
CREATE PROCEDURE [dbo].[checkCalculationExists]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@Month int,
		@Year int,
		@Delete bit
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

 DECLARE @SelectedId INT;
 CREATE TABLE #DocumentIds (DocumentId INT, [Path] VARCHAR(MAX));

  SELECT TOP 1 @SelectedId = Id
    FROM dbo.Calculation
    WHERE PersonId = @PersonId
      AND [Month] = @Month
      AND [Year] = @Year;

	   IF (@Delete = 1 AND @SelectedId IS NOT NULL)
    BEGIN
        -- Delete from CalculationServiceRelation if @delete is 1 and selectedId exists
        DELETE FROM CalculationServiceRelation
        WHERE CalculationId = @SelectedId;

		DELETE FROM CalculationPackageRelation
        WHERE CalculationId = @SelectedId;

		DELETE FROM CalculationDiscountRelation
        WHERE CalculationId = @SelectedId;

		INSERT INTO #DocumentIds (DocumentId, [Path])
       select 
cdr.DocumentId,
doc.[Path]	
	from 
	dbo.CalculationDocumentRelation as cdr
	left join dbo.Document as doc on doc.Id=cdr.DocumentId
	where cdr.CalculationId=@SelectedId;

		DELETE FROM dbo.CalculationDocumentRelation
        WHERE DocumentId IN (SELECT DocumentId FROM #DocumentIds);

		DELETE FROM dbo.Document
        WHERE Id IN (SELECT DocumentId FROM #DocumentIds);

		delete from dbo.Calculation where Id=@SelectedId;
    END

    -- Select the variable containing the Id
    SELECT @SelectedId AS SelectedId;
	SELECT * from #DocumentIds;

	DROP TABLE #DocumentIds;

END