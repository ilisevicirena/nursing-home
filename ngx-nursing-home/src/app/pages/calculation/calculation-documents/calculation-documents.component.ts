import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { NbDialogRef } from '@nebular/theme';
import { CalculationApiService } from '../../../services/rest/calculation-api.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'sample-calculation-documents',
  templateUrl: './calculation-documents.component.html',
  styleUrls: ['./calculation-documents.component.scss']
})
export class CalculationDocumentsComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public getString = getString;
  public id: number;
  public documents: any[] = [];

  constructor(
    private ref: NbDialogRef<CalculationDocumentsComponent>,
    private calcService: CalculationApiService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this.ref.close(result);
  }

  private getDocuments(): void {
    this.subs.push(
      this.calcService.getCalculationDocuments(this.id).subscribe(data => {
        this.documents = data;
        console.log(this.documents)
      })
    );
  }
}
