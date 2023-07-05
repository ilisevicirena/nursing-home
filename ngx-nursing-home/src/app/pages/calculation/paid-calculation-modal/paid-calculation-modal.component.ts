import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { NbDialogRef } from '@nebular/theme';
import { CalculationService } from '../../../services/calculation.service';
import { CalculationApiService } from '../../../services/rest/calculation-api.service';
import { ToastrService } from '../../../services/toastr.service';
import { IDocument } from '../../../services/rest/documents.service';

@Component({
  selector: 'sample-paid-calculation-modal',
  templateUrl: './paid-calculation-modal.component.html',
  styleUrls: ['./paid-calculation-modal.component.scss']
})
export class PaidCalculationModalComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public getString = getString;
  public realPrice: string;
  public paidPrice: string;
  public id: number;
  public personId: number;
  public paidDate: Date = new Date();
  public documentData: any = {
    Id: 0,
    Name: undefined,
    Extension: undefined,
    FileType: undefined,
    Base64: undefined,
  };

  constructor(
    private ref: NbDialogRef<PaidCalculationModalComponent>,
    private calculationService: CalculationService,
    private calcService: CalculationApiService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.realPrice = this.realPrice.replace(",", "");
    this.paidPrice = this.paidPrice.replace(",", "");
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this.ref.close(result);
  }

  public onPriceChange(isReal: boolean = true): void {
    if (isReal) this.realPrice = this.calculationService.roundToTwoDecimals(this.realPrice as any) as any;
    else this.paidPrice = this.calculationService.roundToTwoDecimals(this.paidPrice as any) as any;
  }

  public onSaveClick(): void {
    this.subs.push(
      this.calcService.calculationRealPriceSave({ Id: this.id, RealPrice: this.realPrice }).subscribe(() => {
        this.subs.push(
          this.calcService.calculationPaid({ Id: this.id, PaidPrice: this.paidPrice, PaidDate: this.paidDate.toISOString() }).subscribe(() => {
            if (this.documentData.Base64) {
              this.subs.push(
                this.calcService.saveDocument(this.documentData).subscribe(() => {
                  this.toastrService.showToast('success', getString('saveSuccess'));
                  this.close(true);
                }
                )
              );
            } else {
              this.toastrService.showToast('success', getString('saveSuccess'));
              this.close(true);
            }
          })
        );
      })
    );
  }

  public onFileUploaded(files: File[]): void {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        var base64 = reader.result.toString().split(',');
        this.documentData.Base64 = base64[1];
        this.documentData.Name = files[0].name.split('.')[0];
        this.documentData.FileType = base64[0];
        this.documentData.Extension = files[0].name.split('.')[1];
        this.documentData.CalculationId = this.id;
        this.documentData.PersonId = this.personId;
      };
    } else {
      this.documentData.Name = undefined;
      this.documentData.Base64 = undefined;
      this.documentData.FileType = undefined;
      this.documentData.Extension = undefined;
    }
  }
}
