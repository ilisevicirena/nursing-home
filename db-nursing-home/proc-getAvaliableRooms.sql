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

	select * from (
	select 
	[Id]=r.Id,
	[Name]=r.[Name],
	[Capacity]=r.Capacity,
	[FloorId]=r.FloorId,
	[FloorName]=f.[Name],
	[FreeSpace]=r.Capacity- isnull(t2.Number,0),
	t2.GenderId,
	t2.GenderName
	from dbo.Room as r 
	join dbo.[Floor] as f on r.FloorId=f.Id
	left join (select  count(prr.RoomId) as Number, g.Id as GenderId, g.[Name] as GenderName, g.Tag as GenderTag, prr.RoomId 
	from PersonRoomRelation as prr
		join Person p on prr.PersonId=p.Id	
		join Gender g on p.GenderId=g.Id 
		where prr.Active=1 group by g.Id, g.[Name], g.Tag, prr.RoomId) as t2 on t2.RoomId=r.Id
	where r.Capacity>0) as t 
	where t.FreeSpace>0;
	
END