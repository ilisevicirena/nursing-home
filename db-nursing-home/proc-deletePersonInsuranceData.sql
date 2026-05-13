-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	deletes insurance data for person
-- =============================================
CREATE PROCEDURE [dbo].[deletePersonInsuranceData]
(
    @Id INT = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.PersonInsuranceData
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'DELETE_PERSON_INSURANCE_DATA', 'Person insurance data deleted', @ActingUserId;
END