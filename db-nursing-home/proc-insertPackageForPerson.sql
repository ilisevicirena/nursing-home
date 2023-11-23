-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	iserts new package for person
-- =============================================
CREATE PROCEDURE [dbo].[insertPackageForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@PackageId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.PersonPackageRelation (PersonId, PackageId, StartDate, EndDate, Active)
	VALUES (@PersonId, @PackageId, GETDATE(), NULL, 1);

	SELECT SCOPE_IDENTITY() AS [RowId];
END