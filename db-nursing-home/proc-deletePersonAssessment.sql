-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 17.9.2026
-- Description:	deletes care-plan assessment record for person
-- =============================================
CREATE PROCEDURE [dbo].[deletePersonAssessment]
(
    @Id INT = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.PersonAssessment
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'DELETE_PERSON_ASSESSMENT', 'Person assessment deleted', @ActingUserId;
END
