import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from "@angular/core";
import {
  PersonAllergensService,
  IPersonAllergen,
} from "../../services/rest/person-allergens.service";
import {
  PersonMedicationsService,
  IPersonMedication,
} from "../../services/rest/person-medications.service";
import {
  PersonFunctionalStatusService,
  IPersonFunctionalStatus,
} from "../../services/rest/person-functional-status.service";
import {
  PersonDietaryRestrictionsService,
  IPersonDietaryRestriction,
} from "../../services/rest/person-dietary-restrictions.service";
import {
  PersonInsuranceService,
  IPersonInsuranceData,
} from "../../services/rest/person-insurance.service";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs/internal/Subscription";
import { AuthService, UserRole } from "../../services/auth.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { ToastrService } from "../../services/toastr.service";
import { NbTabComponent } from "@nebular/theme/components/tabset/tabset.component";
import { AddEditAllergenComponent } from "./add-edit-allergen/add-edit-allergen.component";
import { AddEditMedicationComponent } from "./add-edit-medication/add-edit-medication.component";
import { AddEditFunctionalStatusComponent } from "./add-edit-functional-status/add-edit-functional-status.component";

@Component({
  selector: "sample-medical-profile",
  templateUrl: "./medical-profile.component.html",
  styleUrls: ["./medical-profile.component.scss"],
})
export class MedicalProfileComponent implements OnInit, OnDestroy {
  @Input() personId: number = 0;

