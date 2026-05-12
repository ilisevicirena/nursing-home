-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	removes document from note and deletes document from db
-- =============================================
CREATE PROCEDURE [dbo].[deleteDocumentFromNote]
	-- Add the parameters for the stored procedure here
	(
		@NoteId int,
		@DocumentId int,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM dbo.NoteDocumentRelation WHERE NoteId=@NoteId AND DocumentId=@DocumentId;

	DELETE FROM dbo.Document WHERE Id=@DocumentId;

	EXEC dbo.logUserActivity 'DELETE_DOCUMENT_FROM_NOTE', 'Document removed from note', @ActingUserId;
END