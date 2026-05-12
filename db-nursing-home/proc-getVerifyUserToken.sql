CREATE PROCEDURE dbo.generateVerifyUserToken
    @UserId UNIQUEIDENTIFIER  
AS
BEGIN
    SET NOCOUNT ON;

	declare @Token NVARCHAR(255);
    declare @ExpiryDate DATETIME;
    declare @CreationDate DATETIME;
    DECLARE @TokenTypeId INT = 2; -- Assuming 2 is the TokenTypeId for password reset
    DECLARE @CurrentDate DATETIME = GETDATE();
    DECLARE @NewExpiryDate DATETIME;
    DECLARE @ActivityType NVARCHAR(50) = 'VERIFICATION_TOKEN_REQUEST';
    DECLARE @ActivityMessage NVARCHAR(255) = 'User requested a verification token.';

    -- Check for an existing non-expired token
    SELECT TOP 1 
        @Token = TokenValue,
        @CreationDate = CreationDate,
        @ExpiryDate = ExpiryDate
    FROM dbo.UserToken
    WHERE UserId = @UserId
      AND TokenTypeId = @TokenTypeId
      AND ExpiryDate > @CurrentDate
    ORDER BY ExpiryDate DESC;

    -- If a non-expired token exists, extend the expiry date
    IF @Token IS NOT NULL
    BEGIN
        SET @NewExpiryDate = DATEADD(DAY, 7, @ExpiryDate);
        UPDATE dbo.UserToken
        SET ExpiryDate = @NewExpiryDate
        WHERE UserId = @UserId
          AND TokenValue = @Token;

        -- Update the output expiry date
        SET @ExpiryDate = @NewExpiryDate;
    END
    ELSE
    BEGIN
        -- Generate a new token (use the same logic as in your reset password/forgot password procedures)
        DECLARE @NewToken NVARCHAR(255) = LOWER(CONVERT(NVARCHAR(36), NEWID())) + '|' + LOWER(CONVERT(NVARCHAR(36), @UserId));
        DECLARE @NewCreationDate DATETIME = @CurrentDate;
        DECLARE @TokenExpiryDate DATETIME = DATEADD(DAY, 7, @NewCreationDate);

        -- Insert the new token into the UserToken table
        INSERT INTO dbo.UserToken (UserId, TokenValue, TokenTypeId, CreationDate, ExpiryDate)
        VALUES (@UserId, @NewToken, @TokenTypeId, @NewCreationDate, @TokenExpiryDate);

        -- Set the output parameters
        SET @Token = @NewToken;
        SET @CreationDate = @NewCreationDate;
        SET @ExpiryDate = @NewExpiryDate;
    END;

    -- Log the activity
    INSERT INTO dbo.UserActivity (UserId, ActivityType, [Description], [Timestamp])
    VALUES (@UserId, @ActivityType, @ActivityMessage, @CurrentDate);

    -- Return the token data
    SELECT 
        @Token AS Token, 
        @CreationDate AS CreationDate, 
        @ExpiryDate AS ExpiryDate;
END;
