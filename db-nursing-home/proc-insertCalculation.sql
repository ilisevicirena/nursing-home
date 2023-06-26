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
		@RealPrice float = NULL,
		@PaidPrice float = NULL,
		@DateFrom datetime,
		@DateTo datetime,
		@PaymentDaysDeadline int=NULL,
		@PriceUnitId int,
		@MeasureUnitId int,
		@DatePaid datetime=NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert into dbo.Calculation ([CreationDate],[Month], [Year], [PersonId], [SystemPrice], [RealPrice], [PaidPrice], [DateFrom], [DateTo], [StatusId], [PaymentDaysDeadline], [PriceUnitId], [MeasureUnitId], [DatePaid])
	values (GETDATE(), @Month, @Year,@PersonId, @SystemPrice, @RealPrice, @PaidPrice, @DateFrom, @DateTo, 1, @PaymentDaysDeadline, @PriceUnitId, @MeasureUnitId, @DatePaid);

	select SCOPE_IDENTITY() as [CalculationId];

END
GO
