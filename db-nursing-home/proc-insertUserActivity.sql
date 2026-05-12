CREATE PROCEDURE [dbo].[insertUserActivity]
    @UserId CHAR(36),
    @ActivityType NVARCHAR(150),
    @Timestamp DATETIME = NULL,
    @Description NVARCHAR(2000) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Set default value for Timestamp if it is not provided
    IF @Timestamp IS NULL
    BEGIN
        SET @Timestamp = GETDATE();
    END

    -- Insert the new user activity
    INSERT INTO [dbo].[UserActivity] (
        [UserId],
        [ActivityType],
        [Timestamp],
        [Description]
    )
    VALUES (
        @UserId,
        @ActivityType,
        @Timestamp,
        @Description
    );
END;
