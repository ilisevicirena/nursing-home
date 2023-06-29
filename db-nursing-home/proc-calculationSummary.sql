USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[calculationSummary]    Script Date: 29.6.2023. 12:31:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 29.6.2023.
-- Description:	gets statistic for calculation it ignores cancelled calculations
-- =============================================
CREATE PROCEDURE [dbo].[calculationSummary] 
	-- Add the parameters for the stored procedure here
	(
		@Month int,
		@Year int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	select 
	(SELECT COUNT(*) FROM dbo.Person WHERE Active = 1) AS Persons,
	COUNT(PersonId) as CalculatedForPersons,
	FORMAT(SUM(CASE WHEN StatusId <> 3 THEN SystemPrice ELSE 0 END),'N2') as TotalCalculatedPrice,
	FORMAT(SUM(CASE WHEN StatusId <> 3 THEN RealPrice ELSE 0 END),'N2') as TotalRealPrice,
	FORMAT(SUM(CASE WHEN StatusId <> 3 THEN PaidPrice ELSE 0 END),'N2') as TotalPaidPrice,
	SUM(CASE WHEN StatusId = 1 THEN 1 ELSE 0 END) as NumberOfPaidCalculations,
	SUM(CASE WHEN StatusId = 2 THEN 1 ELSE 0 END) as NumberOfNotPaidCalculations,
	SUM(CASE WHEN StatusId = 3 THEN 1 ELSE 0 END) as NumberOfCancelledCalculations
	from dbo.Calculation as c	
	where [Month]=@Month and [Year]=@Year;

END
GO

