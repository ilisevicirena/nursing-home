USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[changeRoomPerson]    Script Date: 19.4.2023. 13:55:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.4.2023.
-- Description:	assigns room to person
-- =============================================
CREATE PROCEDURE [dbo].[changeRoomPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@RoomId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @myrow table(PersonId int,RoomId int, Active bit, CreationDate datetime, Id int);
	declare @existingId int;
	
	--check person already has active room
	insert into @myrow
	select PersonId, RoomId, Active, CreationDate, Id from dbo.PersonRoomRelation where PersonId=@PersonId and Active=1;
	
	
	IF(EXISTS(SELECT 1 FROM @myrow))
	--person has active room
		BEGIN
		select top 1 @existingId=Id from @myRow;
		  -- deactivate that room
			update dbo.PersonRoomRelation
		  set Active=0,
		  EndDate=GETDATE()
		  where Id=@existingId;
		END;
	
	INSERT INTO dbo.PersonRoomRelation (PersonId, RoomId, Active, CreationDate, StartDate, EndDate)
	VALUES (@PersonId, @RoomId, 1, GETDATE(), GETDATE(), NULL);	
			
END
GO


