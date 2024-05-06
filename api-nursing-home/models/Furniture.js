class Furniture {
  constructor(id, name, description, inventoryCode, roomId) {
    this.Id = id;
    this.Name = name;
    this.Description = description;
    this.InventoryCode = inventoryCode;
    this.RoomId = roomId;
  }
}

class FurnitureStatusChange {
  constructor(id, statusId, date) {
    this.Id = id;
    this.StatusId = statusId;
    this.Date = date;
  }
}

module.exports = {
  Furniture,
  FurnitureStatusChange,
};
