-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 17.9.2026
-- Description:	updates care-plan assessment record for person
-- =============================================
CREATE PROCEDURE [dbo].[updatePersonAssessment]
(
    @Id INT = NULL,
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

    UPDATE dbo.PersonAssessment
    SET AssessmentDate = @AssessmentDate,
        BradenScore    = @BradenScore,
        FallRiskScore  = @FallRiskScore,
        MobilityScore  = @MobilityScore,
        NutritionScore = @NutritionScore,
        Notes          = @Notes,
        AssessorName   = @AssessorName,
        ModifiedDate   = GETDATE()
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'UPDATE_PERSON_ASSESSMENT', 'Person assessment updated', @ActingUserId;
END
