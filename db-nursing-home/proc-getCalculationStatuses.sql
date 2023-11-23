-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.6.2023.
-- Description:	get calculation statuses
-- =============================================
CREATE PROCEDURE [dbo].[getCalculationStatuses]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    select 
	Id,
	[Name],
	StringKey
	from dbo.CalculationStatus;

END