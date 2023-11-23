-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.06.2023.
-- Description:	inserts new calculation
-- =============================================
CREATE PROCEDURE [dbo].[insertCalculation]
	-- Add the parameters for the stored procedure here
	(
		@Month int,
		@Year int,
		@PersonId int,
		@SystemPrice float,
		@DateFrom datetime,
		@DateTo datetime,
		@PaymentDaysDeadline int=NULL,
		@PriceUnitId int,
		@MeasureUnitId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SET @DateFrom = CAST(DATEADD(hour, 2, @DateFrom) AS DATE);
	SET @DateTo = CAST(DATEADD(hour, 2, @DateTo) AS DATE);
    -- Insert statements for procedure here
	insert into dbo.Calculation ([CreationDate],[Month], [Year], [PersonId], [SystemPrice], [RealPrice], [PaidPrice], [DateFrom], [DateTo], [StatusId], [PaymentDaysDeadline], [PriceUnitId], [MeasureUnitId], [DatePaid])
	values (CAST(DATEADD(hour, 2, GETDATE()) AS DATE), @Month, @Year,@PersonId, @SystemPrice, NULL, NULL, @DateFrom, @DateTo, 2, @PaymentDaysDeadline, @PriceUnitId, @MeasureUnitId, NULL);

	select SCOPE_IDENTITY() as [CalculationId];

END