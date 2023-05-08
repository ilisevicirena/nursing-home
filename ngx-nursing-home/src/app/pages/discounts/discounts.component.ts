import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DiscountsService } from '../../services/rest/discounts.service';
import { getString } from '../../resources/strings';
import { CheckboxType, SelectFilter, SmartTableColumn } from 'shared-components';
import { NbWindowService, NbWindowState } from '@nebular/theme';
import { AddEditDiscountComponent } from './add-edit-discount/add-edit-discount.component';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'sample-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public getString = getString;
  public discountsData: any[] = [];
  private percentCalculationFilter = [
    { value: true, label: getString('yes') },
    { value: false, label: getString('no') }
  ];
  public discountsColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString('id')).Property('Id'),
    new SmartTableColumn(getString('name')).Property('Name'),
    new SmartTableColumn(getString('description')).Property('Description'),
    new SmartTableColumn(getString('quantity')).Property('Quantity'),
    new SmartTableColumn(getString('percentCalculation')).Property('PercentCalculation').SpecialType(new CheckboxType())
      .SpecialFilter(new SelectFilter("value", "label").Source(this.percentCalculationFilter)),
  ];

  constructor(
    private discountsService: DiscountsService,
    private windowService: NbWindowService,
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDiscounts();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getDiscounts(): void {
    this.subs.push(this.discountsService.getData().subscribe(data => {
      this.discountsData = data;
    }, err => {
      console.error(err);
    }));
  }

  public onCreateStarted(): void {
    this.subs.push(
      this.windowService.open(
        AddEditDiscountComponent,
        {
          context: { isNew: true },
          buttons: { maximize: false, minimize: false, fullScreen: false, close: false },
          initialState: NbWindowState.MAXIMIZED,
          hasBackdrop: true,
          windowClass: "discount-popup-window",
          closeOnBackdropClick: false,
          closeOnEsc: false
        }
      )
        .onClose.subscribe((data: boolean) => {
          if (data) this.getDiscounts();
        }));
  }

  public async onDeleteStarted(event: any): Promise<void> {
    const result = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString("deactivateDiscount"));
    if (result) {
      this.subs.push(this.discountsService.delete(event.data).subscribe(() => {
        this.toastrService.showToast('success', getString('saveSuccess'), '');
        this.getDiscounts();
      }, err => {
        console.error(err);
      }));
    }
  }
}