  constructor(
    private _personAllergensService: PersonAllergensService,
    private _personMedicationsService: PersonMedicationsService,
    private _personFunctionalStatusService: PersonFunctionalStatusService,
    private _personDietaryRestrictionsService: PersonDietaryRestrictionsService,
    private _personInsuranceService: PersonInsuranceService,
    private _toastrService: ToastrService,
    private _dialogService: DialogService,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.toggleMedicalView(this.medicalSections[0]);
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private _subs: Subscription[] = [];

  public getString = getString;
  public medicalAllergies: IPersonAllergen[] = [];
  public allergenSeverities: any[] = [];
  public medications: IPersonMedication[] = [];
  public functionalStatusHistory: IPersonFunctionalStatus[] = [];
  public dietaryRestrictions: IPersonDietaryRestriction[] = [];
  public insuranceRecords: IPersonInsuranceData[] = [];
  public dietaryTypes: any[] = [];
  public allergenForm: any = {};
  public medicationForm: any = {};
  public functionalStatusForm: any = {};
  public dietaryForm: any = {};
  public insuranceForm: any = {};
  public activeMedicalView: string = "allergies";
  public medicationView: 'cards' | 'schedule' = 'cards';

  public medicalSections: any[] = [
    { option: "allergies", string: "allergies", active: false },
    { option: "medications", string: "medications", active: false },
    { option: "functionalStatus", string: "functionalStatus", active: false },
    { option: "dietary", string: "dietaryRestrictions", active: false },
    { option: "insurance", string: "insuranceData", active: false },
  ];

  private getAllergens(): void {
    this._subs.push(
      this._personAllergensService.getAllergenSeverities().subscribe((data) => {
        this.allergenSeverities = data;
      }),
    );

    this._subs.push(
      this._personAllergensService
        .getDataForPerson(this.personId)
        .subscribe((data) => {
          this.medicalAllergies = data;
        }),
    );
  }

  private getMedications(): void {
    this._subs.push(
      this._personMedicationsService
        .getDataForPerson(this.personId)
        .subscribe((data) => {
          this.medications = data;
        }),
    );
  }

  private getFunctionalStatusHistory(): void {
    this._subs.push(
      this._personFunctionalStatusService
        .getDataForPerson(this.personId)
        .subscribe((data) => {
          this.functionalStatusHistory = data;
        }),
    );
  }

  private getDietaryRestrictions(): void {
    this._subs.push(
      this._personDietaryRestrictionsService
        .getDietaryTypes()
        .subscribe((data) => {
          this.dietaryTypes = data;
        }),
    );

    this._subs.push(
      this._personDietaryRestrictionsService
        .getDataForPerson(this.personId)
        .subscribe((data) => {
          this.dietaryRestrictions = data;
        }),
    );
  }

  private getInsuranceRecords(): void {
    this._subs.push(
      this._personInsuranceService
        .getDataForPerson(this.personId)
        .subscribe((data) => {
          this.insuranceRecords = data;
        }),
    );
  }

  private getPersonMedicalData(): void {
    switch (this.activeMedicalView) {
      case "allergies":
        this.getAllergens();
        break;
      case "medications":
        this.getMedications();
        break;
      case "functionalStatus":
        this.getFunctionalStatusHistory();
        break;
      case "dietary":
        this.getDietaryRestrictions();
        break;
      case "insurance":
        this.getInsuranceRecords();
        break;
    }
  }

  public onTabChange(tab: NbTabComponent): void {
    if (tab.tabId && tab.tabId !== this.activeMedicalView) {
      this.activeMedicalView = tab.tabId;
      this.getPersonMedicalData();
    }
  }

  public toggleMedicalView(section: any): void {
    this.medicalSections.find(
      (s) => s.option === this.activeMedicalView,
    )!.active = false;
    section.active = true;
    this.activeMedicalView = section.option;
    this.getPersonMedicalData();
  }

  public getDietaryTypeName(id: number): string {
    const found = this.dietaryTypes.find((t) => t.Id === id);
    return found ? found.Name : getString("dietaryRestrictions");
  }

  public getSeverityStatus(severity: string): string {
    if (!severity) return "basic";
    const lower = severity.toLowerCase();
    if (lower === "danger") return "danger";
    if (lower === "warning") return "warning";
    if (lower === "success") return "success";
    return "basic";
  }

  public checkUserCanEditMedical(): boolean {
    return (
      this._authService.checkUserHasRole(UserRole.ADMIN) ||
      this._authService.checkUserHasRole(UserRole.NURSE) ||
      this._authService.checkUserHasRole(UserRole.DOCTOR)
    );
  }

  //------------------------------------------ ALLERGENS CRUD --------------------------------------------------

  public openAllergyDialog(item?: IPersonAllergen): void {
    const dialogRef = this._dialogService.open(AddEditAllergenComponent, {
      autoFocus: false,
      context: {
        item: item ? { ...item } : undefined,
        personId: this.personId,
      },
    });
    dialogRef.onClose.subscribe((result: boolean) => {
      if (result) {
        this.getPersonMedicalData();
      }
    });
  }

  public saveAllergy(dialogRef: any): void {
    this.allergenForm.PersonId = this.personId;
    const obs = this.allergenForm.Id
      ? this._personAllergensService.update(this.allergenForm)
      : this._personAllergensService.add(this.allergenForm);
    this._subs.push(
      obs.subscribe(
        () => {
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            "",
          );
          this.getPersonMedicalData();
          dialogRef.close();
        },
        () =>
          this._toastrService.showToast("danger", getString("saveError"), ""),
      ),
    );
  }

