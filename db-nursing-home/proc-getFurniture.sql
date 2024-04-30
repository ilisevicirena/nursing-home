-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 30.04.2024.
-- Description:	gets all furniture
-- =============================================
CREATE PROCEDURE dbo.getFurniture
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   select f.Id, f.[Name], f.CreationDate, f.InventoryCode, f.[Description], f.RoomId,
	r.[Name] as RoomName, r.FloorId, fl.[Name] as FloorName, latestStatus.FurnitureStatusId as LatestStatusId, 
	fs.[Name] as LatestStatusName, fs.Color as StatusColor, fs.Icon as StatusIcon, latestStatus.[Date] as LatestStatusDate
	from dbo.Furniture f
	left join dbo.Room r on f.RoomId=r.Id
	left join dbo.[Floor] fl on r.FloorId=fl.Id
	LEFT JOIN (
    SELECT 
        f1.FurnitureId,
        f1.FurnitureStatusId,
		f1.[Date]
    FROM 
        dbo.FurnitureFurnitureStatusRelation f1
    LEFT JOIN 
        dbo.FurnitureFurnitureStatusRelation f2 
    ON 
        f1.FurnitureId = f2.FurnitureId
        AND f1.[Date] < f2.[Date]
    WHERE 
        f2.FurnitureId IS NULL
) AS latestStatus on f.Id=latestStatus.FurnitureId
left join dbo.FurnitureStatus fs on fs.Id=latestStatus.FurnitureStatusId order by CreationDate desc;
END
