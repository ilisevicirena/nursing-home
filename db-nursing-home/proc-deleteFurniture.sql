CREATE PROCEDURE [dbo].[deleteFurniture]
	-- Add the parameters for the stored procedure here
	(@Id INT,
    @ActingUserId NCHAR(36) = NULL)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM dbo.Furniture WHERE Id = @Id;

	EXEC dbo.logUserActivity 'DELETE_FURNITURE', 'Furniture item deleted', @ActingUserId;
END