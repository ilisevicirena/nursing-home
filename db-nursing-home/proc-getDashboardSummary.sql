USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getDashboardSummary]    Script Date: 19.7.2023. 15:13:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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
	[Description]
	from dbo.CalendarEvent
	where  MONTH([Start])=MONTH(GETDATE());

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

END
GO

