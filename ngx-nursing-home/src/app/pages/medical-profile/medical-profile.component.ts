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

  public medicalSections: any[] = [
    { option: "allergies", string: "allergies", active: false },
    { option: "medications", string: "medications", active: false },
    { option: "functionalStatus", string: "functionalStatus", active: false },
    { option: "dietary", string: "dietaryRestrictions", active: false },
    { option: "insurance", string: "insuranceData", active: false },
  ];

  private getAllergens(): void {
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
    console.log(tab);
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
    if (
      lower.includes("teška") ||
      lower.includes("severe") ||
      lower.includes("high")
    )
      return "danger";
    if (lower.includes("umjeren") || lower.includes("moderate"))
      return "warning";
    return "info";
  }

  public checkUserCanEditMedical(): boolean {
    return (
      this._authService.checkUserHasRole(UserRole.ADMIN) ||
      this._authService.checkUserHasRole(UserRole.NURSE) ||
      this._authService.checkUserHasRole(UserRole.DOCTOR)
    );
  }

  //------------------------------------------ ALLERGENS CRUD --------------------------------------------------

  public openAllergyDialog(
    ref: TemplateRef<any>,
    item?: IPersonAllergen,
  ): void {
    this.allergenForm = item
      ? { ...item }
      : {
          PersonId: this.personId,
          AllergenName: "",
          Severity: "",
          ReactionDescription: "",
        };
    this._dialogService.open(ref, { autoFocus: false });
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

  public openMedicationDialog(
    ref: TemplateRef<any>,
    item?: IPersonMedication,
  ): void {
    this.medicationForm = item
      ? { ...item }
      : { PersonId: this.personId, MedicationName: "", Status: "Aktivno" };
    this._dialogService.open(ref, { autoFocus: false });
  }

  public saveMedication(dialogRef: any): void {
    this.medicationForm.PersonId = this.personId;
    const obs = this.medicationForm.Id
      ? this._personMedicationsService.update(this.medicationForm)
      : this._personMedicationsService.add(this.medicationForm);
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

  public openFunctionalStatusDialog(
    ref: TemplateRef<any>,
    item?: IPersonFunctionalStatus,
  ): void {
    this.functionalStatusForm = item
      ? { ...item }
      : { PersonId: this.personId, AssessmentDate: new Date() };
    this._dialogService.open(ref, { autoFocus: false });
  }

  public saveFunctionalStatus(dialogRef: any): void {
    this.functionalStatusForm.PersonId = this.personId;
    const obs = this.functionalStatusForm.Id
      ? this._personFunctionalStatusService.update(this.functionalStatusForm)
      : this._personFunctionalStatusService.add(this.functionalStatusForm);
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
