USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getPackages]    Script Date: 10.5.2023. 9:21:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 3.5.2023.
-- Description:	gets all packages
-- =============================================
CREATE PROCEDURE [dbo].[getPackages] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	[Id]=p.Id,
	[Name]=p.[Name],
	[Description]=[Description],
	[DefaultPackagePrice]=DefaultPackagePrice,
	[PackagePriceCalculated]=PackagePriceCalculated,
	[DefaultPackagePriceUnitId]=DefaultPackagePriceUnitId,
	[PriceUnitName]=pu.[Name],
	[PriceUnitTag]=pu.Tag,
	[CalculationMeasureUnitId]=CalculationMeasureUnitId,
	[MeasureUnitName]=mu.[Name],
	[MeasureUnitCode]=mu.Code,
	[MeasureUnitTag]=mu.Tag,
	[CreationDate]=p.CreationDate
	FROM dbo.Package as p
	LEFT JOIN dbo.PriceUnit as pu ON pu.Id=p.DefaultPackagePriceUnitId
	left join dbo.MeasureUnit as mu on p.CalculationMeasureUnitId=mu.Id
	WHERE p.Active=1;

END
GO

