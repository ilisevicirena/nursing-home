-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	updates allergen for person
-- =============================================
CREATE PROCEDURE [dbo].[updatePersonAllergen]
(
    @Id INT = NULL,
    @AllergenId INT = NULL,
    @AllergenName VARCHAR(100) = NULL,
    @ReactionDescription VARCHAR(300) = NULL,
    @Severity VARCHAR(50),
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.PersonAllergen
    SET AllergenId = @AllergenId,
        AllergenName = @AllergenName,
        ReactionDescription = @ReactionDescription,
        Severity = @Severity,
        ModifiedDate = GETDATE()
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'UPDATE_PERSON_ALLERGEN', 'Person allergen updated', @ActingUserId;
END