create PROCEDURE [dbo].[getNotesForDoctorVisitTour]
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        [Id] = n.Id,
        [Title] = n.Title,
        [Text] = n.[Text],
        [CreationDate] = n.CreationDate,
        [LastModified] = n.LastModified,
        [PersonId] = n.PersonId,
        [PersonFirstName] = CASE 
                                WHEN n.UserId IS NOT NULL THEN u.FirstName 
                                ELSE p.FirstName 
                             END,
        [PersonLastName] = CASE 
                                WHEN n.UserId IS NOT NULL THEN u.LastName 
                                ELSE p.LastName 
                             END
    FROM dbo.Note AS n
    LEFT JOIN dbo.Person AS p ON n.PersonId = p.Id
    LEFT JOIN dbo.[User] AS u ON n.UserId = u.Id -- Join with User table
    LEFT JOIN dbo.FavoriteNotes AS t1 ON n.Id = t1.NoteId AND t1.NoteId IS NOT NULL
    LEFT JOIN (
        SELECT COUNT(Id) as NoOfDocs, NoteId 
        FROM dbo.NoteDocumentRelation 
        GROUP BY NoteId
    ) AS t2 ON t2.NoteId = n.Id
    WHERE 
        n.Id IN (
            SELECT DISTINCT NoteId
            FROM dbo.DoctorVisitTourPersonRelation
            WHERE DoctorVisitTourId = @Id
        );

END;
