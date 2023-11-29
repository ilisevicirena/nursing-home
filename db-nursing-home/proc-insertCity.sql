CREATE PROCEDURE [dbo].[insertCity]	
	(
	@Name varchar(300),
	@PostalCode varchar(20)=NULL,
	@CountryId int =NULL,
	@MunicipalityId int =NULL
	)
AS
BEGIN	
	SET NOCOUNT ON;

	INSERT INTO dbo.City([Name], PostalCode, CountryId, MunicipalityId)
	VALUES(@Name, @PostalCode, @CountryId, @MunicipalityId);

	SELECT SCOPE_IDENTITY() AS CityId
END