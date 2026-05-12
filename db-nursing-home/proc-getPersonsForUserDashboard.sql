create PROCEDURE [dbo].[getPersonsForUserDashboard] 
	-- Add the parameters for the stored procedure here
	@UserId uniqueidentifier
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN 
	SELECT 
		[Id] = p.Id,
		[FirstName]=p.FirstName,
		[LastName]=p.LastName,
		[JMBG]=p.JMBG,
		[BirthDate]=BirthDate,
		[Active]=Active,
		[StartDate]=StartDate,
		[EndDate]=EndDate,
		[CreationDate]=CreationDate,
		[GenderId]=GenderId,
		[GenderName]=g.Name,
		[GenderTag]=g.Tag,
		 [SpentTime] = DATEDIFF(MONTH, p.StartDate, GETDATE())
	FROM dbo.UserContactRelation as ucr 
	left join dbo.Contact as c on ucr.ContactId=c.Id
	left join [dbo].[Person] as p on c.PersonId=p.Id
	left join dbo.Gender as g on p.GenderId=g.Id
	where ucr.UserId=@UserId and p.Active=1;
	END	
END