-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 4.5.2023.
-- Description:	deactivates package
-- =============================================
CREATE PROCEDURE [dbo].[deactivatePackage]
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

	update dbo.Package
	set Active=0
	where Id=@Id;

	EXEC dbo.logUserActivity 'DEACTIVATE_PACKAGE', 'Package deactivated', @ActingUserId;
END