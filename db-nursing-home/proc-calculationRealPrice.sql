-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.6.2023.
-- Description:	saves calculation real price
-- =============================================
CREATE PROCEDURE [dbo].[calculationRealPrice]
	-- Add the parameters for the stored procedure here
	(
		@CalculationId int,
		@RealPrice float
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    UPDATE dbo.Calculation
	SET
	RealPrice=@RealPrice
	WHERE Id=@CalculationId;

END