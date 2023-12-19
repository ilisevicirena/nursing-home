import { Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { getString } from "../../resources/strings";
import { IPerson, PersonsService } from "../../services/rest/persons.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { ToastrService } from "../../services/toastr.service";
import { RoomsService } from "../../services/rest/rooms.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { DocumentsService } from "../../services/rest/documents.service";
import { UploadDocumentComponent } from "../documents/upload-document/upload-document.component";
import { NbMenuItem } from "@nebular/theme";
import { GridColumn, fileDownload, previewFile } from "shared-components";
import { AccommodationPdfRequestService } from "../../services/rest/accommodation-pdf-request.service";

@Component({
  selector: "sample-new-person",
  templateUrl: "./new-person.component.html",
  styleUrls: ["./new-person.component.scss"],
})
export class NewPersonComponent implements OnInit, OnDestroy {
  constructor(
    private personsService: PersonsService,
    private toastrService: ToastrService,
    private roomsService: RoomsService,
    private dialogService: DialogService,
    private documentsService: DocumentsService,
    private requestGeneratorService: AccommodationPdfRequestService
  ) {}

  public getString = getString;
  public loading: boolean = false;
  public documents: any[] = [];
  public rooms: any[] = [];
  public gridSelectedItem: [] = [];
  public newPersonData: IPerson = {
    Id: 0,
    FirstName: "",
    LastName: "",
    MaidenLastName: "",
    JMBG: "",
    Active: true,
    CreationDate: "",
    StartDate: new Date(),
    Address: "",
    GenderId: undefined,
    FatherFirstName: "",
    MotherFirstName: "",
    MotherMaidenLastName: "",
    BirthCityId: undefined,
    BirthMunicipalityId: undefined,
    BirthCountryId: undefined,
    ResidanceCityId: undefined,
    ResidanceHouseNumber: "",
    ResidanceStreetName: "",
    Telephone: "",
    Mobile: "",
    Email: "",
    DoctorName: "",
  };

  public roomsColumns: GridColumn[] = [
    new GridColumn().Title(getString("room")).DataField("Name"),
    new GridColumn().Title(getString("floor")).DataField("FloorName"),
    new GridColumn().Title(getString("capacity")).DataField("Capacity"),
    new GridColumn().Title(getString("freeSpace")).DataField("FreeSpace"),
    new GridColumn().Title(getString("gender")).DataField("GenderName"),
  ];

  public selectedRoom: any = { FloorName: "", IsValid: true };

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getAvaliableRooms();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }

  public saveNewPerson(form: NgForm): void {
    this.loading = true;
    this.subscriptions.push(
      this.personsService.add(this.newPersonData).subscribe(
        (data) => {
          if (data.PersonId) {
            this.loading = false;
            this.newPersonData.Id = data.PersonId;
            form.form.markAsPristine();
            this.toastrService.showToast(
              "success",
              getString("saveSuccess"),
              ""
            );
          } else {
            this.loading = false;
            this.toastrService.showToast("danger", getString("saveError"), "");
          }
        },
        (err) => {
          console.error(err);
          this.loading = false;
          this.toastrService.showToast("danger", getString("saveError"), "");
        }
      )
    );
  }

  private getAvaliableRooms(): void {
    this.subscriptions.push(
      this.roomsService.getAvaliableRooms().subscribe((data) => {
        this.rooms = data;
      })
    );
  }

  public onRoomSelectionChanged(event: any) {
    if (event.selectedItems.length == 1) {
      this.selectedRoom = event.selectedItems[0];
      if (
        event.selectedItems[0].GenderId > 0 &&
        event.selectedItems[0].GenderId != this.newPersonData.GenderId
      ) {
        this.selectedRoom.IsValid = false;
      } else this.selectedRoom.IsValid = true;
    } else this.selectedRoom = { FloorName: "", IsValid: true };
  }

  public savePersonRoom(): void {
    this.subscriptions.push(
      this.personsService
        .changeRoom(this.newPersonData.Id, this.selectedRoom.Id)
        .subscribe(() => {
          this.toastrService.showToast("success", getString("saveSuccess"), "");
        })
    );
  }

  public openOfferDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { autoFocus: false });
  }

  public openAddDocumentModal(): void {
    this.subscriptions.push(
      this.dialogService
        .open(UploadDocumentComponent, {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: {
            personId: this.newPersonData.Id,
          },
        })
        .onClose.subscribe((result) => {
          if (result) this.getDocumentsForPerson();
        })
    );
  }

  private getDocumentsForPerson(): void {
    this.subscriptions.push(
      this.documentsService
        .getDocumentsForPerson(this.newPersonData.Id)
        .subscribe((data) => {
          this.documents = data;
        })
    );
  }

  public async onFileMenuItemClick(item: NbMenuItem): Promise<any> {
    switch (item.data.code) {
      case "download":
        this.subscriptions.push(
          this.documentsService.getDocumentContent(item.data.file.id).subscribe(
            (data) => {
              if (data) {
                this.toastrService.showToastWithCustumIcon(
                  "info",
                  getString("downloadStartSoon"),
                  "",
                  "download-outline"
                );
                fileDownload(
                  data.content,
                  data.document.Name + "." + data.document.Extension
                );
              }
            },
            (err) => {
              this.toastrService.showToast("danger", getString("fileNotFound"));
            }
          )
        );
        break;

      case "preview":
        this.subscriptions.push(
          this.documentsService.getDocumentContent(item.data.file.id).subscribe(
            (data) => {
              if (data)
                previewFile(
                  data.content,
                  data.document.Extension,
                  data.document.Name + "." + data.document.Extesion
                );
            },
            (err) => {
              this.toastrService.showToast("danger", getString("fileNotFound"));
            }
          )
        );
        break;
    }
  }

  public generateAccommodationRequest() {
    this.subscriptions.push(
      this.requestGeneratorService
        .generateRequest(this.newPersonData.Id)
        .subscribe(() => {
          this.getDocumentsForPerson();
        })
    );
  }
}
