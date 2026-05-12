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
		@Reminder bit,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET @Start = CAST(DATEADD(hour, 2, @Start) AS DATE);
	SET @End= CAST(DATEADD(hour, 2, @End) AS DATE);

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

	EXEC dbo.logUserActivity 'UPDATE_CALENDAR_EVENT', 'Calendar event updated', @ActingUserId;
END