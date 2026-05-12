-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.4.2023.
-- Description:	gets all persons from table person based on active state
-- =============================================
CREATE PROCEDURE [dbo].[getPersons] 
	-- Add the parameters for the stored procedure here
	(@Active bit,
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

    -- Insert statements for procedure here
	IF @Active=0
	BEGIN 
		if @UserRoleId=3
			begin
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
					[GenderTag]=g.Tag					
				FROM dbo.UserContactRelation as ucr 
				left join dbo.Contact as c on ucr.ContactId=c.Id
				left join [dbo].[Person] as p on c.PersonId=p.Id
				left join dbo.Gender as g on p.GenderId=g.Id
				where ucr.UserId=@UserId;
			end
		else
		begin
			SELECT 
				[Id] = p.Id,
				[FirstName]=FirstName,
				[LastName]=LastName,
				[JMBG]=JMBG,
				[BirthDate]=BirthDate,
				[Active]=Active,
				[StartDate]=StartDate,
				[EndDate]=EndDate,
				[CreationDate]=CreationDate,
				[GenderId]=GenderId,
				[GenderName]=g.Name,
				[GenderTag]=g.Tag
			FROM [dbo].[Person] as p left join dbo.Gender as g on p.GenderId=g.Id;
		end
	END

	ELSE
	BEGIN
		if @UserRoleId=3
			begin
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
					[GenderTag]=g.Tag					
				FROM dbo.UserContactRelation as ucr 
				left join dbo.Contact as c on ucr.ContactId=c.Id
				left join [dbo].[Person] as p on c.PersonId=p.Id
				left join dbo.Gender as g on p.GenderId=g.Id
				where ucr.UserId=@UserId and p.Active=@Active;
			end
		else
			begin
				select
				[Id] = p.Id,
					[FirstName]=FirstName,
					[LastName]=LastName,
					[JMBG]=JMBG,
					[BirthDate]=BirthDate,
					[Active]=Active,
					[StartDate]=StartDate,
					[EndDate]=EndDate,
					[CreationDate]=CreationDate,
					[GenderId]=GenderId,
					[GenderName]=g.Name,
					[GenderTag]=g.Tag
				FROM [dbo].[Person] as p left join dbo.Gender as g on p.GenderId=g.Id WHERE Active=@Active
			end
	END
END