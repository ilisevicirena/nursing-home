-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 14.4.2023.
-- Description:	Deletes room row from Room table.
-- =============================================
CREATE PROCEDURE [dbo].[deleteRoom]
	-- Add the parameters for the stored procedure here
	(@Id INT,
    @ActingUserId NCHAR(36) = NULL)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM dbo.Room WHERE Id = @Id;

	exec dbo.writeLog @LogType='DELETE', @LogEntity='Room', @Key= @Id;

	EXEC dbo.logUserActivity 'DELETE_ROOM', 'Room deleted', @ActingUserId;
END