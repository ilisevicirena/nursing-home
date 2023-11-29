CREATE PROCEDURE [dbo].[removeAllEventsForEmployee] 
	-- Add the parameters for the stored procedure here
	(
	@EmployeeId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    delete from dbo.CalendarEvent where EmployeeId=@EmployeeId;
END