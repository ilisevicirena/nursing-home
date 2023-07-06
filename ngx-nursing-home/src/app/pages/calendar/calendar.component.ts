import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../services/rest/events.service';
import { getString } from '../../resources/strings';
import { Subscription } from 'rxjs';
import { ScheduleEvent } from 'shared-components/lib/models/schedule.model';
import { ScheduleComponent } from 'shared-components';
import { DialogService } from '../../shared/dialog/dialog.service';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';

@Component({
  selector: 'sample-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  constructor(
    private eventsService: EventsService,
    private dialogService: DialogService
  ) { }

  public getString = getString;
  public events: ScheduleEvent[] = [];

  private subs: Subscription[] = [];
  private eventsOriginal: any[] = [];

  @ViewChild(ScheduleComponent) schedule: ScheduleComponent;

  ngOnInit(): void {
    var today = new Date();
    this.getEventsForMonth(today.getMonth() + 1, today.getFullYear());
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getEventsForMonth(month: number, year: number): void {
    this.subs.push(
      this.eventsService.getEvents(month, year).subscribe(data => {
        this.eventsOriginal = data;
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

  public onEventClicked(event: ScheduleEvent): void {
    var originalEvent = this.eventsOriginal.find(x => x.Id == event.id);

    this.subs.push(
      this.dialogService.open(
        AddEditEventComponent,
        {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            isNew: false,
            start: event.start,
            end: event.end,
            name: event.title,
            desc: event.description,
            selectedColor: event.color,
            recurring: originalEvent.Recurring,
            showReminder: !(originalEvent.PersonId > 0),
            reminder: originalEvent.Reminder,
            id: originalEvent.Id
          }
        }
      ).onClose.subscribe(result => {
        if (result) this.getEventsForMonth(this.schedule.getCurrentVisibleMonth(), this.schedule.getCurrentVisibleYear());
      })
    );
  }

  public onAddNewClick(): void {
    this.subs.push(
      this.dialogService.open(
        AddEditEventComponent,
        {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            isNew: true,
            event: undefined
          }
        }
      ).onClose.subscribe(result => {
        if (result) this.getEventsForMonth(this.schedule.getCurrentVisibleMonth(), this.schedule.getCurrentVisibleYear());
      })
    );
  }

  public onTodayClicked(): void {
    this.getEventsForMonth(this.schedule.getCurrentVisibleMonth(), this.schedule.getCurrentVisibleYear());
  }
}
