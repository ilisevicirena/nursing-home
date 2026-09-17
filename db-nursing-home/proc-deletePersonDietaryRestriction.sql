-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	deletes dietary restriction for person
-- =============================================
CREATE PROCEDURE [dbo].[deletePersonDietaryRestriction]
(
    @Id INT = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.PersonDietaryRestriction
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'DELETE_PERSON_DIETARY_RESTRICTION', 'Person dietary restriction deleted', @ActingUserId;
END