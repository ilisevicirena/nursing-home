import { Component, OnDestroy, OnInit } from '@angular/core';
import { getString } from '../../resources/strings';
import { Subscription } from 'rxjs';
import { PersonsService } from '../../services/rest/persons.service';
import { TagsService } from '../../services/rest/tags.service';
import { ToastrService } from '../../services/toastr.service';
import { NotesService } from '../../services/rest/notes.service';

@Component({
  selector: 'sample-doctor-visit-tour',
  templateUrl: './doctor-visit-tour.component.html',
  styleUrls: ['./doctor-visit-tour.component.scss']
})
export class DoctorVisitTourComponent implements OnInit, OnDestroy {

  public getString = getString;
  public persons: any[] = [];
  public statuses: any[] = [
    { Id: 0, Name: getString('notProvided'), Icon: 'close-circle-outline', Status: 'danger' },
    { Id: 1, Name: getString('provided'), Icon: 'checkmark-circle-2-outline', Status: 'success' },
    { Id: 2, Name: getString('inProgress'), Icon: 'loader-outline', Status: 'warning' }
  ];

  public currentPersonIndex: number = 1;
  public currentPersonId: number = 0;
  public currentNote: any;
  public visitDate: Date = new Date();

  private subs: Subscription[] = [];
  private doctorVisitTagId: number = 5;
  private tags: any[] = [];

  constructor(
    private personsService: PersonsService,
    private tagsService: TagsService,
    private toastrService: ToastrService,
    private notesService: NotesService
  ) { }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.getTags();
  }

  private getTags(): void {
    this.subs.push(
      this.tagsService.getData().subscribe(data => {
        this.tags = data;
        this.getPersons();
      })
    );
  }

  private getPersons(): void {
    this.subs.push(
      this.personsService.getData(true).subscribe(data => {
        this.persons = data;
        this.persons.map(x => {
          x.Status = this.statuses[0];
          x.Note = {
            Id: 0,
            Title: getString('doctorVisit') + this.visitDate.toLocaleDateString(),
            Text: "",
            PersonFirstName: x.FirstName,
            PersonLastName: x.LastName,
            Tags: [this.tags.find(x => x.Id == this.doctorVisitTagId)],
            Documents: [],
            CreationDate: this.visitDate,
            LastModified: this.visitDate,
            PersonId: x.Id
          }
          return x;
        });

        if (this.persons.length > 0) {
          this.currentPersonIndex = 0;
          this.currentPersonId = this.persons[0].Id;
          this.persons[0].Status = this.statuses.find(x => x.Id == 2);
          this.currentNote = this.persons[0].Note;
        }
      })
    );
  }

  public onPersonNoteSaved(ev: any): void {
    this.toastrService.showToast('success', getString('saveSuccess'));
    this.subs.push(
      this.notesService.getNoteDetails(ev).subscribe(data => {
        this.persons[this.currentPersonIndex].Note = data;
        this.currentNote = data;
      })
    );
  }

  public goToPerson(p: any): void {
    this.persons[this.currentPersonIndex].Status = this.statuses.find(x => x.Id == this.persons[this.currentPersonIndex].Note.Id > 0 ? 1 : 0);

    this.currentPersonIndex = this.persons.findIndex(x => x.Id == p.Id);
    this.currentPersonId = p.Id;
    p.Status = this.statuses.find(x => x.Id == 2);
    this.currentNote = p.Note;
  }

  public onBackClick(): void {
    this.persons[this.currentPersonIndex].Status = this.statuses.find(x => x.Id == this.persons[this.currentPersonIndex].Note.Id > 0 ? 1 : 0);

    this.currentPersonIndex -= 1;
    this.currentPersonId = this.persons[this.currentPersonIndex].Id;
    this.persons[this.currentPersonIndex].Status = this.statuses.find(x => x.Id == 2);
    this.currentNote = this.persons[this.currentPersonIndex].Note;
  }

  public onNextClick(): void {
    this.persons[this.currentPersonIndex].Status = this.statuses.find(x => x.Id == this.persons[this.currentPersonIndex].Note.Id > 0 ? 1 : 0);

    this.currentPersonIndex += 1;
    this.currentPersonId = this.persons[this.currentPersonIndex].Id;
    this.persons[this.currentPersonIndex].Status = this.statuses.find(x => x.Id == 2);
    this.currentNote = this.persons[this.currentPersonIndex].Note;
  }
}
