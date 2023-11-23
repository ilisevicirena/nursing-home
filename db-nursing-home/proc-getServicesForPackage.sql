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
	[Id]=spr.Id,
	[PackageId]=spr.PackageId,
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
	FROM dbo.ServicePackageRelation as spr
	join dbo.Package as p on p.Id=spr.PackageId
	join dbo.[Service] as s on spr.ServiceId=s.Id
	join dbo.MeasureUnit as mu on s.MeasureUnitId=mu.Id
	join dbo.PriceUnit as pu on s.PriceUnitId=pu.Id
	where spr.PackageId=@Id and spr.Active=1;

END