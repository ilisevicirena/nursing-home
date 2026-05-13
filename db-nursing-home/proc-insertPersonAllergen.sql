-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	inserts new allergen for person
-- =============================================
CREATE PROCEDURE [dbo].[insertPersonAllergen]
(
    @PersonId INT,
    @AllergenId INT = NULL,
    @AllergenName VARCHAR(100) = NULL,
    @ReactionDescription VARCHAR(300) = NULL,
    @Severity VARCHAR(50),
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.PersonAllergen (PersonId, AllergenId, AllergenName, ReactionDescription, Severity, CreationDate)
    VALUES (@PersonId, @AllergenId, @AllergenName, @ReactionDescription, @Severity, GETDATE());

    SELECT SCOPE_IDENTITY() AS PersonAllergenId;

    EXEC dbo.logUserActivity 'INSERT_PERSON_ALLERGEN', 'Person allergen inserted', @ActingUserId;
END