CREATE PROCEDURE [dbo].[updateCity]
	-- Add the parameters for the stored procedure here
	(
	@Id int,
	@Name varchar(300),
	@PostalCode varchar(20)=NULL,
	@CountryId int =NULL,
	@MunicipalityId int =NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.City
	SET
		[Name] = @Name,
		PostalCode = @PostalCode,
		CountryId = @CountryId,
		MunicipalityId=@MunicipalityId
	WHERE Id = @Id
		
END