-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	updates package
-- =============================================
CREATE PROCEDURE [dbo].[updatePackage]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@Name varchar(50),
		@Description varchar(2000)=NULL,
		@DefaultPackagePrice float = NULL,
		@PackagePriceCalculated bit,
		@DefaultPackagePriceUnitId int = NULL,
		@CalculationMeasureUnitId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Package
	SET
	[Name]=@Name,
	[Description]=@Description,
	DefaultPackagePrice=@DefaultPackagePrice,
	PackagePriceCalculated=@PackagePriceCalculated,
	DefaultPackagePriceUnitId=@DefaultPackagePriceUnitId,
	CalculationMeasureUnitId=@CalculationMeasureUnitId
	WHERE Id=@Id;
END