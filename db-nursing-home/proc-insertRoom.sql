-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 14.4.2023.
-- Description:	Inserts new room to Room table.
-- =============================================
CREATE PROCEDURE [dbo].[insertRoom]
	-- Add the parameters for the stored procedure here
	(
	@Name varchar(50),
	@Capacity int,
	@FloorId int = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Room(Name, Capacity, FloorId)
	VALUES(@Name, @Capacity, @FloorId);

	DECLARE @NewIdent Int
SET @NewIdent = SCOPE_IDENTITY();

exec dbo.writeLog @LogType='INSERT', @LogEntity='Room', @Key= @NewIdent;

	SELECT SCOPE_IDENTITY() AS RoomId
END