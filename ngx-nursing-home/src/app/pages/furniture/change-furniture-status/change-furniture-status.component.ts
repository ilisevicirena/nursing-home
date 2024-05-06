import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { getString } from "../../../resources/strings";
import { FurnitureStatusesService } from "../../../services/rest/furniture-statuses.service";
import { Subscription } from "rxjs";
import { FurnitureService } from "../../../services/rest/furniture.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "sample-change-furniture-status",
  templateUrl: "./change-furniture-status.component.html",
  styleUrls: ["./change-furniture-status.component.scss"],
})
export class ChangeFurnitureStatusComponent implements OnInit, OnDestroy {
  public getString = getString;
  public rowData: any;
  public statuses: any[];
  public status: any;
  public statusDate: Date = new Date();

  private _subs: Subscription[] = [];

  constructor(
    private _ref: NbDialogRef<ChangeFurnitureStatusComponent>,
    private _furnitureStatusesService: FurnitureStatusesService,
    private _furnitureService: FurnitureService,
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

  private getStatuses() {
    this._subs.push(
      this._furnitureStatusesService.getData().subscribe((data) => {
        this.statuses = data;
      })
    );
  }

  public changeStatusClick(): void {
    this._subs.push(
      this._furnitureService
        .changeFurnitureStatus(this.rowData.Id, this.status, this.statusDate)
        .subscribe(
          () => {
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.close(true);
          },
          (err) => {
            console.error(err);
            this._toastrService.showToast("danger", getString("saveError"));
          }
        )
    );
  }
}
