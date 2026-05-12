CREATE PROCEDURE [dbo].[getUserRolesAndPermissions]
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

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

    -- Retrieve all permissions for the roles assigned to the user (Dataset 2)
    SELECT
    ur.[UserId],
    r.[Id] AS RoleId,
    r.[Name] AS RoleName,
    p.[Id] AS PermissionId,
    p.[Name] AS PermissionName,
    p.[Description] AS PermissionDescription
FROM [dbo].[UserRoleRelation] ur
INNER JOIN [dbo].[Role] r
    ON ur.[RoleId] = r.[Id]
INNER JOIN [dbo].[RolePermissionRelation] rpr
    ON r.[Id] = rpr.[RoleId]
INNER JOIN [dbo].[Permission] p
    ON rpr.[PermissionId] = p.[Id]
WHERE ur.[UserId] = @UserId
ORDER BY r.[Name], p.[Name];
END;
