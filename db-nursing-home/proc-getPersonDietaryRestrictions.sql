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
        [Id] = dr.Id,
        [PersonId] = dr.PersonId,
        [DietaryTypeId] = dr.DietaryTypeId,
        [Restrictions] = dr.Restrictions,
        [Notes] = dr.Notes,
        [StartDate] = dr.StartDate,
        [EndDate] = dr.EndDate,
        [CreationDate] = dr.CreationDate,
        [ModifiedDate] = dr.ModifiedDate
    FROM dbo.PersonDietaryRestriction AS dr
    WHERE dr.PersonId = @PersonId;
END