-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	updates allergen for person
-- =============================================
CREATE PROCEDURE [dbo].[updatePersonAllergen]
(
    @Id INT,
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

    UPDATE dbo.PersonAllergen
    SET AllergenName = @AllergenName,
        SeverityId = @SeverityId,
        ReactionDescription = @ReactionDescription,
        StartDate = ISNULL(@StartDate, StartDate),
        EndDate = @EndDate,
        ModifiedDate = GETDATE()
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'UPDATE_PERSON_ALLERGEN', 'Person allergen updated', @ActingUserId;
END