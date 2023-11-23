-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	inserts new package
-- =============================================
CREATE PROCEDURE [dbo].[insertPackage]
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50),
		@Description varchar(2000) = NULL,
		@DefaultPackagePrice float = NULL,
		@DefaultPackagePriceUnitId int = NULL,
		@PackagePriceCalculated bit,
		@CalculationMeasureUnitId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Package ([Name], [Description], DefaultPackagePrice, DefaultPackagePriceUnitId, PackagePriceCalculated, CalculationMeasureUnitId, Active, CreationDate)
	VALUES (@Name, @Description, @DefaultPackagePrice, @DefaultPackagePriceUnitId, @PackagePriceCalculated, @CalculationMeasureUnitId, 1, GETDATE());

	SELECT SCOPE_IDENTITY() AS [PackageId];
END