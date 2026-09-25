import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { NbDialogRef } from "@nebular/theme";
import { VacationsService } from "../../../services/rest/vacations.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
    selector: "sample-change-vacation-status",
    templateUrl: "./change-vacation-status.component.html",
    styleUrls: ["./change-vacation-status.component.scss"],
    standalone: false
})
export class ChangeVacationStatusComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public selectedId: number = 0;
  public statuses: any[] = [];
  public selectedStatus: number;
  public getString = getString;

  constructor(
    private _ref: NbDialogRef<ChangeVacationStatusComponent>,
    private _vacationsService: VacationsService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStatuses();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  private getStatuses(): void {
    this._subs.push(
      this._vacationsService.getData().subscribe((data) => {
        this.statuses = data;
      })
    );
  }

  public saveStatus(): void {
    this.changeStatus(this.selectedId, this.selectedStatus);
  }

  private changeStatus(id: number, statusId: number): void {
    this._subs.push(
      this._vacationsService
        .changeVacationStatus(id, statusId)
        .subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.close(true);
        })
    );
  }
}
