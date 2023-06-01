import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/rest/documents.service';
import { Subscription } from 'rxjs';
import { NbTabComponent } from '@nebular/theme';
import { getString } from '../../resources/strings';

@Component({
  selector: 'sample-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {

  @Input() personId: number = 0;

  public documentTypes: any[] = [];
  public documents: any[] = [];
  public getString = getString;
  public searchTerm: string = "";
  public currentView: string = "row";

  private subs: Subscription[] = [];

  constructor(
    private documentsService: DocumentsService
  ) {

  }

  ngOnInit(): void {
    this.getDocumentTypes();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getDocumentTypes(): void {
    this.subs.push(
      this.documentsService.getDocumentTypesForPerson(this.personId).subscribe(data => {
        this.documentTypes = data;
      })
    );
  }

  public onTabChange(tab: NbTabComponent): void {
    console.log(tab)
    this.subs.push(
      this.documentsService.getDocumentsForPersonByType(this.personId, tab.tabId as any).subscribe(data => {
        console.log(data);
        this.documents = data;
      })
    );
  }

  public viewChange(event: string[]) {
    if (event.length > 0) this.currentView = event[0];
  }
}
