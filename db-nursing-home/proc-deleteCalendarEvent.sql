-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 23.06.2023.
-- Description:	deletes event
-- =============================================
CREATE PROCEDURE [dbo].[deleteCalendarEvent]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   delete from dbo.CalendarEvent
   where Id=@Id;

END