-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 1.6.2023.
-- Description:	deletes document
-- =============================================
CREATE PROCEDURE [dbo].[deleteDocument]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM dbo.Document WHERE Id=@Id;
END