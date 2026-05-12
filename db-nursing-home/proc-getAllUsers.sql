CREATE PROCEDURE [dbo].[getAllUsers] 	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select
	[Id]=u.Id,
	[FirstName]=u.FirstName,
	[LastName]=u.LastName,
	[Username]=u.Username,
	[Email]=u.Email,
	[Active]=u.Active,
	[Blocked]=u.Blocked,
	[Verified]=u.Verified,
	[RoleId]=urr.RoleId,
	[RoleName]=r.[Name]
	from dbo.[User] as u 
	left join dbo.UserRoleRelation as urr on u.Id=urr.UserId
	left join dbo.[Role] as r on urr.RoleId=r.Id;

END