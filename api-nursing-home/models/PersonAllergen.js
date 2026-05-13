class PersonAllergen {
  constructor(
    id,
    personId,
    allergenId,
    allergenName,
    reactionDescription,
    severity,
    creationDate,
    modifiedDate,
  ) {
    this.Id = id;
    this.PersonId = personId;
    this.AllergenId = allergenId;
    this.AllergenName = allergenName;
    this.ReactionDescription = reactionDescription;
    this.Severity = severity;
    this.CreationDate = creationDate;
    this.ModifiedDate = modifiedDate;
  }
}

module.exports = {
  PersonAllergen,
};
