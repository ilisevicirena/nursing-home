import { Component, OnInit, Output } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { FileData } from 'shared-components/lib/models/file-card.model';
import { SampleInputs } from '../documentation/documentation.model';

@Component({
  selector: 'sample-file-cards',
  templateUrl: './file-cards.component.html',
  styleUrls: ['./file-cards.component.scss']
})
export class FileCardsComponent implements OnInit {

  constructor() { }

  public fileData: FileData = {
    id: '1',
    filename: 'testni_file.pdf',
    extension: 'PDF',
    author: "Pero Perić",
    size: 35,
    sizeUnit: "MB"
  }

  public fileData2: FileData = {
    id: '1',
    filename: 'testni_file.pdf',
    extension: 'PDF',
    author: "Pero Perić",
    size: 35,
    sizeUnit: "MB",
    createdDate: "10.12.2021. 10:33"
  }

  public customFileOptions: NbMenuItem[] = [
    { title: "Posebna opcija 1", icon: "alert-circle-outline", data: { code: "specialOption1" } },
    { title: "Posebna opcija 2", icon: "alert-triangle-outline", data: { code: "specialOption2" } }
  ];

  ngOnInit(): void {
  }

  public onMenuClick(event: NbMenuItem): void {
    console.log(event);
  }

  // ------------------------------------------------------- DOCUMENTATION   ----------------------------------------------------

  public inputItems: SampleInputs[] = [
    {
      title: "canDownload",
      description: "omogućava/onemogućava opciju za preuzimanje dokumenta iz menija"
    },
    {
      title: "canPreview",
      description: "omogućava/onemogućava opciju za pregled dokumenta iz menija"
    },
    {
      title: "canDelete",
      description: "omogućava/onemogućava opciju za brisanje dokumenta iz menija"
    },
    {
      title: "deleteTitle",
      description: "naziv opcije za brisanje u meniju (default: Obriši)"
    },
    {
      title: "previewTitle",
      description: "naziv opcije za pregled u meniju (default: Pregledaj)"
    },
    {
      title: "downloadTitle",
      description: "naziv opcije za preuzimanje u meniju (default: Preuzmi)"
    },
    {
      title: "custumFileActions",
      description: "popis posebnih akcija za prikaz u meniju, opcije se šalju u obliku arraya, a svaka opcija je tipa NbMenuItem"
    },
    {
      title: "sizeTitle",
      description: "naziv za atribut veličina datoteke koji se prikazuje u sekciji s detaljima (default: Veličina)"
    },
    {
      title: "detailsEnabled",
      description: "omogućava/onemogućava prikaz sekcije s detaljima (default: true)"
    },
    {
      title: "authorTitle",
      description: "naziv za atribut autor datoteke koji se prikazuje u sekciji s detaljima (default: Autor)"
    },
    {
      title: "filenameTitle",
      description: "naziv za atribut naziv datoteke koji se prikazuje u sekciji s detaljima (default: Naziv)"
    },
    {
      title: "extensionTitle",
      description: "naziv za atribut vrsta datoteke koji se prikazuje u sekciji s detaljima (default: Vrsta)"
    },
    {
      title: "dateTitle",
      description: "naziv za atribut datum kreiranja datoteke koji se prikazuje u sekciji s detaljima (default: Stvoreno)"
    },
    {
      title: "mode",
      description: "vrsta prikaza datoteke, mogući prikazi su card, row, table i small-card, opcija je tipa FILE_CARD_MODE enum (default: FILE_CARD_MODE.CARD)"
    },
    {
      title: "useCustomPreview",
      description: "omogućava/onemogućava korištenje posebne opcije za pregled datoteke (default: false), ako se koristi custom preview onda se okida samo event nakon klika na opciju preview. Ako je opcija isključena koristi se ugrađena funkcija za pregled datoteke."
    },
    {
      title: "useCustomDownload",
      description: "omogućava/onemogućava korištenje posebne opcije za preuzimanje datoteke (default: false), ako se koristi custom download onda se okida samo event nakon klika na opciju download. Ako je opcija isključena koristi se ugrađena funkcija za preuzimanje datoteke."
    },
    {
      title: "fileFromServer",
      description: "daje uputu o tome jesu li base64 podaci o datoteci sa servera ili su zapisani lokalno unutar fileData objekta (default: false)"
    },
    {
      title: "serverEndpoint",
      description: "URL do mjesta na serveru s kojeg je datoteka (default: undefined)",
      hasWarning: true,
      warning: "Ukoliko se koristi fileFromServer mora biti definiran serverEndpoint",
      canBeUndefined: true
    },
    {
      title: "keyAttribute",
      description: "naziv atributa koji je ključ i koji se šalje na server kao parametar (default: undefined)",
      hasWarning: true,
      warning: "Ukoliko se koristi fileFromServer mora biti definiran keyAttribute",
      canBeUndefined: true
    },
    {
      title: "bytesAttribute",
      description: "naziv atributa koji sadrži base64 datoteke unutar objekta koji se dobije sa servera (default: undefined)",
      hasWarning: true,
      warning: "Ukoliko se koristi fileFromServer mora biti definiran bytesAttribute",
      canBeUndefined: true
    },
    {
      title: "fileData",
      description: "podaci o datoteci, podaci su tipa FileData",
    },
  ];

  public outputItems: SampleInputs[] = [
    {
      title: "fileMenuItemClick",
      description: "okida se nakon klika opcije iz menija, vraća opciju koja je selektirana te unutar opcije podatke o selektiranoj datoteci. Opcija je tipa NbMenuItem"
    }
  ];

  public methodsItems: SampleInputs[] = [];
}
