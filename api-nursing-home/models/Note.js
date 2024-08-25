class Note {
  constructor(id, personId, title, text, tags, userId) {
    this.Id = id;
    this.Title = title;
    this.PersonId = personId;
    this.Text = text;
    this.Tags = tags;
    this.UserId = userId;
  }
}

module.exports = {
  Note,
};
