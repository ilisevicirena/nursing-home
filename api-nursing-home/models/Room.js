class Room {
    constructor(id, name, capacity, floorId, floorName) {
        this.Id = id;
        this.Name = name;
        this.Capacity = capacity;
        this.FloorId = floorId;
        this.FloorName = floorName;
    }
}

module.exports = {
    Room
}