CREATE PROCEDURE [dbo].[getUsersByActiveStatus]
    @Active BIT
AS
BEGIN
    SET NOCOUNT ON;

    -- Retrieve users with their roles based on the active status
    SELECT
        u.[Id] AS UserId,
        u.[Username],
        u.[Email],
        u.[FirstName],
        u.[LastName],
        u.[DateRegistered],
        u.[Active],
        u.[Blocked],
        u.[Verified],
        r.[Id] AS RoleId,
        r.[Name] AS RoleName
    FROM [dbo].[User] u
    LEFT JOIN [dbo].[UserRoleRelation] ur
        ON u.[Id] = ur.[UserId]
    LEFT JOIN [dbo].[Role] r
        ON ur.[RoleId] = r.[Id]
    WHERE u.[Active] = @Active;
END;
