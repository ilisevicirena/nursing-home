CREATE PROCEDURE [dbo].[resetPasswordFromForgot]
    @Token NVARCHAR(255),
    @NewPassword NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId UNIQUEIDENTIFIER;
    DECLARE @TokenValue NVARCHAR(255);
    DECLARE @ExpiryDate DATETIME;
    DECLARE @CurrentDate DATETIME = GETDATE();
    DECLARE @ComputedHashBinary VARBINARY(32);
    DECLARE @ComputedHash NVARCHAR(255);
    DECLARE @Message NVARCHAR(255) = '';
    DECLARE @Success BIT = 0;
	DECLARE @ActivityType NVARCHAR(50) = 'PASSWORD_RESET';

    -- Extract the UserId from the token
    -- Assuming token format is 'GUID|UserId'
    SET @UserId = CAST(SUBSTRING(@Token, CHARINDEX('|', @Token) + 1, LEN(@Token)) AS UNIQUEIDENTIFIER);

	Print(@UserId);
    
    -- Validate the UserId format
    IF @UserId IS NULL
    BEGIN
        SET @Message = 'errInvalidTokenFormat';
        SELECT @Success AS Success, @Message AS Message;
        RETURN;
    END

    -- Find the token details
    SELECT 
        @TokenValue = [TokenValue],
        @ExpiryDate = [ExpiryDate]
    FROM [dbo].[UserToken]
    WHERE [UserId] = @UserId
      AND [TokenTypeId] = 2 -- Reset Password
      AND [TokenValue] = @Token
	 
    -- Check if the token is valid and not expired
    IF @TokenValue IS NULL
    BEGIN
        SET @Message = 'errInvalidToken';
        SELECT @Success AS Success, @Message AS Message;
        RETURN;
    END

    IF @ExpiryDate < @CurrentDate
    BEGIN
        SET @Message = 'errTokenExpired';
        SELECT @Success AS Success, @Message AS Message;
        RETURN;
    END

    -- Compute the hash of the new password
    SET @ComputedHashBinary = HASHBYTES('SHA2_256', @NewPassword);
    SET @ComputedHash = CONVERT(NVARCHAR(255), @ComputedHashBinary, 2);

    -- Update the user password
    UPDATE [dbo].[User]
    SET [Password] = @ComputedHash,
        [Verified] = 1
    WHERE [Id] = @UserId;
	 
	  -- Log user activity
    INSERT INTO [dbo].[UserActivity] ([UserId], [ActivityType], [Timestamp], [Description])
    VALUES (@UserId, @ActivityType, GETDATE(), 'Password reset via forgot password token');

    -- Set success flag and message
    SET @Success = 1;
    SET @Message = 'Password successfully reset';

    -- Return the result
    SELECT @Success AS Success, @Message AS Message;
END;


