CREATE PROCEDURE [dbo].[completeDoctorVisitTour]
	@id int
AS
BEGIN
   update dbo.DoctorVisitTour set Completed=1 where Id=@id;        
END