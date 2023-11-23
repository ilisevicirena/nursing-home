-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.6.2023.
-- Description:	gets calculations for specific month and year
-- =============================================
CREATE PROCEDURE [dbo].[getCalculationsForMonth]
	-- Add the parameters for the stored procedure here
	(
		@Month int,
		@Year int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   select 
   [Id]=c.Id,
   [CalculationDate]=c.CreationDate,
   [Month]=c.[Month],
   [Year]=[Year],
   [PersonId]=c.PersonId,
   [PersonFirstName]=p.FirstName,
   [PersonLastName]=p.LastName,
   [PersonJMBG]=P.JMBG,
   [SystemPrice]=FORMAT(SystemPrice, 'N2'),
   [RealPrice]=FORMAT(RealPrice, 'N2'),
   [PaidPrice]=FORMAT(PaidPrice, 'N2'),
   [DateFrom]=c.[DateFrom],
   [DateTo]=c.DateTo,
   [StatusId]=c.StatusId,
   [StatusName]=s.[Name],
   [StatusStringKey]=s.StringKey,
   [StatusColor]=s.Color,
   [PaymentDaysDeadline]=PaymentDaysDeadline,
   [PriceUnitId]=c.PriceUnitId,
   [PriceUnitName]=pu.[Name],
   [PriceUnitTag]=pu.[Tag],
   [MeasureUnitId]=c.MeasureUnitId,
   [MeasureUnitName]=mu.[Name],
   [MeasureUnitCode]=mu.[Code],
   [MeasureUnitTag]=mu.Tag,
   [DatePaid]=c.DatePaid,
   [Documents]=t1.NumberOfDocuments
   from dbo.Calculation as c
   left join dbo.Person as p on c.PersonId=p.Id
   left join dbo.CalculationStatus as s on c.StatusId=s.Id
   left join dbo.PriceUnit as pu on c.PriceUnitId=pu.Id
   left join dbo.MeasureUnit as mu on c.MeasureUnitId=mu.Id
   left join (select CalculationId, COUNT(CalculationId) as NumberOfDocuments from dbo.CalculationDocumentRelation group by CalculationId) as t1 on t1.CalculationId=c.Id
   where [Month]=@Month and [Year]=@Year;
   
END