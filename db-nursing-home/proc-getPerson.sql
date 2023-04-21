USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getPerson]    Script Date: 21.4.2023. 14:32:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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
	declare @RoomRow table(Id int, Name varchar(50), FloorId int);
	declare @FloorRow table(Id int, Name varchar(50));

	insert into @RoomRow
	select room.Id, room.Name,room.FloorId from dbo.Room as room, dbo.PersonRoomRelation relation where relation.PersonId=@Id 
	and relation.RoomId=room.Id and relation.Active=1;

	insert into @FloorRow
	select floor.Id, floor.Name from dbo.Floor as floor, @RoomRow as row where row.FloorId=floor.Id;

	IF(EXISTS(SELECT 1 FROM @RoomRow))
	begin
	SELECT 
		[Id] = person.Id,
		[FirstName]=person.FirstName,
		[LastName]=person.LastName,
		[JMBG]=person.JMBG,
		[BirthDate]=person.BirthDate,
		[Active]=person.Active,
		[StartDate]=person.StartDate,
		[EndDate]=person.EndDate,
		[CreationDate]=person.CreationDate,
		[RoomId]=room.Id,
		[RoomName]=room.Name,
		[FloorId]=floor.Id,
		[FloorName]=floor.Name
	FROM [dbo].[Person] as person, @RoomRow as room, @FloorRow as floor 
	WHERE person.Id=@Id 
	end
	else
	begin
	SELECT 
		[Id] = person.Id,
		[FirstName]=person.FirstName,
		[LastName]=person.LastName,
		[JMBG]=person.JMBG,
		[BirthDate]=person.BirthDate,
		[Active]=person.Active,
		[StartDate]=person.StartDate,
		[EndDate]=person.EndDate,
		[CreationDate]=person.CreationDate,
		[RoomId]=NULL,
		[RoomName]=NULL,
		[FloorId]=NULL,
		[FloorName]=NULL
	FROM [dbo].[Person] as person
	WHERE person.Id=@Id 
	end
	
END
GO