  public async deleteAllergy(item: IPersonAllergen): Promise<void> {
    const res = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToDelete"),
    );
    if (res) {
      this._subs.push(
        this._personAllergensService.delete({ Id: item.Id }).subscribe(() => {
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            "",
          );
          this.getPersonMedicalData();
        }),
      );
    }
  }

  //------------------------------------------ MEDICATIONS CRUD --------------------------------------------------

  public openMedicationDialog(item?: IPersonMedication): void {
    const dialogRef = this._dialogService.open(AddEditMedicationComponent, {
      autoFocus: false,
      context: {
        item: item ? { ...item } : undefined,
        personId: this.personId,
      },
    });
    dialogRef.onClose.subscribe((result: boolean) => {
      if (result) {
        this.getPersonMedicalData();
      }
    });
  }

  public getMedsForTimeSlot(slot: string): IPersonMedication[] {
    switch (slot) {
      case 'morning': return this.medications.filter(m => m.MorningDose);
      case 'noon':    return this.medications.filter(m => m.NoonDose);
      case 'evening': return this.medications.filter(m => m.EveningDose);
      case 'night':   return this.medications.filter(m => m.NightDose);
      default:        return [];
    }
  }

  public getSlotDose(med: IPersonMedication, slot: string): string {
    switch (slot) {
      case 'morning': return med.MorningDose ?? '';
      case 'noon':    return med.NoonDose ?? '';
      case 'evening': return med.EveningDose ?? '';
      case 'night':   return med.NightDose ?? '';
      default:        return '';
    }
  }

  public getRouteLabel(value: string): string {
    const routeMap: Record<string, string> = {
      oral: "medicationRouteOral",
      iv: "medicationRouteIV",
      im: "medicationRouteIM",
      sc: "medicationRouteSC",
      topical: "medicationRouteTopical",
      sublingual: "medicationRouteSublingual",
      inhaled: "medicationRouteInhaled",
      transdermal: "medicationRouteTransdermal",
      rectal: "medicationRouteRectal",
      nasal: "medicationRouteNasal",
    };
    return routeMap[value] ? getString(routeMap[value]) : value;
  }

  public getFrequencyLabel(value: string): string {
    const freqMap: Record<string, string> = {
      once_daily: "medicationFreqOnce",
      twice_daily: "medicationFreqTwice",
      three_times_daily: "medicationFreqThrice",
      four_times_daily: "medicationFreqFour",
      every_6h: "medicationFreqEvery6h",
      every_8h: "medicationFreqEvery8h",
      every_12h: "medicationFreqEvery12h",
      weekly: "medicationFreqWeekly",
      as_needed: "medicationFreqAsNeeded",
    };
    return freqMap[value] ? getString(freqMap[value]) : value;
  }

  public async deleteMedication(item: IPersonMedication): Promise<void> {
    const res = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToDelete"),
    );
    if (res) {
      this._subs.push(
        this._personMedicationsService.delete({ Id: item.Id }).subscribe(() => {
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            "",
          );
          this.getPersonMedicalData();
        }),
      );
    }
  }

  //------------------------------------------ FUNCTIONAL STATUS CRUD --------------------------------------------------

  public openFunctionalStatusDialog(item?: IPersonFunctionalStatus): void {
    const dialogRef = this._dialogService.open(AddEditFunctionalStatusComponent, {
      autoFocus: false,
      context: {
        item: item ? { ...item } : undefined,
        personId: this.personId,
      },
    });
    dialogRef.onClose.subscribe((result: boolean) => {
      if (result) this.getPersonMedicalData();
    });
  }

  public getMobilityStatus(value: string): string {
    const map: Record<string, string> = {
      independent: "success", assistive_device: "info",
      requires_assistance: "warning", non_ambulatory: "danger",
    };
    return map[value] ?? "basic";
  }

  public getCognitiveStatus(value: string): string {
    const map: Record<string, string> = {
      intact: "success", mild_impairment: "info",
      moderate_impairment: "warning", severe_impairment: "danger", dementia: "danger",
    };
    return map[value] ?? "basic";
  }

  public getFallRiskStatus(value: string): string {
    const map: Record<string, string> = { low: "success", moderate: "warning", high: "danger" };
    return map[value] ?? "basic";
  }

  public getSensoryStatus(value: string): string {
    const map: Record<string, string> = {
      normal: "success", corrected: "info", mild_loss: "info",
      impaired: "warning", moderate_loss: "warning",
      severe_loss: "danger", blind: "danger", deaf: "danger",
    };
    return map[value] ?? "basic";
  }

  public getFunctionalStatusLabel(field: string, value: string): string {
    const maps: Record<string, Record<string, string>> = {
      mobility: {
        independent: "mobilityIndependent", assistive_device: "mobilityAssistiveDevice",
        requires_assistance: "mobilityRequiresAssistance", non_ambulatory: "mobilityNonAmbulatory",
      },
      cognitive: {
        intact: "cognitiveIntact", mild_impairment: "cognitiveMildImpairment",
        moderate_impairment: "cognitiveModerateImpairment", severe_impairment: "cognitiveSevereImpairment",
        dementia: "cognitiveDementia",
      },
      fallRisk: { low: "fallRiskLow", moderate: "fallRiskModerate", high: "fallRiskHigh" },
      visual: {
        normal: "visualNormal", corrected: "visualCorrected",
        impaired: "visualImpaired", blind: "visualBlind",
      },
      hearing: {
        normal: "hearingNormal", mild_loss: "hearingMildLoss",
        moderate_loss: "hearingModerateLoss", severe_loss: "hearingSevereLoss", deaf: "hearingDeaf",
      },
    };
    const key = maps[field]?.[value];
    return key ? getString(key) : value;
  }

  public async deleteFunctionalStatus(
    item: IPersonFunctionalStatus,
  ): Promise<void> {
    const res = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToDelete"),
    );
    if (res) {
      this._subs.push(
        this._personFunctionalStatusService
          .delete({ Id: item.Id })
          .subscribe(() => {
            this._toastrService.showToast(
              "success",
              getString("saveSuccess"),
              "",
            );
            this.getPersonMedicalData();
          }),
      );
    }
  }

  //------------------------------------------ DIETARY CRUD --------------------------------------------------

  public openDietaryDialog(
    ref: TemplateRef<any>,
    item?: IPersonDietaryRestriction,
  ): void {
    this.dietaryForm = item
      ? { ...item }
      : { PersonId: this.personId, DietaryTypeId: null };
    this._dialogService.open(ref, { autoFocus: false });
  }

  public saveDietary(dialogRef: any): void {
    this.dietaryForm.PersonId = this.personId;
    const obs = this.dietaryForm.Id
      ? this._personDietaryRestrictionsService.update(this.dietaryForm)
      : this._personDietaryRestrictionsService.add(this.dietaryForm);
    this._subs.push(
      obs.subscribe(
        () => {
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            "",
          );
          this.getPersonMedicalData();
          dialogRef.close();
        },
        () =>
          this._toastrService.showToast("danger", getString("saveError"), ""),
      ),
    );
  }

  public async deleteDietary(item: IPersonDietaryRestriction): Promise<void> {
    const res = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToDelete"),
    );
    if (res) {
      this._subs.push(
        this._personDietaryRestrictionsService
          .delete({ Id: item.Id })
          .subscribe(() => {
            this._toastrService.showToast(
              "success",
              getString("saveSuccess"),
              "",
            );
            this.getPersonMedicalData();
          }),
      );
    }
  }

  //------------------------------------------ INSURANCE CRUD --------------------------------------------------

  public openInsuranceDialog(
    ref: TemplateRef<any>,
    item?: IPersonInsuranceData,
  ): void {
    this.insuranceForm = item
      ? { ...item }
      : { PersonId: this.personId, Status: "Aktivno" };
    this._dialogService.open(ref, { autoFocus: false });
  }

  public saveInsurance(dialogRef: any): void {
    this.insuranceForm.PersonId = this.personId;
    const obs = this.insuranceForm.Id
      ? this._personInsuranceService.update(this.insuranceForm)
      : this._personInsuranceService.add(this.insuranceForm);
    this._subs.push(
      obs.subscribe(
        () => {
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            "",
          );
          this.getPersonMedicalData();
          dialogRef.close();
        },
        () =>
          this._toastrService.showToast("danger", getString("saveError"), ""),
      ),
    );
  }

  public async deleteInsurance(item: IPersonInsuranceData): Promise<void> {
    const res = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToDelete"),
    );
    if (res) {
      this._subs.push(
        this._personInsuranceService.delete({ Id: item.Id }).subscribe(() => {
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            "",
          );
          this.getPersonMedicalData();
        }),
      );
    }
  }
}
