import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../services/rest/events.service';
import { getString } from '../../resources/strings';
import { Subscription } from 'rxjs';
import { ScheduleEvent } from 'shared-components/lib/models/schedule.model';
import { ScheduleComponent } from 'shared-components';

@Component({
  selector: 'sample-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  constructor(
    private eventsService: EventsService
  ) { }

  public getString = getString;
  public events: ScheduleEvent[] = [];

  private subs: Subscription[] = [];

  @ViewChild(ScheduleComponent) schedule: ScheduleComponent;

  ngOnInit(): void {
    this.getEventsForMonth(this.schedule.getCurrentVisibleMonth(), this.schedule.getCurrentVisibleYear());
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getEventsForMonth(month: number, year: number): void {
    this.subs.push(
      this.eventsService.getEvents(month, year).subscribe(data => {
        this.events = [];
        data.forEach(element => {
          this.events.push(this.mapDataToEvent(element));
        });
      })
    );
  }

  private mapDataToEvent(ev: any): ScheduleEvent {
    return {
      id: ev.Id,
      start: new Date(ev.Start),
      end: new Date(ev.End),
      color: ev.Color,
      title: ev.Title,
      description: ev.Description
    };
  }

  public onYearSelectionChange(event: number): void {
    this.getEventsForMonth(this.schedule.getCurrentVisibleMonth(), event);
  }

  public onMonthSelectionChange(event: number): void {
    this.getEventsForMonth(event, this.schedule.getCurrentVisibleYear());
  }
}
