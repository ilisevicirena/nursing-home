CREATE PROCEDURE [dbo].[getDoctorsAndNursesForVisit]
	@Id int
AS
BEGIN
	select 
	EmployeeId,
	FirstName,
	LastName,
	JMBG,
	Icon,
	jp.[Name] as JobPositionName
	from
	dbo.DoctorVisitTourEmployeeRelation dver 
	left join dbo.Employee e on dver.EmployeeId=e.Id
	left join dbo.JobPosition jp on e.JobPositionId=jp.Id
	where dver.DoctorVIsitTourId=@Id and JobPositionId=5;

    select 
	EmployeeId,
	FirstName,
	LastName,
	JMBG,
	Icon,
	jp.[Name] as JobPositionName
	from
	dbo.DoctorVisitTourEmployeeRelation dver 
	left join dbo.Employee e on dver.EmployeeId=e.Id
	left join dbo.JobPosition jp on e.JobPositionId=jp.Id
	where dver.DoctorVIsitTourId=@Id and (JobPositionId=2 or JobPositionId=3);
END
