CREATE PROCEDURE [dbo].[insertMunicipality]	
	(
	@Name varchar(300),
	@CountryId int =NULL	
	)
AS
BEGIN	
	SET NOCOUNT ON;

	INSERT INTO dbo.Municipality([Name], CountryId)
	VALUES(@Name, @CountryId);

	SELECT SCOPE_IDENTITY() AS MunicipalityId
END