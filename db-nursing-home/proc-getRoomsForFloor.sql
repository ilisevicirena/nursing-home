USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getRoomsForFloor]    Script Date: 24.4.2023. 9:20:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 17.4.2023
-- Description:	gets all rooms on selected floor
-- =============================================
CREATE PROCEDURE [dbo].[getRoomsForFloor]
	-- Add the parameters for the stored procedure here
	(@FloorId int)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	[Id]=room.Id, 
	[Name]=room.Name, 
	[Capacity]=room.Capacity, 
	[FloorId]=room.FloorId, 
	[FloorName]=floor.Name,
	[People]=isnull(t2.Number, 0)
FROM [dbo].[Room] as room
left join (select  count(prr.RoomId) as Number, prr.RoomId
	from PersonRoomRelation as prr
		join Person p on prr.PersonId=p.Id	
		where prr.Active=1 group by prr.RoomId) as t2 on t2.RoomId=room.Id
INNER JOIN [dbo].[Floor] as floor 
ON room.FloorId=floor.Id WHERE room.FloorId = @FloorId;
END
GO


