import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../../resources/strings";
import { hexToRgbA } from "../../../resources/functions";
import { Subscription } from "rxjs";
import { SummaryService } from "../../../services/rest/summary.service";
import { Router } from "@angular/router";
import { NbThemeService } from "@nebular/theme";
@Component({
  selector: "sample-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  public getString = getString;
  public hexToRgbA = hexToRgbA;
  public summary: any;
  public longestPerson: any;
  public oldestPerson: any;
  public events: any[] = [];
  public progressValue: number = 0;
  public genderPieOptions: any;
  public activePersonsBarOptions: any;
  public today: Date = new Date();
  public nextEvent: any;
  public employeesByGender: any;
  public allTimeEmployees: any;
  public employees: any[] = [];
  public employeesByJobPosition: any[] = [];
  public currentEmployee: any;
  public personWithLongestLastVisit: any;
  public ageDistribution: any[] = [];
  public occupancyByFloor: any[] = [];
  public residentsByCondition: any[] = [];
  public ageDistributionBarOptions: any;
  public residentsByConditionPieOptions: any;

  private _currentEmployeeIndex: number = 0;
  private _subs: Subscription[] = [];
  private _isDark: boolean = false;

  constructor(
    private _summaryService: SummaryService,
    private _router: Router,
    private _themeService: NbThemeService
  ) {}

  ngOnDestroy() {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    this._isDark = localStorage.getItem("app-theme") === "dark";
    this._subs.push(
      this._themeService.onThemeChange().subscribe((theme) => {
        this._isDark = theme.name === "dark";
        this.rebuildCharts();
      })
    );
    this.getSummary();
  }

  private getSummary(): void {
    this._subs.push(
      this._summaryService.getDashboardSummary().subscribe((data) => {
        if (data) {
          if (data.Summary.length > 0) {
            this.summary = data.Summary[0];
            this.progressValue = Math.trunc(
              (this.summary.TakenSpace / this.summary.Capacity) * 100
            );
          }

          if (data.LongestPerson.length > 0) {
            this.longestPerson = data.LongestPerson[0];
            this.longestPerson.PassedTime = this.calculatePassedTime();
          }

          if (data.OldestPerson.length > 0)
            this.oldestPerson = data.OldestPerson[0];

          if (data.ActivePersons.length > 0) {
            this.summary.ActivePersons = data.ActivePersons;
          }

          if (data.EmployeesByGender.length > 0)
            this.employeesByGender = data.EmployeesByGender[0];

          if (data.AllTimeEmployees.length > 0)
            this.allTimeEmployees = data.AllTimeEmployees[0];

          if (data.Employees.length > 0) {
            this.employees = data.Employees;
            this.currentEmployee = this.employees[this._currentEmployeeIndex];
          }

          if (data.PersonWithLongestLastVisit.length > 0)
            this.personWithLongestLastVisit =
              data.PersonWithLongestLastVisit[0];

          if (data.EmployeesByJobPosition.length > 0)
            this.employeesByJobPosition = data.EmployeesByJobPosition;

          if (data.AgeDistribution?.length > 0)
            this.ageDistribution = data.AgeDistribution;

          if (data.OccupancyByFloor?.length > 0)
            this.occupancyByFloor = data.OccupancyByFloor;

          if (data.ResidentsByCondition?.length > 0)
            this.residentsByCondition = data.ResidentsByCondition;

          this.rebuildCharts();

          this.events = data.Events;

          this.nextEvent = this.events.find(
            (x) => new Date(x.Start) >= this.today
          );

          if (this.nextEvent) {
            setTimeout(() => {
              var elem = document.getElementById(
                "dashboard-event-" + this.nextEvent.Id
              );
              if (elem) elem.scrollIntoView({ behavior: "smooth" });
            }, 500);
          }
        }
      })
    );
  }

  public calculatePassedTime(): any {
    var date: Date = new Date(this.longestPerson.StartDate);
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var yy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var years, months, days;
    months = month - mm;

    if (day < dd) months = months - 1;
    years = year - yy;

    if (month * 100 + day < mm * 100 + dd) {
      years = years - 1;
      months = months + 12;
    }

    days = Math.floor(
      (today.getTime() - new Date(yy + years, mm + months - 1, dd).getTime()) /
        (24 * 60 * 60 * 1000)
    );

    return { years: years, months: months, days: days };
  }

  private rebuildCharts(): void {
    if (this.summary?.ActivePersons) this.setUpEcharts();
    if (this.ageDistribution?.length) this.setUpAgeChart();
    if (this.residentsByCondition?.length) this.setUpConditionChart();
  }

  private get chartTextColor(): string {
    return this._isDark ? "#e8eef0" : "#222b45";
  }

  private get chartAxisColor(): string {
    return this._isDark ? "#8a9aa1" : "#8f9bb3";
  }

  private get chartSplitColor(): string {
    return this._isDark ? "#2a3b43" : "#edf1f7";
  }

  private themedTooltip(extra: any = {}): any {
    return {
      confine: true,
      backgroundColor: this._isDark ? "#1b272d" : "#ffffff",
      borderColor: this._isDark ? "#32444d" : "#e4e9f2",
      textStyle: { color: this.chartTextColor },
      ...extra,
    };
  }

  private setUpEcharts(): void {
    this.genderPieOptions = {
      legend: {
        top: "bottom",
        textStyle: { color: this.chartTextColor },
      },
      tooltip: this.themedTooltip({
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      }),
      color: ["#33B9BF", "#10526E"],
      series: [
        {
          name: getString("genderChartTitle"),
          type: "pie",
          radius: ["40%", "65%"],
          center: ["50%", "43%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          label: {
            show: false,
          },
          data: [
            { value: this.summary.MalePersons, name: getString("male") },
            { value: this.summary.FemalePersons, name: getString("female") },
          ],
        },
      ],
    };

    this.activePersonsBarOptions = {
      tooltip: this.themedTooltip({
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      }),
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: this.summary.ActivePersons.map((x) => x.YearMonth),
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: { color: this.chartAxisColor },
        axisLine: { lineStyle: { color: this.chartAxisColor } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: this.chartAxisColor },
        splitLine: { lineStyle: { color: this.chartSplitColor } },
      },
      series: [
        {
          name: getString("activePersonsChartTitle"),
          data: this.summary.ActivePersons.map((x, i) => {
            var color = "#197189";
            if (i == this.summary.ActivePersons.length - 1) color = "#33B9BF";
            return {
              value: x.ActivePersonsCount,
              itemStyle: {
                color: color,
              },
            };
          }),
          barWidth: "60%",
          type: "bar",
        },
      ],
    };
  }

  private setUpAgeChart(): void {
    this.ageDistributionBarOptions = {
      tooltip: this.themedTooltip({
        trigger: "axis",
        axisPointer: { type: "shadow" },
      }),
      grid: { left: "3%", right: "4%", bottom: "3%", top: "10%", containLabel: true },
      xAxis: {
        type: "category",
        data: this.ageDistribution.map((x) => x.Label),
        axisTick: { alignWithLabel: true },
        axisLabel: { color: this.chartAxisColor },
        axisLine: { lineStyle: { color: this.chartAxisColor } },
      },
      yAxis: {
        type: "value",
        minInterval: 1,
        axisLabel: { color: this.chartAxisColor },
        splitLine: { lineStyle: { color: this.chartSplitColor } },
      },
      series: [
        {
          name: getString("residents"),
          data: this.ageDistribution.map((x) => x.Count),
          barWidth: "55%",
          type: "bar",
          itemStyle: { color: "#33B9BF", borderRadius: [4, 4, 0, 0] },
        },
      ],
    };
  }

  private setUpConditionChart(): void {
    this.residentsByConditionPieOptions = {
      legend: {
        top: "bottom",
        textStyle: { color: this.chartTextColor },
      },
      tooltip: this.themedTooltip({
        trigger: "item",
        formatter: "{b} : {c} ({d}%)",
      }),
      color: ["#33B9BF", "#2594A4", "#10526E", "#61D8D3", "#197189"],
      series: [
        {
          name: getString("healthCondition"),
          type: "pie",
          radius: ["38%", "62%"],
          center: ["50%", "43%"],
          itemStyle: { borderRadius: 6 },
          label: { show: false },
          data: this.residentsByCondition.map((x) => ({
            value: x.Count,
            name: x.Name,
          })),
        },
      ],
    };
  }

  public goToEvents(): void {
    this._router.navigateByUrl("pages/calendar");
  }
}
