import { Component, Inject, OnDestroy, OnInit, Optional } from "@angular/core";
import { NbDialogRef, NB_DIALOG_CONFIG, NbDialogConfig } from "@nebular/theme";
import { Subscription } from "rxjs/internal/Subscription";
import {
  IPersonDietaryRestriction,
  PersonDietaryRestrictionsService,
} from "../../../services/rest/person-dietary-restrictions.service";
import { getString } from "../../../resources/strings";
import { ToastrService } from "../../../services/toastr.service";

@Component({
    selector: "sample-add-edit-dietary-restriction",
    templateUrl: "./add-edit-dietary-restriction.component.html",
    styleUrls: ["./add-edit-dietary-restriction.component.scss"],
    standalone: false
})
export class AddEditDietaryRestrictionComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  constructor(
    private _ref: NbDialogRef<AddEditDietaryRestrictionComponent>,
    @Optional() @Inject(NB_DIALOG_CONFIG)
    private _dialogConfig: NbDialogConfig<{ item?: IPersonDietaryRestriction; personId?: number }>,
    private _service: PersonDietaryRestrictionsService,
    private _toastrService: ToastrService,
  ) {}

  public item: IPersonDietaryRestriction = { Id: 0, PersonId: 0, DietaryTypeId: 0 };
  public personId: number = 0;
  public dietaryTypes: any[] = [];
  public getString = getString;

  ngOnInit(): void {
    const context = this._dialogConfig?.context ?? {};
    const existingItem = context.item ?? (this.item?.Id ? this.item : null);
    this.personId = context.personId ?? existingItem?.PersonId ?? this.personId;

    if (existingItem) {
      this.item = {
        ...existingItem,
        StartDate: existingItem.StartDate ? new Date(existingItem.StartDate) : undefined,
        EndDate: existingItem.EndDate ? new Date(existingItem.EndDate) : undefined,
      };
    } else {
      this.item = { Id: 0, PersonId: this.personId, DietaryTypeId: 0, StartDate: new Date() };
    }

    this._subs.push(
      this._service.getDietaryTypes().subscribe((data) => {
        this.dietaryTypes = data;
      }),
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public save(): void {
    if (!this.item.DietaryTypeId) {
      this._toastrService.showToast("danger", getString("saveError"), getString("required"));
      return;
    }
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
