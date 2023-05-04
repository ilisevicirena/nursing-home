import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServicesService } from '../../services/rest/services.service';
import { getString } from '../../resources/strings';
import { LookupType, SelectFilter, SmartTableColumn } from 'shared-components';
import { MeasureUnitsService } from '../../services/rest/measure-units.service';
import { PriceUnitsService } from '../../services/rest/price-units.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastrService } from '../../services/toastr.service';
import { AddEditServiceComponent } from './add-edit-service/add-edit-service.component';

@Component({
  selector: 'sample-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {

  public servicesData: any[] = [];
  public getString = getString;
  public servicesColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString('id')).Property("Id"),
    new SmartTableColumn(getString('name')).Property("Name"),
    new SmartTableColumn(getString('description')).Property("Description"),
    new SmartTableColumn(getString('costPerUnit')).Property("CostPerUnit"),
    new SmartTableColumn(getString('measureUnit')).Property("MeasureUnitId").SpecialType(new LookupType().NameAttribute("MeasureUnitName"))
      .SpecialFilter(new SelectFilter("Id", "Tag").ServerSource(true).ServerEndpoint(this.measureUnitsService.apiRoute)),
    new SmartTableColumn(getString('priceUnit')).Property("PriceUnitId").SpecialType(new LookupType().NameAttribute("PriceUnitTag"))
      .SpecialFilter(new SelectFilter("Id", "Tag").ServerSource(true).ServerEndpoint(this.priceUnitsService.apiRoute)),
  ];

  private subscriptions: Subscription[] = [];

  constructor(
    private servicesService: ServicesService,
    private measureUnitsService: MeasureUnitsService,
    private priceUnitsService: PriceUnitsService,
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  private getServices(): void {
    this.subscriptions.push(this.servicesService.getData().subscribe(data => {
      this.servicesData = data;
    }, err => {
      console.error(err);
    }));
  }

  public onCreateStarted(): void {
    this.subscriptions.push(
      this.dialogService.open(
        AddEditServiceComponent,
        {
          context: {
            isNew: true
          },
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false
        }
      )
        .onClose.subscribe((data: boolean) => {
          if (data) this.getServices();
        }));
  }

  public onEditStarted(event: any): void {
    this.subscriptions.push(
      this.dialogService.open(
        AddEditServiceComponent,
        {
          context: {
            isNew: false,
            service: JSON.parse(JSON.stringify(event.data))
          },
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false
        }
      )
        .onClose.subscribe((data: boolean) => {
          if (data) this.getServices();
        }));
  }

  public async onDeleteStarted(event: any): Promise<void> {
    const result = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString("deactivateService"));
    if (result) {
      this.subscriptions.push(this.servicesService.delete(event.data).subscribe(() => {
        this.toastrService.showToast('success', getString('saveSuccess'), '');
        this.getServices();
      }, err => {
        console.error(err);
      }));
    }
  }
}
