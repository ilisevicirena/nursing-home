CREATE PROCEDURE [dbo].[removeAllEventsForEmployee] 
	-- Add the parameters for the stored procedure here
	(
	@EmployeeId int,
	@EventTypeId int=NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	IF @EventTypeId IS NULL begin
    delete from dbo.CalendarEvent where EmployeeId=@EmployeeId;
	End
	else begin
	delete from dbo.CalendarEvent where EmployeeId=@EmployeeId and @EventTypeId=@EventTypeId;
	end
END