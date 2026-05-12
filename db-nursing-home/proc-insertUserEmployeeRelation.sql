create PROCEDURE [dbo].[insertUserEmployeeRelation]
    @UserId CHAR(36),
    @EmployeeId INT
AS
BEGIN
    SET NOCOUNT ON;

   update dbo.Employee
   set UserId=@UserId
   where Id=@EmployeeId;

END;
