class PersonInsuranceData {
  constructor(
    id,
    personId,
    insuranceCompany,
    policyNumber,
    groupNumber,
    coverageStartDate,
    coverageEndDate,
    coverageType,
    status,
    creationDate,
    modifiedDate,
  ) {
    this.Id = id;
    this.PersonId = personId;
    this.InsuranceCompany = insuranceCompany;
    this.PolicyNumber = policyNumber;
    this.GroupNumber = groupNumber;
    this.CoverageStartDate = coverageStartDate;
    this.CoverageEndDate = coverageEndDate;
    this.CoverageType = coverageType;
    this.Status = status;
    this.CreationDate = creationDate;
    this.ModifiedDate = modifiedDate;
  }
}

module.exports = {
  PersonInsuranceData,
};
