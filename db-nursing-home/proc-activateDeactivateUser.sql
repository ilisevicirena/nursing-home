create PROCEDURE [dbo].[activateDeactivateUser]
    @UserId UNIQUEIDENTIFIER,
    @Active BIT  -- 1 to activate, 0 to deactivate
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the Active status of the user
    UPDATE [dbo].[User]
    SET [Active] = @Active
    WHERE [Id] = @UserId;

    -- Determine activity type
    DECLARE @ActivityType NVARCHAR(50);
    SET @ActivityType = CASE 
                           WHEN @Active = 1 THEN 'ACTIVATE' 
                           ELSE 'DEACTIVATE' 
                        END;

    -- Log the activity
    INSERT INTO [dbo].[UserActivity] (
        [UserId],
        [ActivityType],
        [Timestamp]
    ) VALUES (
        @UserId,
        @ActivityType,
        GETDATE()
    );
END;
