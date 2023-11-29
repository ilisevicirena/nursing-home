class City {
  constructor(id, name, postalCode, countryId, municipalityId) {
    this.Id = id;
    this.Name = name;
    this.PostalCode = postalCode;
    this.CountryId = countryId;
    this.MunicipalityId = municipalityId;
  }
}

module.exports = {
  City,
};
