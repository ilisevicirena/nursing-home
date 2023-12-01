CREATE PROCEDURE [dbo].[getRemainingVacationDays]
    @EmployeeId INT
AS
BEGIN
   DECLARE @CurrentYear INT = YEAR(GETDATE());
    DECLARE @TotalDaysOfVacation INT;

    -- Check if there are vacations for the employee in the current year
    IF EXISTS (
        SELECT 1
        FROM dbo.EmployeeVacationRelation
        WHERE EmployeeId = @EmployeeId AND Year = @CurrentYear
    )
    BEGIN
        -- If there are vacations, calculate remaining days
        SELECT TOP 1 @TotalDaysOfVacation = DaysTotal
        FROM dbo.EmployeeVacationRelation
        WHERE EmployeeId = @EmployeeId AND Year = @CurrentYear
        ORDER BY FromDate; -- Assuming you want the first row based on the FromDate

        DECLARE @TotalDaysTaken INT;
        DECLARE @InProgressDays INT;

        SELECT
            @TotalDaysTaken = SUM(CASE WHEN StatusId = 4 THEN DaysTaken ELSE 0 END),
            @InProgressDays = SUM(CASE WHEN StatusId IN (1, 2) THEN DaysTaken ELSE 0 END)
        FROM dbo.EmployeeVacationRelation
        WHERE EmployeeId = @EmployeeId AND Year = @CurrentYear
          AND StatusId IN (1, 2, 4); -- Consider created (1), in-progress (2), and completed (4) vacations

        SELECT
            @EmployeeId AS EmployeeId,
            @TotalDaysOfVacation AS TotalDays,
            @TotalDaysTaken AS TotalDaysTaken,
            @TotalDaysOfVacation - @TotalDaysTaken AS RemainingDays,
            @InProgressDays AS InProgressDays,
            @TotalDaysOfVacation - @TotalDaysTaken - @InProgressDays AS AvailableDaysForReservation;
    END
    ELSE
    BEGIN
        -- If there are no vacations, use the default total days from dbo.Employee
        DECLARE @DefaultTotalDays INT;
        SELECT @DefaultTotalDays = DaysOfVacation
        FROM dbo.Employee
        WHERE Id = @EmployeeId;

        SELECT
            @EmployeeId AS EmployeeId,
            @DefaultTotalDays AS TotalDays,
            0 AS TotalDaysTaken,
            @DefaultTotalDays AS RemainingDays,
            0 AS InProgressDays,
            @DefaultTotalDays AS AvailableDaysForReservation;
    END
END;
