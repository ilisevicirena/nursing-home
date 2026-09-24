-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 17.9.2026
-- Description:	records (upserts) the administration status of a medication
--              for a given person / date / time-slot (given / missed / pending).
-- =============================================
CREATE PROCEDURE [dbo].[recordMedicationAdministration]
(
    @PersonId INT,
    @PersonMedicationId INT,
    @Slot VARCHAR(20),
    @AdministrationDate DATE,
    @Status VARCHAR(20),
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1 FROM dbo.MedicationAdministration
        WHERE PersonMedicationId = @PersonMedicationId
          AND AdministrationDate = @AdministrationDate
          AND Slot = @Slot
    )
        UPDATE dbo.MedicationAdministration
        SET Status         = @Status,
            AdministeredBy = @ActingUserId,
            ModifiedDate   = GETDATE()
        WHERE PersonMedicationId = @PersonMedicationId
          AND AdministrationDate = @AdministrationDate
          AND Slot = @Slot;
    ELSE
        INSERT INTO dbo.MedicationAdministration (
            PersonId, PersonMedicationId, AdministrationDate, Slot, Status, AdministeredBy, CreationDate
        )
        VALUES (
            @PersonId, @PersonMedicationId, @AdministrationDate, @Slot, @Status, @ActingUserId, GETDATE()
        );

    EXEC dbo.logUserActivity 'RECORD_MEDICATION_ADMINISTRATION', 'Medication administration recorded', @ActingUserId;
END
