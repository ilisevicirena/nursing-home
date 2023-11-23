-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	updates service for person (deactivates old and inserts new)
-- =============================================
CREATE PROCEDURE [dbo].[updateServiceForPerson]
	-- Add the parameters for the stored procedure here
		-- Add the parameters for the stored procedure here
	(
		@Id int,
		@Quantity int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    DECLARE @serviceId INT, @personId INT;

    UPDATE dbo.PersonServiceRelation
    SET
        Active = 0,
        EndDate = GETDATE()
    WHERE @Id = Id;

    IF EXISTS (SELECT 1 FROM dbo.PersonServiceRelation WHERE Id = @Id)
    BEGIN
        SELECT TOP 1 @serviceId = ServiceId, @personId = PersonId
        FROM dbo.PersonServiceRelation
        WHERE Id = @Id;

        INSERT INTO dbo.PersonServiceRelation (ServiceId, PersonId, Quantity, Active, StartDate, EndDate)
        VALUES (@serviceId, @personId, @Quantity, 1, GETDATE(), NULL);
    END
END