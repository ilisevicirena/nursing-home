CREATE PROCEDURE [dbo].[getVacationsForEmployee]
    @EmployeeId INT,
    @Year INT = NULL
AS
BEGIN
    IF @Year IS NULL
    BEGIN
        SET @Year = YEAR(GETDATE());
    END

    SELECT
        evr.Id,
        evr.[Year],
        evr.DaysTotal,
        evr.FromDate,
        evr.ToDate,
        evr.DaysTaken,
        evr.EmployeeId,
        evr.CreationDate,
        evr.StatusId,
        vs.Name AS StatusName,
        vs.Color AS StatusColor,
        vs.Icon AS StatusIcon
    FROM dbo.EmployeeVacationRelation evr
    INNER JOIN dbo.VacationStatus vs ON evr.StatusId = vs.Id
    WHERE evr.EmployeeId = @EmployeeId AND evr.[Year] = @Year order by evr.CreationDate desc;
END;
