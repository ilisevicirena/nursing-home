class Discount {
  constructor(id, name, description, quantity, percentCalculation) {
    this.Id = id;
    this.Name = name;
    this.Description = description;
    this.Quantity = quantity;
    this.PercentCalculation = percentCalculation;
  }
}

module.exports = {
  Discount,
};
