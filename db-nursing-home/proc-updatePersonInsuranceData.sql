-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	updates insurance data for person
-- =============================================
CREATE PROCEDURE [dbo].[updatePersonInsuranceData]
(
    @Id INT = NULL,
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

    UPDATE dbo.PersonInsuranceData
    SET InsuranceCompany = @InsuranceCompany,
        PolicyNumber = @PolicyNumber,
        GroupNumber = @GroupNumber,
        CoverageStartDate = @CoverageStartDate,
        CoverageEndDate = @CoverageEndDate,
        CoverageType = @CoverageType,
        Status = @Status,
        ModifiedDate = GETDATE()
    WHERE Id = @Id;

    EXEC dbo.logUserActivity 'UPDATE_PERSON_INSURANCE_DATA', 'Person insurance data updated', @ActingUserId;
END