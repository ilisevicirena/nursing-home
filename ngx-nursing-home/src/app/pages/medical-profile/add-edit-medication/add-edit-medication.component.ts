import { Component, Inject, OnDestroy, OnInit, Optional } from "@angular/core";
import { NbDialogRef, NB_DIALOG_CONFIG, NbDialogConfig } from "@nebular/theme";
import { Subject, Subscription, of } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import {
  IPersonMedication,
  PersonMedicationsService,
} from "../../../services/rest/person-medications.service";
import { IRxNormDrug, RxNormService } from "../../../services/rest/rxnorm.service";
import { getString } from "../../../resources/strings";
import { ToastrService } from "../../../services/toastr.service";

@Component({
    selector: "sample-add-edit-medication",
    templateUrl: "./add-edit-medication.component.html",
    styleUrls: ["./add-edit-medication.component.scss"],
    standalone: false
})
export class AddEditMedicationComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  private _searchSubject = new Subject<string>();

  constructor(
    private _ref: NbDialogRef<AddEditMedicationComponent>,
    @Optional() @Inject(NB_DIALOG_CONFIG)
    private _dialogConfig: NbDialogConfig<{ item?: IPersonMedication; personId?: number }>,
    private _personMedicationsService: PersonMedicationsService,
    private _rxNormService: RxNormService,
    private _toastrService: ToastrService,
  ) {}

  public item: IPersonMedication = {
    Id: 0,
    PersonId: 0,
    MedicationName: "",
    Status: "active",
  };
  public personId: number = 0;
  public getString = getString;

  public showSearch: boolean = false;
  public searchTerm: string = "";
  public rxNormResults: IRxNormDrug[] = [];
  public searching: boolean = false;

  public readonly routeOptions = [
    { key: "medicationRouteOral",        value: "oral" },
    { key: "medicationRouteIV",          value: "iv" },
    { key: "medicationRouteIM",          value: "im" },
    { key: "medicationRouteSC",          value: "sc" },
    { key: "medicationRouteTopical",     value: "topical" },
    { key: "medicationRouteSublingual",  value: "sublingual" },
    { key: "medicationRouteInhaled",     value: "inhaled" },
    { key: "medicationRouteTransdermal", value: "transdermal" },
    { key: "medicationRouteRectal",      value: "rectal" },
    { key: "medicationRouteNasal",       value: "nasal" },
  ];

  public readonly frequencyOptions = [
    { key: "medicationFreqOnce",   value: "once_daily" },
    { key: "medicationFreqTwice",  value: "twice_daily" },
    { key: "medicationFreqThrice", value: "three_times_daily" },
    { key: "medicationFreqFour",   value: "four_times_daily" },
    { key: "medicationFreqEvery6h",  value: "every_6h" },
    { key: "medicationFreqEvery8h",  value: "every_8h" },
    { key: "medicationFreqEvery12h", value: "every_12h" },
    { key: "medicationFreqWeekly",   value: "weekly" },
    { key: "medicationFreqAsNeeded", value: "as_needed" },
  ];

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
      this.item = {
        Id: 0,
        PersonId: this.personId,
        MedicationName: "",
        Status: "active",
        StartDate: new Date(),
      };
    }

    this._subs.push(
      this._searchSubject.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term) => {
          if (term.length < 3) {
            this.searching = false;
            return of([]);
          }
          this.searching = true;
          return this._rxNormService.search(term);
        }),
      ).subscribe({
        next: (results) => {
          this.rxNormResults = results;
          this.searching = false;
        },
        error: () => {
          this.rxNormResults = [];
          this.searching = false;
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.rxNormResults = [];
      this.searchTerm = "";
    }
  }

  public onSearchTermChange(term: string): void {
    this._searchSubject.next(term ?? "");
  }

  public selectDrug(drug: IRxNormDrug): void {
    this.item.MedicationName = drug.name;
    this.item.RxCui = drug.rxcui;
    this.showSearch = false;
    this.rxNormResults = [];
    this.searchTerm = "";
  }

  public onEndDateChange(value: any): void {
    if (!this.item) return;
    this.item.EndDate = value;
  }

  public hasSchedule(): boolean {
    return !!(
      this.item.MorningDose ||
      this.item.NoonDose ||
      this.item.EveningDose ||
      this.item.NightDose
    );
  }

  public save(): void {
    if (!this.item) return;
    this.item.PersonId = this.personId;

    if (!this.item.MedicationName?.trim()) {
      this._toastrService.showToast("danger", getString("saveError"), getString("required"));
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.item.Status =
      !this.item.EndDate || new Date(this.item.EndDate) >= today ? "active" : "inactive";

    const obs = this.item.Id
      ? this._personMedicationsService.update(this.item)
      : this._personMedicationsService.add(this.item);

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
