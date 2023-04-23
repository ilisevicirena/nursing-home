class Person {
    constructor(id, firstName, lastName, jmbg, birthDate, startDate, endDate, active, creationDate, address, genderId) {
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
    }
}

module.exports = {
    Person
}