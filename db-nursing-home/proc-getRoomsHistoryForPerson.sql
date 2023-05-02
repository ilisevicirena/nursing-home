USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getRoomsHistoryForPerson]    Script Date: 2.5.2023. 11:01:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.4.2023.
-- Description:	get rooms history for person
-- =============================================
CREATE PROCEDURE [dbo].[getRoomsHistoryForPerson] 
	-- Add the parameters for the stored procedure here
	(
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	[Id]=relation.Id, 
	[PersonId]=relation.PersonId, 
	[RoomId]=relation.RoomId, 
	[RoomName]=room.[Name], 
	[FloorId]=room.FloorId,
	[FloorName]=[floor].[Name],
	[Active]=relation.Active,
	[StartDate]=relation.StartDate,
	[EndDate]=relation.EndDate
FROM [dbo].[PersonRoomRelation] as relation
INNER JOIN [dbo].[Room] as room ON relation.RoomId=room.Id
LEFT JOIN dbo.[Floor] as [floor] on room.FloorId=[floor].Id
WHERE relation.PersonId = @PersonId
order by StartDate desc;
END
GO

