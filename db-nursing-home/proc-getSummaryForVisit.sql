CREATE PROCEDURE [dbo].[getSummaryForVisit]
	@Id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- total persons vs visited persons
	select 
	TotalPersons,
	(select count(*) from dbo.DoctorVisitTourPersonRelation where DoctorVisitTourId=@Id) as VisitedPersons
	from dbo.DoctorVisitTour dv 
	where dv.Id=@Id;

	-- time since last visit	
    DECLARE @CurrentVisitDate DATETIME;
    DECLARE @PreviousVisitDate DATETIME;
    SELECT @CurrentVisitDate = [Date]
    FROM dbo.DoctorVisitTour
    WHERE Id = @Id;
    SELECT TOP 1 @PreviousVisitDate = [Date]
    FROM dbo.DoctorVisitTour
    WHERE [Date] < @CurrentVisitDate AND Completed=1
    ORDER BY [Date] DESC;
    DECLARE @MonthsDifference INT;
    DECLARE @DaysDifference INT;
    SELECT @MonthsDifference = DATEDIFF(MONTH, @PreviousVisitDate, @CurrentVisitDate);
    SELECT @DaysDifference = DATEDIFF(DAY, DATEADD(MONTH, @MonthsDifference, @PreviousVisitDate), @CurrentVisitDate);
    SELECT 
        @MonthsDifference AS MonthsDifference,
        @DaysDifference AS DaysDifference;


		-- number of visits for doctors		 
    CREATE TABLE #TempDoctorIds (DoctorId INT);
    INSERT INTO #TempDoctorIds (DoctorId)
    SELECT DISTINCT e.Id
    FROM dbo.DoctorVisitTourEmployeeRelation dver
    JOIN dbo.Employee e ON dver.EmployeeId = e.Id
    WHERE e.JobPositionId = 5 
          AND dver.DoctorVisitTourId = @Id;
    SELECT
        tdi.DoctorId,
        e.FirstName,
        e.LastName,
        COUNT(DISTINCT dvt.Id) AS NumberOfCompletedVisits
    FROM #TempDoctorIds tdi
    JOIN dbo.DoctorVisitTourEmployeeRelation dver ON tdi.DoctorId = dver.EmployeeId
    JOIN dbo.DoctorVisitTour dvt ON dver.DoctorVisitTourId = dvt.Id
    JOIN dbo.Employee e ON tdi.DoctorId = e.Id
    WHERE dvt.Completed = 1 
    GROUP BY tdi.DoctorId, e.FirstName, e.LastName;
    DROP TABLE #TempDoctorIds;

END

