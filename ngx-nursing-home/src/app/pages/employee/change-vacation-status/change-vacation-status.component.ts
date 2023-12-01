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
})
export class ChangeVacationStatusComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public selectedId: number = 0;
  public statuses: any[] = [];
  public selectedStatus: number;
  public getString = getString;

  constructor(
    private ref: NbDialogRef<ChangeVacationStatusComponent>,
    private vacationsService: VacationsService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStatuses();
  }

  ngOnDestroy(): void {
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this.ref.close(result);
  }

  private getStatuses() {
    this.subs.push(
      this.vacationsService.getData().subscribe((data) => {
        this.statuses = data;
      })
    );
  }

  public saveStatus() {
    this.changeStatus(this.selectedId, this.selectedStatus);
  }

  private changeStatus(id, statusId) {
    this.subs.push(
      this.vacationsService.changeVacationStatus(id, statusId).subscribe(() => {
        this.toastrService.showToast("success", getString("saveSuccess"));
        this.close(true);
      })
    );
  }
}
