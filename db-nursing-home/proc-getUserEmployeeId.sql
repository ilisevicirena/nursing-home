CREATE PROCEDURE [dbo].[getUserEmployeeId]
	@UserId uniqueidentifier
AS
BEGIN
	select Id as EmployeeId from dbo.Employee 
	where UserId=@UserId;
END
