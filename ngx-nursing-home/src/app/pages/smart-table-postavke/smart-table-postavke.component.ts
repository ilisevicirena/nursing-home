import { Component, OnInit } from '@angular/core';
import { SampleInputs } from '../documentation/documentation.model';
import { getString } from 'shared-components';

@Component({
  selector: 'sample-smart-table-postavke',
  templateUrl: './smart-table-postavke.component.html',
  styleUrls: ['./smart-table-postavke.component.scss']
})
export class SmartTablePostavkeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public inputItems: SampleInputs[] = [
    {
      title: "settings",
      description: "settings object u obliku ng2-smart-table settingsa (ukoliko se ne želi koristiti ngx-smart-table setting)",
      hasWarning: true,
      warning: "Možda ne će skroz ispravno raditi"
    },
    {
      title: "columns",
      description: "objekt koji sadrži popis stupaca za tablic, atributi objekta su nazivi atributa iz podataka. Definicija atributa je tipa SmartTableColumn",
      hasWarning: true,
      warning: "Pogledati detaljnije definiciju tipa SmartTableColumn"
    },
    {
      title: "sourceType",
      description: "Vrsta izvora podataka tipa TABLE_SOURCE_TYPES (može biti LocalDataSource ili ServerDataSource), default: LocalDataSource, odnosno TABLE_SOURCE_TYPES.LOCAL"
    },
    {
      title: "data",
      description: "Array s podacima za prikaz ukoliko je source TABLE_SOURCE_TYPES.LOCAL",
      hasWarning: true,
      warning: "Mora biti definiran ako je izvor podataka LocalDataSource"
    },
    {
      title: "actionsPosition",
      description: "Pozicija stupca s akcijama, ako su akcije omogućene. Tipa TABLE_ACTIONS_POSITION, može biti right i left, default: right, odnosno: TABLE_ACTIONS_POSITION.RIGHT",
      hasWarning: true,
      warning: "Left još nije podržano"
    },
    {
      title: "actionsColumnTitle",
      description: "Naslov stupca s akcijama, default: 'Akcije'",
    },
    {
      title: "addEnabled",
      description: "Omogućuje/onemogućuje prikaz tipke za dodavanje novog zapisa, default: true"
    },
    {
      title: "editEnabled",
      description: "Omogućuje/onemogućuje prikaz tipki za uređivanje zapisa, default: true"
    },
    {
      title: "deleteEnabled",
      description: "Omogućuje/onemogućuje prikaz tipki za brisanje zapisa, default: true"
    },
    {
      title: "noDataMessage",
      description: "Poruka koja se prikazuje kada nema podataka u tablici, default: 'Nema podataka za prikaz'"
    },
    {
      title: "addBtnContent",
      description: "Sadržaj tipke za dodavanje novog zapisa, može biti kombinacija HTML-a i stringova, default: 'Dodaj novo<i class='fas fa- plus'></i>'"
    },
    {
      title: "editBtnContent",
      description: "Sadržaj tipke za uređivanje zapisa, može biti kombinacija HTML-a i stringova, default:'<i class='fas fa- pen'></i>'"
    },
    {
      title: "smTableDeleteBtn",
      description: "Sadržaj tipke za brisanje zapisa, može biti kombinacija HTML-a i stringova, default: '<i class='far fa- trash - alt'></i>'"
    },
    {
      title: "selectionEnabled",
      description: "Omogućava/onemogućava odabir redaka u tablici, default:false"
    },
    {
      title: "selctionModeMultiple",
      description: "Omogućava/onemogućava odabir više redaka u tablici, default:false",
      hasWarning: true,
      warning: "Za korištenje potrebno omogućiti property selectionEnabled"
    },
    {
      title: "refreshEnabled",
      description: "Prikazuje/sakriva tipku za resetiranje filtera u podnožju tablice, default:true"
    },
    {
      title: "refreshBtnTooltip",
      description: "Tekst za prikaz iznad tipke za reset filter na hover event, default: 'Resetiranje filtera'",
      hasWarning: true,
      warning: "Prazan string onemogućava tooltip"
    },
    {
      title: "tableMode",
      description: "Način rada tablice - odnosi se na dodavanje, uređivanje i brisanje zapisa. Tipa TABLE_MODE, može biti inline, external i popup, default: inline, odnosno TABLE_MODE.INLINE",
      hasWarning: true,
      warning: "Pogledati TABLE_MODE definiciju za detalje o načinima"
    },
    {
      title: "exportPdfEnabled",
      description: "Prikazuje/skriva tipku za PDF export podataka u podnožju tablice, default: true"
    },
    {
      title: "exportPdfTooltip",
      description: "Tekst za prikaz iznad tipke za PDF export na hover event, default: " + getString("smTablePdfExport"),
    },
    {
      title: "exportExcelEnabled",
      description: "Prikazuje/skriva tipku za Excel export podataka u podnožju tablice, default: true"
    },
    {
      title: "exportExcelTooltip",
      description: "Tekst za prikaz iznad tipke za Excel export na hover event, default: " + getString("smTableExcelExport"),
    },
    {
      title: "customExportFunction",
      description: "Omogućava/onemogućava defaulni export dokumenata, ako je isključeno okida se samo click event, default: false",
      hasWarning: true,
      warning: "Pogledati default export sekciju"
    },
    {
      title: "loadingEnabled",
      description: "Prikazuje/skriva loading spinner prilikom učitavanja i obrade podataka"
    },
    {
      title: "loadingMessage",
      description: "Poruka za prikaz prilikom učitavanja uz spinner, prazan string onemogućava prikaz poruke, ne može se koristiti kada loadingEnabled nije uključen, default: " + getString("smTableLoading")
    },
    {
      title: "entriesPerPageEnabled",
      description: "Prikazuje/skriva izbornik za broj zapisa po stranici, default:true"
    },
    {
      title: "entriesPerPageOptions",
      description: "Popis opcija za prikaz u izborniku broj zapisa po stranici, prosljeđuje se array s brojkama tj. number[], default: [5, 10, 15, 20, 25]"
    },
    {
      title: "pagerEnabled",
      description: "Omogućava/onemogućava straničenje, default: true"
    },
    {
      title: "defaultPerPageOption",
      description: "Odabrana opcija za prikaz zapisa po stranici ako je entriesPerPageEnabled uključeno, default: prva vrijednost iz arraya entriesPerPageOptions"
    },
    {
      title: "entriesPerPageTooltip",
      description: "Tooltip tekst za prikaz na hover preko izbornika za broj zapisa po stranici, prazan string isključuje tooltip, default: " + getString("smTableEntriesPerPage")
    },
    {
      title: "selectRowByClick",
      description: "Omogućava/onemogućava odabir redaka klikom na redak, samo ako je selectionEnabled uključen, default: false",
      hasWarning: true,
      warning: "Ne radi uvijek dobro"
    },
    {
      title: "rowMenuEnabled",
      description: "Omogućava, onemogućava kontekst meni nad redcima tablice, default: false"
    },
    {
      title: "selectedRowsTitle",
      description: "Tekst za prikaz broja odabranih redaka kada je omogućen višestruki odabir redaka, default: " + getString("smTableSelectedRows")
    },
    {
      title: "rowMenuSettings",
      description: "Postavke za kontekst meni, tipa RowMenuSettings, pogledati definiciju tipa RowMenuSettings",
      hasWarning: true,
      warning: "Obavezna definicija ukoliko je rowMenuEnabled omogućen"
    },
    {
      title: "exportSettings",
      description: "Postavke za defaultni export (ukoliko se koristi default), tipa ExportDocSettings, pogledati definicju tipa ExportDocSettings"
    },
    {
      title: "serverDataSourceConf",
      description: "Postavke za dohvat podataka sa servera, tipa ServerSourceConf, pogledati definiciju tipa ServerSourceConf",
      hasWarning: true,
      warning: "Obavezno ukoliko je source type ServerDataSource"
    },
    {
      title: "addEditPopupSettings",
      description: "Postavke pop-up prozora ukoliko je table mode popup, tipa AddEditPopupSettings, pogledati definiciju tipa AddEditPopupSettings"
    },
    {
      title: "deletePopupSettings",
      description: "Postavke pop-up prozora za brisanje retka ukoliko je table mode popup, tipa DeletePopupSettings, pogledati definiciju tipa DeletePopupSettings"
    },
  ];

  public outputItems: SampleInputs[] = [
    {
      title: "selectionChanged",
      description: "okida se na promjenu odabranog retka, vraća model tipa SelectionChangedModel"
    },
    {
      title: "sourceFiltersReseted",
      description: "okida se kada je kliknut gumb za resetiranje filtera"
    },
    {
      title: "createConfirm",
      description: "okida se kada je table mode inline ili popup i kliknut je gumb za spremanje, vraća podatke o kreiranom retku"
    },
    {
      title: "editConfirm",
      description: "okida se kada je table mode inline ili popup i kliknut je gumb za spremanje promjena nad retkom, vraća podatke o uređenom retku (stare i nove)"
    },
    {
      title: "deleteConfirm",
      description: "okida se kada je table mode inline ili popup i kliknut je gumb za brisanje retka, vraća podatke o odabranom retku za brisanje"
    },
    {
      title: "createStarted",
      description: "okida se kada je table mode external i kliknut je gumb za novi zapis"
    },
    {
      title: "editStarted",
      description: "okida se kada je table mode external i kliknut je gumb za uređivanje zapisa, vraća podatke o odabranom retku"
    },
    {
      title: "deleteStarted",
      description: "okida se kada je table mode external i kliknut je gumb za brisanje zapisa, vraća podatke o odabranom retku"
    },
    {
      title: "pdfExport",
      description: "okida se kada je kliknut gumb za PDF export, ako se ne koristi default fukcija za export na ovaj event je potrebno definirati kako će se podaci exportati"
    },
    {
      title: "excelExport",
      description: "okida se kada je kliknut gumb za Excel export, ako se ne koristi default fukcija za export na ovaj event je potrebno definirati kako će se podaci exportati"
    },
    {
      title: "entriesPerPageSelectionChanged",
      description: "okida se na promjenu opcije broja zapisa po stranici, vraća podatak o selektiranoj opciju tipa number"
    },
    {
      title: "rowClicked",
      description: "okida se na klik retka, vraća podatke o odabranom retku"
    },
    {
      title: "menuItemClicked",
      description: "okida se kada je omogućen kontekst meni nad tablicom i odabrana je opcija iz menija, vraća podatke tipa RowMenuItemClickModel"
    },
    {
      title: "buttonItemClicked",
      description: "okida se kada je kliknut gumb unutar stupca koji je posebnog button tipa, vraća podatke tipa ButtonColumnClickModel"
    },
    {
      title: "fileMenuItemClicked",
      description: "okida se kada je odabrana opcija iz menija unutar stupca koji sadrži datoteku, vraća podatke tipa RowMenuItemClickModel"
    }
  ];

  public methodsItems: SampleInputs[] = [
    {
      title: "getSelectedRows",
      description: "vraća array sa odabranim redcima"
    },
    {
      title: "updateRow",
      description: "ažurira odabrani reak unutar tablice kad je source ServerDataSource, prima parametre oldData - stari redak koji treba editirati, newData - novi podaci"
    }
  ];
}
