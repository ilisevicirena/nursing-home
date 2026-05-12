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
		@PaidPrice float,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	SET @PaidDate= CAST(DATEADD(hour, 2, @PaidDate) AS DATE);

    UPDATE dbo.Calculation
	SET
	DatePaid=@PaidDate,
	PaidPrice=@PaidPrice,
	StatusId=1
	WHERE Id=@CalculationId;

	EXEC dbo.logUserActivity 'CALCULATION_PAID', 'Calculation marked as paid', @ActingUserId;
END