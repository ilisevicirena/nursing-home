-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 17.9.2026
-- Description:	returns the daily medication administration schedule for a person:
--              one row per active medication x time-slot, with the recorded status
--              (given / missed) for the given date, or 'pending' if not yet recorded.
-- =============================================
CREATE PROCEDURE [dbo].[getMedicationAdministration]
(
    @PersonId INT,
    @Date DATE
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [MedicationId]   = pm.Id,
        [MedicationName] = pm.MedicationName,
        [Dosage]         = pm.Dosage,
        [Route]          = pm.Route,
        [Slot]           = s.Slot,
        [SlotTime]       = s.SlotTime,
        [Dose]           = s.Dose,
        [Scheduled]      = CASE WHEN s.Dose IS NOT NULL AND s.Dose NOT IN ('0', '') THEN 1 ELSE 0 END,
        [Status]         = ISNULL(ma.Status, 'pending')
    FROM dbo.PersonMedication AS pm
    CROSS APPLY (VALUES
        ('morning', '08:00', pm.MorningDose),
        ('noon',    '12:00', pm.NoonDose),
        ('evening', '18:00', pm.EveningDose),
        ('night',   '22:00', pm.NightDose)
    ) AS s(Slot, SlotTime, Dose)
    LEFT JOIN dbo.MedicationAdministration AS ma
        ON  ma.PersonMedicationId = pm.Id
        AND ma.Slot               = s.Slot
        AND ma.AdministrationDate = @Date
    WHERE pm.PersonId = @PersonId
      AND pm.StartDate <= @Date
      AND (pm.EndDate IS NULL OR pm.EndDate >= @Date)
      AND (
            (pm.MorningDose IS NOT NULL AND pm.MorningDose NOT IN ('0', ''))
         OR (pm.NoonDose    IS NOT NULL AND pm.NoonDose    NOT IN ('0', ''))
         OR (pm.EveningDose IS NOT NULL AND pm.EveningDose NOT IN ('0', ''))
         OR (pm.NightDose   IS NOT NULL AND pm.NightDose   NOT IN ('0', ''))
      )
    ORDER BY
        pm.MedicationName,
        CASE s.Slot WHEN 'morning' THEN 1 WHEN 'noon' THEN 2 WHEN 'evening' THEN 3 ELSE 4 END;
END
