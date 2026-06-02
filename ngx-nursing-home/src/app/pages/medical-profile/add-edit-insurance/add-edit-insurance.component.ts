import { Component, Inject, OnDestroy, OnInit, Optional } from "@angular/core";
import { NbDialogRef, NB_DIALOG_CONFIG, NbDialogConfig } from "@nebular/theme";
import { Subscription } from "rxjs/internal/Subscription";
import {
  IPersonInsuranceData,
  PersonInsuranceService,
} from "../../../services/rest/person-insurance.service";
import { getString } from "../../../resources/strings";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "sample-add-edit-insurance",
  templateUrl: "./add-edit-insurance.component.html",
  styleUrls: ["./add-edit-insurance.component.scss"],
})
export class AddEditInsuranceComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  constructor(
    private _ref: NbDialogRef<AddEditInsuranceComponent>,
    @Optional() @Inject(NB_DIALOG_CONFIG)
    private _dialogConfig: NbDialogConfig<{ item?: IPersonInsuranceData; personId?: number }>,
    private _service: PersonInsuranceService,
    private _toastrService: ToastrService,
  ) {}

  public item: IPersonInsuranceData = { Id: 0, PersonId: 0 };
  public personId: number = 0;
  public getString = getString;

  public readonly statusOptions = [
    { key: "insuranceStatusActive",  value: "active" },
    { key: "insuranceStatusExpired", value: "expired" },
    { key: "insuranceStatusPending", value: "pending" },
  ];

  ngOnInit(): void {
    const context = this._dialogConfig?.context ?? {};
    const existingItem = context.item ?? (this.item?.Id ? this.item : null);
    this.personId = context.personId ?? existingItem?.PersonId ?? this.personId;

    if (existingItem) {
      this.item = {
        ...existingItem,
        CoverageStartDate: existingItem.CoverageStartDate
          ? new Date(existingItem.CoverageStartDate)
          : undefined,
        CoverageEndDate: existingItem.CoverageEndDate
          ? new Date(existingItem.CoverageEndDate)
          : undefined,
      };
    } else {
      this.item = { Id: 0, PersonId: this.personId, Status: "active" };
    }
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public save(): void {
    this.item.PersonId = this.personId;

    const obs = this.item.Id
      ? this._service.update(this.item)
      : this._service.add(this.item);

    this._subs.push(
      obs.subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"), "");
          this.close(true);
        },
        () => this._toastrService.showToast("danger", getString("saveError"), ""),
      ),
    );
  }
}
