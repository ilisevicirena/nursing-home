USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[updateCalendarEvent]    Script Date: 22.6.2023. 14:26:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 22.6.2023.
-- Description:	updates event
-- =============================================
CREATE PROCEDURE [dbo].[updateCalendarEvent]
	-- Add the parameters for the stored procedure here
	(
		@Start datetime,
		@End datetime,
		@Color varchar(50),
		@Title varchar(200),
		@Description varchar(max),
		@Recurring bit,
		@Id int,
		@Reminder bit
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    update dbo.CalendarEvent
	set
	[Start]=@Start,
	[End]=@End,
	Color=@Color,
	Title=@Title,
	[Description]=@Description,
	Recurring=@Recurring,
	Reminder=@Reminder
	where Id=@Id;

END
GO

