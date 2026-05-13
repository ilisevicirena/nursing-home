class PersonFunctionalStatus {
  constructor(
    id,
    personId,
    mobilityStatus,
    cognitiveStatus,
    fallRisk,
    visualStatus,
    hearingStatus,
    assessmentDate,
    notesDescription,
    creationDate,
    modifiedDate,
  ) {
    this.Id = id;
    this.PersonId = personId;
    this.MobilityStatus = mobilityStatus;
    this.CognitiveStatus = cognitiveStatus;
    this.FallRisk = fallRisk;
    this.VisualStatus = visualStatus;
    this.HearingStatus = hearingStatus;
    this.AssessmentDate = assessmentDate;
    this.NotesDescription = notesDescription;
    this.CreationDate = creationDate;
    this.ModifiedDate = modifiedDate;
  }
}

module.exports = {
  PersonFunctionalStatus,
};
