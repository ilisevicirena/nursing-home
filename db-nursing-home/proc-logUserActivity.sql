CREATE PROCEDURE [dbo].[logUserActivity]
    @ActivityType VARCHAR(150),
    @Description  VARCHAR(2000) = NULL,
    @ActingUserId NCHAR(36)     = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Prefer explicit param; fall back to SESSION_CONTEXT (set by PS1 bulk scripts)
    DECLARE @UserId NCHAR(36) = ISNULL(@ActingUserId, CAST(SESSION_CONTEXT(N'UserId') AS NCHAR(36)));
    IF @UserId IS NULL RETURN;

    DECLARE @IsBulk     NVARCHAR(10)  = CAST(SESSION_CONTEXT(N'IsBulk') AS NVARCHAR(10));
    DECLARE @FinalDesc  VARCHAR(2000) = CASE
        WHEN @IsBulk = N'true' THEN '[BULK] ' + ISNULL(@Description, '')
        ELSE ISNULL(@Description, '')
    END;

    INSERT INTO [dbo].[UserActivity] ([UserId], [ActivityType], [Timestamp], [Description])
    VALUES (@UserId, @ActivityType, GETDATE(), @FinalDesc);
END;
