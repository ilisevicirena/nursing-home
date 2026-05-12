CREATE PROCEDURE [dbo].[getUserToken]
    @UserId UNIQUEIDENTIFIER,
    @TokenTypeId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Retrieve the user token based on UserId, TokenTypeId, and check if the token has not expired
    SELECT
        [Id] AS TokenId,
        [UserId],
        [TokenTypeId],
        [TokenValue],
        [CreationDate],
        [ExpiryDate],
        [VerificationCode]
    FROM [dbo].[UserToken]
    WHERE [UserId] = @UserId
      AND [TokenTypeId] = @TokenTypeId
      AND ([ExpiryDate] IS NULL OR [ExpiryDate] > GETDATE());
END;
