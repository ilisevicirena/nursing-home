import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { CalculationApiService } from '../../../services/rest/calculation-api.service';
import { ButtonsType, DateRangePickerEditor, DateRangeType, DateType, DatepickerFilter, SelectFilter, SmartTableColumn, SmartTableComponent, TagType } from 'shared-components';
import { sortFloats } from '../../../resources/functions';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { ToastrService } from '../../../services/toastr.service';
import { RealPriceModalComponent } from '../../calculation/real-price-modal/real-price-modal.component';
import { PaidCalculationModalComponent } from '../../calculation/paid-calculation-modal/paid-calculation-modal.component';
import { CalculationDocumentsComponent } from '../../calculation/calculation-documents/calculation-documents.component';

@Component({
  selector: 'sample-person-calculation',
  templateUrl: './person-calculation.component.html',
  styleUrls: ['./person-calculation.component.scss']
})
export class PersonCalculationComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public getString = getString;
  public calculations: any[] = [];
  public summary: any;

  @Input() personId: number;

  @ViewChild(SmartTableComponent) table: SmartTableComponent;

  public columns: SmartTableColumn[] = [
    new SmartTableColumn(getString('calculationMonth')).Property('Month'),
    new SmartTableColumn(getString('calculationYear')).Property('Year'),
    new SmartTableColumn(getString('period')).Property("Range").SpecialType(new DateRangeType().Format("dd.MM.yyyy.")),
    new SmartTableColumn(getString('calculationDate')).Property('CalculationDate').SpecialType(new DateType().Format('dd.MM.yyyy. HH:mm')).SpecialFilter(new DatepickerFilter()),
    new SmartTableColumn(getString('status')).Property('StatusObj').SpecialType(new TagType()).Width('13%').SpecialFilter(new SelectFilter("Id", "StringKey")
      .ServerSource(true).ServerEndpoint(this.calculationService.apiRoute + '/getCalculationStatuses'))
      .FilterFunction((cell?: any, search?: string) => {
        if (search.length > 0) {
          return cell.id == search;
        }
      }),
    new SmartTableColumn(getString('systemPrice')).Property('SystemPrice').CompareFunction(sortFloats),
    new SmartTableColumn(getString('realPrice')).Property('RealPrice').CompareFunction(sortFloats),
    new SmartTableColumn(getString('paidPrice')).Property('PaidPrice').CompareFunction(sortFloats),
    new SmartTableColumn(getString('paidDate')).Property('DatePaid').SpecialType(new DateType().Format('dd.MM.yyyy.')).SpecialFilter(new DatepickerFilter()),
    new SmartTableColumn(getString('actions')).SpecialType(new ButtonsType()).Property('Buttons').Width('17%').Sort(false).Filter(false)
  ];

  constructor(
    private calculationService: CalculationApiService,
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCalculations();
  }

  private getCalculations(): void {
    this.subs.push(
      this.calculationService.getCalculationsForPerson(this.personId).subscribe(data => {
        this.calculations = data;
        this.calculations.map(x => {
          x.StatusObj = { status: x.StatusColor, text: getString(x.StatusStringKey), id: x.StatusId };
          x.Range = { start: x.DateFrom, end: x.DateTo };
          x.Buttons = [];

          switch (x.StatusId) {
            case 1:
              x.Buttons.push({ id: 'cancel', shape: 'round', icon: 'close-square-outline', ghost: true, status: 'warning', tooltip: getString('cancelCalculation') });
              break;
            case 2:
              x.Buttons.push(
                { id: 'realPrice', shape: 'round', icon: 'checkmark-square-2-outline', ghost: true, status: 'primary', tooltip: getString('enterRealPrice') },
                { id: 'paidPrice', shape: 'round', icon: 'checkmark-square-outline', ghost: true, status: 'primary', tooltip: getString('enterPaidPrice') },
                { id: 'cancel', shape: 'round', icon: 'close-square-outline', ghost: true, status: 'warning', tooltip: getString('cancelCalculation') }
              );
              break;
          }

          x.Buttons.push({ id: 'documents', shape: 'round', icon: 'attach-outline', ghost: true, status: 'primary', tooltip: getString('calculationDocuments'), text: x.Documents })

          return x;
        });
      })
    );

    this.subs.push(
      this.calculationService.getCalculationsSummaryForPerson(this.personId).subscribe(data => {
        this.summary = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  public onButtonItemClicked(event: any): void {
    switch (event.button.id) {
      case 'realPrice':
        this.openRealPriceDialog(event.rowData);
        break;

      case 'paidPrice':
        this.openPaidPriceDialog(event.rowData);
        break;

      case 'cancel':
        this.cancelCalculation(event.rowData.Id);
        break;

      case 'documents':
        this.openDocumentsDialog(event.rowData);
        break;
    }
  }

  private openRealPriceDialog(calculation: any): void {
    this.subs.push(
      this.dialogService.open(
        RealPriceModalComponent,
        {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            realPrice: calculation.RealPrice ?? calculation.SystemPrice,
            id: calculation.Id
          }
        }

      ).onClose.subscribe(result => {
        if (result) this.getCalculations();
      })
    );
  }

  private openPaidPriceDialog(calculation: any): void {
    this.subs.push(
      this.dialogService.open(
        PaidCalculationModalComponent,
        {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            realPrice: calculation.RealPrice ?? calculation.SystemPrice,
            paidPrice: calculation.RealPrice ?? calculation.SystemPrice,
            id: calculation.Id,
            personId: calculation.PersonId
          }
        }
      ).onClose.subscribe(result => {
        if (result) this.getCalculations();
      })
    );
  }

  private openDocumentsDialog(calculation: any): void {
    this.subs.push(
      this.dialogService.open(
        CalculationDocumentsComponent,
        {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            id: calculation.Id,
            personId: calculation.PersonId
          }
        }
      ).onClose.subscribe(result => {
        if (result) this.getCalculations();
      })
    );
  }

  private async cancelCalculation(id: number): Promise<void> {
    const rez = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('wantToCancelCalculation'));
    if (rez) {
      this.subs.push(
        this.calculationService.cancelCalculation({ Id: id }).subscribe(() => {
          this.toastrService.showToast('success', getString('saveSuccess'));
          this.getCalculations();
        })
      );
    }
  }

  public async markRealPriceClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('wantToMarkRealPrice'));
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          this.subs.push(
            this.calculationService.calculationRealPriceSave({ Id: element.Id, RealPrice: element.SystemPrice.replace(',', '') }).subscribe(() => {
              if (index == selected.length - 1) {
                this.toastrService.showToast('success', getString('saveSuccess'));
                this.getCalculations();
              }
            })
          );
        }
      }
    } else this.toastrService.showToast('warning', getString('nothingSelected'));
  }

  public async markPaidPriceClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('wantToMarkPaid'));
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          if (!element.RealPrice) {
            this.subs.push(
              this.calculationService.calculationRealPriceSave({ Id: element.Id, RealPrice: element.SystemPrice.replace(',', '') }).subscribe()
            );
          }

          this.subs.push(
            this.calculationService.calculationPaid({ Id: element.Id, PaidPrice: element.RealPrice ? element.RealPrice.replace(',', '') : element.SystemPrice.replace(',', ''), PaidDate: new Date().toISOString() }).subscribe(() => {
              if (index == selected.length - 1) {
                this.toastrService.showToast('success', getString('saveSuccess'));
                this.getCalculations();
              }
            })
          );
        }
      }
    } else this.toastrService.showToast('warning', getString('nothingSelected'));
  }

  public async cancelCalculationClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('wantToCancelSelected'));
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          this.subs.push(
            this.calculationService.cancelCalculation({ Id: element.Id }).subscribe(() => {
              if (index == selected.length - 1) {
                this.toastrService.showToast('success', getString('saveSuccess'));
                this.getCalculations();
              }
            })
          );
        }
      }
    } else this.toastrService.showToast('warning', getString('nothingSelected'));
  }
}
