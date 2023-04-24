USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getAccomodationManagementRooms]    Script Date: 24.4.2023. 9:44:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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

    -- Insert statements for procedure here
	SELECT
	[Id]=r.Id,
	[Name]=r.[Name],
	[Capacity]=r.Capacity,
	[FloorId]=r.FloorId,
	[FloorName]=f.[Name],
	[FreeSpace]=r.Capacity- isnull(t2.Number,0),
	[TakenSpace]=ISNULL(t2.Number,0),
	[RoomGenderId]=t2.GenderId,
	[RoomGenderName]=t2.GenderName,
	[RoomGenderTag]=t2.GenderTag
	FROM dbo.Room AS r
	JOIN dbo.[Floor] AS f ON r.FloorId=f.Id
	left join (select  count(prr.RoomId) as Number, g.Id as GenderId, g.[Name] as GenderName, g.Tag as GenderTag, prr.RoomId 
	from PersonRoomRelation as prr
		join Person p on prr.PersonId=p.Id	
		join Gender g on p.GenderId=g.Id 
		where prr.Active=1 group by g.Id, g.[Name], g.Tag, prr.RoomId) as t2 on t2.RoomId=r.Id;

	SELECT 
	[PersonId]=p.Id,
	[FirstName]=p.FirstName,
	[LastName]=p.LastName,
	[RoomId]=prr.RoomId,
	[RoomName]=r.[Name],
	[StartDate]=prr.StartDate,
	[GenderId]=p.GenderId,
	[GenderName]=g.[Name],
	[GenderTag]=g.Tag
	FROM dbo.Person as p 
	left join dbo.Gender as g on p.GenderId=g.Id
	left join dbo.PersonRoomRelation as prr on p.Id=prr.PersonId and prr.Active=1
	left join dbo.Room as r on r.Id=prr.RoomId
	where p.Active=1;
END
GO

