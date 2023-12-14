CREATE PROCEDURE [dbo].[getPersonsForVisit]
	@Id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    select 
	FirstName,
	LastName,
	JMBG,
	DoctorVisitTourId,
	NoteId,
	Active
	from
	dbo.DoctorVisitTourPersonRelation dvpr 
	left join dbo.Person p on dvpr.PersonId=p.Id
	where dvpr.DoctorVIsitTourId=@Id order by dvpr.Id;
END

