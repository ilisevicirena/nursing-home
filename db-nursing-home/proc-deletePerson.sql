-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.4.2023.
-- Description:	deletes person from Person table
-- =============================================
CREATE PROCEDURE [dbo].[deletePerson]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM dbo.Person WHERE Id = @Id;

	exec dbo.writeLog @LogType='DELETE', @LogEntity='Person', @Key= @Id, @UserId=@ActingUserId;

	EXEC dbo.logUserActivity 'DELETE_PERSON', 'Person deleted', @ActingUserId;
END