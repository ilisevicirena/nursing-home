class Package {
    constructor(id, name, description, defaultPackagePrice, defaulPackagePriceUnitId, packagePriceCalculated) {
        this.Id = id;
        this.Name = name;
        this.Description = description;
        this.DefaultPackagePrice = defaultPackagePrice;
        this.DefaulPackagePriceUnitId = defaulPackagePriceUnitId;
        this.PackagePriceCalculated = packagePriceCalculated;
    }
}

module.exports = {
    Package
}