USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[calculationSummary]    Script Date: 30.6.2023. 14:33:16 ******/
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
DECLARE @PreviousMonth INT, @PreviousYear INT;

SET @PreviousMonth = @Month - 1;
SET @PreviousYear = @Year;

SELECT 
    (SELECT COUNT(*) FROM dbo.Person WHERE Active = 1) AS Persons,
    COUNT(PersonId) as CalculatedForPersons,
    FORMAT(SUM(CASE WHEN StatusId <> 3 THEN SystemPrice ELSE 0 END),'N2') as TotalCalculatedPrice,
    FORMAT(SUM(CASE WHEN StatusId <> 3 THEN RealPrice ELSE 0 END),'N2') as TotalRealPrice,
    FORMAT(SUM(CASE WHEN StatusId <> 3 THEN PaidPrice ELSE 0 END),'N2') as TotalPaidPrice,
    SUM(CASE WHEN StatusId = 1 THEN 1 ELSE 0 END) as NumberOfPaidCalculations,
    SUM(CASE WHEN StatusId = 2 THEN 1 ELSE 0 END) as NumberOfNotPaidCalculations,
    SUM(CASE WHEN StatusId = 3 THEN 1 ELSE 0 END) as NumberOfCancelledCalculations,
    CONCAT(
        CASE 
            WHEN (
                SUM(CASE WHEN StatusId <> 3 THEN SystemPrice ELSE 0 END) -
                (SELECT SUM(CASE WHEN StatusId <> 3 THEN SystemPrice ELSE 0 END)
                 FROM dbo.Calculation
                 WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear)
            ) >= 0 THEN '+'
            WHEN (
                SUM(CASE WHEN StatusId <> 3 THEN SystemPrice ELSE 0 END) -
                (SELECT SUM(CASE WHEN StatusId <> 3 THEN SystemPrice ELSE 0 END)
                 FROM dbo.Calculation
                 WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear)
            ) < 0 THEN '-'
            ELSE ''
        END,
        FORMAT(
            ABS((
                SUM(CASE WHEN StatusId <> 3 THEN SystemPrice ELSE 0 END) -
                (SELECT SUM(CASE WHEN StatusId <> 3 THEN SystemPrice ELSE 0 END)
                 FROM dbo.Calculation
                 WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear)
            ) / (
                SELECT SUM(CASE WHEN StatusId <> 3 THEN SystemPrice ELSE 0 END)
                FROM dbo.Calculation
                WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear
            ) * 100),
            'N2'
        )
    ) as TotalCalculatedPriceDiff,
    CONCAT(
        CASE 
            WHEN (
                SUM(CASE WHEN StatusId <> 3 THEN RealPrice ELSE 0 END) -
                (SELECT SUM(CASE WHEN StatusId <> 3 THEN RealPrice ELSE 0 END)
                 FROM dbo.Calculation
                 WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear)
            ) >= 0 THEN '+'
            WHEN (
                SUM(CASE WHEN StatusId <> 3 THEN RealPrice ELSE 0 END) -
                (SELECT SUM(CASE WHEN StatusId <> 3 THEN RealPrice ELSE 0 END)
                 FROM dbo.Calculation
                 WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear)
            ) < 0 THEN '-'
            ELSE ''
        END,
        FORMAT(
            ABS((
                SUM(CASE WHEN StatusId <> 3 THEN RealPrice ELSE 0 END) -
                (SELECT SUM(CASE WHEN StatusId <> 3 THEN RealPrice ELSE 0 END)
                 FROM dbo.Calculation
                 WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear)
            ) / (
                SELECT SUM(CASE WHEN StatusId <> 3 THEN RealPrice ELSE 0 END)
                FROM dbo.Calculation
                WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear
            ) * 100),
            'N2'
        )
    ) as TotalRealPriceDiff,
    CONCAT(
        CASE 
            WHEN (
                SUM(CASE WHEN StatusId <> 3 THEN PaidPrice ELSE 0 END) -
                (SELECT SUM(CASE WHEN StatusId <> 3 THEN PaidPrice ELSE 0 END)
                 FROM dbo.Calculation
                 WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear)
            ) >= 0 THEN '+'
            WHEN (
                SUM(CASE WHEN StatusId <> 3 THEN PaidPrice ELSE 0 END) -
                (SELECT SUM(CASE WHEN StatusId <> 3 THEN PaidPrice ELSE 0 END)
                 FROM dbo.Calculation
                 WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear)
            ) < 0 THEN '-'
            ELSE ''
        END,
        FORMAT(
            ABS((
                SUM(CASE WHEN StatusId <> 3 THEN PaidPrice ELSE 0 END) -
                (SELECT SUM(CASE WHEN StatusId <> 3 THEN PaidPrice ELSE 0 END)
                 FROM dbo.Calculation
                 WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear)
            ) / (
                SELECT SUM(CASE WHEN StatusId <> 3 THEN PaidPrice ELSE 0 END)
                FROM dbo.Calculation
                WHERE [Month] = @PreviousMonth AND [Year] = @PreviousYear
            ) * 100),
            'N2'
        )
    ) as TotalPaidPriceDiff
FROM dbo.Calculation as c	
WHERE [Month] = @Month AND [Year] = @Year;



END
GO

