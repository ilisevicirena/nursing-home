create PROCEDURE [dbo].[getPersonsForUser] 
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN 
        SELECT 
            [Id] = p.Id,
            [FirstName] = p.FirstName,
            [LastName] = p.LastName,
            [JMBG] = p.JMBG,
            [BirthDate] = p.BirthDate,
            [Active] = p.Active,
            [StartDate] = p.StartDate,
            [EndDate] = p.EndDate,
            [CreationDate] = p.CreationDate,
            [GenderId] = p.GenderId,
            [GenderName] = g.Name,
            [GenderTag] = g.Tag,
            [SpentTime] = DATEDIFF(MONTH, p.StartDate, GETDATE())
        FROM dbo.UserContactRelation AS ucr
        LEFT JOIN dbo.Contact AS c ON ucr.ContactId = c.Id
        LEFT JOIN [dbo].[Person] AS p ON c.PersonId = p.Id
        LEFT JOIN dbo.Gender AS g ON p.GenderId = g.Id
        WHERE ucr.UserId = @UserId;
    END
END