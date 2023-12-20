import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { PackagesService } from "../../services/rest/packages.service";
import { ServicesService } from "../../services/rest/services.service";
import { NbTabComponent, NbWindowService, NbWindowState } from "@nebular/theme";
import { AddEditPackageComponent } from "../packages/add-edit-package/add-edit-package.component";
import { AddEditServiceComponent } from "../services/add-edit-service/add-edit-service.component";
import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import {
  CalculationService,
  ECalculationMeasureUnit,
  ICalculationResult,
} from "../../services/calculation.service";
import { MeasureUnitsService } from "../../services/rest/measure-units.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { DiscountsPickerComponent } from "../discounts/discounts-picker/discounts-picker.component";
import {
  IServicesManagement,
  ServicesManagementService,
} from "../../services/rest/services-management.service";
import { ToastrService } from "../../services/toastr.service";

@Component({
  selector: "sample-services-management",
  templateUrl: "./services-management.component.html",
  styleUrls: ["./services-management.component.scss"],
})
export class ServicesManagementComponent implements OnInit, OnDestroy {
  @Input() personId: number = 0;

  public getString = getString;
  public searchTermPackages: string = "";
  public searchTermServices: string = "";
  public packagesData: any[] = [];
  public servicesData: any[] = [];
  public offerDate: Date = new Date();
  public selectedPackages: any[] = [];
  public selectedServices: any[] = [];
  public calculationMeasureUnit: string = "month";
  public calculationMeasureUnits: any[] = [];
  public offerPrice: string = "0.00";
  public selectedDiscounts: any[] = [];
  public isChanged: boolean = false;

  private _subs: Subscription[] = [];
  private _gotPackages: boolean = false;
  private _gotServices: boolean = false;
  private _packagesOriginal: any[] = [];
  private _servicesOriginal: any[] = [];
  private _discountsOriginal: any[] = [];
  private _measureUnitId: number = 0;

