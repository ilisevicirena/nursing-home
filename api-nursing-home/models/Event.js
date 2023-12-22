class Event {
  constructor(id, title, description, start, end, color, recurring, reminder) {
    this.Id = id;
    this.Title = title;
    this.Description = description;
    this.Start = start;
    this.End = end;
    this.Color = color;
    this.Recurring = recurring;
    this.Reminder = reminder;
  }
}

module.exports = {
  Event,
};
