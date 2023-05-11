import { Component, OnDestroy, OnInit } from '@angular/core';
import { getString } from '../../resources/strings';
import { Subscription } from 'rxjs';
import { PackagesService } from '../../services/rest/packages.service';
import { ServicesService } from '../../services/rest/services.service';
import { NbTabComponent, NbWindowService, NbWindowState } from '@nebular/theme';
import { AddEditPackageComponent } from '../packages/add-edit-package/add-edit-package.component';
import { AddEditServiceComponent } from '../services/add-edit-service/add-edit-service.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'sample-services-management',
  templateUrl: './services-management.component.html',
  styleUrls: ['./services-management.component.scss']
})
export class ServicesManagementComponent implements OnInit, OnDestroy {

  public getString = getString;
  public searchTermPackages: string = "";
  public searchTermServices: string = "";
  public packagesData: any[] = [];
  public servicesData: any[] = [];
  public offerDate: Date = new Date();
  public selectedPackages: any[] = [];
  public selectedServices: any[] = [];

  private subs: Subscription[] = [];
  private gotPackages: boolean = false;
  private gotServices: boolean = false;

  constructor(
    private packagesService: PackagesService,
    private servicesService: ServicesService,
    private windowService: NbWindowService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getPackages(): void {
    this.subs.push(
      this.packagesService.getData().subscribe(data => {
        this.packagesData = data;
        this.gotPackages = true;
      })
    );
  }

  private getServices(): void {
    this.subs.push(
      this.servicesService.getData().subscribe(data => {
        this.servicesData = data;
        this.gotServices = true;
      })
    );
  }

  public onTabChange(event: NbTabComponent): void {
    switch (parseInt(event.tabId)) {
      case 1:
        if (!this.gotPackages) this.getPackages();
        break;
      case 2:
        if (!this.gotServices) this.getServices();
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
    this.subs.push(this.windowService.open(
      AddEditPackageComponent,
      {
        context: { isNew: false, package: JSON.parse(JSON.stringify(pac)) },
        buttons: { maximize: false, minimize: false, fullScreen: false, close: false },
        initialState: NbWindowState.MAXIMIZED,
        hasBackdrop: true,
        windowClass: "package-popup-window",
        closeOnBackdropClick: false,
        closeOnEsc: false
      }
    ).onClose.subscribe((data: boolean) => {
      if (data) this.getPackages();
    }));
  }

  public openServiceDetails(service: any): void {
    this.subs.push(
      this.windowService.open(
        AddEditServiceComponent,
        {
          context: { isNew: false, service: JSON.parse(JSON.stringify(service)) },
          buttons: { maximize: false, minimize: false, fullScreen: false, close: false },
          initialState: NbWindowState.MAXIMIZED,
          hasBackdrop: true,
          windowClass: "service-popup-window",
          closeOnBackdropClick: false,
          closeOnEsc: false
        }
      )
        .onClose.subscribe((data: boolean) => {
          if (data) this.getServices();
        }));
  }

  public onItemsDrop(event: CdkDragDrop<any[]>): void {
    console.log(event)
    if (Object.keys(event.item.data).includes('PackagePriceCalculated')) {
      if (!this.selectedPackages.find(x => x.Id == event.item.data.Id)) {
        this.subs.push(
          this.servicesService.getServicesForPackage(event.item.data.Id).subscribe(data => {
            event.item.data.Services = data;
          })
        );
        event.item.data.Quantity = 1;
        this.selectedPackages.push(event.item.data);
      }
    } else {
      if (!this.selectedServices.find(x => x.Id == event.item.data.Id)) {
        event.item.data.Quantity = 1;
        this.calculateItemPrice(event.item.data);
        this.selectedServices.push(event.item.data);
      }
    }
  }

  public onClearAllClick(): void {
    this.selectedPackages = [];
    this.selectedServices = [];
  }

  public decreaseQuantityClick(item: any): void {
    if (item.Quantity > 1) item.Quantity -= 1;
    this.calculateItemPrice(item);
  }

  public increaseQuantityClick(item: any): void {
    item.Quantity += 1;
    this.calculateItemPrice(item);
  }

  private calculateItemPrice(item): void {
    item.Price = item.Quantity * item.CostPerUnit;
  }

  public removePackageItem(pack: any): void {
    var itemIndex = this.selectedPackages.findIndex(x => x.Id == pack.Id);
    this.selectedPackages.splice(itemIndex, 1);
  }

  public removeServiceItem(pack: any): void {
    var itemIndex = this.selectedServices.findIndex(x => x.Id == pack.Id);
    this.selectedServices.splice(itemIndex, 1);
  }
}
