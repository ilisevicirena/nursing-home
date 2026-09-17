-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	updates functional status record for person
-- =============================================
CREATE PROCEDURE [dbo].[updatePersonFunctionalStatus]
(
    @Id INT = NULL,
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

    UPDATE dbo.PersonFunctionalStatus
    SET MobilityStatus   = @MobilityStatus,
        CognitiveStatus  = @CognitiveStatus,
        FallRisk         = @FallRisk,
        VisualStatus     = @VisualStatus,
        HearingStatus    = @HearingStatus,
        AssessmentDate   = @AssessmentDate,
        NotesDescription = @NotesDescription,
        ModifiedDate     = GETDATE()
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'UPDATE_PERSON_FUNCTIONAL_STATUS', 'Person functional status updated', @ActingUserId;
END
