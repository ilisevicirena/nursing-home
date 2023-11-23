-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 14.4.2023.
-- Description:	Updates room row in table Room.
-- =============================================
CREATE PROCEDURE [dbo].[updateRoom]
	-- Add the parameters for the stored procedure here
	(
	@Id int,
	@Name varchar(50),
	@Capacity int,
	@FloorId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Room
	SET
		Name = @Name,
		Capacity = @Capacity,
		FloorId = @FloorId
	WHERE Id = @Id

		exec dbo.writeLog @LogType='UPDATE', @LogEntity='Room', @Key= @Id;
		
END