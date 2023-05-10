import { Component, OnInit } from '@angular/core';
import { getString } from '../../resources/strings';
import { Subscription } from 'rxjs';
import { PackagesService } from '../../services/rest/packages.service';
import { ServicesService } from '../../services/rest/services.service';
import { NbTabComponent, NbWindowService, NbWindowState } from '@nebular/theme';
import { AddEditPackageComponent } from '../packages/add-edit-package/add-edit-package.component';
import { AddEditServiceComponent } from '../services/add-edit-service/add-edit-service.component';

@Component({
  selector: 'sample-services-management',
  templateUrl: './services-management.component.html',
  styleUrls: ['./services-management.component.scss']
})
export class ServicesManagementComponent implements OnInit {

  public getString = getString;
  public searchTermPackages: string = "";
  public searchTermServices: string = "";
  public packagesData: any[] = [];
  public servicesData: any[] = [];

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

  private getPackages(): void {
    this.subs.push(
      this.packagesService.getData().subscribe(data => {
        console.log(data);
        this.packagesData = data;
        this.gotPackages = true;
      })
    );
  }

  private getServices(): void {
    this.subs.push(
      this.servicesService.getData().subscribe(data => {
        console.log(data);
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
}
