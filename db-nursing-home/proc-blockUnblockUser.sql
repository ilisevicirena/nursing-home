create PROCEDURE [dbo].[blockUnblockUser]
    @UserId UNIQUEIDENTIFIER,
    @Blocked BIT  -- 1 to block, 0 to unblock
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the Blocked status of the user
    UPDATE [dbo].[User]
    SET [Blocked] = @Blocked
    WHERE [Id] = @UserId;

    -- Determine activity type
    DECLARE @ActivityType NVARCHAR(50);
    SET @ActivityType = CASE 
                           WHEN @Blocked = 1 THEN 'BLOCK' 
                           ELSE 'UNBLOCK' 
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
