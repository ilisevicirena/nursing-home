CREATE PROCEDURE [dbo].[changeVacationStatus] 
	-- Add the parameters for the stored procedure here
	(
		@VacationId int,
		@StatusId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   IF @StatusId=3 begin
		-- if vacation canceled then delete calendar event
		declare @StartDate datetime, @EndDate datetime, @EmployeeId int
		select @StartDate=FromDate, @EndDate=ToDate, @EmployeeId=EmployeeId from dbo.EmployeeVacationRelation where Id=@VacationId;
		delete from dbo.CalendarEvent where [Start]=@StartDate and [End]=@EndDate and EmployeeId=@EmployeeId and EventTypeId=2;
   end
	
	update dbo.EmployeeVacationRelation set StatusId=@StatusId where Id=@VacationId;

END