  constructor(
    private _packagesService: PackagesService,
    private _servicesService: ServicesService,
    private _windowService: NbWindowService,
    private _calculationService: CalculationService,
    private _measureUnitsService: MeasureUnitsService,
    private _dialogService: DialogService,
    private _servicesManagementService: ServicesManagementService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMeasureUnits();
    if (this.personId > 0) this.getPackagesAndServicesForPerson();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public onTabChange(event: NbTabComponent): void {
    switch (parseInt(event.tabId)) {
      case 1:
        if (!this._gotPackages) this.getPackages();
        break;
      case 2:
        if (!this._gotServices) this.getServices();
        break;
    }
  }

  public calculateDaysBetweenDates(date: string): number {
    var date1 = new Date();
    var date2 = new Date(date);
    var diff = Math.abs(date1.getTime() - date2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    return diffDays;
  }

  public openPackageDetails(pac: any): void {
    this._subs.push(
      this._windowService
        .open(AddEditPackageComponent, {
          context: {
            isNew: false,
            package: JSON.parse(JSON.stringify(pac)),
            blockEdit: true,
          },
          buttons: {
            maximize: false,
            minimize: false,
            fullScreen: false,
            close: false,
          },
          initialState: NbWindowState.MAXIMIZED,
          hasBackdrop: true,
          windowClass: "package-popup-window",
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((data: boolean) => {
          if (data) this.getPackages();
        })
    );
  }

  public openServiceDetails(service: any): void {
    this._subs.push(
      this._windowService
        .open(AddEditServiceComponent, {
          context: {
            isNew: false,
            service: JSON.parse(JSON.stringify(service)),
            blockEdit: true,
          },
          buttons: {
            maximize: false,
            minimize: false,
            fullScreen: false,
            close: false,
          },
          initialState: NbWindowState.MAXIMIZED,
          hasBackdrop: true,
          windowClass: "service-popup-window",
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((data: boolean) => {
          if (data) this.getServices();
        })
    );
  }

  public onItemsDrop(event: CdkDragDrop<any[]>): void {
    if (Object.keys(event.item.data).includes("PackagePriceCalculated")) {
      var pack = this._packagesOriginal.find((x) => x.Id == event.item.data.Id);

      if (!pack) {
        this._subs.push(
          this._servicesService
            .getServicesForPackage(event.item.data.Id)
            .subscribe((data) => {
              var calculationResult: ICalculationResult =
                this._calculationService.calculatePackagePrice(
                  event.item.data,
                  data,
                  event.item.data.MeasureUnitCode
                );
              event.item.data.Price = calculationResult.price;
              event.item.data.PriceRounded = calculationResult.priceRounded;
              event.item.data.Services = calculationResult.services;
              this.calculateOfferPrice();
            })
        );

        event.item.data.Quantity = 1;
        event.item.data.IsNew = true;
        this._packagesOriginal.push(event.item.data);
      } else if (pack.IsDeleted) pack.IsDeleted = false;

      this.selectedPackages = this._packagesOriginal.filter(
        (x) => !x.IsDeleted
      );
      this.calculateOfferPrice();
    } else {
      if (!this.selectedServices.find((x) => x.Id == event.item.data.Id)) {
        event.item.data.Quantity = 1;
        if (event.item.data.DefaultNumberOfUnits)
          event.item.data.Quantity = event.item.data.DefaultNumberOfUnits;
        var calculation: ICalculationResult =
          this._calculationService.calculateServicePriceByMeasureUnit(
            event.item.data,
            this.calculationMeasureUnit as ECalculationMeasureUnit
          );
        event.item.data.PriceRounded = calculation.priceRounded;
        event.item.data.Price = calculation.price;
        event.item.data.IsNew = true;
        this._servicesOriginal.push(event.item.data);
        this.selectedServices = this._servicesOriginal.filter(
          (x) => !x.IsDeleted
        );
        this.calculateOfferPrice();
      }
    }

    this.detectChanges();
  }

  public checkCanDropInList(item: CdkDrag, dropList: CdkDropList): boolean {
    var canDrop: boolean = true;

    if (Object.keys(item.data).includes("PackagePriceCalculated")) {
      if (item.data.MeasureUnitCode != item.data.OfferMeasureUnit)
        canDrop = false;
    }

    return canDrop;
  }

  public onClearAllClick(): void {
    this._packagesOriginal.map((x) => (x.IsDeleted = true));
    this._servicesOriginal.map((x) => (x.IsDeleted = true));
    this.selectedPackages = [];
    this.selectedServices = [];
    this.selectedDiscounts = [];
    this.offerPrice = "0.00";
    this.packagesData.map(
      (x) => (x.OfferMeasureUnit = this.calculationMeasureUnit)
    );
    this.detectChanges();
  }

  public decreaseQuantityClick(item: any): void {
    if (item.Quantity > 1) item.Quantity -= 1;
    var calculation: ICalculationResult =
      this._calculationService.calculateServicePriceByMeasureUnit(
        item,
        this.calculationMeasureUnit as ECalculationMeasureUnit
      );
    item.PriceRounded = calculation.priceRounded;
    item.Price = calculation.price;
    if (!item.IsNew) item.IsChanged = true;

    this.calculateOfferPrice();
    this.detectChanges();
  }

  public increaseQuantityClick(item: any): void {
    item.Quantity += 1;
    var calculation: ICalculationResult =
      this._calculationService.calculateServicePriceByMeasureUnit(
        item,
        this.calculationMeasureUnit as ECalculationMeasureUnit
      );
    item.PriceRounded = calculation.priceRounded;
    item.Price = calculation.price;
    if (!item.IsNew) item.IsChanged = true;

    this.calculateOfferPrice();
    this.detectChanges();
  }

  public removePackageItem(pack: any): void {
    var item = this._packagesOriginal.find((x) => x.Id == pack.Id);
    if (pack.IsNew)
      this._packagesOriginal.splice(this._packagesOriginal.indexOf(item), 1);
    else item.IsDeleted = true;
    this.selectedPackages = this._packagesOriginal.filter((x) => !x.IsDeleted);

    this.calculateOfferPrice();
    this.detectChanges();
  }

  public removeServiceItem(pack: any): void {
    var item = this._servicesOriginal.find((x) => x.Id == pack.Id);
    if (pack.IsNew)
      this._servicesOriginal.splice(this._servicesOriginal.indexOf(item), 1);
    else item.IsDeleted = true;
    this.selectedServices = this._servicesOriginal.filter((x) => !x.IsDeleted);

    this.calculateOfferPrice();
    this.detectChanges();
  }

  private calculateOfferPrice(): void {
    this.offerPrice = this._calculationService.calculateOfferPrice(
      this.selectedPackages,
      this.selectedServices,
      this.selectedDiscounts
    ).priceRounded;
  }

  public onAddDiscountClick(): void {
    this._subs.push(
      this._dialogService
        .open(DiscountsPickerComponent, {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: {
            selectedDiscounts: JSON.parse(
              JSON.stringify(this.selectedDiscounts)
            ),
          },
        })
        .onClose.subscribe((result) => {
          if (result.saved) {
            this._discountsOriginal.map((x) => (x.IsDeleted = true));

            result.discounts.forEach((element) => {
              var item = this._discountsOriginal.find(
                (x) => x.Id == element.Id
              );
              if (item) item.IsDeleted = false;
              else {
                element.IsNew = true;
                this._discountsOriginal.push(element);
              }
            });

            this.selectedDiscounts = this._discountsOriginal.filter(
              (x) => !x.IsDeleted
            );
            this.calculateOfferPrice();
            this.detectChanges();
          }
        })
    );
  }

  public onDiscountRemoved(discount: any): void {
    var item = this._discountsOriginal.find((x) => x.Id == discount.Id);
    if (discount.IsNew)
      this._discountsOriginal.splice(this._discountsOriginal.indexOf(item), 1);
    else item.IsDeleted = true;
    this.selectedDiscounts = this._discountsOriginal.filter(
      (x) => !x.IsDeleted
    );

    this.calculateOfferPrice();
    this.detectChanges();
  }

  public async onSaveClick(): Promise<any> {
    // additional person check
    if (this.personId > 0) {
      const rez = await this._dialogService.openYesNoDialog(
        getString("areYouSure"),
        getString("wantToSaveOffer")
      );

      if (rez) {
        var model: IServicesManagement = {
          PersonId: this.personId,
          Services: this._servicesOriginal,
          Packages: this._packagesOriginal,
          Discounts: this._discountsOriginal,
          MeasureUnitId: this._measureUnitId,
        };

        this._subs.push(
          this._servicesManagementService.update(model).subscribe(() => {
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.getPackagesAndServicesForPerson();
          })
        );
      }
    }
  }

  private getPackages(): void {
    this._subs.push(
      this._packagesService.getData().subscribe((data) => {
        this.packagesData = data;
        this.packagesData.map(
          (x) => (x.OfferMeasureUnit = this.calculationMeasureUnit)
        );
        this._gotPackages = true;
      })
    );
  }

  private detectChanges(): void {
    if (this.personId > 0 && !this.isChanged) this.isChanged = true;
  }

  private getMeasureUnits(): void {
    this._subs.push(
      this._measureUnitsService
        .getCalculationMeasureUnits()
        .subscribe((data) => {
          this.calculationMeasureUnits = data;
        })
    );
  }

  private getServices(): void {
    this._subs.push(
      this._servicesService.getData().subscribe((data) => {
        this.servicesData = data;
        this._gotServices = true;
      })
    );
  }

  private getPackagesAndServicesForPerson(): void {
    this._subs.push(
      this._servicesManagementService
        .getPackagesAndServicesForPerson(this.personId)
        .subscribe((data) => {
          // select measure unit
          if (data.OfferMeasureUnit.length > 0) {
            this.calculationMeasureUnit =
              data.OfferMeasureUnit[0].MeasureUnitCode;
            this._measureUnitId = data.OfferMeasureUnit[0].MeasureUnitId;
          } else {
            var measureUnit = this.calculationMeasureUnits.find(
              (x) => x.Code == this.calculationMeasureUnit
            );
            if (measureUnit) this._measureUnitId = measureUnit.Id;
          }

          // format packages
          data.Packages.forEach((pack) => {
            var serv = data.PackagesServices.filter(
              (x) => x.PackageId == pack.Id
            );
            var calculationResult: ICalculationResult =
              this._calculationService.calculatePackagePrice(
                pack,
                serv,
                pack.MeasureUnitCode
              );
            pack.Price = calculationResult.price;
            pack.PriceRounded = calculationResult.priceRounded;
            pack.Services = calculationResult.services;
          });

          this.selectedPackages = data.Packages;
          this._packagesOriginal = this.selectedPackages;

          // format services
          data.Services.forEach((service) => {
            var calculation: ICalculationResult =
              this._calculationService.calculateServicePriceByMeasureUnit(
                service,
                this.calculationMeasureUnit as ECalculationMeasureUnit
              );
            service.PriceRounded = calculation.priceRounded;
            service.Price = calculation.price;
          });

          this.selectedServices = data.Services;
          this._servicesOriginal = this.selectedServices;
          this.selectedDiscounts = data.Discounts;
          this._discountsOriginal = this.selectedDiscounts;
          this.calculateOfferPrice();
        })
    );
  }

  public measureUnitSelectedChange(event: any): void {
    this.onClearAllClick();
    var measureUnit = this.calculationMeasureUnits.find((x) => x.Code == event);
    if (measureUnit) this._measureUnitId = measureUnit.Id;
  }
}
