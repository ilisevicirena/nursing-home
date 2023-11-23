-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	unfavorite note
-- =============================================
CREATE PROCEDURE [dbo].[removeNoteFromFavorites]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE FROM dbo.FavoriteNotes WHERE NoteId=@Id;

END