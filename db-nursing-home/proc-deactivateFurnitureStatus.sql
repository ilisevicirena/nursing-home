-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 25.4.2024.
-- Description:	deactivates furniture status
-- =============================================
CREATE PROCEDURE [dbo].[deactivateFurnitureStatus] 
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE dbo.FurnitureStatus
	SET Active=0
	WHERE Id=@Id;

END