CREATE PROCEDURE [dbo].[getCountries]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	
SELECT 
		[Id] = Id,
		[Name] = [Name]		
	FROM [dbo].[Country] order by [Name];
END