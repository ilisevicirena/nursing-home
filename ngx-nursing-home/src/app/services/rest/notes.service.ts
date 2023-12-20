import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotesService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/notes");
  }

  public getNotesForPerson(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "?PersonId=" + id);
  }

  public removeNoteFromFavorites(id: number): Observable<any> {
    return this.http.post(this.apiRoute + "/removeNoteFromFavorites", {
      Id: id,
    });
  }

  public markNoteAsFavorite(id: number): Observable<any> {
    return this.http.post(this.apiRoute + "/markNoteAsFavorite", { Id: id });
  }

  public removeTagFromNote(noteId: number, tagId: number): Observable<any> {
    return this.http.post(this.apiRoute + "/removeTagFromNote", {
      NoteId: noteId,
      TagId: tagId,
    });
  }

  public addTagToNote(noteId: number, tagId: number): Observable<any> {
    return this.http.post(this.apiRoute + "/addTagToNote", {
      NoteId: noteId,
      TagId: tagId,
    });
  }

  public getNoteDocuments(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getNoteDocuments?NoteId=" + id);
  }

  public getNoteDetails(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getNoteDetails?NoteId=" + id);
  }

  public getNoteTags(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/getNoteTags?NoteId=" + id);
  }

  public addDocumentToNote(model: IBaseSaveModel): Observable<any> {
    return this.http.post(this.apiRoute + "/insertDocumentForNote", model);
  }

  public deleteDocumentFromNote(id: number, noteId: number): Observable<any> {
    return this.http.delete(this.apiRoute + "/deleteDocumentFromNote", {
      body: { DocumentId: id, NoteId: noteId },
    });
  }
}

export interface INote extends IBaseSaveModel {
  Title: string;
  Text: string;
  PersonId: number;
  Tags?: number[];
}
