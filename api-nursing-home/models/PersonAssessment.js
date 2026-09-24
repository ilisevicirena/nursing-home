class PersonAssessment {
  constructor(
    id,
    personId,
    assessmentDate,
    bradenScore,
    fallRiskScore,
    mobilityScore,
    nutritionScore,
    notes,
    assessorName,
    creationDate,
    modifiedDate,
  ) {
    this.Id = id;
    this.PersonId = personId;
    this.AssessmentDate = assessmentDate;
    this.BradenScore = bradenScore;
    this.FallRiskScore = fallRiskScore;
    this.MobilityScore = mobilityScore;
    this.NutritionScore = nutritionScore;
    this.Notes = notes;
    this.AssessorName = assessorName;
    this.CreationDate = creationDate;
    this.ModifiedDate = modifiedDate;
  }
}

module.exports = {
  PersonAssessment,
};
