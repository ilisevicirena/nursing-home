-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 5.5.2023.
-- Description:	gets all measure units for calculation
-- =============================================
CREATE PROCEDURE [dbo].[getCalculationMeasureUnits]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	select
	[Id]=Id,
	[Name]=[Name],
	[Tag]=Tag,
	[Code]=Code,
	[CalculationUnit]=CalculationUnit
	FROM dbo.MeasureUnit where CalculationUnit=1;
END