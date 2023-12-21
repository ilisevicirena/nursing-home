import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { PersonsService } from "../../services/rest/persons.service";
import { TagsService } from "../../services/rest/tags.service";
import { ToastrService } from "../../services/toastr.service";
import { NotesService } from "../../services/rest/notes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorVisitsService } from "../../services/rest/doctor-visits.service";

@Component({
  selector: "sample-doctor-visit-tour",
  templateUrl: "./doctor-visit-tour.component.html",
  styleUrls: ["./doctor-visit-tour.component.scss"],
})
export class DoctorVisitTourComponent implements OnInit, OnDestroy {
  public getString = getString;
  public persons: any[] = [];
  public loading: boolean = false;
  public currentPersonIndex: number = 1;
  public currentPersonId: number = 0;
  public currentNote: any;
  public visitDate: Date;
  public percentage: number = 0;
  public tourData: any = {};
  public doctors: any[] = [];
  public nurses: any[] = [];
  public statuses: any[] = [
    {
      Id: 0,
      Name: getString("notProvided"),
      Icon: "close-circle-outline",
      Status: "danger",
    },
    {
      Id: 1,
      Name: getString("provided"),
      Icon: "checkmark-circle-2-outline",
      Status: "success",
    },
    {
      Id: 2,
      Name: getString("inProgress"),
      Icon: "loader-outline",
      Status: "warning",
    },
  ];

  private _subs: Subscription[] = [];
  private readonly _doctorVisitTagId: number = 1;
  private _tags: any[] = [];
  private _tourId: number = 0;

  constructor(
    private _personsService: PersonsService,
    private _tagsService: TagsService,
    private _toastrService: ToastrService,
    private _notesService: NotesService,
    private _activatedRoute: ActivatedRoute,
    private _doctorVisitService: DoctorVisitsService,
    private _router: Router
  ) {}

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    this._subs.push(
      this._activatedRoute.paramMap.subscribe((params) => {
        this._tourId = params.get("id") as any;
        this.getVisitTourDetails(this._tourId);
      })
    );

    this.getTags();
  }

  private getVisitTourDetails(id: number): void {
    this._subs.push(
      this._doctorVisitService.getVisitTourDetails(id).subscribe((data) => {
        this.tourData = data.Tour[0];
        this.doctors = data.Doctors;
        this.nurses = data.Nurses;
        this.visitDate = new Date(this.tourData.Date);
      })
    );
  }

  private getTags(): void {
    this._subs.push(
      this._tagsService.getData().subscribe((data) => {
        this._tags = data;
        this.getPersons();
      })
    );
  }

  private getPersons(): void {
    this._subs.push(
      this._personsService.getData(true).subscribe((data) => {
        this.persons = data;
        var text = "<strong>" + getString("contributors") + "</strong>: ";
        this.doctors.forEach((element) => {
          text +=
            element.FirstName +
            " " +
            element.LastName +
            " (" +
            element.JobPositionName +
            "), ";
        });
        this.nurses.forEach((element) => {
          text +=
            element.FirstName +
            " " +
            element.LastName +
            " (" +
            element.JobPositionName +
            "), ";
        });

        text =
          text +
          "<br><hr><strong>" +
          getString("remarks") +
          "</strong>:" +
          "<br>";

        this.persons.map((x) => {
          x.Status = this.statuses[0];
          x.Note = {
            Id: 0,
            Title:
              getString("doctorVisit") + this.visitDate.toLocaleDateString(),
            Text: text,
            PersonFirstName: x.FirstName,
            PersonLastName: x.LastName,
            Tags: [this._tags.find((x) => x.Id == this._doctorVisitTagId)],
            Documents: [],
            CreationDate: this.visitDate,
            LastModified: this.visitDate,
            PersonId: x.Id,
          };

          return x;
        });

        if (this.persons.length > 0) {
          this.currentPersonIndex = 0;
          this.currentPersonId = this.persons[0].Id;
          this.persons[0].Status = this.statuses.find((x) => x.Id == 2);
          this.currentNote = this.persons[0].Note;
        }
      })
    );
  }

  public onPersonNoteSaved(ev: any): void {
    this._toastrService.showToast("success", getString("saveSuccess"));
    this._subs.push(
      this._notesService.getNoteDetails(ev).subscribe((data) => {
        this.persons[this.currentPersonIndex].Note = data;
        this.currentNote = data;
        this.calculatePercentage();
      })
    );
  }

  private calculatePercentage(): void {
    var saved = this.persons.filter((x) => x.Note.Id > 0);
    var num = (saved.length / this.persons.length) * 100;
    this.percentage = Math.round((num + Number.EPSILON) * 100) / 100;
  }

  public goToPerson(p: any): void {
    this.persons[this.currentPersonIndex].Status = this.statuses.find((x) =>
      x.Id == this.persons[this.currentPersonIndex].Note.Id > 0 ? 1 : 0
    );

    this.currentPersonIndex = this.persons.findIndex((x) => x.Id == p.Id);
    this.currentPersonId = p.Id;
    p.Status = this.statuses.find((x) => x.Id == 2);
    this.currentNote = p.Note;
  }

  public onBackClick(): void {
    this.persons[this.currentPersonIndex].Status = this.statuses.find((x) =>
      x.Id == this.persons[this.currentPersonIndex].Note.Id > 0 ? 1 : 0
    );

    this.currentPersonIndex -= 1;
    this.currentPersonId = this.persons[this.currentPersonIndex].Id;
    this.persons[this.currentPersonIndex].Status = this.statuses.find(
      (x) => x.Id == 2
    );
    this.currentNote = this.persons[this.currentPersonIndex].Note;
  }

  public onNextClick(): void {
    this.persons[this.currentPersonIndex].Status = this.statuses.find((x) =>
      x.Id == this.persons[this.currentPersonIndex].Note.Id > 0 ? 1 : 0
    );

    this.currentPersonIndex += 1;
    this.currentPersonId = this.persons[this.currentPersonIndex].Id;
    this.persons[this.currentPersonIndex].Status = this.statuses.find(
      (x) => x.Id == 2
    );
    this.currentNote = this.persons[this.currentPersonIndex].Note;
  }

  public cancelDoctorVisit(): void {
    this._subs.push(
      this._doctorVisitService.delete({ Id: this._tourId }).subscribe(() => {
        this._toastrService.showToast("success", getString("saveSuccess"));
        this._router.navigateByUrl("/pages/dashboard");
      })
    );
  }

  public completeDoctorVisit(): void {
    this.loading = true;
    this._subs.push(
      this._doctorVisitService
        .completeDoctorVisit(this._tourId, this.persons.length)
        .subscribe(() => {
          this.persons.forEach((person, index) => {
            if (person.Note.Id > 0) {
              this._subs.push(
                this._doctorVisitService
                  .insertDoctorVisitForPerson(
                    this._tourId,
                    person.Id,
                    person.Note.Id
                  )
                  .subscribe(() => {
                    if (index == this.persons.length - 1) {
                      this.loading = false;
                      this._toastrService.showToast(
                        "success",
                        getString("doctorVisitTourCompleted")
                      );
                      this._router.navigateByUrl("/pages/dashboard");
                    }
                  })
              );
            } else if (index == this.persons.length - 1) {
              this.loading = false;
              this._toastrService.showToast(
                "success",
                getString("doctorVisitTourCompleted")
              );
              this._router.navigateByUrl("/pages/dashboard");
            }
          });
        })
    );
  }
}
