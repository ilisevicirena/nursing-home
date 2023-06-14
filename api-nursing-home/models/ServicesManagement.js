class ServicesManagement {
    constructor(personId, packages, services, discounts, measureUnitId) {
        this.PersonId = personId;
        this.Packages = packages;
        this.Services = services;
        this.Discouns = discounts;
        this.MeasureUnitId = measureUnitId;
    }
}

module.exports = {
    ServicesManagement
}