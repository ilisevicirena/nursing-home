-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 24.4.2023.
-- Description:	accomodation management - gets all rooms with all data
-- =============================================
CREATE PROCEDURE [dbo].[getAccomodationManagementRooms]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	 -- Get floor information
    SELECT 
        [Id] = f.Id,
        [Name] = f.[Name],
        [RoomCount] = ISNULL(t2.Number, 0)
    FROM dbo.[Floor] AS f
    LEFT JOIN (
        SELECT COUNT(r.FloorId) AS Number, r.FloorId
        FROM dbo.Room AS r
        JOIN dbo.[Floor] f ON r.FloorId = f.Id
        WHERE r.Capacity > 0 -- Only consider rooms with capacity greater than 0
        GROUP BY r.FloorId
    ) AS t2 ON t2.FloorId = f.Id
    WHERE t2.Number > 0; -- Filter for floors that have at least one room with capacity greater than 0

    -- Get room information with total occupancy
    SELECT
        [Id] = r.Id,
        [Name] = r.[Name],
        [Width] = r.Width,
        [Height] = r.Height,
        [Top] = r.TopPosition,
        [Left] = r.LeftPosition,
        [Capacity] = r.Capacity,
        [FloorId] = r.FloorId,
        [FloorName] = f.[Name],
        [FreeSpace] = r.Capacity - ISNULL(t1.Number, 0),
        [TakenSpace] = ISNULL(t1.Number, 0),
        [RoomGenderId] = t2.GenderId,
        [RoomGenderName] = t2.GenderName,
        [RoomGenderTag] = t2.GenderTag
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
    WHERE r.FloorId IN (
        SELECT [Id]
        FROM dbo.[Floor]
        LEFT JOIN (
            SELECT COUNT(r.FloorId) AS RoomCount, r.FloorId
            FROM dbo.Room AS r
            WHERE r.Capacity > 0
            GROUP BY r.FloorId
        ) AS t1 ON t1.FloorId = dbo.[Floor].[Id]
        WHERE t1.RoomCount > 0
    );

    -- Get person information
    SELECT 
        [PersonId] = p.Id,
        [FirstName] = p.FirstName,
        [LastName] = p.LastName,
        [RoomId] = prr.RoomId,
        [RoomName] = r.[Name],
        [StartDate] = prr.StartDate,
        [GenderId] = p.GenderId,
        [GenderName] = g.[Name],
        [GenderTag] = g.Tag
    FROM dbo.Person AS p 
    LEFT JOIN dbo.Gender AS g ON p.GenderId = g.Id
    LEFT JOIN dbo.PersonRoomRelation AS prr ON p.Id = prr.PersonId AND prr.Active = 1
    LEFT JOIN dbo.Room AS r ON r.Id = prr.RoomId
    WHERE p.Active = 1;
END