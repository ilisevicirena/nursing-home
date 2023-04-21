-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
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
		[RoomId]=relation.RoomId,
		[RoomName]=room.Name,
		[FloorId]=floor.Id,
		[FloorName]=floor.Name
	FROM [dbo].[Person] as person, [dbo].Room as room, [dbo].PersonRoomRelation relation, [dbo].Floor as floor 
	WHERE person.Id=@Id 
	AND relation.PersonId=@Id 
	AND relation.Active=1 
	AND relation.RoomId=room.Id
	AND floor.Id=room.FloorId
END
GO
