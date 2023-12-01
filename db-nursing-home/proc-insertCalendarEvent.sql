-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.6.2023.
-- Description:	inserts new event
-- =============================================
CREATE PROCEDURE [dbo].[insertCalendarEvent]
	-- Add the parameters for the stored procedure here
	(
		@Start datetime,
		@End datetime,
		@Color varchar(50),
		@Title varchar(200),
		@Description varchar(max),
		@PersonId int=NULL,
		@Recurring bit,
		@Reminder bit,
		@EmployeeId int=NULL,
		@EventTypeId int=NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SET @Start = CAST(DATEADD(hour, 2, @Start) AS DATE);
	SET @End= CAST(DATEADD(hour, 2, @End) AS DATE);
    -- Insert statements for procedure here
	insert into dbo.CalendarEvent ([Start], [End], [Color], [Title], [Description], [PersonId], [Recurring], Reminder, EmployeeId, EventTypeId)
	values (@Start, @End, @Color, @Title, @Description, @PersonId, @Recurring, @Reminder, @EmployeeId, @EventTypeId);

	select SCOPE_IDENTITY() as [EventId];
END