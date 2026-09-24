-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 17.9.2026
-- Description:	inserts new care-plan assessment record for person
-- =============================================
CREATE PROCEDURE [dbo].[insertPersonAssessment]
(
    @PersonId INT,
    @AssessmentDate DATETIME = NULL,
    @BradenScore INT = NULL,
    @FallRiskScore INT = NULL,
    @MobilityScore INT = NULL,
    @NutritionScore INT = NULL,
    @Notes VARCHAR(MAX) = NULL,
    @AssessorName VARCHAR(100) = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.PersonAssessment (
        PersonId, AssessmentDate, BradenScore, FallRiskScore, MobilityScore,
        NutritionScore, Notes, AssessorName, CreationDate
    )
    VALUES (
        @PersonId, @AssessmentDate, @BradenScore, @FallRiskScore, @MobilityScore,
        @NutritionScore, @Notes, @AssessorName, GETDATE()
    );

    SELECT SCOPE_IDENTITY() AS PersonAssessmentId;

    EXEC dbo.logUserActivity 'INSERT_PERSON_ASSESSMENT', 'Person assessment inserted', @ActingUserId;
END
