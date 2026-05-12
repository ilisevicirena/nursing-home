-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 6.7.2023.
-- Description:	deletes document from calculation
-- =============================================
CREATE PROCEDURE [dbo].[deleteDocumentFromCalculation]
	-- Add the parameters for the stored procedure here
	(
		@DocumentId int,
		@CalculationId int,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   DELETE FROM dbo.CalculationDocumentRelation WHERE CalculationId=@CalculationId AND DocumentId=@DocumentId;

	DELETE FROM dbo.Document WHERE Id=@DocumentId;

	EXEC dbo.logUserActivity 'DELETE_DOCUMENT_FROM_CALCULATION', 'Document removed from calculation', @ActingUserId;

END