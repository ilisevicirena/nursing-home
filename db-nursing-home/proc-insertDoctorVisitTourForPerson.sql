CREATE PROCEDURE [dbo].[insertDoctorVisitTourForPerson]
	@id int,
	@personId int,
	@noteId int
AS
BEGIN
   insert into dbo.DoctorVisitTourPersonRelation (PersonId, DoctorVisitTourId, NoteId)
   values(@personId, @id, @noteId);

   select SCOPE_IDENTITY() as DoctorVisitTourPersonRelationId;
END