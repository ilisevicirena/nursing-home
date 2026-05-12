CREATE PROCEDURE [dbo].[insertDoctorVisitTour]
	@visitDate DATETIME,
    @doctors VARCHAR(MAX),
    @nurses VARCHAR(MAX),
    @ActingUserId NCHAR(36) = NULL
AS
BEGIN
	 -- Insert into DoctorVisitTour table
    INSERT INTO dbo.DoctorVisitTour ([Date], Completed)
    VALUES (@visitDate, 0);

    -- Get the newly created DoctorVisitTourId
    DECLARE @DoctorVisitTourId INT;
    SET @DoctorVisitTourId = SCOPE_IDENTITY();

    -- Insert into DoctorVisitTourEmployeeRelation for each doctor
    INSERT INTO dbo.DoctorVisitTourEmployeeRelation (EmployeeId, DoctorVisitTourId)
    SELECT CONVERT(INT, value) AS EmployeeId, @DoctorVisitTourId
    FROM STRING_SPLIT(@doctors, ',');

    -- Insert into DoctorVisitTourEmployeeRelation for each nurse
    INSERT INTO dbo.DoctorVisitTourEmployeeRelation (EmployeeId, DoctorVisitTourId)
    SELECT CONVERT(INT, value) AS EmployeeId, @DoctorVisitTourId
    FROM STRING_SPLIT(@nurses, ',');

    -- Return the DoctorVisitTourId
    SELECT @DoctorVisitTourId AS DoctorVisitTourId;

    EXEC dbo.logUserActivity 'INSERT_DOCTOR_VISIT_TOUR', 'Doctor visit tour inserted', @ActingUserId;
END