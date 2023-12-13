import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { SummaryService } from "../../services/rest/summary.service";
import { hexToRgbA } from "../../resources/functions";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnDestroy, OnInit {
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

  private currentEmployeeIndex: number = 0;
  private subs: Subscription[] = [];

  constructor(private summaryService: SummaryService, private router: Router) {}

  ngOnDestroy() {
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.getSummary();
  }

  private getSummary(): void {
    this.subs.push(
      this.summaryService.getDashboardSummary().subscribe((data) => {
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
            this.setUpEcharts();
          }

          if (data.EmployeesByGender.length > 0)
            this.employeesByGender = data.EmployeesByGender[0];

          if (data.AllTimeEmployees.length > 0)
            this.allTimeEmployees = data.AllTimeEmployees[0];

          if (data.Employees.length > 0) {
            this.employees = data.Employees;
            this.currentEmployee = this.employees[this.currentEmployeeIndex];
          }

          if (data.EmployeesByJobPosition.length > 0)
            this.employeesByJobPosition = data.EmployeesByJobPosition;

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

  public calculatePassedTime() {
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

  private setUpEcharts(): void {
    this.genderPieOptions = {
      legend: {
        top: "bottom",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      color: ["#33B9BF", "#10526E"],
      series: [
        {
          name: getString("genderChartTitle"),
          type: "pie",
          radius: [50, 100],
          center: ["50%", "50%"],
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
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
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
      },
      yAxis: {
        type: "value",
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

  public goToEvents(): void {
    this.router.navigateByUrl("pages/calendar");
  }
}
