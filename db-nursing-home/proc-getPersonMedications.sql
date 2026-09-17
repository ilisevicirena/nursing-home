-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	gets all medications for person
-- =============================================
CREATE PROCEDURE [dbo].[getPersonMedications]
(
    @PersonId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [Id]           = pm.Id,
        [PersonId]     = pm.PersonId,
        [MedicationName] = pm.MedicationName,
        [Dosage]       = pm.Dosage,
        [Frequency]    = pm.Frequency,
        [Route]        = pm.Route,
        [StartDate]    = pm.StartDate,
        [EndDate]      = pm.EndDate,
        [Indication]   = pm.Indication,
        [Notes]        = pm.Notes,
        [Status]       = pm.Status,
        [PrescriberName] = pm.PrescriberName,
        [MorningDose]  = pm.MorningDose,
        [NoonDose]     = pm.NoonDose,
        [EveningDose]  = pm.EveningDose,
        [NightDose]    = pm.NightDose,
        [RxCui]        = pm.RxCui,
        [IsActive]     = CASE
            WHEN pm.EndDate IS NULL AND pm.StartDate <= CAST(GETDATE() AS DATE) THEN 1
            WHEN pm.EndDate IS NOT NULL AND pm.StartDate <= CAST(GETDATE() AS DATE) AND pm.EndDate >= CAST(GETDATE() AS DATE) THEN 1
            ELSE 0
        END,
        [CreationDate] = pm.CreationDate,
        [ModifiedDate] = pm.ModifiedDate
    FROM dbo.PersonMedication AS pm
    WHERE pm.PersonId = @PersonId
    ORDER BY
        CASE
            WHEN pm.EndDate IS NULL AND pm.StartDate <= CAST(GETDATE() AS DATE) THEN 0
            WHEN pm.EndDate IS NOT NULL AND pm.StartDate <= CAST(GETDATE() AS DATE) AND pm.EndDate >= CAST(GETDATE() AS DATE) THEN 0
            ELSE 1
        END ASC,
        pm.StartDate DESC;
END
