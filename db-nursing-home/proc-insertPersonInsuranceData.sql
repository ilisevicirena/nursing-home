-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	inserts insurance data for person
-- =============================================
CREATE PROCEDURE [dbo].[insertPersonInsuranceData]
(
    @PersonId INT,
    @InsuranceCompany VARCHAR(100) = NULL,
    @PolicyNumber VARCHAR(100) = NULL,
    @GroupNumber VARCHAR(100) = NULL,
    @CoverageStartDate DATETIME = NULL,
    @CoverageEndDate DATETIME = NULL,
    @CoverageType VARCHAR(100) = NULL,
    @Status VARCHAR(50) = NULL,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.PersonInsuranceData (PersonId, InsuranceCompany, PolicyNumber, GroupNumber, CoverageStartDate, CoverageEndDate, CoverageType, Status, CreationDate)
    VALUES (@PersonId, @InsuranceCompany, @PolicyNumber, @GroupNumber, @CoverageStartDate, @CoverageEndDate, @CoverageType, @Status, GETDATE());

    SELECT SCOPE_IDENTITY() AS PersonInsuranceDataId;

    EXEC dbo.logUserActivity 'INSERT_PERSON_INSURANCE_DATA', 'Person insurance data inserted', @ActingUserId;
END