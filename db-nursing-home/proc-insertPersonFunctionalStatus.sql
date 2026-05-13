-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	inserts new functional status record for person
-- =============================================
CREATE PROCEDURE [dbo].[insertPersonFunctionalStatus]
(
    @PersonId INT,
    @MobilityStatus VARCHAR(50) = NULL,
    @CognitiveStatus VARCHAR(50) = NULL,
    @FallRisk VARCHAR(50) = NULL,
    @VisualStatus VARCHAR(50) = NULL,
    @HearingStatus VARCHAR(50) = NULL,
    @AssessmentDate DATETIME = NULL,
    @NotesDescription VARCHAR(MAX) = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.PersonFunctionalStatus (PersonId, MobilityStatus, CognitiveStatus, FallRisk, VisualStatus, HearingStatus, AssessmentDate, NotesDescription, CreationDate)
    VALUES (@PersonId, @MobilityStatus, @CognitiveStatus, @FallRisk, @VisualStatus, @HearingStatus, @AssessmentDate, @NotesDescription, GETDATE());

    SELECT SCOPE_IDENTITY() AS PersonFunctionalStatusId;

    EXEC dbo.logUserActivity 'INSERT_PERSON_FUNCTIONAL_STATUS', 'Person functional status inserted', @ActingUserId;
END