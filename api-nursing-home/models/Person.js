class Person {
  constructor(
    id,
    firstName,
    lastName,
    jmbg,
    birthDate,
    startDate,
    endDate,
    active,
    creationDate,
    address,
    genderId,
    maidenLastName,
    fatherFirstName,
    motherFirstName,
    motherMaidenLastName,
    birthCityId,
    birthMunicipalityId,
    birthCountryId,
    residanceCityId,
    residanceStreetName,
    residanceHouseNumber,
    telephone,
    mobile,
    email,
    doctorName
  ) {
    this.Id = id;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.JMBG = jmbg;
    this.BirthDate = birthDate;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.Active = active == 1;
    this.CreationDate = creationDate;
    this.Address = address;
    this.GenderId = genderId;
    this.MaidenLastName = maidenLastName;
    this.FatherFirstName = fatherFirstName;
    this.MotherFirstName = motherFirstName;
    this.MotherMaidenLastName = motherMaidenLastName;
    this.BirthCityId = birthCityId;
    this.BirthMunicipalityId = birthMunicipalityId;
    this.BirthCountryId = birthCountryId;
    this.ResidanceCityId = residanceCityId;
    this.ResidanceStreetName = residanceStreetName;
    this.ResidanceHouseNumber = residanceHouseNumber;
    this.Telephone = telephone;
    this.Mobile = mobile;
    this.Email = email;
    this.DoctorName = doctorName;
  }
}

module.exports = {
  Person,
};
