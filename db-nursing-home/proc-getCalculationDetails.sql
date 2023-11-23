-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.6.2023.
-- Description:	gets calculation details
-- =============================================
CREATE PROCEDURE [dbo].[getCalculationDetails]
	-- Add the parameters for the stored procedure here
		(
			@CalculationId int
		)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	--calculation details
	 select 
   [Id]=c.Id,
   [CalculationDate]=c.CreationDate,
   [Month]=c.[Month],
   [Year]=[Year],
   [PersonId]=c.PersonId,
   [PersonFirstName]=p.FirstName,
   [PersonLastName]=p.LastName,
   [PersonJMBG]=P.JMBG,
   [SystemPrice]=[SystemPrice],
   [RealPrice]=[RealPrice],
   [PaidPrice]=[PaidPrice],
   [DateFrom]=c.[DateFrom],
   [DateTo]=c.DateTo,
   [StatusId]=c.StatusId,
   [StatusName]=s.[Name],
   [StatusStringKey]=s.StringKey,
   [PaymentDaysDeadline]=PaymentDaysDeadline,
   [PriceUnitId]=c.PriceUnitId,
   [PriceUnitName]=pu.[Name],
   [PriceUnitTag]=pu.[Tag],
   [MeasureUnitId]=c.MeasureUnitId,
   [MeasureUnitName]=mu.[Name],
   [MeasureUnitCode]=mu.[Code],
   [MeasureUnitTag]=mu.Tag,
   [DatePaid]=c.DatePaid
   from dbo.Calculation as c
   left join dbo.Person as p on c.PersonId=p.Id
   left join dbo.CalculationStatus as s on c.StatusId=s.Id
   left join dbo.PriceUnit as pu on c.PriceUnitId=pu.Id
   left join dbo.MeasureUnit as mu on c.MeasureUnitId=mu.Id
   where c.Id=@CalculationId;

   -- packages
   SELECT 
	[Id]=cpr.Id,
	[CalculationId]=cpr.CalculationId,
	[Name]=cpr.[Name],
	[Description]=cpr.[Description],
	[Quantity]=1,
	[DefaultPackagePrice]=FORMAT(cpr.DefaultPackagePrice, 'N2'),
	[PackagePriceCalculated]=cpr.PackagePriceCalculated,
	[DefaultPackagePriceUnitId]=cpr.DefaultPackagePriceUnitId,
	[PackagePriceUnitName]=pu.[Name],
	[PackagePriceUnitTag]=pu.Tag,
	[MeasureUnitId]=cpr.CalculationMeasureUnitId,
	[MeasureUnitName]=mu.[Name],
	[MeasureUnitTag]=mu.Tag,
	[MeasureUnitCode]=mu.Code,
	[TotalPrice]=cpr.TotalPrice,
	[PriceUnitId]=cpr.PriceUnitId
	FROM 
	dbo.CalculationPackageRelation as cpr
	left join dbo.PriceUnit as pu on cpr.PriceUnitId=pu.Id
	left join dbo.MeasureUnit as mu on cpr.CalculationMeasureUnitId=mu.Id
	where cpr.CalculationId=@CalculationId;

	--package services
	SELECT 
	[Id]=csr.Id,
	[PackageId]=csr.PackageId,
	[PackageName]=cpr.[Name],
	[ServiceName]=csr.[Name],
	[ServiceDescription]=csr.[Description],
	[MeasureUnitId]=csr.MeasureUnitId,
	[MeasureUnitName]=mu.[Name],
	[MeasureUnitTag]=mu.Tag,
	[MeasureUnitCode]=mu.Code,
	[CostPerUnit]=FORMAT(csr.CostPerUnit, 'N2'),
	[DefaultNumberOfUnits]=csr.DefaultNumberOfUnits,
	[PriceUnitId]=csr.PriceUnitId,
	[PriceUnitName]=pu.[Name],
	[PriceUnitTag]=pu.Tag,
	[Quantity]=csr.Quantity,
	[TotalPrice]=csr.TotalPrice,
	[CalculationId]=csr.CalculationId
	FROM
	dbo.CalculationServiceRelation as csr
	left join dbo.CalculationPackageRelation as cpr on csr.PackageId=cpr.Id
	left join dbo.PriceUnit as pu on csr.PriceUnitId=pu.Id
	left join dbo.MeasureUnit as mu on csr.MeasureUnitId=mu.Id
	where csr.CalculationId=@CalculationId and csr.PackageId!=NULL;

	--individual additional services
	SELECT 
	[Id]=csr.Id,
	[PackageId]=csr.PackageId,
	[PackageName]=cpr.[Name],
	[ServiceName]=csr.[Name],
	[ServiceDescription]=csr.[Description],
	[MeasureUnitId]=csr.MeasureUnitId,
	[MeasureUnitName]=mu.[Name],
	[MeasureUnitTag]=mu.Tag,
	[MeasureUnitCode]=mu.Code,
	[CostPerUnit]=FORMAT(csr.CostPerUnit, 'N2'),
	[DefaultNumberOfUnits]=csr.DefaultNumberOfUnits,
	[PriceUnitId]=csr.PriceUnitId,
	[PriceUnitName]=pu.[Name],
	[PriceUnitTag]=pu.Tag,
	[Quantity]=csr.Quantity,
	[TotalPrice]=csr.TotalPrice,
	[CalculationId]=csr.CalculationId
	from
	dbo.CalculationServiceRelation as csr
	left join dbo.CalculationPackageRelation as cpr on csr.PackageId=cpr.Id
	left join dbo.PriceUnit as pu on csr.PriceUnitId=pu.Id
	left join dbo.MeasureUnit as mu on csr.MeasureUnitId=mu.Id
	where csr.CalculationId=@CalculationId and csr.PackageId=NULL;

	--discounts
	select
	[Id]=Id,
	[Name]=[Name],
	[Description]=[Description],
	[Quantity]=Quantity,
	[PercentCalculation]=PercentCalculation
	from
	dbo.CalculationDiscountRelation 
	where CalculationId=@CalculationId;

	--documents
	select 
	[Id]=cdr.Id,
	[CalculationId]=cdr.CalculationId,
	[DocumentId]=cdr.DocumentId,
	[PersonId]=doc.PersonId,
	[PersonFirstName]=p.FirstName,
	[PersonLastName]=p.LastName,
	[DocumentTypeId]=doc.DocumentTypeId,
	[DocumentTypeName]=dt.[Name],
	[Path]=doc.[Path],
	[Name]=doc.[Name],
	[StorageName]=doc.StorageName,
	[CreationDate]=doc.CreationDate,
	[Extension]=doc.Extension,
	[FileType]=doc.FileType
	from 
	dbo.CalculationDocumentRelation as cdr
	left join dbo.Document as doc on doc.Id=cdr.DocumentId
	left join dbo.Person as p on p.Id=doc.PersonId
	left join dbo.DocumentType as dt on doc.DocumentTypeId=dt.Id
	where cdr.CalculationId=@CalculationId;

END