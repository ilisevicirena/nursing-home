class Contact {
  constructor(
    id,
    firstName,
    lastName,
    email,
    telephone,
    mobile,
    personId,
    jmbg,
    residanceCityId,
    residanceStreetName,
    residanceHouseNumber,
    isObligeeToPay,
    isGuardian,
    userId
  ) {
    this.Id = id;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Email = email;
    this.Telephone = telephone;
    this.Mobile = mobile;
    this.PersonId = personId;
    this.Jmbg = jmbg;
    this.ResidanceCityId = residanceCityId;
    this.ResidanceStreetName = residanceStreetName;
    this.ResidanceHouseNumber = residanceHouseNumber;
    this.IsObligeeToPay = isObligeeToPay;
    this.IsGuardian = isGuardian;
    this.UserId = userId;
  }
}

module.exports = {
  Contact,
};
