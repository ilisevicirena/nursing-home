USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[calculationPaid]    Script Date: 30.6.2023. 14:22:47 ******/
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
	StatusId=1
	where Id=@CalculationId;

END
GO

