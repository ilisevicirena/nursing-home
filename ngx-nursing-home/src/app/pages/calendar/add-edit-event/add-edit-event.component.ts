import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { EventsService, IEvent } from "../../../services/rest/events.service";
import { NbDialogRef } from "@nebular/theme";
import { ScheduleEvent } from "shared-components/lib/models/schedule.model";
import { environment } from "../../../../environments/environment";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "sample-add-edit-event",
  templateUrl: "./add-edit-event.component.html",
  styleUrls: ["./add-edit-event.component.scss"],
})
export class AddEditEventComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public getString = getString;
  public isNew: boolean = true;
  public event: ScheduleEvent;
  public eventDuration: number = 1;
  public colors: string[] = environment.colors;
  public selectedColor: string = "success";
  public start: Date;
  public end: Date;
  public name: string;
  public desc: string;
  public recurring: boolean;
  public reminder: boolean = true;
  public showReminder: boolean = true;
  public id: number = 0;

  constructor(
    private _eventsService: EventsService,
    private _ref: NbDialogRef<AddEditEventComponent>,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.id > 0) {
      if (this.start.toDateString() != this.end.toDateString())
        this.eventDuration = 2;
    }
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this._ref.close(result);
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
      Recurring: this.recurring,
      Reminder: this.reminder,
    };

    if (this.eventDuration == 1) obj.End = obj.Start;

    if (this.id == 0) {
      this._subs.push(
        this._eventsService.add(obj).subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.close(true);
        })
      );
    } else {
      this._subs.push(
        this._eventsService.update(obj).subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.close(true);
        })
      );
    }
  }

  public deleteEvent(): void {
    this._subs.push(
      this._eventsService.delete({ Id: this.id }).subscribe(() => {
        this._toastrService.showToast("success", getString("saveSuccess"));
        this.close(true);
      })
    );
  }
}
