-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 12.5.2026
-- Description:	gets insurance data for person
-- =============================================
CREATE PROCEDURE [dbo].[getPersonInsuranceData]
(
    @PersonId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [Id] = pi.Id,
        [PersonId] = pi.PersonId,
        [InsuranceCompany] = pi.InsuranceCompany,
        [PolicyNumber] = pi.PolicyNumber,
        [GroupNumber] = pi.GroupNumber,
        [CoverageStartDate] = pi.CoverageStartDate,
        [CoverageEndDate] = pi.CoverageEndDate,
        [CoverageType] = pi.CoverageType,
        [Status] = pi.Status,
        [CreationDate] = pi.CreationDate,
        [ModifiedDate] = pi.ModifiedDate
    FROM dbo.PersonInsuranceData AS pi
    WHERE pi.PersonId = @PersonId;
END