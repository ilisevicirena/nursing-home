CREATE PROCEDURE [dbo].[completeDoctorVisitTour]
		@id int,
	@TotalPersons int,
	@ActingUserId NCHAR(36) = NULL
AS
BEGIN
    update dbo.DoctorVisitTour set Completed=1, TotalPersons=@TotalPersons where Id=@id;

    EXEC dbo.logUserActivity 'COMPLETE_DOCTOR_VISIT_TOUR', 'Doctor visit tour completed', @ActingUserId;
END