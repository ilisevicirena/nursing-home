create PROCEDURE [dbo].[changeStatusEmployee] 
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

	DECLARE @EndDate DATETIME;
    SET @Date= CAST(DATEADD(hour, 2, @Date) AS DATE);

    IF (@Status = 0)
    BEGIN       
		exec dbo.removeAllEventsForEmployee @EmployeeId=@Id;

        IF (@Date IS NULL)
            SET @EndDate = CAST(DATEADD(hour, 2, GETDATE()) AS DATE);
        ELSE
            SET @EndDate = @Date;
    END
    ELSE
        SET @EndDate = NULL;

    UPDATE dbo.Employee
    SET
        Active = @Status,
        EmploymentEndDate = @EndDate
    WHERE Id = @Id;

END