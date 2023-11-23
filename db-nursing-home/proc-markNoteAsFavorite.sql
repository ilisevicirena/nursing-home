-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	mark note as favorite
-- =============================================
CREATE PROCEDURE [dbo].[markNoteAsFavorite]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   DECLARE @RowId int;

	IF NOT EXISTS (SELECT 1 FROM dbo.FavoriteNotes WHERE NoteId = @Id)
	BEGIN
		INSERT INTO dbo.FavoriteNotes(NoteId)
		VALUES (@Id);

		SET @RowId = SCOPE_IDENTITY();
	END
	ELSE
	BEGIN
		SELECT @RowId = Id FROM dbo.FavoriteNotes WHERE NoteId = @Id;
	END;

	SELECT @RowId AS RowId;
END