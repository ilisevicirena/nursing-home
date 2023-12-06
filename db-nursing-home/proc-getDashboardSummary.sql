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
	select 
	Id,
	[Start],
	[End],
	[Title],
	[Description],
	[Color]
	from dbo.CalendarEvent
	where  MONTH([Start])=MONTH(GETDATE()) order by [Start];

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
END