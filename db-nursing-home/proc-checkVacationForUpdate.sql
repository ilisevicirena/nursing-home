CREATE PROCEDURE [dbo].[checkVacationForUpdate]
AS
BEGIN
     DECLARE @TodayDate DATE = CONVERT(DATE, GETDATE());

    -- Update vacations that start today
    UPDATE dbo.EmployeeVacationRelation
    SET StatusId = 2
    WHERE CONVERT(DATE, [FromDate]) = @TodayDate
    AND StatusId <> 3; 

    -- Update vacations that started before today and end today or later
    UPDATE dbo.EmployeeVacationRelation
    SET StatusId = 2
    WHERE CONVERT(DATE, [FromDate]) <= @TodayDate
    AND CONVERT(DATE, [ToDate]) >= @TodayDate
    AND StatusId NOT IN (2, 3); 

    -- Update vacations that ended yesterday
    UPDATE dbo.EmployeeVacationRelation
    SET StatusId = 4
    WHERE CONVERT(DATE, [ToDate]) = DATEADD(DAY, -1, @TodayDate)
    AND StatusId NOT IN (3, 4);

    -- Update vacations that started before today and ended before today
    UPDATE dbo.EmployeeVacationRelation
    SET StatusId = 4
    WHERE CONVERT(DATE, [FromDate]) < @TodayDate
    AND CONVERT(DATE, [ToDate]) < @TodayDate
    AND StatusId NOT IN (3, 4);
END;