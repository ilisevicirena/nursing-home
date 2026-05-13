-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	deletes medication for person
-- =============================================
CREATE PROCEDURE [dbo].[deletePersonMedication]
(
    @Id INT = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.PersonMedication
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'DELETE_PERSON_MEDICATION', 'Person medication deleted', @ActingUserId;
END