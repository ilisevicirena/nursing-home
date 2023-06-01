import { Injectable } from '@angular/core';
import { BaseRestApiService, IBaseSaveModel } from '../base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http, 'api/documents');
  }

  public getDocumentsForPerson(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getDocumentsForPerson?PersonId=" + id);
  }

  public getDocumentsForPersonByType(id: number, typeId: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getDocumentsForPersonByType?PersonId=" + id + "&DocumentTypeId=" + typeId);
  }

  public getDocumentTypes(): Observable<any> {
    return this.http.get(this.apiRoute + "/getDocumentTypes");
  }

  public getDocumentContent(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getDocumentContent?DocumentId=" + id);
  }

  public getDocumentTypesForPerson(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getDocumentTypesForPerson?PersonId=" + id);
  }

}

export interface IDocument extends IBaseSaveModel {
  Name?: string;
  PersonId?: number;
  DocumentTypeId?: number;
  Extension?: string;
  FileType?: string;
  Base64?: string;
}