
CREATE PROCEDURE [dbo].[deleteDoctorVisitTour]
	@Id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	delete from dbo.DoctorVisitTour where Id=@Id;
END
