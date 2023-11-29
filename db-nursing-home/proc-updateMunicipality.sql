CREATE PROCEDURE [dbo].[updateMunicipality]
	-- Add the parameters for the stored procedure here
	(
	@Id int,
	@Name varchar(300),
	@CountryId int =NULL	
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Municipality
	SET
		[Name] = @Name,	
		CountryId = @CountryId
	WHERE Id = @Id
		
END