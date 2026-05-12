CREATE PROCEDURE [dbo].[insertUserRole]
    @UserId UNIQUEIDENTIFIER,
    @RoleId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the role assignment already exists
    IF EXISTS (
        SELECT 1
        FROM [dbo].[UserRoleRelation]
        WHERE [UserId] = @UserId AND [RoleId] = @RoleId
    )
    BEGIN
        RAISERROR('Role assignment already exists for the user.', 16, 1);
        RETURN;
    END

    -- Insert the new role assignment
    INSERT INTO [dbo].[UserRoleRelation] (
        [UserId],
        [RoleId]
    )
    VALUES (
        @UserId,
        @RoleId
    );
END;
