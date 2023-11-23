-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	deactivates tag
-- =============================================
CREATE PROCEDURE [dbo].[deactivateTag] 
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE dbo.NotesTag
	SET Active=0
	WHERE Id=@Id;

END