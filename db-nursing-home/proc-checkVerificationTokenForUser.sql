CREATE PROCEDURE dbo.checkVerificationTokenForUser
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CreationDate DATETIME;
    DECLARE @ExpiryDate DATETIME;

    -- Check if there is a valid, unexpired token for the user
    SELECT TOP 1
        @CreationDate = CreationDate,
        @ExpiryDate = ExpiryDate
    FROM 
        dbo.UserToken
    WHERE 
        UserId = @UserId
        AND ExpiryDate > GETDATE()
        AND TokenTypeId = 2 -- Assuming 2 is for 'RESET_PASSWORD'
    ORDER BY 
        CreationDate DESC;

    -- Return the token's creation and expiry date if it exists
    IF @CreationDate IS NOT NULL AND @ExpiryDate IS NOT NULL
    BEGIN
        SELECT @CreationDate AS CreationDate, @ExpiryDate AS ExpiryDate;
    END
    ELSE
    BEGIN
        SELECT 'Token not found or expired' AS Message;
    END
END;
