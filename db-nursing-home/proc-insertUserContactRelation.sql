CREATE PROCEDURE [dbo].[insertUserContactRelation]
    @UserId CHAR(36),
    @ContactId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert the new relation between User and Contact
    INSERT INTO [dbo].[UserContactRelation] (
        [UserId],
        [ContactId]
    )
    VALUES (
        @UserId,
        @ContactId
    );

    -- Return the inserted Id
    SELECT SCOPE_IDENTITY() AS Id, @UserId AS UserId, @ContactId AS ContactId;
END;
