import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { IPerson, PersonsService, getIPersonFromJSON } from '../../services/rest/persons.service';
import { getString } from '../../resources/strings';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastrService } from '../../services/toastr.service';
@Component({
  selector: 'sample-person-popup-window',
  templateUrl: './person-popup-window.component.html',
  styleUrls: ['./person-popup-window.component.scss']
})
export class PersonPopupWindowComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private ref: NbWindowRef,
    private personsService: PersonsService,
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) { }

  public getString = getString;
  public personId: number;
  public person: any;
  public newPersonData: IPerson = {
    Id: 0,
    FirstName: '',
    LastName: '',
    JMBG: '',
    Active: false,
    CreationDate: undefined,
    StartDate: undefined,
    EndDate: undefined,
    BirthDate: undefined
  }

  private subscriptions: Subscription[] = [];
  private madeChanges: boolean = false;

  @ViewChild("headerTemplate") headerTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.getPersonData();
  }

  ngAfterViewInit(): void {
    var windows = document.getElementsByClassName("person-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.add("h-100");
      window.parentElement.classList.add("w-100");
      window.parentElement.parentElement.classList.add("h-100");
      window.parentElement.parentElement.style.width = "75%";
      const cdkOverlayContainer = window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0) {
        cdkOverlayContainer.children[0].classList.add("d-block");
      }
    }

    this.ref.config.titleTemplate = this.headerTemplate;
  }

  ngOnDestroy(): void {
    var windows = document.getElementsByClassName("person-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.remove("h-100");
      window.parentElement.classList.remove("w-100");
      window.parentElement.parentElement.classList.remove("h-100");
      const cdkOverlayContainer = window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0) {
        cdkOverlayContainer.children[0].classList.remove("d-block");
      }
    }

    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  public close() {
    this.ref.close(this.madeChanges);
  }

  private getPersonData(): void {
    this.subscriptions.push(
      this.personsService.getPersonDetails(this.personId).subscribe(data => {
        if (data.length > 0) {
          this.newPersonData = getIPersonFromJSON(data[0]);
          this.person = getIPersonFromJSON(data[0]);
        }
      })
    );
  }

  public cancelSave(): void {
    this.newPersonData = getIPersonFromJSON(JSON.parse(JSON.stringify(this.person)));
  }

  public async deactivatePerson(): Promise<void> {
    var endDate: string = new Date().toLocaleDateString();
    if (this.newPersonData.EndDate != undefined) endDate = this.newPersonData.EndDate.toLocaleDateString();
    const rezDialog = await this.dialogService.openYesNoDialog(getString("areYouSure"), getString("questionDeactivatePerson") + endDate);

    if (rezDialog) {
      this.subscriptions.push(this.personsService.deactivatePerson(this.personId, this.newPersonData.EndDate ?? null).subscribe(data => {
        this.toastrService.showToast("success", getString("saveSuccess"), "");
        this.madeChanges = true;
        this.getPersonData();
      }, err => {
        this.toastrService.showToast("danger", getString("saveError"), "");
        console.error(err);
      }));
    }
  }
}
