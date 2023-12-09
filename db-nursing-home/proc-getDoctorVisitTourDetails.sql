CREATE PROCEDURE [dbo].[getDoctorVisitTourDetails]
	-- Add the parameters for the stored procedure here
	@Id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- visit tour details
	select Id, [Date], Completed from dbo.DoctorVisitTour where Id=@Id;

	-- doctors
    SELECT      
        dver.EmployeeId,
        e.FirstName,
        e.LastName,
        e.JobPositionId,
		jp.[Name] as JobPositionName
    FROM
        dbo.DoctorVisitTour dv
    INNER JOIN
        dbo.DoctorVisitTourEmployeeRelation dver ON dv.Id = dver.DoctorVisitTourId
    INNER JOIN
        dbo.Employee e ON dver.EmployeeId = e.Id
    INNER JOIN
        dbo.JobPosition jp ON e.JobPositionId = jp.Id
    WHERE
        dv.Id = @Id and e.JobPositionId=5;

	
		-- nurses
   select 
     dver.EmployeeId,
        e.FirstName,
        e.LastName,
        e.JobPositionId,
		jp.[Name] as JobPositionName
   from dbo.DoctorVisitTourEmployeeRelation as dver
   left join dbo.Employee as e on dver.EmployeeId=e.Id
   left join dbo.JobPosition as jp on e.JobPositionId=jp.Id
   where dver.DoctorVIsitTourId=@Id and (e.JobPositionId=2 or e.JobPositionId=3)

END