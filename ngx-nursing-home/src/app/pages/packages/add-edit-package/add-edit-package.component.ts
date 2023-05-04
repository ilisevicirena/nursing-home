import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { IPackage, PackagesService } from '../../../services/rest/packages.service';
import { ToastrService } from '../../../services/toastr.service';
import { ServicesService } from '../../../services/rest/services.service';
import { MeasureUnitsService } from '../../../services/rest/measure-units.service';
import { PriceUnitsService } from '../../../services/rest/price-units.service';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { NgForm } from '@angular/forms';
import { error } from 'console';
import { getSidebarResponsiveState$ } from '@nebular/theme/components/sidebar/sidebar.service';

@Component({
  selector: 'sample-add-edit-package',
  templateUrl: './add-edit-package.component.html',
  styleUrls: ['./add-edit-package.component.scss']
})
export class AddEditPackageComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public getString = getString;
  public isNew: boolean = true;
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
  public priceUnits: any[] = [];
  public servicesData: any[] = [];
  public packageServices: any[] = [];

  constructor(
    private ref: NbDialogRef<AddEditPackageComponent>,
    private packagesService: PackagesService,
    private toastrService: ToastrService,
    private servicesService: ServicesService,
    private measureUnitService: MeasureUnitsService,
    private priceUnitsService: PriceUnitsService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getPriceUnits();
    this.getServices();
    this.getServicesForPackage();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getPriceUnits(): void {
    this.subs.push(this.priceUnitsService.getData().subscribe(data => {
      this.priceUnits = data;
    }, err => {
      console.error(err);
    }));
  }

  private getServices(): void {
    this.subs.push(this.servicesService.getData().subscribe(data => {
      this.servicesData = data;
    }, err => {
      console.error(err);
    }));
  }

  private getServicesForPackage(): void {
    if (!this.isNew) {
      this.subs.push(this.servicesService.getServicesForPackage(this.package.Id).subscribe(data => {
        this.packageServices = data;
      }, err => {
        console.error(err);
      }));
    }
  }

  public close(result: boolean): void {
    this.ref.close(result);
  }

  public onSaveClick(form: NgForm): void {
    if (this.isNew) this.saveNewPackage(this.package);
    else this.editPackage(this.package);
    form.form.markAsPristine();
  }

  private saveNewPackage(data: any): void {
    this.subs.push(this.packagesService.add(data).subscribe(data => {
      if (data.PackageId) {
        this.toastrService.showToast('success', getString('saveSuccess'));
        this.close(true);
      }
    }, err => {
      console.error(err);
    }));
  }

  private editPackage(data: any): void {
    this.subs.push(this.packagesService.update(data).subscribe(() => {
      this.toastrService.showToast('success', getString('saveSuccess'));
      this.close(true);
    }, err => {
      console.error(err);
    }));
  }
}
