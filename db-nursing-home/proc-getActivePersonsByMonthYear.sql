CREATE PROCEDURE [dbo].[getActivePersonsByMonthYear] 
    @Month INT,
    @Year INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DateFrom DATETIME;
    SET @DateFrom = DATEFROMPARTS(@Year, @Month, 1);

    SELECT 
        [Id] = p.Id,
        [FirstName]=FirstName,
        [LastName]=LastName,
        [JMBG]=JMBG,
        [BirthDate]=BirthDate,
        [Active]=Active,
        [StartDate]=StartDate,
        [EndDate]=EndDate,
        [CreationDate]=CreationDate,
        [GenderId]=GenderId,
        [GenderName]=g.Name,
        [GenderTag]=g.Tag
    FROM 
        [dbo].[Person] AS p
    LEFT JOIN 
        dbo.Gender AS g ON p.GenderId = g.Id
    WHERE 
        -- StartDate is before or equal to the first day of the next month
        (p.StartDate <= DATEADD(MONTH, 1, @DateFrom) OR p.StartDate IS NULL) 
        -- EndDate is after or equal to the first day of the current month, or is NULL (indicating the person is still active)
        AND (p.EndDate >= @DateFrom OR p.EndDate IS NULL);
END;