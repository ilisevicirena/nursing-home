-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.4.2023.
-- Description:	deletes contact from Contact table
-- =============================================
CREATE PROCEDURE [dbo].[deleteContact]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM dbo.Contact WHERE Id=@Id;
END