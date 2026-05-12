CREATE PROCEDURE [dbo].[insertVacationForEmployee]
(
	@EmployeeId int,
	@Year int,
	@FromDate datetime,
	@ToDate datetime,
	@DaysTaken int,
	@DaysTotal int,
	@ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
	SET @FromDate= CAST(DATEADD(hour, 2, @FromDate) AS DATE);
	SET @ToDate= CAST(DATEADD(hour, 2, @ToDate) AS DATE);
	DECLARE @CreationDate datetime = GETDATE();

	insert into dbo.EmployeeVacationRelation ([Year], DaysTotal, FromDate, ToDate, DaysTaken, EmployeeId, CreationDate, StatusId) values
	(@Year, @DaysTotal, @FromDate, @ToDate, @DaysTaken, @EmployeeId, @CreationDate, 1);

	select SCOPE_IDENTITY() as EmployeeVacationRelationId;

	declare @FirstName nvarchar(200), @LastName nvarchar(200);
	select @FirstName=FirstName, @LastName=LastName from dbo.Employee where Id=@EmployeeId;

	DECLARE @Title varchar(200) = 'GO: ' + @FirstName + ' ' + @LastName;
	DECLARE @Description varchar(max) = 'Godišnji odmor zaposlenika: ' + @FirstName + ' ' + @LastName + ' ' + CONVERT(varchar(10), @FromDate, 104) + ' - '+CONVERT(varchar(10), @ToDate, 104);

	EXEC dbo.insertCalendarEvent
		@Start = @FromDate,
		@End = @ToDate,
		@Color = 'warning', 
		@Title = @Title,
		@Description = @Description,
		@EmployeeId = @EmployeeId,
		@EventTypeId=2,
		@Recurring = 0,
		@Reminder=0;

	EXEC dbo.logUserActivity 'INSERT_VACATION', 'Vacation inserted for employee', @ActingUserId;
END
