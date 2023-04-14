USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getRooms]    Script Date: 14.4.2023. 12:30:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 14.4.2023.
-- Description:	Gets all rooms from table Room.
-- =============================================
CREATE PROCEDURE [dbo].[getRooms]
	-- Add the parameters for the stored procedure here
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
	[FloorName]=floor.Name
FROM [dbo].[Room] as room
INNER JOIN [dbo].[Floor] as floor 
ON room.FloorId=floor.Id;

END
GO


