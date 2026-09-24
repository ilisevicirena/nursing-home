-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 17.9.2026
-- Description:	gets care-plan assessment records for person (newest first)
-- =============================================
CREATE PROCEDURE [dbo].[getPersonAssessments]
(
    @PersonId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [Id]             = a.Id,
        [PersonId]       = a.PersonId,
        [AssessmentDate] = a.AssessmentDate,
        [BradenScore]    = a.BradenScore,
        [FallRiskScore]  = a.FallRiskScore,
        [MobilityScore]  = a.MobilityScore,
        [NutritionScore] = a.NutritionScore,
        [Notes]          = a.Notes,
        [AssessorName]   = a.AssessorName,
        [CreationDate]   = a.CreationDate,
        [ModifiedDate]   = a.ModifiedDate
    FROM dbo.PersonAssessment AS a
    WHERE a.PersonId = @PersonId
    ORDER BY a.AssessmentDate DESC;
END
