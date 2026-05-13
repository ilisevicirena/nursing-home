-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	deletes allergen for person
-- =============================================
CREATE PROCEDURE [dbo].[deletePersonAllergen]
(
    @Id INT = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.PersonAllergen
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'DELETE_PERSON_ALLERGEN', 'Person allergen deleted', @ActingUserId;
END