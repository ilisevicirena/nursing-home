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
        [AllergenName] = pa.AllergenName,
        [ReactionDescription] = pa.ReactionDescription,
        [SeverityId] = pa.SeverityId,
        [SeverityName] = asev.Name,
        [SeverityStringKey] = asev.StringKey,
        [SeverityColor] = asev.Color,
        [StartDate] = pa.StartDate,
        [EndDate] = pa.EndDate,
        [IsActive] = CASE 
            WHEN pa.EndDate IS NULL AND pa.StartDate <= CAST(GETDATE() AS DATE) THEN 1
            WHEN pa.EndDate IS NOT NULL AND pa.StartDate <= CAST(GETDATE() AS DATE) AND pa.EndDate >= CAST(GETDATE() AS DATE) THEN 1
            ELSE 0
        END,
        [CreationDate] = pa.CreationDate,
        [ModifiedDate] = pa.ModifiedDate
    FROM dbo.PersonAllergen AS pa
    INNER JOIN dbo.AllergenSeverity AS asev ON pa.SeverityId = asev.Id
    WHERE pa.PersonId = @PersonId
    ORDER BY pa.CreationDate DESC;
END