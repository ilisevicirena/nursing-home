import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServicesService } from '../../services/rest/services.service';
import { getString } from '../../resources/strings';
import { LookupType, SelectFilter, SmartTableColumn } from 'shared-components';
import { MeasureUnitsService } from '../../services/rest/measure-units.service';
import { PriceUnitsService } from '../../services/rest/price-units.service';

@Component({
  selector: 'sample-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

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
    private priceUnitsService: PriceUnitsService
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  private getServices(): void {
    this.subscriptions.push(this.servicesService.getData().subscribe(data => {
      console.log(data);
      this.servicesData = data;
    }, err => {
      console.error(err);
    }));
  }
}
