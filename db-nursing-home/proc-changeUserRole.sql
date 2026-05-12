CREATE PROCEDURE dbo.changeUserRole
    @UserId UNIQUEIDENTIFIER,
    @RoleId INT    
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if a role already exists for the user
    IF EXISTS (
        SELECT 1
        FROM dbo.UserRoleRelation
        WHERE UserId = @UserId       
    )
    BEGIN
        -- Update the existing role
        UPDATE dbo.UserRoleRelation
        SET RoleId = @RoleId
        WHERE UserId = @UserId       
    END
    ELSE
    BEGIN
        -- Insert a new role
        INSERT INTO dbo.UserRoleRelation (UserId, RoleId)
        VALUES (@UserId, @RoleId);
    END

    INSERT INTO [dbo].[UserActivity] ([UserId], [ActivityType], [Timestamp], [Description])
    VALUES (@UserId, 'ROLE_ASSIGNMENT', GETDATE(), 'User role changed');
END;
