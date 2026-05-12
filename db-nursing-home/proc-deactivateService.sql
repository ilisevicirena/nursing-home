-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	deactivates service
-- =============================================
CREATE PROCEDURE [dbo].[deactivateService]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE dbo.[Service] 
	SET Active=0
	WHERE Id=@Id;

	EXEC dbo.logUserActivity 'DEACTIVATE_SERVICE', 'Service deactivated', @ActingUserId;
END