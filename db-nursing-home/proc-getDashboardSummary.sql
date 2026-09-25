-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.7.2023.
-- Description:	gets stats for dashboard
-- =============================================
CREATE PROCEDURE [dbo].[getDashboardSummary]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- basic stats
	select 
	(select COUNT(Id) from dbo.Person where Active=1) as Persons,
	(select SUM(Capacity) from dbo.Room) as Capacity,
	(select COUNT(PersonId) from dbo.PersonRoomRelation where Active=1) as TakenSpace,
	(select COUNT(p.Id) from dbo.Person as p left join dbo.Gender as g on p.GenderId=g.Id where p.Active=1 and g.Tag='M') as MalePersons,
	(select COUNT(p.Id) from dbo.Person as p left join dbo.Gender as g on p.GenderId=g.Id where p.Active=1 and g.Tag='Ž') as FemalePersons,
	(select COUNT(Id) from dbo.Person) as AllTimePersons;
	
	-- events for current month
	SELECT 
    Id,
    CASE 
        WHEN Recurring = 1 THEN 
            DATEFROMPARTS(YEAR(GETDATE()), MONTH([Start]), DAY([Start]))
        ELSE 
            [Start] 
    END AS [Start],
    CASE 
        WHEN Recurring = 1 THEN 
            DATEFROMPARTS(YEAR(GETDATE()), MONTH([End]), DAY([End]))
        ELSE 
            [End] 
    END AS [End],
    [Title],
    [Description],
    [Color]
FROM 
    dbo.CalendarEvent
WHERE  
    MONTH([Start]) = MONTH(GETDATE())
    AND (
        Recurring = 1 -- Include recurring events
        OR Recurring = 0
    )
