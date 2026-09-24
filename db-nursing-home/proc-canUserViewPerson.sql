CREATE PROCEDURE [dbo].[canUserViewPerson]
    @UserId UNIQUEIDENTIFIER,
    @PersonId INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CanView BIT = 0;

    -- Staff (any role other than the basic 'User' role, RoleId 3) may view any person
    IF EXISTS (
        SELECT 1
        FROM dbo.UserRoleRelation ur
        WHERE ur.UserId = @UserId
          AND ur.RoleId <> 3
    )
        SET @CanView = 1;
    -- Basic 'User' role: only residents they are linked to (UserContactRelation -> Contact)
    ELSE IF EXISTS (
        SELECT 1
        FROM dbo.UserContactRelation ucr
        INNER JOIN dbo.Contact c ON c.Id = ucr.ContactId
        WHERE ucr.UserId = @UserId
          AND c.PersonId = @PersonId
    )
        SET @CanView = 1;

    SELECT [CanView] = @CanView;
END
