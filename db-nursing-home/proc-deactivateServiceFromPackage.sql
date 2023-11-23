-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	deactivates service from package
-- =============================================
CREATE PROCEDURE [dbo].[deactivateServiceFromPackage]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE dbo.ServicePackageRelation
	SET
	Active=0
	WHERE Id=@Id;

END