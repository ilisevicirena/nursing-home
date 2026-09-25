import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NbWindowRef } from "@nebular/theme";
import {
  IPackage,
  PackagesService,
} from "../../../services/rest/packages.service";
import { ToastrService } from "../../../services/toastr.service";
import { ServicesService } from "../../../services/rest/services.service";
import { MeasureUnitsService } from "../../../services/rest/measure-units.service";
import { PriceUnitsService } from "../../../services/rest/price-units.service";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { NgForm } from "@angular/forms";
import { GridColumn, GridLookupColumn } from "shared-components";
import { SelectGridSelectionModel } from "shared-components/lib/models/select-grid.model";
import {
  CalculationService,
  ICalculationMeasureUnit,
} from "../../../services/calculation.service";

@Component({
    selector: "sample-add-edit-package",
    templateUrl: "./add-edit-package.component.html",
    styleUrls: ["./add-edit-package.component.scss"],
    standalone: false
})
export class AddEditPackageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private _subs: Subscription[] = [];
  private _packageServiceUnfiltered: any[] = [];

  public getString = getString;
  public isNew: boolean = true;
  public packageServices: any[] = [];
  public selectedService: any = { Quantity: 0 };
  public priceUnits: any[] = [];
  public servicesData: any[] = [];
  public calculationMeasureUnits: any[] = [];
  public blockEdit: boolean = false;
  public packagePrice: string = "0.00";
  public gridSelectedItem: [] = [];
  public package: IPackage = {
    Id: 0,
    Name: undefined,
    DefaultPackagePrice: undefined,
    DefaultPackagePriceUnitId: undefined,
    Description: undefined,
    PackagePriceCalculated: true,
    PriceUnitName: undefined,
    PriceUnitTag: undefined,
  };
  public servicesColumns: GridColumn[] = [
    new GridColumn()
      .Title(getString("name"))
      .DataField("ServiceName")
      .Filter(false),
    new GridColumn()
      .Title(getString("quantity"))
      .DataField("Quantity")
      .Filter(false),
    new GridColumn()
      .Title(getString("costPerUnit"))
      .DataField("CostPerUnit")
      .Filter(false),
    new GridColumn()
      .Title(getString("measureUnit"))
      .DataField("MeasureUnitId")
      .Type(new GridLookupColumn().LookupColumn("MeasureUnitName"))
      .Filter(false),
  ];
  public packageServiceSelectGridColumns: GridColumn[] = [
    new GridColumn().Title(getString("name")).DataField("Name"),
    new GridColumn()
      .Title(getString("measureUnit"))
      .DataField("MeasureUnitTag"),
    new GridColumn().Title(getString("costPerUnit")).DataField("CostPerUnit"),
    new GridColumn()
      .Title(getString("defaultNumberOfUnits"))
      .DataField("DefaultNumberOfUnits"),
  ];

  @ViewChild("headerTemplate") headerTemplate!: TemplateRef<any>;

  constructor(
    private _ref: NbWindowRef,
    private _packagesService: PackagesService,
    private _toastrService: ToastrService,
    private _servicesService: ServicesService,
    private _measureUnitService: MeasureUnitsService,
    private _priceUnitsService: PriceUnitsService,
    private _calculationService: CalculationService
  ) {}

  ngOnInit(): void {
    this.getPriceUnits();
    this.getServices();
    this.getServicesForPackage();
    this.getCalculationMeasureUnits();
  }

  ngOnDestroy(): void {
    var windows = document.getElementsByClassName("package-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.remove("h-100");
      window.parentElement.classList.remove("w-100");
      window.parentElement.parentElement.classList.remove("h-100");
      const cdkOverlayContainer =
        window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0)
        cdkOverlayContainer.children[0].classList.remove("d-block");
    }

    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    var windows = document.getElementsByClassName("package-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.add("h-100");
      window.parentElement.classList.add("w-100");
      window.parentElement.parentElement.classList.add("h-100");
      window.parentElement.parentElement.style.width = "90%";
      const cdkOverlayContainer =
        window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0)
        cdkOverlayContainer.children[0].classList.add("d-block");
    }

    this._ref.config.titleTemplate = this.headerTemplate;
  }

  private getPriceUnits(): void {
    this._subs.push(
      this._priceUnitsService.getData().subscribe(
        (data) => {
          this.priceUnits = data;
          /*
          if (data.length == 1)
            this.package.DefaultPackagePriceUnitId = data[0].Id;*/
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  private getCalculationMeasureUnits(): void {
    this._subs.push(
      this._measureUnitService.getCalculationMeasureUnits().subscribe(
        (data) => {
          this.calculationMeasureUnits = data;
          /*
          var monthUnit = this.calculationMeasureUnits.find(
            (x) => x.Code == "month"
          );
          if (monthUnit) this.package.CalculationMeasureUnitId = monthUnit.Id;*/
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  private getServices(): void {
    this._subs.push(
      this._servicesService.getData().subscribe(
        (data) => {
          this.servicesData = data;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  private getServicesForPackage(): void {
    if (!this.isNew) {
      this._subs.push(
        this._servicesService.getServicesForPackage(this.package.Id).subscribe(
          (data) => {
            this.packageServices = data;
            this._packageServiceUnfiltered = data;
            this.calculatePackagePrice();
          },
          (err) => {
            console.error(err);
          }
        )
      );
    }
  }

  public calculatePackagePrice(): void {
    this.packagePrice = this._calculationService.calculatePackagePrice(
      this.package,
      this.packageServices,
      this.package.MeasureUnitCode as ICalculationMeasureUnit
    ).priceRounded;
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public onSaveClick(form: NgForm): void {
    if (this.isNew) this.saveNewPackage(this.package);
    else this.editPackage(this.package);
    form.form.markAsPristine();
  }

  private saveNewPackage(data: any): void {
    data.Services = this._packageServiceUnfiltered;
    this._subs.push(
      this._packagesService.add(data).subscribe(
        (data) => {
          if (data.PackageId) {
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.close(true);
          }
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  private editPackage(data: any): void {
    data.Services = this._packageServiceUnfiltered;
    this._subs.push(
      this._packagesService.update(data).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.close(true);
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  public onServiceSelectionChanged(event: SelectGridSelectionModel): void {
    if (event.selectedItems.length > 0) {
      this.selectedService = event.selectedItems[0];
      if (this.selectedService.DefaultNumberOfUnits > 0)
        this.selectedService.Quantity =
          this.selectedService.DefaultNumberOfUnits;
      else this.selectedService.Quantity = 1;
      this.selectedService.ServiceName = this.selectedService.Name;
      this.selectedService.ServiceId = this.selectedService.Id;
      this.selectedService.ServiceDescription =
        this.selectedService.Description;
    }
  }

  public addService(): void {
    if (
      !this.packageServices.find(
        (x) => x.ServiceId == this.selectedService.ServiceId
      )
    ) {
      this.selectedService.IsNew = true;
      this._packageServiceUnfiltered.push(this.selectedService);
      this.packageServices = this._packageServiceUnfiltered.filter(
        (x) => !x.IsDeleted
      );
      this.gridSelectedItem = [];
      this.selectedService = { Quantity: 0 };
    } else this._toastrService.showToast("warning", getString("alreadyAdded"));

    this.calculatePackagePrice();
  }

  public onServiceDeleteConfirm(event: any): void {
    var item = this._packageServiceUnfiltered.find(
      (x) => x.ServiceId == event.data.ServiceId
    );
    if (event.data.IsNew)
      this._packageServiceUnfiltered.splice(
        this._packageServiceUnfiltered.indexOf(item),
        1
      );
    else item.IsDeleted = true;
    this.packageServices = this._packageServiceUnfiltered.filter(
      (x) => !x.IsDeleted
    );
    this.calculatePackagePrice();
  }

  public getPriceTag(): string {
    var tag = "";
    if (this.package.DefaultPackagePriceUnitId)
      tag = this.priceUnits.find(
        (x) => x.Id == this.package.DefaultPackagePriceUnitId
      )?.Tag;
    return tag;
  }

  public onPackageMeasureUnitSelectedChange(event: any) {
    this.package.MeasureUnitCode = this.calculationMeasureUnits.find(
      (x) => x.Id == event
    )?.Code;
    this.calculatePackagePrice();
  }

  public onPriceChange(): void {
    this.package.DefaultPackagePrice =
      this._calculationService.roundToTwoDecimals(
        this.package.DefaultPackagePrice
      ) as any;
  }
}
