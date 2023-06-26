-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
   left join dbo.MeasureUnit as mu on c.MeasureUnitId=mu.Id;
   
END
GO
