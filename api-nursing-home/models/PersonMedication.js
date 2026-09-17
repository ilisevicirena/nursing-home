class PersonMedication {
  constructor(
    id,
    personId,
    medicationName,
    dosage,
    frequency,
    route,
    startDate,
    endDate,
    indication,
    notes,
    status,
    prescriberName,
    morningDose,
    noonDose,
    eveningDose,
    nightDose,
    rxCui,
    creationDate,
    modifiedDate,
  ) {
    this.Id = id;
    this.PersonId = personId;
    this.MedicationName = medicationName;
    this.Dosage = dosage;
    this.Frequency = frequency;
    this.Route = route;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.Indication = indication;
    this.Notes = notes;
    this.Status = status;
    this.PrescriberName = prescriberName;
    this.MorningDose = morningDose;
    this.NoonDose = noonDose;
    this.EveningDose = eveningDose;
    this.NightDose = nightDose;
    this.RxCui = rxCui;
    this.CreationDate = creationDate;
    this.ModifiedDate = modifiedDate;
  }
}

module.exports = {
  PersonMedication,
};
