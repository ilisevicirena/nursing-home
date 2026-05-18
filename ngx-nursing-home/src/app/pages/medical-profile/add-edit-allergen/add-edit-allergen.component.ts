import { Component, Inject, OnDestroy, OnInit, Optional } from "@angular/core";
import { NbDialogRef, NB_DIALOG_CONFIG, NbDialogConfig } from "@nebular/theme";
import { Subscription } from "rxjs/internal/Subscription";
import {
  IPersonAllergen,
  PersonAllergensService,
} from "../../../services/rest/person-allergens.service";
import { getString } from "../../../resources/strings";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "sample-add-edit-allergen",
  templateUrl: "./add-edit-allergen.component.html",
  styleUrls: ["./add-edit-allergen.component.scss"],
})
export class AddEditAllergenComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  constructor(
    private _ref: NbDialogRef<AddEditAllergenComponent>,
    @Optional() @Inject(NB_DIALOG_CONFIG)
    private _dialogConfig: NbDialogConfig<{ item?: IPersonAllergen; personId?: number }>,
    private _personAllergensService: PersonAllergensService,
    private _toastrService: ToastrService,
  ) {}

  public item: IPersonAllergen = {
    Id: 0,
    PersonId: 0,
    AllergenName: "",
    ReactionDescription: "",
    SeverityId: undefined,
    IsActive: true,
  };
  public personId: number = 0;
  public getString = getString;
  public allergenSeverities: any[] = [];

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    const context = this._dialogConfig?.context ?? {};
    this.personId = context.personId ?? context.item?.PersonId ?? 0;
    if (context.item) {
      this.item = { ...context.item };
    } else {
      this.item = {
        Id: 0,
        PersonId: this.personId,
        AllergenName: "",
        ReactionDescription: "",
        SeverityId: undefined,
        IsActive: true,
      };
    }
    this.getSeverities();
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public onEndDateChange(value: any): void {
    if (!this.item) {
      return;
    }
    this.item.EndDate = value;
    this.item.IsActive = !value;
  }

  public save(): void {
    if (!this.item) return;
    this.item.PersonId = this.personId;

    if (!this.item.AllergenName?.trim() || !this.item.SeverityId) {
      this._toastrService.showToast(
        "danger",
        getString("saveError"),
        getString("required"),
      );
      return;
    }

    this.updateIsActive();
    const obs = this.item.Id
      ? this._personAllergensService.update(this.item)
      : this._personAllergensService.add(this.item);
    this._subs.push(
      obs.subscribe(
        () => {
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            "",
          );
          this.close(true);
        },
        () =>
          this._toastrService.showToast("danger", getString("saveError"), ""),
      ),
    );
  }

  private updateIsActive(): void {
    if (this.item) {
      this.item.IsActive = !this.item.EndDate;
    }
  }

  private getSeverities(): void {
    this._subs.push(
      this._personAllergensService.getAllergenSeverities().subscribe((data) => {
        this.allergenSeverities = data;
      }),
    );
  }
}
