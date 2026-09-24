import { Component, Inject, OnDestroy, OnInit, Optional } from "@angular/core";
import { NbDialogRef, NB_DIALOG_CONFIG, NbDialogConfig } from "@nebular/theme";
import { Subscription } from "rxjs";
import { IAssessment, CarePlanService } from "../../../services/rest/care-plan.service";
import { ToastrService } from "../../../services/toastr.service";
import { getString } from "../../../resources/strings";

@Component({
  selector: "sample-add-edit-assessment",
  templateUrl: "./add-edit-assessment.component.html",
  styleUrls: ["./add-edit-assessment.component.scss"],
})
export class AddEditAssessmentComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public item: IAssessment = {
    Id: 0,
    PersonId: 0,
    BradenScore: 18,
    FallRiskScore: 30,
    MobilityScore: 60,
    NutritionScore: 60,
    Notes: "",
  };
  public personId: number = 0;
  public getString = getString;

  constructor(
    private _ref: NbDialogRef<AddEditAssessmentComponent>,
    @Optional()
    @Inject(NB_DIALOG_CONFIG)
    private _dialogConfig: NbDialogConfig<{ item?: IAssessment; personId?: number }>,
    private _service: CarePlanService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const context = this._dialogConfig?.context ?? {};
    const existing = context.item ?? null;
    this.personId = context.personId ?? existing?.PersonId ?? this.personId;

    if (existing) {
      this.item = {
        ...existing,
        AssessmentDate: existing.AssessmentDate ? new Date(existing.AssessmentDate) : new Date(),
      };
    } else {
      this.item = {
        Id: 0,
        PersonId: this.personId,
        AssessmentDate: new Date(),
        BradenScore: 18,
        FallRiskScore: 30,
        MobilityScore: 60,
        NutritionScore: 60,
        Notes: "",
      };
    }
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  private clamp(v: number | undefined, min: number, max: number, fallback: number): number {
    if (v == null || isNaN(v)) return fallback;
    return Math.min(max, Math.max(min, v));
  }

  public save(): void {
    if (!this.item.AssessmentDate) {
      this._toastr.showToast("danger", getString("saveError"), getString("required"));
      return;
    }
    this.item.PersonId = this.personId;
    this.item.BradenScore = this.clamp(this.item.BradenScore, 6, 23, 18);
    this.item.FallRiskScore = this.clamp(this.item.FallRiskScore, 0, 100, 30);
    this.item.MobilityScore = this.clamp(this.item.MobilityScore, 0, 100, 60);
    this.item.NutritionScore = this.clamp(this.item.NutritionScore, 0, 100, 60);

    const obs = this.item.Id ? this._service.update(this.item) : this._service.add(this.item);
    this._subs.push(
      obs.subscribe(
        () => {
          this._toastr.showToast("success", getString("saveSuccess"), "");
          this.close(true);
        },
        () => this._toastr.showToast("danger", getString("saveError"), "")
      )
    );
  }
}
