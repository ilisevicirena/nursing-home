-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 13.5.2026
-- Description:	gets all allergen severities
-- =============================================
CREATE PROCEDURE [dbo].[getAllergenSeverities]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [Id] = asev.Id,
        [Name] = asev.Name,
        [StringKey] = asev.StringKey,
        [Color] = asev.Color
    FROM dbo.AllergenSeverity AS asev
    ORDER BY asev.Id;
END
