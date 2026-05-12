-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.4.2023.
-- Description:	Activates or deactivates person, if activate deletes end date and set person as active,
--				if deactivate sets end date to current date if not provided and sets person as not active
-- =============================================
CREATE PROCEDURE [dbo].[changeStatusPerson] 
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@Status bit, -- 1 for activate, 0 for deactivate
		@Date datetime = NULL,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @EndDate DATETIME;
    SET @Date= CAST(DATEADD(hour, 2, @Date) AS DATE);

    IF (@Status = 0)
    BEGIN
        EXEC dbo.deactivateRoomPerson @PersonId = @Id;
		exec dbo.removeAllEventsForPerson @PersonId=@Id;

        IF (@Date IS NULL)
            SET @EndDate = CAST(DATEADD(hour, 2, GETDATE()) AS DATE);
        ELSE
            SET @EndDate = @Date;
    END
    ELSE
        SET @EndDate = NULL;

    UPDATE dbo.Person
    SET
        Active = @Status,
        EndDate = @EndDate
    WHERE Id = @Id;

    EXEC dbo.writeLog @LogType = 'UPDATE', @LogEntity = 'Person', @Key = @Id;

    EXEC dbo.logUserActivity 'CHANGE_STATUS_PERSON', 'Person status changed', @ActingUserId;
END