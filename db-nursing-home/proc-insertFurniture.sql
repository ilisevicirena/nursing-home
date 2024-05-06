-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 6.5.2024.
-- Description:	inserts new furniture
-- =============================================
CREATE PROCEDURE [dbo].[insertFurniture]
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(150),
		@Description varchar(2000) = NULL,
		@InventoryCode varchar(50) = NULL,
		@RoomId int = NULL	
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Furniture([Name], [Description], InventoryCode, RoomId, CreationDate)
	VALUES (@Name, @Description, @InventoryCode, @RoomId, GETDATE());

	INSERT INTO dbo.FurnitureFurnitureStatusRelation([FurnitureId], [FurnitureStatusId], [Date])
	VALUES (SCOPE_IDENTITY(), 1, GETDATE());

	SELECT SCOPE_IDENTITY() AS [FurnitureId];
END