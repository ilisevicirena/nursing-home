CREATE PROCEDURE [dbo].[deleteFurniture]
	-- Add the parameters for the stored procedure here
	(@Id INT)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM dbo.Furniture WHERE Id = @Id;
END