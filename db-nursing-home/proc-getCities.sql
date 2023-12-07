CREATE PROCEDURE [dbo].[getCities]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	
SELECT 
		[Id] = c.Id,
		[Name] = c.[Name],
		[MunicipalityId]=MunicipalityId,
		[MunicipalityName]=m.[Name],
		[CountryId]=c.CountryId,
		[PostalCode]=c.PostalCode,
		[CountryName]=ct.[Name]
	FROM [dbo].[City] as c
	left join dbo.Municipality as m on c.MunicipalityId=m.Id
	left join dbo.Country as ct on c.CountryId=ct.Id order by c.[Name];

END