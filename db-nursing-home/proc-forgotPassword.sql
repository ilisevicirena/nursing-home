CREATE PROCEDURE [dbo].[forgotPassword]
    @Email NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId UNIQUEIDENTIFIER;
    DECLARE @Token NVARCHAR(255);
    DECLARE @ExpiryDate DATETIME;
    DECLARE @Message NVARCHAR(255) = '';
    DECLARE @Success BIT = 0;
    DECLARE @TokenTypeId INT = 2; -- RESET_PASSWORD
	DECLARE @ActivityType NVARCHAR(50) = 'FORGOT_PASSWORD';

-- Check if user exists
    SELECT 
        @UserId = [Id],
        @Email = [Email]
    FROM [dbo].[User]
    WHERE [Email] = @Email;

    IF @UserId IS NULL
    BEGIN
        SET @Message = 'errUserNotFound';
        SELECT @Success AS Success, @Message AS Message;
        RETURN;
    END

    -- Generate token using pipe delimiter
    SET @Token = CONCAT(
        NEWID(), '|', 
        @UserId
    );

    -- Insert token into UserToken table
    INSERT INTO [dbo].[UserToken] ([UserId], [TokenTypeId], [TokenValue], [CreationDate], [ExpiryDate])
    VALUES (
        @UserId,
        2, -- TokenTypeId for 'RESET_PASSWORD'
        @Token,
        GETDATE(),
        DATEADD(DAY, 7, GETDATE())
    );

    -- Log user activity
    INSERT INTO [dbo].[UserActivity] ([UserId], [ActivityType], [Timestamp], [Description])
    VALUES (@UserId, 'FORGOT_PASSWORD', GETDATE(), 'Password reset token generated');

	 SET @Success = 1;
    -- Return token and email
    SELECT 
		@Success AS Success,
        @UserId AS UserId, 
        @Token AS Token, 
        DATEADD(DAY, 7, GETDATE()) AS ExpiryDate, 
        @Email AS Email,
		@Message AS Message;
END;
