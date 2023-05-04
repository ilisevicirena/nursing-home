class Service {
    constructor(id, name, description, measureUnitId, costPerUnit, defaultNumberOfUnits, priceUnitId) {
        this.Id = id;
        this.Name = name;
        this.Description = description;
        this.MeasureUnitId = measureUnitId;
        this.CostPerUnit = costPerUnit;
        this.DefaultNumberOfUnits = defaultNumberOfUnits;
        this.PriceUnitId = priceUnitId;
    }
}

module.exports = {
    Service
}