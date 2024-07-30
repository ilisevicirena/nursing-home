-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 23.4.2023
-- Description:	gets all avaliable rooms
-- =============================================
CREATE PROCEDURE [dbo].[getAvaliableRooms]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT * FROM (
    SELECT 
        [Id] = r.Id,
        [Name] = r.[Name],
        [Capacity] = r.Capacity,
        [FloorId] = r.FloorId,
        [FloorName] = f.[Name],
        [FreeSpace] = r.Capacity - ISNULL(t1.Number, 0),
        [TakenSpace] = ISNULL(t1.Number, 0),
        t2.GenderId,
        t2.GenderName
    FROM dbo.Room AS r 
    JOIN dbo.[Floor] AS f ON r.FloorId = f.Id
    LEFT JOIN (
        SELECT prr.RoomId, COUNT(prr.RoomId) AS Number
        FROM PersonRoomRelation AS prr
        WHERE prr.Active = 1
        GROUP BY prr.RoomId
    ) AS t1 ON t1.RoomId = r.Id
    LEFT JOIN (
        SELECT COUNT(prr.RoomId) AS Number, g.Id AS GenderId, g.[Name] AS GenderName, g.Tag AS GenderTag, prr.RoomId 
        FROM PersonRoomRelation AS prr
        JOIN Person p ON prr.PersonId = p.Id    
        JOIN Gender g ON p.GenderId = g.Id 
        WHERE prr.Active = 1
        GROUP BY g.Id, g.[Name], g.Tag, prr.RoomId
    ) AS t2 ON t2.RoomId = r.Id
    WHERE r.Capacity > 0
) AS t 
WHERE t.FreeSpace > 0;
	
END