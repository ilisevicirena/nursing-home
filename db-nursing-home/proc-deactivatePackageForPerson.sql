-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	deactivates package for person
-- =============================================
CREATE PROCEDURE [dbo].[deactivatePackageForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PackageId int,
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE dbo.PersonPackageRelation
	SET 
	Active=0,
	EndDate=CAST(DATEADD(hour, 2, GETDATE()) AS DATE)
	WHERE PackageId=@PackageId and PersonId=@PersonId;
END