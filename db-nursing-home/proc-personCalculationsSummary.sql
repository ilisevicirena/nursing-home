-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 6.7.2023.
-- Description:	summary for person calculations
-- =============================================
CREATE PROCEDURE [dbo].[personCalculationsSummary]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT 
    FORMAT(SUM(CASE WHEN StatusId <> 3 THEN SystemPrice ELSE 0 END),'N2') as TotalCalculatedPrice,
    FORMAT(SUM(CASE WHEN StatusId <> 3 THEN RealPrice ELSE 0 END),'N2') as TotalRealPrice,
    FORMAT(SUM(CASE WHEN StatusId <> 3 THEN PaidPrice ELSE 0 END),'N2') as TotalPaidPrice,
    SUM(CASE WHEN StatusId = 1 THEN 1 ELSE 0 END) as NumberOfPaidCalculations,
    SUM(CASE WHEN StatusId = 2 THEN 1 ELSE 0 END) as NumberOfNotPaidCalculations,
    SUM(CASE WHEN StatusId = 3 THEN 1 ELSE 0 END) as NumberOfCancelledCalculations
FROM dbo.Calculation as c	
WHERE PersonId=@PersonId;

END