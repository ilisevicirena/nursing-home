CREATE PROCEDURE [dbo].[getRoles]
AS
BEGIN
    SET NOCOUNT ON;

    -- Retrieve all roles
    SELECT
        [Id] AS RoleId,
        [Name] AS RoleName,
        [Description]
    FROM [dbo].[Role];
END;
