
CREATE PROCEDURE [dbo].[deleteDoctorVisitTour]
	@Id int,
	@ActingUserId NCHAR(36) = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	delete from dbo.DoctorVisitTour where Id=@Id;

	EXEC dbo.logUserActivity 'DELETE_DOCTOR_VISIT_TOUR', 'Doctor visit tour deleted', @ActingUserId;
END
