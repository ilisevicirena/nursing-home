-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	updates dietary restriction for person
-- =============================================
CREATE PROCEDURE [dbo].[updatePersonDietaryRestriction]
(
    @Id INT = NULL,
    @Restrictions VARCHAR(MAX) = NULL,
    @Notes VARCHAR(MAX) = NULL,
    @EndDate DATETIME = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.PersonDietaryRestriction
    SET Restrictions = @Restrictions,
        Notes = @Notes,
        EndDate = @EndDate,
        ModifiedDate = GETDATE()
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'UPDATE_PERSON_DIETARY_RESTRICTION', 'Person dietary restriction updated', @ActingUserId;
END