import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { GendersService } from "../../services/rest/genders.service";
import { CitiesService } from "../../services/rest/cities.service";
import { CountriesService } from "../../services/rest/countries.service";
import { MunicipalitiesService } from "../../services/rest/municipalities.service";
import { IEmployee } from "../../services/rest/employees.service";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { AutocompleteSelectionModel } from "shared-components";
import { QualificationsService } from "../../services/rest/qualifications.service";
import { JobPositionsService } from "../../services/rest/job-positions.service";
import { EmploymentTypesService } from "../../services/rest/employment-types.service";

@Component({
  selector: "sample-employee-basic-data",
  templateUrl: "./employee-basic-data.component.html",
  styleUrls: ["./employee-basic-data.component.scss"],
})
export class EmployeeBasicDataComponent implements OnInit, OnDestroy {
  constructor(
    private gendersService: GendersService,
    private citiesService: CitiesService,
    private countriesService: CountriesService,
    private municipalitiesService: MunicipalitiesService,
    private qualificationsService: QualificationsService,
    private jobPostionsService: JobPositionsService,
    private employmentTypesService: EmploymentTypesService
  ) {}

  modelValue: IEmployee;

  @Output()
  employeeDataChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  get employeeData(): IEmployee {
    return this.modelValue;
  }

  set employeeData(val: IEmployee) {
    this.modelValue = val;

    this.getCountries();
    this.getMunicipalities();
    this.getCities();

    this.employeeDataChange.emit(this.modelValue);
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
  public qualifications: any[] = [];
  public jobPositons: any[] = [];
  public employmentTypes: any[] = [];

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getGenders();
    this.getCountries();
    this.getMunicipalities();
    this.getCities();
    this.getQualifications();
    this.getJobPositions();
    this.getEmploymentTypes();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }
  private getGenders(): void {
    this.subscriptions.push(
      this.gendersService.getData().subscribe((data) => {
        this.genders = data;
      })
    );
  }

  private getQualifications(): void {
    this.subscriptions.push(
      this.qualificationsService.getData().subscribe((data) => {
        this.qualifications = data;
      })
    );
  }

  private getJobPositions(): void {
    this.subscriptions.push(
      this.jobPostionsService.getData().subscribe((data) => {
        this.jobPositons = data;
      })
    );
  }

  private getEmploymentTypes(): void {
    this.subscriptions.push(
      this.employmentTypesService.getData().subscribe((data) => {
        this.employmentTypes = data;
      })
    );
  }

  private getCountries(): void {
    this.countriesService.get().then((data) => {
      this.countries = data;
      if (this.employeeData.BirthCountryId > 0)
        this.selectedCountryKeys = [this.employeeData.BirthCountryId];
    });
  }

  private getMunicipalities(): void {
    this.municipalitiesService.get().then((data) => {
      this.municipalities = data;
      if (this.employeeData.BirthMunicipalityId > 0)
        this.selectedMunicipalityKeys = [this.employeeData.BirthMunicipalityId];
    });
  }

  private getCities(): void {
    this.citiesService.get().then((data) => {
      this.cities = data;
      if (this.employeeData.ResidanceCityId > 0)
        this.selectedResidanceKeys = [this.employeeData.ResidanceCityId];
      if (this.employeeData.BirthCityId > 0)
        this.selectedCityKeys = [this.employeeData.BirthCityId];
    });
  }

  public countriesOnSelectionChanged(e: AutocompleteSelectionModel) {
    this.employeeData.BirthCountryId = e.selectedItemKey;
  }

  public municipalitiesOnSelectionChanged(e: AutocompleteSelectionModel) {
    this.employeeData.BirthMunicipalityId = e.selectedItemKey;
  }

  public citiesOnSelectionChanged(e: AutocompleteSelectionModel) {
    console.log(e);
    this.employeeData.BirthCityId = e.selectedItemKey;
  }

  public residanceOnSelectionChanged(e: AutocompleteSelectionModel) {
    this.employeeData.ResidanceCityId = e.selectedItemKey;
  }

  public onKeyPress(event: any): boolean | null {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }
}
