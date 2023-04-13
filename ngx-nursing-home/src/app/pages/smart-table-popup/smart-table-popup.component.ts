import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonsEditor, ButtonsType, DateRangePickerEditor, DateRangeType, DateType, DatepickerEditor, FILE_CARD_MODE, FileEditor, FileType, ProgressbarEditor, ProgressbarType, SPECIAL_EDITOR_TYPES, SelectEditor, SmartTableColumn, SmartTableComponent, TABLE_MODE, TABLE_SPECIAL_TYPES, TagType, TextareaEditor, TextboxEditor, TimepickerEditor, ToggleEditor, ToggleType } from 'shared-components';
import { ButtonColumnClickModel, RowMenuItemClickModel, RowMenuSettings, SelectionChangedModel } from 'shared-components/lib/models/smart-table.model';
import { DataService } from '../../services/data.service';
import { NbMenuItem } from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sample-smart-table-popup',
  templateUrl: './smart-table-popup.component.html',
  styleUrls: ['./smart-table-popup.component.scss']
})
export class SmartTablePopupComponent implements OnInit, OnDestroy {

  public options: any[] = [];
  public data: any[] = [];
  public defaultPageOption: number = 20;
  public selectionEnabled: boolean = true;
  public rowMenuEnabled: boolean = true;
  public tableMode: TABLE_MODE = TABLE_MODE.POPUP;
  public selectionModeMultiple: boolean = true;
  public menuSettings: RowMenuSettings = {
    menuItems: [
      { title: 'Završi zadatak', icon: 'checkmark-circle-2-outline', data: { itemId: 1 } },
      { title: 'Zatvori zadatak', icon: 'close-circle-outline', data: { itemId: 2 } },
      { title: 'Ponovno otvori zadatak', icon: 'sync-outline', data: { itemId: 3 } },
    ],
    menuItemsFromRowData: true,
    rowDataAttributeForItems: 'menu',
  }

  private subscriptions: Subscription[] = [];

