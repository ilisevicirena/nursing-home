import { Component, OnInit } from '@angular/core';
import { ScheduleEvent } from 'shared-components/lib/models/schedule.model';

@Component({
  selector: 'sample-calendar-schedule',
  templateUrl: './calendar-schedule.component.html',
  styleUrls: ['./calendar-schedule.component.scss']
})
export class CalendarScheduleComponent implements OnInit {

  constructor() { }

  private today = new Date();

  ngOnInit(): void {
  }

  public events: ScheduleEvent[] = [
    { id: "1", start: new Date(this.today.setDate(1)), end: new Date(this.today.setDate(5)), title: "event 1", color: "success" },
    { id: "2", start: new Date(this.today.setDate(2)), end: new Date(this.today.setDate(2)), title: "event 2", color: "warning" },
    { id: "3", start: new Date(this.today.setDate(1)), end: new Date(this.today.setDate(22)), title: "event 3", color: "danger" },
    { id: "4", start: new Date(this.today.setDate(8)), end: new Date(this.today.setDate(10)), title: "event 4", color: "primary" },
    { id: "5", start: new Date(this.today.setDate(15)), end: new Date(this.today.setDate(17)), title: "event 5", color: "warning" },
    { id: "6", start: new Date(this.today.setDate(13)), end: new Date(this.today.setDate(15)), title: "event 6", color: "#b4a7d6" },
    { id: "7", start: new Date(this.today.setDate(28)), end: new Date(this.today.setDate(30)), title: "event 7", color: "info" },
    { id: "8", start: new Date(this.today.setDate(25)), end: new Date(this.today.setDate(29)), title: "event 8", color: "info", description: "Some event custom description." }
  ];

  public onYearSelectionChange(event: number): void {
    console.log("Year change: " + event);
  }

  public onMonthSelectionChange(event: number): void {
    console.log("Month change: " + event);
  }
}
