USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[changeStatusPerson]    Script Date: 2.6.2023. 9:00:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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
		@Date datetime = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @EndDate DATETIME;

    IF (@Status = 0)
    BEGIN
        EXEC dbo.deactivateRoomPerson @PersonId = @Id;

        IF (@Date IS NULL)
            SET @EndDate = GETDATE();
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
END
GO

