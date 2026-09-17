-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	inserts new dietary restriction for person
-- =============================================
CREATE PROCEDURE [dbo].[insertPersonDietaryRestriction]
(
    @PersonId INT,
    @DietaryTypeId INT,
    @Restrictions VARCHAR(MAX) = NULL,
    @Notes VARCHAR(MAX) = NULL,
    @StartDate DATETIME = NULL,
    @EndDate DATETIME = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.PersonDietaryRestriction (PersonId, DietaryTypeId, Restrictions, Notes, StartDate, EndDate, CreationDate)
    VALUES (@PersonId, @DietaryTypeId, @Restrictions, @Notes, @StartDate, @EndDate, GETDATE());

    SELECT SCOPE_IDENTITY() AS PersonDietaryRestrictionId;

    EXEC dbo.logUserActivity 'INSERT_PERSON_DIETARY_RESTRICTION', 'Person dietary restriction inserted', @ActingUserId;
END