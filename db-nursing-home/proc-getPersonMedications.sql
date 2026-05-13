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
        [Id] = pm.Id,
        [PersonId] = pm.PersonId,
        [MedicationName] = pm.MedicationName,
        [Dosage] = pm.Dosage,
        [Frequency] = pm.Frequency,
        [Route] = pm.Route,
        [StartDate] = pm.StartDate,
        [EndDate] = pm.EndDate,
        [Indication] = pm.Indication,
        [Notes] = pm.Notes,
        [Status] = pm.Status,
        [PrescriberName] = pm.PrescriberName,
        [CreationDate] = pm.CreationDate,
        [ModifiedDate] = pm.ModifiedDate
    FROM dbo.PersonMedication AS pm
    WHERE pm.PersonId = @PersonId;
END