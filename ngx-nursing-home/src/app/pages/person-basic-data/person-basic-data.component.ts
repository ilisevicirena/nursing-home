import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { IPerson } from "../../services/rest/persons.service";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { CitiesService } from "../../services/rest/cities.service";
import { CountriesService } from "../../services/rest/countries.service";
import { GendersService } from "../../services/rest/genders.service";
import { MunicipalitiesService } from "../../services/rest/municipalities.service";
import { AutocompleteSelectionModel } from "shared-components";

@Component({
    selector: "sample-person-basic-data",
    templateUrl: "./person-basic-data.component.html",
    styleUrls: ["./person-basic-data.component.scss"],
    standalone: false
})
export class PersonBasicDataComponent implements OnInit, OnDestroy {
  constructor(
    private _gendersService: GendersService,
    private _citiesService: CitiesService,
    private _countriesService: CountriesService,
    private _municipalitiesService: MunicipalitiesService
  ) {}

  private _subs: Subscription[] = [];
  private _personData: IPerson;

  @Output()
  newPersonDataChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  get newPersonData(): IPerson {
    return this._personData;
  }

  set newPersonData(val: IPerson) {
    this._personData = val;
    this.newPersonDataChange.emit(this._personData);
    if (this.newPersonData.BirthCountryId > 0)
      this.selectedCountryKeys = [this.newPersonData.BirthCountryId];
    if (this.newPersonData.BirthCityId > 0)
      this.selectedCityKeys = [this.newPersonData.BirthCityId];
    if (this.newPersonData.BirthMunicipalityId > 0)
      this.selectedMunicipalityKeys = [this.newPersonData.BirthMunicipalityId];
    if (this.newPersonData.ResidanceCityId > 0)
      this.selectedResidanceKeys = [this.newPersonData.ResidanceCityId];
  }

  @Input() formModeAddNew: boolean = false;

  public getString = getString;
  public genders: any[] = [];
  public countries: any[] = [];
  public municipalities: any[] = [];
  public cities: any[] = [];
  public selectedCountryKeys = [];
  public selectedMunicipalityKeys = [];
  public selectedCityKeys = [];
  public selectedResidanceKeys = [];

  ngOnInit(): void {
    this.getGenders();
    this.getCountries();
    this.getMunicipalities();
    this.getCities();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }
  private getGenders(): void {
    this._subs.push(
      this._gendersService.getData().subscribe((data) => {
        this.genders = data;
      })
    );
  }
  private getCountries(): void {
    this._countriesService.get().then((data) => {
      this.countries = data;
    });
  }

  private getMunicipalities(): void {
    this._municipalitiesService.get().then((data) => {
      this.municipalities = data;
    });
  }

  private getCities(): void {
    this._citiesService.get().then((data) => {
      this.cities = data;
    });
  }

  public countriesOnSelectionChanged(e: AutocompleteSelectionModel): void {
    this.newPersonData.BirthCountryId = e.selectedItemKey;
  }

  public municipalitiesOnSelectionChanged(e: AutocompleteSelectionModel): void {
    this.newPersonData.BirthMunicipalityId = e.selectedItemKey;
  }

  public citiesOnSelectionChanged(e: AutocompleteSelectionModel): void {
    this.newPersonData.BirthCityId = e.selectedItemKey;
  }

  public residanceOnSelectionChanged(e: AutocompleteSelectionModel): void {
    this.newPersonData.ResidanceCityId = e.selectedItemKey;
  }

  public onKeyPress(event: any): boolean | null {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  public getNewPersonData(): IPerson {
    return this.newPersonData;
  }
}
