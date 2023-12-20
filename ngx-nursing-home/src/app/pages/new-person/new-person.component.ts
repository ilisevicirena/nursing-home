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
    private _personsService: PersonsService,
    private _toastrService: ToastrService,
    private _roomsService: RoomsService,
    private _dialogService: DialogService,
    private _documentsService: DocumentsService,
    private _requestGeneratorService: AccommodationPdfRequestService
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

  private _subs: Subscription[] = [];

  ngOnInit(): void {
    this.getAvaliableRooms();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public saveNewPerson(form: NgForm): void {
    this.loading = true;
    this._subs.push(
      this._personsService.add(this.newPersonData).subscribe(
        (data) => {
          if (data.PersonId) {
            this.loading = false;
            this.newPersonData.Id = data.PersonId;
            form.form.markAsPristine();
            this._toastrService.showToast(
              "success",
              getString("saveSuccess"),
              ""
            );
          } else {
            this.loading = false;
            this._toastrService.showToast("danger", getString("saveError"), "");
          }
        },
        (err) => {
          console.error(err);
          this.loading = false;
          this._toastrService.showToast("danger", getString("saveError"), "");
        }
      )
    );
  }

  private getAvaliableRooms(): void {
    this._subs.push(
      this._roomsService.getAvaliableRooms().subscribe((data) => {
        this.rooms = data;
      })
    );
  }

  public onRoomSelectionChanged(event: any): void {
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
    this._subs.push(
      this._personsService
        .changeRoom(this.newPersonData.Id, this.selectedRoom.Id)
        .subscribe(() => {
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            ""
          );
        })
    );
  }

  public openOfferDialog(dialog: TemplateRef<any>): void {
    this._dialogService.open(dialog, { autoFocus: false });
  }

  public openAddDocumentModal(): void {
    this._subs.push(
      this._dialogService
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
    this._subs.push(
      this._documentsService
        .getDocumentsForPerson(this.newPersonData.Id)
        .subscribe((data) => {
          this.documents = data;
        })
    );
  }

  public async onFileMenuItemClick(item: NbMenuItem): Promise<any> {
    switch (item.data.code) {
      case "download":
        this._subs.push(
          this._documentsService
            .getDocumentContent(item.data.file.id)
            .subscribe(
              (data) => {
                if (data) {
                  this._toastrService.showToastWithCustumIcon(
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
              () => {
                this._toastrService.showToast(
                  "danger",
                  getString("fileNotFound")
                );
              }
            )
        );
        break;

      case "preview":
        this._subs.push(
          this._documentsService
            .getDocumentContent(item.data.file.id)
            .subscribe(
              (data) => {
                if (data)
                  previewFile(
                    data.content,
                    data.document.Extension,
                    data.document.Name + "." + data.document.Extesion
                  );
              },
              () => {
                this._toastrService.showToast(
                  "danger",
                  getString("fileNotFound")
                );
              }
            )
        );
        break;
    }
  }

  public generateAccommodationRequest(): void {
    this._subs.push(
      this._requestGeneratorService
        .generateRequest(this.newPersonData.Id)
        .subscribe(() => {
          this.getDocumentsForPerson();
        })
    );
  }
}
