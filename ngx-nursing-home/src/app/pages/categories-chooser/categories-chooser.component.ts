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

  private subs: Subscription[] = [];
  private personConditions: any[] = [];

  constructor(
    private healthConditionsService: HealthConditionsService,
    private personCategoriesService: PersonCategoriesService,
    private accommodationTypesService: AccommodationTypesService,
    private toastrService: ToastrService
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
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getHealthConditions() {
    this.subs.push(
      this.healthConditionsService.getData().subscribe((data) => {
        this.healthConditions = data;
      })
    );
  }

  private getConditionsForPerson() {
    this.subs.push(
      this.healthConditionsService
        .getForPerson(this.personId)
        .subscribe((data) => {
          this.personConditions = data;
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

  private getCategoryForPerson() {
    this.subs.push(
      this.personCategoriesService
        .getForPerson(this.personId)
        .subscribe((data) => {
          if (data.length > 0) this.selectedCategory = data[0].PersonCategoryId;
        })
    );
  }

  private getAccommodationForPerson() {
    this.subs.push(
      this.accommodationTypesService
        .getForPerson(this.personId)
        .subscribe((data) => {
          if (data.length > 0) this.selectedType = data[0].AccommodationTypeId;
        })
    );
  }

  private getCategories() {
    this.subs.push(
      this.personCategoriesService.getData().subscribe((data) => {
        this.categories = data;
      })
    );
  }

  private getTypes() {
    this.subs.push(
      this.accommodationTypesService.getData().subscribe((data) => {
        this.types = data;
      })
    );
  }

  public onConditionCheckedChange(ev, condition) {
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

  public saveHealthConditions() {
    var forDelete = this.personConditions.filter(
      (x) => !this.selectedConditions.includes(x.HealthConditionId)
    );

    if (forDelete.length > 0) {
      forDelete.forEach((element) => {
        this.subs.push(
          this.healthConditionsService.delete({ Id: element.Id }).subscribe()
        );
      });
    }

    this.selectedConditions.forEach((element, index) => {
      this.subs.push(
        this.healthConditionsService
          .insertForPerson(
            this.personId,
            element,
            element == this.categoryOtherId ? this.categoryOtherDescription : ""
          )
          .subscribe(() => {
            if (index == this.selectedConditions.length - 1) {
              this.getConditionsForPerson();
              this.toastrService.showToast("success", getString("saveSuccess"));
            }
          })
      );
    });
  }

  public saveCategory() {
    this.subs.push(
      this.personCategoriesService
        .insertForPerson(this.personId, this.selectedCategory)
        .subscribe(() => {
          this.getCategoryForPerson();
          this.toastrService.showToast("success", getString("saveSuccess"));
        })
    );
  }

  public saveAccommodationType() {
    this.subs.push(
      this.accommodationTypesService
        .insertForPerson(this.personId, this.selectedType)
        .subscribe(() => {
          this.getAccommodationForPerson();
          this.toastrService.showToast("success", getString("saveSuccess"));
        })
    );
  }
}
