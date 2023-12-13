CREATE PROCEDURE [dbo].[completeDoctorVisitTour]
		@id int,
	@TotalPersons int
AS
BEGIN
    update dbo.DoctorVisitTour set Completed=1, TotalPersons=@TotalPersons where Id=@id;        
END