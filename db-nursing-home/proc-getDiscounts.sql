-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 3.5.2023.
-- Description:	gets all discounts
-- =============================================
CREATE PROCEDURE [dbo].[getDiscounts]
	-- Add the parameters for the stored procedure here	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 
	[Id]=Id,
	[Name]=[Name],
	[Description]=[Description],
	[Quantity]=Quantity,
	[PercentCalculation]=PercentCalculation
	FROM dbo.Discount WHERE Active=1;

END