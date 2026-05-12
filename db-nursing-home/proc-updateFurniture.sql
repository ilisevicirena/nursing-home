-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 6.5.2024.
-- Description:	updates furniture
-- =============================================
CREATE PROCEDURE [dbo].[updateFurniture]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@Name varchar(150),
		@Description varchar(2000) = NULL,
		@InventoryCode varchar(50) = NULL,
		@RoomId int = NULL,
    @ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Furniture
	SET
	[Name]=@Name,
	[Description]=@Description,
	[InventoryCode]=@InventoryCode,
	[RoomId]=@RoomId
	WHERE Id=@Id;

	EXEC dbo.logUserActivity 'UPDATE_FURNITURE', 'Furniture item updated', @ActingUserId;
END