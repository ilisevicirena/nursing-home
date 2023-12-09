CREATE PROCEDURE [dbo].[getEmployeesBasic]	
AS
BEGIN
	select
	Id, FirstName, LastName, JobPositionId
	from dbo.Employee where Active=1;
END
