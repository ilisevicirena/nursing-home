class Note {
    constructor(id, personId, title, text, tags) {
        this.Id = id;
        this.Title = title;
        this.PersonId = personId;
        this.Text = text;
        this.Tags = tags;
    }
}

module.exports = {
    Note
}