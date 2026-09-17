-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	inserts new allergen for person
-- =============================================
CREATE PROCEDURE [dbo].[insertPersonAllergen]
(
    @PersonId INT,
    @AllergenName VARCHAR(100),
    @SeverityId INT,
    @ReactionDescription VARCHAR(300) = NULL,
    @StartDate DATETIME = NULL,
    @EndDate DATETIME = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validate required fields
    IF @AllergenName IS NULL OR LEN(LTRIM(RTRIM(@AllergenName))) = 0
    BEGIN
        RAISERROR('AllergenName is required', 16, 1);
        RETURN;
    END;

    IF @SeverityId IS NULL
    BEGIN
        RAISERROR('SeverityId is required', 16, 1);
        RETURN;
    END;

    -- If no start date provided, use today
    IF @StartDate IS NULL
        SET @StartDate = CAST(GETDATE() AS DATE);

    INSERT INTO dbo.PersonAllergen (PersonId, AllergenName, SeverityId, ReactionDescription, StartDate, EndDate, CreationDate)
    VALUES (@PersonId, @AllergenName, @SeverityId, @ReactionDescription, @StartDate, @EndDate, GETDATE());

    SELECT 
        [Id] = SCOPE_IDENTITY(),
        [SeverityId] = @SeverityId;

    EXEC dbo.logUserActivity 'INSERT_PERSON_ALLERGEN', 'Person allergen inserted', @ActingUserId;
END