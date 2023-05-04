USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getServicesForPackage]    Script Date: 4.5.2023. 13:42:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 3.5.2023.
-- Description:	gets services for package
-- =============================================
CREATE PROCEDURE [dbo].[getServicesForPackage]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
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
	[CostPerUnit]=s.CostPerUnit,
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
	where ppr.PackageId=@Id and spr.Active=1;

END
GO

