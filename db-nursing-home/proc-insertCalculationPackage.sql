-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.6.2023.
-- Description:	inserts calculation package
-- =============================================
CREATE PROCEDURE [dbo].[insertCalculationPackage]
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50),
		@Description varchar(2000) = NULL,
		@DefaultPackagePrice float = NULL,
		@PackagePriceCalculated bit,
		@DefaultPackagePriceUnitId int = NULL,
		@CalculationMeasureUnitId int,
		@CalculationId int,
		@TotalPrice float = NULL,
		@PriceUnitId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    insert into dbo.CalculationPackageRelation ([Name], [Description], [DefaultPackagePrice], [PackagePriceCalculated], [DefaultPackagePriceUnitId], [CalculationMeasureUnitId], [CalculationId], [TotalPrice], [PriceUnitId])
	values (@Name, @Description, @DefaultPackagePrice, @PackagePriceCalculated, @DefaultPackagePriceUnitId, @CalculationMeasureUnitId, @CalculationId, @TotalPrice, @PriceUnitId);

	select SCOPE_IDENTITY() as [CalculationPackageRelationId];
END