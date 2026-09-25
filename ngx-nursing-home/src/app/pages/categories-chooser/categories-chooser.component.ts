import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { HealthConditionsService } from "../../services/rest/health-conditions.service";
import { PersonCategoriesService } from "../../services/rest/person-categories.service";
import { AccommodationTypesService } from "../../services/rest/accommodation-types.service";
import { ToastrService } from "../../services/toastr.service";

@Component({
    selector: "sample-categories-chooser",
    templateUrl: "./categories-chooser.component.html",
    styleUrls: ["./categories-chooser.component.scss"],
    standalone: false
})
export class CategoriesChooserComponent implements OnInit, OnDestroy {
  public getString = getString;
  public healthConditions: any[] = [];
  public categories: any[] = [];
  public types: any[] = [];
  public selectedConditions: number[] = [];
  public selectedType: number;
  public selectedCategory: number;
  public categoryOtherId: number = 8;
  public showConditionDescription: boolean = false;
  public categoryOtherDescription: string;

  @Input() personId: number = 0;

  private _subs: Subscription[] = [];
  private _personConditions: any[] = [];

  constructor(
    private _healthConditionsService: HealthConditionsService,
    private _personCategoriesService: PersonCategoriesService,
    private _accommodationTypesService: AccommodationTypesService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getHealthConditions();
    this.getCategories();
    this.getTypes();

    if (this.personId > 0) {
      this.getConditionsForPerson();
      this.getCategoryForPerson();
      this.getAccommodationForPerson();
    }
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getHealthConditions(): void {
    this._subs.push(
      this._healthConditionsService.getData().subscribe((data) => {
        this.healthConditions = data;
      })
    );
  }

  private getConditionsForPerson(): void {
    this._subs.push(
      this._healthConditionsService
        .getForPerson(this.personId)
        .subscribe((data) => {
          this._personConditions = data;
          this.selectedConditions = data.map((x) => x.HealthConditionId);
          if (this.selectedConditions.includes(this.categoryOtherId)) {
            this.showConditionDescription = true;
            this.categoryOtherDescription = data.find(
              (x) => x.HealthConditionId == this.categoryOtherId
            )?.Description;
          }
        })
    );
  }

  private getCategoryForPerson(): void {
    this._subs.push(
      this._personCategoriesService
        .getForPerson(this.personId)
        .subscribe((data) => {
          if (data.length > 0) this.selectedCategory = data[0].PersonCategoryId;
        })
    );
  }

  private getAccommodationForPerson(): void {
    this._subs.push(
      this._accommodationTypesService
        .getForPerson(this.personId)
        .subscribe((data) => {
          if (data.length > 0) this.selectedType = data[0].AccommodationTypeId;
        })
    );
  }

  private getCategories(): void {
    this._subs.push(
      this._personCategoriesService.getData().subscribe((data) => {
        this.categories = data;
      })
    );
  }

  private getTypes(): void {
    this._subs.push(
      this._accommodationTypesService.getData().subscribe((data) => {
        this.types = data;
      })
    );
  }

  public onConditionCheckedChange(ev: any, condition: any): void {
    if (ev) this.selectedConditions.push(condition.Id);
    else
      this.selectedConditions.splice(
        this.selectedConditions.findIndex((x) => x == condition.Id),
        1
      );

    this.showConditionDescription = this.selectedConditions.includes(
      this.categoryOtherId
    );
  }

  public saveHealthConditions(): void {
    var forDelete = this._personConditions.filter(
      (x) => !this.selectedConditions.includes(x.HealthConditionId)
    );

    if (forDelete.length > 0) {
      forDelete.forEach((element) => {
        this._subs.push(
          this._healthConditionsService.delete({ Id: element.Id }).subscribe()
        );
      });
    }

    this.selectedConditions.forEach((element, index) => {
      this._subs.push(
        this._healthConditionsService
          .insertForPerson(
            this.personId,
            element,
            element == this.categoryOtherId ? this.categoryOtherDescription : ""
          )
          .subscribe(() => {
            if (index == this.selectedConditions.length - 1) {
              this.getConditionsForPerson();
              this._toastrService.showToast(
                "success",
                getString("saveSuccess")
              );
            }
          })
      );
    });
  }

  public saveCategory(): void {
    this._subs.push(
      this._personCategoriesService
        .insertForPerson(this.personId, this.selectedCategory)
        .subscribe(() => {
          this.getCategoryForPerson();
          this._toastrService.showToast("success", getString("saveSuccess"));
        })
    );
  }

  public saveAccommodationType(): void {
    this._subs.push(
      this._accommodationTypesService
        .insertForPerson(this.personId, this.selectedType)
        .subscribe(() => {
          this.getAccommodationForPerson();
          this._toastrService.showToast("success", getString("saveSuccess"));
        })
    );
  }
}
