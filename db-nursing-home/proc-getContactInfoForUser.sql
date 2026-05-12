create PROCEDURE [dbo].[getContactInfoForUser] 
	-- Add the parameters for the stored procedure here
	(
		@UserId uniqueidentifier
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT top 1
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
	FROM dbo.UserContactRelation as usr
	left join dbo.Contact as cont on usr.ContactId=cont.Id
	left join dbo.City as c on c.Id=cont.ResidanceCityId
	left join dbo.UserContactRelation as ucr on cont.Id=ucr.ContactId
	WHERE usr.UserId=@UserId;
END