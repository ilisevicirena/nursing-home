import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { EventsService, IEvent } from '../../../services/rest/events.service';
import { NbDialogRef } from '@nebular/theme';
import { ScheduleEvent } from 'shared-components/lib/models/schedule.model';
import { environment } from '../../../../environments/environment';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'sample-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public getString = getString;
  public isNew: boolean = true;
  public event: ScheduleEvent;
  public eventDuration: number = 1;
  public colors: string[] = environment.colors;
  public selectedColor: string = 'success';
  public start: Date;
  public end: Date;
  public name: string;
  public desc: string;
  public recurring: boolean;
  public reminder: boolean = true;
  public showReminder: boolean = true;
  public id: number = 0;

  constructor(
    private eventsService: EventsService,
    private ref: NbDialogRef<AddEditEventComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.id > 0) {
      if (this.start.toDateString() != this.end.toDateString()) this.eventDuration = 2;
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this.ref.close(result);
  }

  public selectColor(c: string): void {
    this.selectedColor = c;
  }

  public saveEvent(): void {
    var obj: IEvent = {
      Id: this.id,
      Title: this.name,
      Description: this.desc,
      Start: this.start.toISOString(),
      End: this.end?.toISOString(),
      Color: this.selectedColor,
      Recurring: this.recurring
    };

    if (this.eventDuration == 1) obj.End = obj.Start;

    if (this.id == 0) {
      this.subs.push(
        this.eventsService.add(obj).subscribe(() => {
          this.toastrService.showToast('success', getString('saveSuccess'));
          this.close(true);
        })
      );
    } else {
      this.subs.push(
        this.eventsService.update(obj).subscribe(() => {
          this.toastrService.showToast('success', getString('saveSuccess'));
          this.close(true);
        })
      );
    }

  }
}
