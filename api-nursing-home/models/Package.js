class Package {
  constructor(
    id,
    name,
    description,
    defaultPackagePrice,
    defaulPackagePriceUnitId,
    packagePriceCalculated,
    calculationMeasureUnitId,
    services
  ) {
    this.Id = id;
    this.Name = name;
    this.Description = description;
    this.DefaultPackagePrice = defaultPackagePrice;
    this.DefaulPackagePriceUnitId = defaulPackagePriceUnitId;
    this.PackagePriceCalculated = packagePriceCalculated;
    this.CalculationMeasureUnitId = calculationMeasureUnitId;
    this.Services = services;
  }
}

module.exports = {
  Package,
};