  @ViewChild(SmartTableComponent) table: SmartTableComponent;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.dataService.getSmartTableData().subscribe((data: any) => {
      this.data = data;
    }));

    this.subscriptions.push(this.dataService.getStatuses().subscribe((statuses: any) => {
      this.options = statuses;
      this.columns.find((x: SmartTableColumn) => x.getProperty() == "status").SpecialEditor(new SelectEditor("text", "text").Source(this.options).WidthClass("col-md-4"));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  public columns: SmartTableColumn[] = [
    new SmartTableColumn("ID").Property("id").Filter(false).SpecialEditor(new TextboxEditor().TextboxType("number").Min(1).Max(100).WidthClass("col-md-4").Visible(false)),
    new SmartTableColumn("Zbroj uključen").Property("sumIncluded").SpecialType(new ToggleType()).SpecialEditor(new ToggleEditor().WidthClass("col-md-4")),
    new SmartTableColumn("Zadatak").Property("task").SpecialEditor(new TextareaEditor()),
    new SmartTableColumn("Status").Property("status").Width("200px").Sort(false)
      .Filter({
        type: 'list',
        config: {
          selectText: 'Odaberi',
          list: [
            { value: 'Završeno', title: 'Završeno' },
            { value: 'U tijeku', title: 'U tijeku' },
            { value: 'Zatvoreno', title: 'Zatvoreno' },
          ],
        },
      })
      .FilterFunction((cell?: any, search?: string) => {
        if (search.length > 0) {
          return cell.text.toLowerCase().match(search.toLowerCase());
        }
      })
      .SpecialEditor(new SelectEditor("text", "text").Source(this.options).WidthClass("col-md-4")).SpecialType(new TagType()),
    new SmartTableColumn("Završenost").Property("completed").Width("300px").Sort(false).SpecialType(new ProgressbarType()).Export(false)
      .SpecialEditor(new ProgressbarEditor().ValueExpr("value").WidthClass("col-md-8")),
    new SmartTableColumn("Datum otvaranja").Property("openedDate").SpecialEditor(new DatepickerEditor().Format("dd/MM/yyyy").Filter(date => date.getDay() !== 0 && date.getDay() !== 6).WidthClass("col-md-4"))
      .SpecialType(new DateType().Format("dd. MMMM yyyy.")),
    new SmartTableColumn("Vrijeme otvaranja").Property("openedTime").SpecialEditor(new TimepickerEditor().Format("HH:mm").WidthClass("col-md-4")).SpecialType(new DateType().Format("HH:mm")),
    new SmartTableColumn("Raspon").Property("range").Width("300px").SpecialEditor(new DateRangePickerEditor().Format("dd/MM/yyyy").WidthClass("col-md-4"))
      .SpecialType(new DateRangeType().Format("dd/MM/yyyy")),
    new SmartTableColumn("Uključi/isključi zbroj").Property("buttons").SpecialEditor(new ButtonsEditor().Visible(false)).Export(false).SpecialType(new ButtonsType()),
    new SmartTableColumn("Izvještaj").Property("file").Width("300px").SpecialType(new FileType().FileFromServer(true).BytesAttribute("file").Mode(FILE_CARD_MODE.TABLE)
      .KeyAttribute("id").ServerEndpoint("https://my.api.mockaroo.com/file_schema.json?key=444719d0").ListOfFiles(true).WidthClass("col-md-3"))
      .SpecialEditor(new FileEditor().Multiple(true).MaxFiles(3).Accept(".pdf").Mode(FILE_CARD_MODE.TABLE).FileFromServer(true).BytesAttribute("file").Mode(FILE_CARD_MODE.ROW)
        .KeyAttribute("id").ServerEndpoint("https://my.api.mockaroo.com/file_schema.json?key=444719d0").ListOfFiles(true))
  ];

  public onSelectionChanged(event: SelectionChangedModel): void {
    console.log(event);
  }

  public onFiltersReseted(event: boolean): void {
    alert("Filteri resetirani");
  }

  public onRowEditConfirm(event: any): void {
    /*
    if (event.newData.status.text == "Završeno")
      event.newData.completed = 100;
    event.newData.completed = {
      value: event.newData.completed,
      status: event.newData.status.status,
      displayValue: true,
    }
    this.table.updateRow(event.data, event.newData);*/
    console.log(event)
  }

  public onRowCreateConfirm(event: any): void {
    console.log(event);
    /*
    if (event.newData.status.text == "Završeno")
      event.newData.completed = 100;
    event.newData.completed = {
      value: event.newData.completed,
      status: event.newData.status.status,
      displayValue: true,
    }
    this.table.insertRow(event.newData);*/
  }


  public onRowDeleteConfirm(event: any): void {
    this.table.deleteRow(event.data);
  }

  public onMenuItemClicked(event: RowMenuItemClickModel): void {
    console.log(event);

    //perform function of your own
    switch (event.menuItem.data.itemId) {
      case 1:
        var newData = event.rowData;
        newData.status = { status: 'success', text: 'Završeno' };
        newData.completed = { status: 'success', value: 100 };
        newData.menu = [
          { title: 'Zatvori zadatak', icon: 'close-circle-outline', data: { itemId: 2 } },
          { title: 'Ponovno otvori zadatak', icon: 'sync-outline', data: { itemId: 3 } }
        ];
        this.table.updateRow(event.rowData, newData);
        break;

      case 2:
        var newData = event.rowData;
        newData.status = { status: 'danger', text: 'Zatvoreno' };
        newData.completed.status = "danger";
        newData.menu = [
          { title: 'Završi zadatak', icon: 'checkmark-circle-2-outline', data: { itemId: 1 } },
          { title: 'Ponovno otvori zadatak', icon: 'sync-outline', data: { itemId: 3 } }
        ];
        this.table.updateRow(event.rowData, newData);
        break;

      case 3:
        var newData = event.rowData;
        newData.status = { status: 'basic', text: 'U tijeku' };
        newData.completed.status = "basic";
        newData.menu = [
          { title: 'Završi zadatak', icon: 'checkmark-circle-2-outline', data: { itemId: 1 } },
          { title: 'Zatvori zadatak', icon: 'close-circle-outline', data: { itemId: 2 } },
        ];
        this.table.updateRow(event.rowData, newData);
        break;
    }
  }

  public onButtonItemClicked(event: ButtonColumnClickModel): void {
    console.log(event);

    //perform function of your own
    switch (event.button.id) {
      case 'ukljuciZbroj':
        var newData = event.rowData;
        newData.sumIncluded = true;
        newData.buttons = [{ "text": "Isključi zbroj", "hero": true, "id": "iskljuciZbroj", "status": "warning", "icon": "toggle-left-outline", "size": "small" }];
        this.table.updateRow(event.rowData, newData);

        break;

      case 'iskljuciZbroj':
        var newData = event.rowData;
        newData.sumIncluded = false;
        newData.buttons = [{ "text": "Uključi zbroj", "hero": true, "id": "ukljuciZbroj", "status": "success", "icon": "toggle-right-outline", "size": "small" }];
        this.table.updateRow(event.rowData, newData);

        break;
    }
  }

  public fileMenuItemClicked(event: NbMenuItem): void {
    console.log(event)
  }

}
