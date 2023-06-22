USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getCalendarEventsForMonth]    Script Date: 22.6.2023. 12:10:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.6.2023
-- Description:	gets all events
-- =============================================
CREATE PROCEDURE [dbo].[getCalendarEventsForMonth]
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
     SELECT 
        [Id],
      CASE WHEN [Recurring] = 1 THEN DATEADD(YEAR, @Year - YEAR([Start]), [Start]) ELSE [Start] END AS [Start],
        CASE WHEN [Recurring] = 1 THEN DATEADD(YEAR, @Year - YEAR([End]), [End]) ELSE [End] END AS [End],
        [Color],
        [Title],
        [Description],
		[Recurring]=Recurring,
		[PersonId]=PersonId
    FROM dbo.CalendarEvent
    WHERE ([Recurring] = 0 AND YEAR([Start]) = @Year AND MONTH([Start]) = @Month)
        OR ([Recurring] = 0 AND YEAR([End]) = @Year AND MONTH([End]) = @Month)
        OR ([Recurring] = 1 AND (MONTH([Start]) = @Month OR MONTH([End]) = @Month));
END
GO

