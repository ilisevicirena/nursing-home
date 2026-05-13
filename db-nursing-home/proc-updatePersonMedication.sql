-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	updates medication for person
-- =============================================
CREATE PROCEDURE [dbo].[updatePersonMedication]
(
    @Id INT = NULL,
    @MedicationName VARCHAR(100),
    @Dosage VARCHAR(100) = NULL,
    @Frequency VARCHAR(100) = NULL,
    @Route VARCHAR(50) = NULL,
    @StartDate DATETIME = NULL,
    @EndDate DATETIME = NULL,
    @Indication VARCHAR(300) = NULL,
    @Notes VARCHAR(MAX) = NULL,
    @Status VARCHAR(50),
    @PrescriberName VARCHAR(100) = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.PersonMedication
    SET MedicationName = @MedicationName,
        Dosage = @Dosage,
        Frequency = @Frequency,
        Route = @Route,
        StartDate = @StartDate,
        EndDate = @EndDate,
        Indication = @Indication,
        Notes = @Notes,
        Status = @Status,
        PrescriberName = @PrescriberName,
        ModifiedDate = GETDATE()
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'UPDATE_PERSON_MEDICATION', 'Person medication updated', @ActingUserId;
END