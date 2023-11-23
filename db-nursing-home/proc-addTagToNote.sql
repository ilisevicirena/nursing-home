-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	adds new tag to note
-- =============================================
CREATE PROCEDURE [dbo].[addTagToNote]
	-- Add the parameters for the stored procedure here
	(
		@NoteId int,
		@TagId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @RowId int;

	IF NOT EXISTS (SELECT 1 FROM dbo.NoteTagRelation WHERE NoteId = @NoteId AND TagId=@TagId)
	BEGIN
		INSERT INTO dbo.NoteTagRelation(NoteId, TagId)
		VALUES (@NoteId, @TagId);

		SET @RowId = SCOPE_IDENTITY();
	END
	ELSE
	BEGIN
		SELECT @RowId = Id FROM dbo.NoteTagRelation WHERE NoteId = @NoteId AND TagId=@TagId;
	END;

	SELECT @RowId AS RowId;
END