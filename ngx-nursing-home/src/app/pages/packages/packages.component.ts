import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PackagesService } from '../../services/rest/packages.service';
import { PriceUnitsService } from '../../services/rest/price-units.service';
import { ToastrService } from '../../services/toastr.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { CheckboxType, LookupType, SmartTableColumn, getString } from 'shared-components';
import { AddEditPackageComponent } from './add-edit-package/add-edit-package.component';

@Component({
  selector: 'sample-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public packagesData: any[] = [];
  public packagesColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString('id')).Property('Id'),
    new SmartTableColumn(getString('name')).Property('Name'),
    new SmartTableColumn(getString('description')).Property('Description'),
    new SmartTableColumn(getString('defaultPrice')).Property('DefaultPackagePrice'),
    new SmartTableColumn(getString('priceUnit')).Property('DefaultPackagePriceUnitId').SpecialType(new LookupType().NameAttribute('PriceUnitTag')),
    new SmartTableColumn(getString('packagePriceCalculated')).Property('PackagePriceCalculated').SpecialType(new CheckboxType())
  ];
  public getString = getString;

  constructor(
    private packagesService: PackagesService,
    private priceUnitsService: PriceUnitsService,
    private toastrService: ToastrService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getPackages();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getPackages(): void {
    this.subs.push(this.packagesService.getData().subscribe(data => {
      console.log(data);
      this.packagesData = data;
    }));
  }

  public onCreateStarted(): void {
    this.subs.push(this.dialogService.open(
      AddEditPackageComponent,
      {
        context: {
          isNew: true
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
        autoFocus: false
      }
    ).onClose.subscribe((data: boolean) => {
      if (data) this.getPackages();
    }));
  }

  public onEditStarted(event: any): void {
    this.subs.push(this.dialogService.open(
      AddEditPackageComponent,
      {
        context: {
          isNew: false,
          package: JSON.parse(JSON.stringify(event.data))
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
        autoFocus: false
      }
    ).onClose.subscribe((data: boolean) => {
      if (data) this.getPackages();
    }));
  }

  public async onDeleteStarted(event: any): Promise<void> {
    const result = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('deactivatePackage'));
    if (result) {
      this.subs.push(this.packagesService.delete(event.data).subscribe(() => {
        this.toastrService.showToast('success', getString('saveSuccess'));
        this.getPackages();
      }, err => {
        console.error(err);
      }));
    }
  }
}
