import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { DoctorVisitsService } from "../../../services/rest/doctor-visits.service";
import { Router } from "@angular/router";
import { NotesService } from "../../../services/rest/notes.service";
import { hexToRgbA } from "../../../resources/functions";
import { DialogService } from "../../../shared/dialog/dialog.service";
import { NoteDocumentsComponent } from "../../notes/note-documents/note-documents.component";
import { ToastrService } from "../../../services/toastr.service";
import { NoteExportComponent } from "../../notes/note-export/note-export.component";

@Component({
  selector: "sample-doctor-visit-details",
  templateUrl: "./doctor-visit-details.component.html",
  styleUrls: ["./doctor-visit-details.component.scss"],
})
export class DoctorVisitDetailsComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public getString = getString;
  public hexToRgbA = hexToRgbA;
  public id: number = 0;
  public tour: any;
  public selectedTab = 1;
  public tabs: any[] = [
    {
      id: 1,
      icon: "fas fa-notes-medical",
      tooltip: getString("visitDetails"),
      active: true,
    },
    {
      id: 2,
      icon: "fas fa-procedures",
      tooltip: getString("visitPersons"),
      active: false,
    },
    {
      id: 3,
      icon: "fas fa-laptop-medical",
      tooltip: getString("visitSummary"),
      active: false,
    },
  ];

  public doctors: any[] = [];
  public nurses: any[] = [];
  public persons: any[] = [];
  public currentNote: any;
  public summary: any;

  @ViewChild(NoteExportComponent) noteExport: NoteExportComponent;

  constructor(
    private ref: NbDialogRef<DoctorVisitDetailsComponent>,
    private doctorVisitsService: DoctorVisitsService,
    private router: Router,
    private notesService: NotesService,
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getDoctorsAndNurses();
  }

  ngOnDestroy(): void {
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getDoctorsAndNurses(): void {
    this.subs.push(
      this.doctorVisitsService
        .getDoctorsAndNurses(this.id)
        .subscribe((data) => {
          if (data) {
            this.doctors = data.doctors;
            this.nurses = data.nurses;
          }
        })
    );
  }

  private getPersons(): void {
    this.subs.push(
      this.doctorVisitsService.getPersons(this.id).subscribe((data) => {
        if (data) this.persons = data;
      })
    );
  }

  private getSummary(): void {
    this.subs.push(
      this.doctorVisitsService.getSummary(this.id).subscribe((data) => {
        this.summary = data;
      })
    );
  }

  public close(res: boolean): void {
    this.ref.close(res);
  }

  public toggleTab(t): void {
    this.tabs.map((x) => (x.active = false));
    t.active = true;
    this.selectedTab = t.id;

    if (this.selectedTab == 2) this.getPersons();
    if (this.selectedTab == 3) this.getSummary();
  }

  public goToProfile(id: number): void {
    this.router.navigateByUrl("/pages/employee/" + id);
  }

  public collapsedChange(event: any, p: any) {
    if (!event) this.getNote(p.NoteId);
  }

  private getNote(noteId: number): void {
    this.subs.push(
      this.notesService.getNoteDetails(noteId).subscribe((data) => {
        this.currentNote = data;
      })
    );
  }

  public openDocumentsDialog(): void {
    this.subs.push(
      this.dialogService
        .open(NoteDocumentsComponent, {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: {
            noteId: this.currentNote.Id,
            showUploadBtn: false,
            personId: this.currentNote.PersonId,
          },
        })
        .onClose.subscribe((result) => {
          if (result.changes) {
            this.currentNote.Documents = result.documents;
          }
        })
    );
  }

  public downloadAllNotes(): void {
    this.subs.push(
      this.doctorVisitsService
        .getNotesForDoctorVisitTour(this.id)
        .subscribe((data) => {
          this.noteExport.downloadAsPDF(data);
        })
    );
  }
}