ORDER BY 
    CASE 
        WHEN Recurring = 1 THEN 
            DATEFROMPARTS(YEAR(GETDATE()), MONTH([Start]), DAY([Start]))
        ELSE 
            [Start] 
    END;


	-- oldest person data
	select top 1 
	p.Id,
	FirstName,
	LastName, 
	BirthDate,
	StartDate,
	GenderId,
	g.[Name],
	g.Tag,
	(SELECT DATEDIFF(year, p.BirthDate, GETDATE())) AS Years
	from dbo.Person as p
	left join dbo.Gender as g on p.GenderId=g.Id
	where Active=1 order by(BirthDate);

	-- most time in nursing home
	select top 1 
	p.Id,
	FirstName,
	LastName, 
	BirthDate,
	StartDate,
	GenderId,
	g.[Name],
	g.Tag
	from dbo.Person as p
	left join dbo.Gender as g on p.GenderId=g.Id
	where Active=1 order by(StartDate);

	-- active persons per month

	 DECLARE @CurrentDate DATE;
    SET @CurrentDate = GETDATE();

    ;WITH Last6Months AS
    (
        SELECT EOMONTH(@CurrentDate) AS [Month]
        UNION ALL
        SELECT DATEADD(MONTH, -1, [Month])
        FROM Last6Months
        WHERE [Month] >= DATEADD(MONTH, -5, EOMONTH(@CurrentDate))
    )

    SELECT 
        CONVERT(CHAR(7), L6M.[Month], 120) AS [YearMonth],
        COUNT(CASE WHEN (p.StartDate <= EOMONTH(L6M.[Month]) AND (p.EndDate IS NULL OR p.EndDate >= L6M.[Month]))
                   THEN 1 ELSE NULL END) AS [ActivePersonsCount]
    FROM Last6Months L6M
    LEFT JOIN Person p ON (p.StartDate <= EOMONTH(L6M.[Month]) AND (p.EndDate IS NULL OR p.EndDate >= L6M.[Month]))
    GROUP BY CONVERT(CHAR(7), L6M.[Month], 120)
    ORDER BY [YearMonth];

	--employees by gender
	select
	(select COUNT(e.Id) from dbo.Employee as e left join dbo.Gender as g on e.GenderId=g.Id where e.Active=1 and g.Tag='M') as MaleEmployees,
	(select COUNT(e.Id) from dbo.Employee as e left join dbo.Gender as g on e.GenderId=g.Id where e.Active=1 and g.Tag='Ž') as FemaleEmployees;

	--all time employees, current employees
	select
	(select COUNT(Id)from dbo.Employee)  as AllTimeEmployees,
	(select COUNT(Id)from dbo.Employee where Active=1)  as CurrentEmployees;

	--employees cards data
	select 
	e.Id,
	FirstName,
	LastName,
	JMBG,
	Mobile,
	Email,
	BirthDate,
	JobPositionId,
	EmploymentDate,
	[JobPositionName]=jp.[Name],
	[JobPositionIcon]=jp.[Icon],
	GenderId,
	[GenderTag]=g.Tag
	from dbo.Employee as e
	left join dbo.JobPosition as jp on e.JobPositionId=jp.Id
	left join dbo.Gender as g on e.GenderId=g.Id
	where Active=1 order by JobPositionId;

	--employees by job position
	select COUNT(e.Id) as NumberOfEmployees, 
	jp.[Name] as JobPositionName,
	e.JobPositionId as JobPositionId,
	jp.Icon as JobPositionIcon
	from dbo.Employee as e 
	left join dbo.JobPosition as jp on e.JobPositionId=jp.Id group by jp.[Name], JobPositionId, jp.Icon;

	WITH LastVisit AS (
        SELECT
            p.Id AS PersonId,
            MAX(dvt.[Date]) AS LastVisitDate
        FROM
            dbo.Person AS p
        LEFT JOIN
            dbo.DoctorVisitTourPersonRelation dvtp ON p.Id = dvtp.PersonId
        LEFT JOIN
            dbo.DoctorVisitTour dvt ON dvtp.DoctorVisitTourId = dvt.Id
        GROUP BY
            p.Id
    )

    SELECT TOP 1
        p.Id AS PersonId,
        p.FirstName,
        p.LastName,
        m.FullMonths AS MonthsSinceLastVisit,
        DATEDIFF(DAY, DATEADD(MONTH, m.FullMonths, s.SinceDate), GETDATE()) AS DaysSinceLastVisit,
        CASE WHEN m.FullMonths > 0 THEN 'danger' ELSE 'success' END AS VisitStatus
    FROM
        dbo.Person AS p
    LEFT JOIN
        LastVisit lv ON p.Id = lv.PersonId
    CROSS APPLY (VALUES (COALESCE(lv.LastVisitDate, p.StartDate))) AS s(SinceDate)
    CROSS APPLY (VALUES (
        DATEDIFF(MONTH, s.SinceDate, GETDATE())
        - CASE WHEN DATEADD(MONTH, DATEDIFF(MONTH, s.SinceDate, GETDATE()), s.SinceDate) > GETDATE()
               THEN 1 ELSE 0 END
    )) AS m(FullMonths)
    ORDER BY
        DATEDIFF(DAY, s.SinceDate, GETDATE()) DESC;

	-- age distribution of active residents
	;WITH Buckets AS (
		SELECT '< 80' AS Label, 1 AS SortOrder
		UNION ALL SELECT '80-84', 2
		UNION ALL SELECT '85-89', 3
		UNION ALL SELECT '90+', 4
	)
	SELECT b.Label, COUNT(p.Id) AS [Count]
	FROM Buckets b
	LEFT JOIN dbo.Person p ON p.Active = 1 AND
		CASE
			WHEN DATEDIFF(YEAR, p.BirthDate, GETDATE()) < 80 THEN '< 80'
			WHEN DATEDIFF(YEAR, p.BirthDate, GETDATE()) < 85 THEN '80-84'
			WHEN DATEDIFF(YEAR, p.BirthDate, GETDATE()) < 90 THEN '85-89'
			ELSE '90+'
		END = b.Label
	GROUP BY b.Label, b.SortOrder
	ORDER BY b.SortOrder;

	-- occupancy by floor
	SELECT
		f.[Name] AS FloorName,
		(SELECT COUNT(prr.PersonId)
		 FROM dbo.PersonRoomRelation prr
		 LEFT JOIN dbo.Room r2 ON prr.RoomId = r2.Id
		 WHERE prr.Active = 1 AND r2.FloorId = f.Id) AS Occupied,
		(SELECT ISNULL(SUM(r.Capacity), 0) FROM dbo.Room r WHERE r.FloorId = f.Id) AS Capacity
	FROM dbo.Floor f
	ORDER BY f.Id;

	-- residents by health condition
	SELECT hc.[Name] AS [Name], COUNT(p.Id) AS [Count]
	FROM dbo.HealthCondition hc
	LEFT JOIN dbo.PersonHealthConditionRelation phc ON phc.HealthConditionId = hc.Id
	LEFT JOIN dbo.Person p ON p.Id = phc.PersonId AND p.Active = 1
	GROUP BY hc.[Name]
	HAVING COUNT(p.Id) > 0
	ORDER BY COUNT(p.Id) DESC;
END