-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	inserts new medication for person
-- =============================================
CREATE PROCEDURE [dbo].[insertPersonMedication]
(
    @PersonId        INT,
    @MedicationName  VARCHAR(100),
    @Dosage          VARCHAR(100)  = NULL,
    @Frequency       VARCHAR(100)  = NULL,
    @Route           VARCHAR(50)   = NULL,
    @StartDate       DATETIME      = NULL,
    @EndDate         DATETIME      = NULL,
    @Indication      VARCHAR(300)  = NULL,
    @Notes           VARCHAR(MAX)  = NULL,
    @Status          VARCHAR(50),
    @PrescriberName  VARCHAR(100)  = NULL,
    @MorningDose     NVARCHAR(100) = NULL,
    @NoonDose        NVARCHAR(100) = NULL,
    @EveningDose     NVARCHAR(100) = NULL,
    @NightDose       NVARCHAR(100) = NULL,
    @RxCui           NVARCHAR(20)  = NULL,
    @ActingUserId    NCHAR(36)     = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.PersonMedication
        (PersonId, MedicationName, Dosage, Frequency, Route, StartDate, EndDate,
         Indication, Notes, Status, PrescriberName, MorningDose, NoonDose, EveningDose, NightDose, RxCui, CreationDate)
    VALUES
        (@PersonId, @MedicationName, @Dosage, @Frequency, @Route, ISNULL(@StartDate, GETDATE()), @EndDate,
         @Indication, @Notes, @Status, @PrescriberName, @MorningDose, @NoonDose, @EveningDose, @NightDose, @RxCui, GETDATE());

    SELECT SCOPE_IDENTITY() AS PersonMedicationId;

    EXEC dbo.logUserActivity 'INSERT_PERSON_MEDICATION', 'Person medication inserted', @ActingUserId;
END
