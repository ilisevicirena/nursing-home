import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { IService, ServicesService } from '../../../services/rest/services.service';
import { getString } from '../../../resources/strings';
import { MeasureUnitsService } from '../../../services/rest/measure-units.service';
import { PriceUnitsService } from '../../../services/rest/price-units.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'sample-add-edit-service',
  templateUrl: './add-edit-service.component.html',
  styleUrls: ['./add-edit-service.component.scss']
})
export class AddEditServiceComponent implements OnInit, OnDestroy, AfterViewInit {

  public isNew: boolean = true;
  public getString = getString;
  public measureUnitsData: any[] = [];
  public priceUnitsData: any[] = [];
  public service: IService = {
    Id: 0,
    CostPerUnit: undefined,
    DefaultNumberOfUnits: undefined,
    Description: undefined,
    MeasureUnitId: undefined,
    MeasureUnitName: undefined,
    MeasureUnitTag: undefined,
    Name: undefined,
    PriceUnitId: undefined,
    PriceUnitName: undefined,
    PriceUnitTag: undefined
  };

  private subs: Subscription[] = [];

  @ViewChild("headerTemplate") headerTemplate!: TemplateRef<any>;

  constructor(
    public ref: NbWindowRef,
    private measureUnitService: MeasureUnitsService,
    private priceUnitService: PriceUnitsService,
    private servicesService: ServicesService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getMeasureUnits();
    this.getPriceUnits();
  }

  ngOnDestroy(): void {
    var windows = document.getElementsByClassName("service-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.remove("h-100");
      window.parentElement.classList.remove("w-100");
      window.parentElement.parentElement.classList.remove("h-100");
      const cdkOverlayContainer = window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0) {
        cdkOverlayContainer.children[0].classList.remove("d-block");
      }
    }

    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    var windows = document.getElementsByClassName("service-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.add("h-100");
      window.parentElement.classList.add("w-100");
      window.parentElement.parentElement.classList.add("h-100");
      window.parentElement.parentElement.style.width = "70%";
      const cdkOverlayContainer = window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0) {
        cdkOverlayContainer.children[0].classList.add("d-block");
      }
    }

    this.ref.config.titleTemplate = this.headerTemplate;
  }

  private getMeasureUnits(): void {
    this.subs.push(
      this.measureUnitService.getData().subscribe(data => {
        this.measureUnitsData = data;
      }, err => {
        console.error(err);
      })
    );
  }

  private getPriceUnits(): void {
    this.subs.push(
      this.priceUnitService.getData().subscribe(data => {
        this.priceUnitsData = data;
      }, err => {
        console.error(err);
      })
    );
  }

  public onSaveClick(form: NgForm): void {
    if (this.isNew) this.saveNewService(form);
    else this.editService(form);
    form.form.markAsPristine();
  }

  public close(result: boolean, form: NgForm) {
    //  form.form.reset();
    this.ref.close(result);
  }

  private saveNewService(form: NgForm): void {
    this.subs.push(this.servicesService.add(this.service).subscribe(data => {
      if (data.ServiceId) {
        this.toastrService.showToast('success', getString('saveSuccess'), '');
        this.close(true, form);
      }
    }, err => {
      console.error(err);
    }));
  }

  private editService(form: NgForm): void {
    this.subs.push(this.servicesService.update(this.service).subscribe(data => {
      this.toastrService.showToast('success', getString('saveSuccess'), '');
      this.close(true, form);
    }, err => {
      console.error(err);
    }));
  }
}
