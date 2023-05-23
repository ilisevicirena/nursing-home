USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getServicesAndPackagesForPerson]    Script Date: 23.5.2023. 9:10:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	gets packages and services for person
-- =============================================
CREATE PROCEDURE [dbo].[getServicesAndPackagesForPerson]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- package data
	SELECT 
	[PersonId]=ppr.PersonId,
	[FirstName]=p.FirstName,
	[LastName]=p.LastName,
	[Jmbg]=p.JMBG,
	[RowId]=ppr.Id,
	[Id]=ppr.PackageId,
	[Name]=pc.[Name],
	[Description]=pc.[Description],
	[Quantity]=1,
	[DefaultPackagePrice]=FORMAT(pc.DefaultPackagePrice, 'N2'),
	[PackagePriceCalculated]=pc.PackagePriceCalculated,
	[DefaultPackagePriceUnitId]=pc.DefaultPackagePriceUnitId,
	[DefaultPackagePriceUnitName]=pu.[Name],
	[DefaultPackagePriceUnitTag]=pu.Tag,
	[StartDate]=ppr.StartDate,
	[MeasureUnitId]=pc.CalculationMeasureUnitId,
	[MeasureUnitName]=mu.[Name],
	[MeasureUnitTag]=mu.Tag,
	[MeasureUnitCode]=mu.Code
	FROM 
	dbo.PersonPackageRelation as ppr 
	join dbo.Person as p on p.Id=ppr.PersonId
	join dbo.Package as pc on pc.Id=ppr.PackageId
	left join dbo.MeasureUnit as mu on pc.CalculationMeasureUnitId=mu.Id
	left join dbo.PriceUnit as pu on pc.DefaultPackagePriceUnitId=pu.Id
	where ppr.PersonId=@Id and ppr.Active=1;

	--package services
	SELECT 
	[PackageId]=ppr.PackageId,
	[PackageName]=p.[Name],
	[ServiceId]=spr.ServiceId,
	[ServiceName]=s.[Name],
	[ServiceDescription]=s.[Description],
	[MeasureUnitId]=s.MeasureUnitId,
	[MeasureUnitName]=mu.[Name],
	[MeasureUnitTag]=mu.Tag,
	[MeasureUnitCode]=mu.Code,
	[CostPerUnit]=FORMAT(s.CostPerUnit, 'N2'),
	[DefaultNumberOfUnits]=s.DefaultNumberOfUnits,
	[PriceUnitId]=s.PriceUnitId,
	[PriceUnitName]=pu.[Name],
	[PriceUnitTag]=pu.Tag,
	[Quantity]=spr.Quantity
	FROM
	dbo.PersonPackageRelation as ppr
	join dbo.Package as p on p.Id=ppr.PackageId
	left join dbo.ServicePackageRelation as spr on ppr.PackageId=spr.PackageId
	join dbo.[Service] as s on spr.ServiceId=s.Id
	join dbo.MeasureUnit as mu on s.MeasureUnitId=mu.Id
	join dbo.PriceUnit as pu on s.PriceUnitId=pu.Id
	where ppr.PersonId=@Id and spr.Active=1;

	--individual additional services
	SELECT 
	[RowId]=psr.Id,
	[Id]=psr.ServiceId,
	[Name]=s.[Name],
	[Description]=s.[Description],
	[MeasureUnitId]=s.MeasureUnitId,
	[MeasureUnitName]=mu.[Name],
	[MeasureUnitTag]=mu.Tag,
	[MeasureUnitCode]=mu.Code,
	[CostPerUnit]=FORMAT(s.CostPerUnit, 'N2'),
	[DefaultNumberOfUnits]=s.DefaultNumberOfUnits,
	[PriceUnitId]=s.PriceUnitId,
	[PriceUnitName]=pu.[Name],
	[PriceUnitTag]=pu.Tag,
	[Quantity]=psr.Quantity
	FROM dbo.PersonServiceRelation as psr
	join dbo.[Service] as s on psr.ServiceId=s.Id
	join dbo.MeasureUnit as mu on s.MeasureUnitId=mu.Id
	join dbo.PriceUnit as pu on s.PriceUnitId=pu.Id
	where psr.PersonId=@Id and psr.Active=1;

	--discounts
	select
	[Id]=pdr.DiscountId,
	[Name]=d.[Name],
	[Description]=d.[Description],
	[Quantity]=d.Quantity,
	[PercentCalculation]=d.PercentCalculation
	from
	dbo.PersonDiscountRelation as pdr
	join dbo.Discount as d 
	on pdr.DiscountId=d.Id
	where pdr.PersonId=@Id and pdr.Active=1;
END
GO

