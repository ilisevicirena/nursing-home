-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	gets all allergens for person
-- =============================================
CREATE PROCEDURE [dbo].[getPersonAllergens]
(
    @PersonId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [Id] = pa.Id,
        [PersonId] = pa.PersonId,
        [AllergenId] = pa.AllergenId,
        [AllergenName] = pa.AllergenName,
        [ReactionDescription] = pa.ReactionDescription,
        [Severity] = pa.Severity,
        [CreationDate] = pa.CreationDate,
        [ModifiedDate] = pa.ModifiedDate
    FROM dbo.PersonAllergen AS pa
    WHERE pa.PersonId = @PersonId;
END