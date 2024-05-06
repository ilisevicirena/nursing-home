-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 30.4.2024.
-- Description:	gets number of furniture in status for all active statuses
-- =============================================
CREATE PROCEDURE dbo.getFurnitureCountByStatus
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

 SELECT 
    fs.Id, 
    fs.[Name], 
    fs.Color, 
    fs.Icon, 
    COUNT(DISTINCT f.FurnitureId) AS Furniture 
FROM 
    dbo.FurnitureStatus fs 
LEFT JOIN (
    SELECT 
        f1.FurnitureId,
        f1.FurnitureStatusId
    FROM 
        dbo.FurnitureFurnitureStatusRelation f1
    LEFT JOIN 
        dbo.FurnitureFurnitureStatusRelation f2 
    ON 
        f1.FurnitureId = f2.FurnitureId
        AND f1.[Date] < f2.[Date]
    WHERE 
        f2.FurnitureId IS NULL
) AS latestStatus 
ON 
    fs.Id = latestStatus.FurnitureStatusId 
LEFT JOIN 
    dbo.FurnitureFurnitureStatusRelation f 
ON 
    fs.Id = f.FurnitureStatusId 
    AND latestStatus.FurnitureId = f.FurnitureId
WHERE 
    fs.Active=1
GROUP BY 
    fs.Id, 
    fs.Name, 
    fs.Color, 
    fs.Icon;
END
