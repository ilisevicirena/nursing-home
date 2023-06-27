USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[insertCalculation]    Script Date: 27.6.2023. 9:17:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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

    -- Insert statements for procedure here
	insert into dbo.Calculation ([CreationDate],[Month], [Year], [PersonId], [SystemPrice], [RealPrice], [PaidPrice], [DateFrom], [DateTo], [StatusId], [PaymentDaysDeadline], [PriceUnitId], [MeasureUnitId], [DatePaid])
	values (GETDATE(), @Month, @Year,@PersonId, @SystemPrice, NULL, NULL, @DateFrom, @DateTo, 1, @PaymentDaysDeadline, @PriceUnitId, @MeasureUnitId, NULL);

	select SCOPE_IDENTITY() as [CalculationId];

END
GO

