-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.4.2023.
-- Description:	Gets all data for person
-- =============================================
CREATE PROCEDURE [dbo].[getPerson]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

		
	select [Id] = p.Id,
		[FirstName]=p.FirstName,
		[LastName]=p.LastName,
		[JMBG]=p.JMBG,
		[BirthDate]=p.BirthDate,
		[Active]=p.Active,
		[StartDate]=p.StartDate,
		[EndDate]=p.EndDate,
		[CreationDate]=p.CreationDate,
		[RoomId]=r.Id,
		[RoomName]=r.[Name],
		[FloorId]=f.Id,
		[FloorName]=f.[Name],
		[Address]=p.[Address],
		[GenderId]=GenderId,
		[GenderName]=g.[Name],
		[GenderTag]=g.Tag
		from dbo.Person as p
left join dbo.PersonRoomRelation as prr on prr.PersonId=p.Id and prr.Active=1
left join dbo.Room as r on prr.RoomId=r.Id 
left join dbo.[Floor] as f on r.FloorId=f.Id
left join dbo.Gender as g on p.GenderId=g.Id
where p.Id=@Id
	
END