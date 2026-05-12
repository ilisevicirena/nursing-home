CREATE PROCEDURE [dbo].[changeUserStatus]
    @UserId UNIQUEIDENTIFIER,
    @Active BIT
AS
BEGIN
    SET NOCOUNT ON;

    -- Change the user's active status
    UPDATE [dbo].[User]
    SET [Active] = @Active
    WHERE [Id] = @UserId;

    -- Check if any row was updated
    IF @@ROWCOUNT = 0
    BEGIN
        -- Convert the uniqueidentifier to nvarchar for the error message
        DECLARE @UserIdStr NVARCHAR(36);
        SET @UserIdStr = CONVERT(NVARCHAR(36), @UserId);

        -- Handle the case where no row was found with the given UserId
        RAISERROR('User with Id %s not found.', 16, 1, @UserIdStr);
    END
END;
