class Room {
  constructor(
    id,
    name,
    capacity,
    floorId,
    floorName,
    width,
    height,
    top,
    left
  ) {
    this.Id = id;
    this.Name = name;
    this.Capacity = capacity;
    this.FloorId = floorId;
    this.FloorName = floorName;
    this.Width = width;
    this.Height = height;
    this.Left = left;
    this.Top = top;
  }
}

module.exports = {
  Room,
};
