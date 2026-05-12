CREATE PROCEDURE [dbo].[deleteUser]
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM [dbo].[User] WHERE [Id] = @UserId)
    BEGIN
        SELECT 0 AS Success, 'errUserNotFound' AS Message;
        RETURN;
    END

    DELETE FROM [dbo].[UserToken]                    WHERE [UserId] = @UserId;
    DELETE FROM [dbo].[UserRoleRelation]             WHERE [UserId] = @UserId;
    DELETE FROM [dbo].[UserContactRelation]          WHERE [UserId] = @UserId;
    DELETE FROM [dbo].[UserNotificationTypeSettings] WHERE [UserId] = @UserId;
    DELETE FROM [dbo].[UserActivity]                 WHERE [UserId] = @UserId;

    UPDATE [dbo].[Employee] SET [UserId] = NULL WHERE [UserId] = @UserId;

    DELETE FROM [dbo].[User] WHERE [Id] = @UserId;

    SELECT 1 AS Success, 'User successfully deleted' AS Message;
END;
