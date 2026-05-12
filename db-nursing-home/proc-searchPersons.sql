-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 25.4.2023.
-- Description:	find person matches
-- =============================================
CREATE PROCEDURE [dbo].[searchPersons]
	-- Add the parameters for the stored procedure here
	(
		@searchTerm varchar(10),
		@UserId uniqueidentifier
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @UserRoleId int;

	 -- Determine the role of the user
    SELECT @UserRoleId = ur.RoleId
    FROM dbo.UserRoleRelation ur
    WHERE ur.UserId = @UserId;

    if @UserRoleId=3
	begin
		select 
		[Id]=p.Id,
		[FirstName]=p.FirstName,
		[LastName]=p.LastName,
		[JMBG]=p.JMBG,
		[BirthDate]=BirthDate,
		[Active]=Active,
		[StartDate]=StartDate
		FROM dbo.UserContactRelation as ucr 
				left join dbo.Contact as c on ucr.ContactId=c.Id
				left join [dbo].[Person] as p on c.PersonId=p.Id
				left join dbo.Gender as g on p.GenderId=g.Id
				where ucr.UserId=@UserId and
		p.FirstName like '%'+@searchTerm+'%' 
		or p.LastName like '%'+@searchTerm+'%' 
		or p.JMBG like '%'+@searchTerm+'%' 
		or p.[Address] like '%'+@searchTerm+'%';
	end
	else begin
		select 
		[Id]=Id,
		[FirstName]=FirstName,
		[LastName]=LastName,
		[JMBG]=JMBG,
		[BirthDate]=BirthDate,
		[Active]=Active,
		[StartDate]=StartDate
		from dbo.Person 
		where FirstName like '%'+@searchTerm+'%' 
		or LastName like '%'+@searchTerm+'%' 
		or JMBG like '%'+@searchTerm+'%' 
		or [Address] like '%'+@searchTerm+'%';
	end
END