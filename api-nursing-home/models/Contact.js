class Contact {
    constructor(id, firstName, lastName, email, telephone, mobile, personId) {
        this.Id = id;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Telephone = telephone;
        this.Mobile = mobile;
        this.PersonId = personId;
    }
}

module.exports = {
    Contact
}