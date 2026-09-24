class MedicationAdministration {
  constructor(
    id,
    personId,
    personMedicationId,
    administrationDate,
    slot,
    status,
    administeredBy,
    creationDate,
    modifiedDate,
  ) {
    this.Id = id;
    this.PersonId = personId;
    this.PersonMedicationId = personMedicationId;
    this.AdministrationDate = administrationDate;
    this.Slot = slot;
    this.Status = status;
    this.AdministeredBy = administeredBy;
    this.CreationDate = creationDate;
    this.ModifiedDate = modifiedDate;
  }
}

module.exports = {
  MedicationAdministration,
};
