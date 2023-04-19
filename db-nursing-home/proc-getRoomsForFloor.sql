-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
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
	[FloorName]=floor.Name
FROM [dbo].[Room] as room
INNER JOIN [dbo].[Floor] as floor 
ON room.FloorId=floor.Id WHERE room.FloorId = @FloorId;
END
GO
