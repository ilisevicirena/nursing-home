class PersonDietaryRestriction {
  constructor(
    id,
    personId,
    dietaryTypeId,
    restrictions,
    notes,
    startDate,
    endDate,
    creationDate,
    modifiedDate,
  ) {
    this.Id = id;
    this.PersonId = personId;
    this.DietaryTypeId = dietaryTypeId;
    this.Restrictions = restrictions;
    this.Notes = notes;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.CreationDate = creationDate;
    this.ModifiedDate = modifiedDate;
  }
}

module.exports = {
  PersonDietaryRestriction,
};
