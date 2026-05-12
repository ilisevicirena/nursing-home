
-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.6.2023.
-- Description:	cancel calculation
-- =============================================
CREATE PROCEDURE [dbo].[cancelCalculation] 
	-- Add the parameters for the stored procedure here
	(
		@CalculationId int,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    update dbo.Calculation
	set 
	StatusId=3
	where Id=@CalculationId;

	EXEC dbo.logUserActivity 'CANCEL_CALCULATION', 'Calculation cancelled', @ActingUserId;
END