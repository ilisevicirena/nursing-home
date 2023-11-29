-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.4.2023
-- Description:	inserts new contact for person
-- =============================================
CREATE PROCEDURE [dbo].[insertContact] 
	-- Add the parameters for the stored procedure here
	(
		@FirstName varchar(50),
		@LastName varchar(50),
		@Email varchar(50)=NULL,
		@Telephone varchar(50)=NULL,
		@Mobile varchar(50)=NULL,
		@PersonId int,
		@Jmbg varchar(50)=NULL,
		@ResidanceCityId int=NULL,
		@ResidanceStreetName varchar(300)=NULL,
		@ResidanceHouseNumber varchar(50)=NULL,
		@IsObligeeToPay bit=0,
		@IsGuardian bit=0
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Contact (FirstName, LastName, Email, Telephone, Mobile, PersonId, Jmbg, ResidanceCityId, ResidanceStreetName, ResidanceHouseNumber, IsObligeeToPay, IsGuardian)
	VALUES (@FirstName, @LastName, @Email, @Telephone, @Mobile, @PersonId, @Jmbg, @ResidanceCityId, @ResidanceStreetName, @ResidanceHouseNumber, @IsObligeeToPay, @IsGuardian)

	SELECT SCOPE_IDENTITY() AS ContactId;
END