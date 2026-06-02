-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	gets dietary restrictions for person
-- =============================================
CREATE PROCEDURE [dbo].[getPersonDietaryRestrictions]
(
    @PersonId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [Id]              = dr.Id,
        [PersonId]        = dr.PersonId,
        [DietaryTypeId]   = dr.DietaryTypeId,
        [DietaryTypeName] = dt.Name,
        [Restrictions]    = dr.Restrictions,
        [Notes]           = dr.Notes,
        [StartDate]       = dr.StartDate,
        [EndDate]         = dr.EndDate,
        [IsActive]        = CASE WHEN dr.EndDate IS NULL OR dr.EndDate >= GETDATE() THEN 1 ELSE 0 END,
        [CreationDate]    = dr.CreationDate,
        [ModifiedDate]    = dr.ModifiedDate
    FROM dbo.PersonDietaryRestriction AS dr
    LEFT JOIN dbo.DietaryType AS dt ON dt.Id = dr.DietaryTypeId
    WHERE dr.PersonId = @PersonId
    ORDER BY dr.StartDate DESC;
END