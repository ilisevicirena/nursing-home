-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 14.4.2023
-- Description:	Deletes row from Floor table
-- =============================================
CREATE PROCEDURE [dbo].[deleteFloor]
	-- Add the parameters for the stored procedure here
	(@Id INT,
    @ActingUserId NCHAR(36) = NULL)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM dbo.Floor WHERE Id = @Id

	EXEC dbo.logUserActivity 'DELETE_FLOOR', 'Floor deleted', @ActingUserId;
END