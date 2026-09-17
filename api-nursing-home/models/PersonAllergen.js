class PersonAllergen {
  constructor(
    id,
    personId,
    allergenName,
    reactionDescription,
    severityId,
    startDate,
    endDate,
    creationDate,
    modifiedDate,
  ) {
    this.Id = id;
    this.PersonId = personId;
    this.AllergenName = allergenName;
    this.ReactionDescription = reactionDescription;
    this.SeverityId = severityId;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.CreationDate = creationDate;
    this.ModifiedDate = modifiedDate;
  }
}

module.exports = {
  PersonAllergen,
};
