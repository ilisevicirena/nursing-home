import { Component, Inject, OnDestroy, OnInit, Optional } from "@angular/core";
import { NbDialogRef, NB_DIALOG_CONFIG, NbDialogConfig } from "@nebular/theme";
import { Subscription } from "rxjs/internal/Subscription";
import {
  IPersonFunctionalStatus,
  PersonFunctionalStatusService,
} from "../../../services/rest/person-functional-status.service";
import { getString } from "../../../resources/strings";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "sample-add-edit-functional-status",
  templateUrl: "./add-edit-functional-status.component.html",
  styleUrls: ["./add-edit-functional-status.component.scss"],
})
export class AddEditFunctionalStatusComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  constructor(
    private _ref: NbDialogRef<AddEditFunctionalStatusComponent>,
    @Optional() @Inject(NB_DIALOG_CONFIG)
    private _dialogConfig: NbDialogConfig<{ item?: IPersonFunctionalStatus; personId?: number }>,
    private _service: PersonFunctionalStatusService,
    private _toastrService: ToastrService,
  ) {}

  public item: IPersonFunctionalStatus = { Id: 0, PersonId: 0 };
  public personId: number = 0;
  public getString = getString;

  public readonly mobilityOptions = [
    { key: "mobilityIndependent",        value: "independent" },
    { key: "mobilityAssistiveDevice",    value: "assistive_device" },
    { key: "mobilityRequiresAssistance", value: "requires_assistance" },
    { key: "mobilityNonAmbulatory",      value: "non_ambulatory" },
  ];

  public readonly cognitiveOptions = [
    { key: "cognitiveIntact",              value: "intact" },
    { key: "cognitiveMildImpairment",      value: "mild_impairment" },
    { key: "cognitiveModerateImpairment",  value: "moderate_impairment" },
    { key: "cognitiveSevereImpairment",    value: "severe_impairment" },
    { key: "cognitiveDementia",            value: "dementia" },
  ];

  public readonly fallRiskOptions = [
    { key: "fallRiskLow",      value: "low" },
    { key: "fallRiskModerate", value: "moderate" },
    { key: "fallRiskHigh",     value: "high" },
  ];

  public readonly visualOptions = [
    { key: "visualNormal",    value: "normal" },
    { key: "visualCorrected", value: "corrected" },
    { key: "visualImpaired",  value: "impaired" },
    { key: "visualBlind",     value: "blind" },
  ];

  public readonly hearingOptions = [
    { key: "hearingNormal",       value: "normal" },
    { key: "hearingMildLoss",     value: "mild_loss" },
    { key: "hearingModerateLoss", value: "moderate_loss" },
    { key: "hearingSevereLoss",   value: "severe_loss" },
    { key: "hearingDeaf",         value: "deaf" },
  ];

  ngOnInit(): void {
    const context = this._dialogConfig?.context ?? {};
    const existingItem = context.item ?? (this.item?.Id ? this.item : null);
    this.personId = context.personId ?? existingItem?.PersonId ?? this.personId;

    if (existingItem) {
      this.item = {
        ...existingItem,
        AssessmentDate: existingItem.AssessmentDate
          ? new Date(existingItem.AssessmentDate)
          : undefined,
      };
    } else {
      this.item = { Id: 0, PersonId: this.personId, AssessmentDate: new Date() };
    }
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public save(): void {
    if (!this.item.AssessmentDate) {
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
