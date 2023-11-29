class Employee {
  constructor(
    id,
    firstName,
    lastName,
    jmbg,
    qualificationId,
    genderId,
    telephone,
    mobile,
    email,
    residanceCityId,
    residanceStreetName,
    residanceHouseNumber,
    birthDate,
    employmentDate,
    bankName,
    bankAccountName,
    jobPositionId,
    employmentTypeId,
    fatherName,
    yearsOfExperiance,
    employmentEndDate,
    daysOfVacation,
    schoolName,
    schoolQualificationName,
    birthCityId,
    birthMunicipalityId,
    birthCountryId,
    active
  ) {
    this.Id = id;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.JMBG = jmbg;
    this.QualificationId = qualificationId;
    this.GenderId = genderId;
    this.Telephone = telephone;
    this.Mobile = mobile;
    this.Email = email;
    this.ResidanceCityId = residanceCityId;
    this.ResidanceStreetName = residanceStreetName;
    this.ResidanceHouseNumber = residanceHouseNumber;
    this.BirthDate = birthDate;
    this.EmploymentDate = employmentDate;
    this.BankName = bankName;
    this.BankAccountName = bankAccountName;
    this.JobPositionId = jobPositionId;
    this.EmploymentTypeId = employmentTypeId;
    this.FatherName = fatherName;
    this.YearsOfExperiance = yearsOfExperiance;
    this.EmploymentEndDate = employmentEndDate;
    this.DaysOfVacation = daysOfVacation;
    this.SchoolName = schoolName;
    this.SchoolQualificationName = schoolQualificationName;
    this.Active = active == 1;
    this.BirthCityId = birthCityId;
    this.BirthMunicipalityId = birthMunicipalityId;
    this.BirthCountryId = birthCountryId;
  }
}

module.exports = {
  Employee,
};
