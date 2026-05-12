-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.4.2023
-- Description:	gets all contacts for person
-- =============================================
CREATE PROCEDURE [dbo].[getContacts] 
	-- Add the parameters for the stored procedure here
	(
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 
	[Id]=cont.Id,
	[FirstName]=FirstName,
	[LastName]=LastName,
	[Email]=Email,
	[Telephone]=Telephone,
	[Mobile]=Mobile,
	[Jmbg]=Jmbg,
	[ResidanceCityId]=cont.ResidanceCityId,
	[ResidanceCityName]=c.[Name],
	[ResidanceStreetName]=ResidanceStreetName,
	[ResidanceHouseNumber]=ResidanceHouseNumber,
	[IsObligeeToPay]=IsObligeeToPay,
	[IsGuardian] = IsGuardian,
	[UserId] = ucr.UserId
	FROM dbo.Contact as cont
	left join dbo.City as c on c.Id=cont.ResidanceCityId
	left join dbo.UserContactRelation as ucr on cont.Id=ucr.ContactId
	WHERE PersonId=@PersonId;
END