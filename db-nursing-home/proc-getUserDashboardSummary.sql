CREATE PROCEDURE [dbo].[getUserDashboardSummary]
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Count the number of persons associated with the user
    DECLARE @PersonCount INT;
    SELECT @PersonCount = COUNT(p.Id)
    FROM dbo.UserContactRelation AS ucr
    LEFT JOIN dbo.Contact AS c ON ucr.ContactId = c.Id
    LEFT JOIN dbo.Person AS p ON c.PersonId = p.Id
    WHERE ucr.UserId = @UserId;

    -- Count the number of unpaid calculations for those persons (StatusId = 2)
    DECLARE @UnpaidCalculations INT;
    SELECT @UnpaidCalculations = COUNT(c.Id)
    FROM dbo.Calculation AS c
    INNER JOIN dbo.Person AS p ON c.PersonId = p.Id
    INNER JOIN dbo.Contact AS ct ON p.Id = ct.PersonId
    INNER JOIN dbo.UserContactRelation AS ucr ON ct.Id = ucr.ContactId
    WHERE ucr.UserId = @UserId AND c.StatusId = 2;

    -- Return the results
    SELECT 
        @UnpaidCalculations AS UnpaidCalculations,
        @PersonCount AS Persons;
END
