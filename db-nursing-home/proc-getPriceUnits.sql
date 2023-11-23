-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 3.5.2023.
-- Description:	gets all price units
-- =============================================
CREATE PROCEDURE [dbo].[getPriceUnits]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	[Id]=Id,
	[Name]=[Name],
	[Tag]=Tag
	FROM dbo.PriceUnit;

END