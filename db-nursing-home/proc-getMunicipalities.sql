CREATE PROCEDURE [dbo].[getMunicipalities]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	
SELECT 
		[Id] = c.Id,
		[Name] = c.[Name],
		[CountryId]=c.CountryId,
		[CountryName]=ct.[Name]
	FROM [dbo].[Municipality] as c
	left join dbo.Country as ct on c.CountryId=ct.Id order by c.[Name];

END