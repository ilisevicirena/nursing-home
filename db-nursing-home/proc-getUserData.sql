create PROCEDURE [dbo].[getUserData] 
	-- Add the parameters for the stored procedure here
	(
		@UserId uniqueidentifier
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	select 
	Id,
	FirstName,
	LastName,
	Username,
	Email,
	DateRegistered,
	Active,
	Blocked,
	Verified
	from dbo.[User] as u where Id=@UserId;

	-- Retrieve all roles for the specified user (Dataset 1)
    SELECT
        ur.[UserId],
        r.[Id] AS RoleId,
        r.[Name] AS RoleName,
        r.[Description] AS RoleDescription
    FROM [dbo].[UserRoleRelation] ur
    INNER JOIN [dbo].[Role] r
        ON ur.[RoleId] = r.[Id]
    WHERE ur.[UserId] = @UserId
    ORDER BY r.[Name];
END