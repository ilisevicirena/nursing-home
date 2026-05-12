CREATE PROCEDURE [dbo].[insertUserToken]
    @UserId UNIQUEIDENTIFIER,
    @TokenTypeId INT,
    @TokenValue NVARCHAR(300),
    @CreationDate DATETIME = NULL,
    @ExpiryDate DATETIME = NULL,
    @VerificationCode NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Set default value for CreationDate if it is not provided
    IF @CreationDate IS NULL
    BEGIN
        SET @CreationDate = GETDATE();
    END

    -- Insert the new user token
    INSERT INTO [dbo].[UserToken] (
        [UserId],
        [TokenTypeId],
        [TokenValue],
        [CreationDate],
        [ExpiryDate],
        [VerificationCode]
    )
    VALUES (
        @UserId,
        @TokenTypeId,
        @TokenValue,
        @CreationDate,
        @ExpiryDate,
        @VerificationCode
    );
END;
