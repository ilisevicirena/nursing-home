CREATE PROCEDURE [dbo].[getCompletedDoctorVisitsWithDetails]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        dv.Id AS DoctorVisitId,
        dv.Date,
        STUFF(
            (
                SELECT 
                    CONCAT(', ', e.FirstName, ' ', e.LastName)
                FROM 
                    DoctorVisitTourEmployeeRelation dvter
                    INNER JOIN Employee e ON dvter.EmployeeId = e.Id
                WHERE 
                    dvter.DoctorVisitTourId = dv.Id
                    AND e.JobPositionId = 5
                FOR XML PATH('')
            ), 1, 2, '') AS Doctors,
        STUFF(
            (
                SELECT 
                    CONCAT(', ', e.FirstName, ' ', e.LastName)
                FROM 
                    DoctorVisitTourEmployeeRelation dvter
                    INNER JOIN Employee e ON dvter.EmployeeId = e.Id
                WHERE 
                    dvter.DoctorVisitTourId = dv.Id
                    AND e.JobPositionId IN (2, 3)
                FOR XML PATH('')
            ), 1, 2, '') AS Nurses,
        (
            SELECT COUNT(*) 
            FROM DoctorVisitTourPersonRelation dvpr 
            WHERE dvpr.DoctorVisitTourId = dv.Id
        ) AS Persons,
		 (
            SELECT COUNT(*) 
            FROM DoctorVisitTourEmployeeRelation dver
			left join Employee e on dver.EmployeeId=e.Id
            WHERE dver.DoctorVisitTourId = dv.Id and e.JobPositionId=5
        ) AS NumberOfDoctors,
		 (
            SELECT COUNT(*) 
            FROM DoctorVisitTourEmployeeRelation dver
			left join Employee e on dver.EmployeeId=e.Id
            WHERE dver.DoctorVisitTourId = dv.Id and (e.JobPositionId=2 or e.JobPositionId=3)
        ) AS NumberOfNurses
    FROM 
        DoctorVisitTour dv
    WHERE 
        dv.Completed = 1 order by dv.[Date] desc;
END;
