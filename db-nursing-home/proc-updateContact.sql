-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.4.2023.
-- Description:	updates contact for person
-- =============================================
CREATE PROCEDURE [dbo].[updateContact]
	-- Add the parameters for the stored procedure here
(
	@Id int,
	@FirstName varchar(50),
	@LastName varchar(50),
	@Email varchar(50),
	@Telephone varchar(50),
	@Mobile varchar(50),
	@Jmbg varchar(50) =NULL,
	@ResidanceCityId int= NULL,
	@ResidanceStreetName varchar(300)= NULL,
	@ResidanceHouseNumber varchar(50) =NULL,
	@IsObligeeToPay bit= 0,
	@IsGuardian bit= 0
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Contact
	SET FirstName=@FirstName, LastName=@LastName, Email=@Email, Telephone=@Telephone, Mobile=@Mobile, Jmbg=@Jmbg, ResidanceCityId=@ResidanceCityId, ResidanceStreetName=@ResidanceStreetName, ResidanceHouseNumber=@ResidanceHouseNumber, IsObligeeToPay=@IsObligeeToPay, IsGuardian=@IsGuardian
	WHERE Id=@Id;
END