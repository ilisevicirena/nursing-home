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

   -- Deactivate existing active room for the person
    UPDATE dbo.PersonRoomRelation
    SET Active = 0,
        EndDate = CAST(DATEADD(hour, 2, GETDATE()) AS DATE)
    WHERE PersonId = @PersonId
        AND Active = 1;

    -- Insert new room for the person
    INSERT INTO dbo.PersonRoomRelation (PersonId, RoomId, Active, CreationDate, StartDate, EndDate)
    VALUES (@PersonId, @RoomId, 1, CAST(DATEADD(hour, 2, GETDATE()) AS DATE), CAST(DATEADD(hour, 2, GETDATE()) AS DATE), NULL);
			
END