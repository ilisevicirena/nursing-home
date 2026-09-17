-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	gets dietary restriction types
-- =============================================
CREATE PROCEDURE [dbo].[getDietaryTypes]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [Id] = dt.Id,
        [Name] = dt.Name,
        [Description] = dt.Description
    FROM dbo.DietaryType AS dt;
END