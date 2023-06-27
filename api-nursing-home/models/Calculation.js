class CalculationPaid {
    constructor(id, paidPrice, paidDate) {
        this.Id = id;
        this.PaidPrice = paidPrice;
        this.PaidDate = paidDate;
    }
}

class CalculationRealPrice {
    constructor(id, realPrice) {
        this.Id = id;
        this.RealPrice = realPrice;
    }
}

class Calculation {
    constructor(id, month, year, personId, systemPrice, realPrice, paidPrice, dateFrom, dateTo, paymentDaysDeadline, priceUnitId, measureUnitId, datePaid, packages, services, discounts, documents) {
        this.Id = id;
        this.Month = month;
        this.Year = year;
        this.PersonId = personId;
        this.SystemPrice = systemPrice;
        this.RealPrice = realPrice;
        this.PaidPrice = paidPrice;
        this.DateFrom = dateFrom;
        this.DateTo = dateTo;
        this.PaymentDaysDeadline = paymentDaysDeadline;
        this.PriceUnitId = priceUnitId;
        this.MeasureUnitId = measureUnitId;
        this.DatePaid = datePaid;
        this.Packages = packages;
        this.Services = services;
        this.Discounts = discounts;
        this.Documents = documents;
    }
}

module.exports = {
    CalculationPaid,
    CalculationRealPrice,
    Calculation
}