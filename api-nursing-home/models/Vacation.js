class Vacation {
  constructor(
    id,
    employeeId,
    year,
    fromDate,
    toDate,
    daysTaken,
    daysTotal,
    statusId
  ) {
    this.Id = id;
    this.EmployeeId = employeeId;
    this.Year = year;
    this.FromDate = fromDate;
    this.ToDate = toDate;
    this.DaysTaken = daysTaken;
    this.DaysTotal = daysTotal;
    this.StatusId = statusId;
  }
}

module.exports = {
  Vacation,
};
