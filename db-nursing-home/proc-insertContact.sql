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
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Contact (FirstName, LastName, Email, Telephone, Mobile, PersonId)
	VALUES (@FirstName, @LastName, @Email, @Telephone, @Mobile, @PersonId);

	SELECT SCOPE_IDENTITY() AS ContactId;
END