-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	deletes functional status record for person
-- =============================================
CREATE PROCEDURE [dbo].[deletePersonFunctionalStatus]
(
    @Id INT = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.PersonFunctionalStatus
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'DELETE_PERSON_FUNCTIONAL_STATUS', 'Person functional status deleted', @ActingUserId;
END