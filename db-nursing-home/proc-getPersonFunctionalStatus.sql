-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	gets functional status records for person
-- =============================================
CREATE PROCEDURE [dbo].[getPersonFunctionalStatus]
(
    @PersonId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [Id]              = fs.Id,
        [PersonId]        = fs.PersonId,
        [MobilityStatus]  = fs.MobilityStatus,
        [CognitiveStatus] = fs.CognitiveStatus,
        [FallRisk]        = fs.FallRisk,
        [VisualStatus]    = fs.VisualStatus,
        [HearingStatus]   = fs.HearingStatus,
        [MobilityHighRisk]  = (SELECT IsHighRisk FROM dbo.FunctionalStatusOption WHERE Category = 'mobility'  AND Value = fs.MobilityStatus),
        [CognitiveHighRisk] = (SELECT IsHighRisk FROM dbo.FunctionalStatusOption WHERE Category = 'cognitive' AND Value = fs.CognitiveStatus),
        [FallHighRisk]      = (SELECT IsHighRisk FROM dbo.FunctionalStatusOption WHERE Category = 'fallRisk'  AND Value = fs.FallRisk),
        [VisualHighRisk]    = (SELECT IsHighRisk FROM dbo.FunctionalStatusOption WHERE Category = 'visual'    AND Value = fs.VisualStatus),
        [HearingHighRisk]   = (SELECT IsHighRisk FROM dbo.FunctionalStatusOption WHERE Category = 'hearing'   AND Value = fs.HearingStatus),
        [AssessmentDate]  = fs.AssessmentDate,
        [NotesDescription] = fs.NotesDescription,
        [CreationDate]    = fs.CreationDate,
        [ModifiedDate]    = fs.ModifiedDate
    FROM dbo.PersonFunctionalStatus AS fs
    WHERE fs.PersonId = @PersonId
    ORDER BY fs.AssessmentDate DESC;
END
