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
-- Description:	sets calculation paid 
-- =============================================
CREATE PROCEDURE [dbo].[calculationPaid]
	-- Add the parameters for the stored procedure here
	(
		@CalculationId int,
		@PaidDate datetime,
		@PaidPrice float
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    update dbo.Calculation
	set
	DatePaid=@PaidDate,
	PaidPrice=@PaidPrice,
	StatusId=2
	where Id=@CalculationId;

END
GO
