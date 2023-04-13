import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateRangePickerEditor, DateRangeType, DateType, DatepickerEditor, DatepickerFilter, FILE_CARD_MODE, FileEditor, FileType, ProgressbarType, SelectEditor, SelectFilter, SmartTableColumn, SmartTableComponent, TagType, TimepickerEditor, ToggleEditor, ToggleType } from 'shared-components';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { SelectionChangedModel } from 'shared-components/lib/models/smart-table.model';

@Component({
  selector: 'smart-table-inline',
  templateUrl: './smart-table-inline.component.html',
  styleUrls: ['./smart-table-inline.component.scss']
})
export class SmartTableInlineComponent implements OnInit, OnDestroy {

  public data: any[] = [];
  public defaultPageOption: number = 20;
  public selectionEnabled: boolean = true;
  public selectionModeMultiple: boolean = true;

  private subscriptions: Subscription[] = [];

  @ViewChild(SmartTableComponent) table: SmartTableComponent;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.dataService.getSmartTableData().subscribe((data: any) => {
      this.data = data;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  public columnSettings: SmartTableColumn[] = [
    new SmartTableColumn("ID").Filter(false).Editable(false).Addable(false).Property("id"),
    new SmartTableColumn("Zbroj uključen").SpecialType(new ToggleType()).SpecialEditor(new ToggleEditor()).Property("sumIncluded"),
    new SmartTableColumn("Zadatak").Property("task"),
    new SmartTableColumn("Status").SpecialType(new TagType()).Property("status").Width("200px")
      .SpecialFilter(new SelectFilter("text", "text").ServerSource(true).ServerEndpoint("https://my.api.mockaroo.com/status_schema.json?key=444719d0"))
      .FilterFunction((cell?: any, search?: string) => {
        if (search.length > 0) {
          return cell.text.toLowerCase().match(search.toLowerCase());
        }
      })
      .Sort(false).SpecialEditor(new SelectEditor("text", "text").ServerSource(true).ServerEndpoint("https://my.api.mockaroo.com/status_schema.json?key=444719d0")).Sort(false),
    new SmartTableColumn("Završenost").Property("completed").SpecialType(new ProgressbarType()).Width("300px").Sort(false).Export(false),
    new SmartTableColumn("Datum otvaranja").Property("openedDate").Editable(false).SpecialEditor(new DatepickerEditor().Format("dd/MM/yyyy")
      .Filter(date => date.getDay() !== 0 && date.getDay() !== 6)).SpecialType(new DateType().Format("dd. MMMM yyyy."))
      .SpecialFilter(new DatepickerFilter().Filter(date => date.getDay() !== 0 && date.getDay() !== 6)),
    new SmartTableColumn("Vrijeme otvaranja").Property("openedTime").SpecialEditor(new TimepickerEditor().Format("HH:mm")).SpecialType(new DateType().Format("HH:mm")),
    new SmartTableColumn("Raspon").Property("range").Width("300px").SpecialEditor(new DateRangePickerEditor().Format("dd/MM/yyyy")).SpecialType(new DateRangeType().Format("dd/MM/yyyy")),
    new SmartTableColumn("Izvještaj").Property("file").Filter(false).Width("300px").SpecialType(new FileType().FileFromServer(true).BytesAttribute("file").KeyAttribute("id").ServerEndpoint("https://my.api.mockaroo.com/file_schema.json?key=444719d0").ListOfFiles(true).CanDelete(false).Mode(FILE_CARD_MODE.TABLE))
      .SpecialEditor(new FileEditor().Multiple(true).Accept(".pdf, .png, .jpg, .jpeg").MaxFiles(3)
        .ServerEndpoint("https://my.api.mockaroo.com/file_schema.json?key=444719d0").KeyAttribute("id").BytesAttribute("file").ListOfFiles(true)
        .FileFromServer(true).Mode(FILE_CARD_MODE.TABLE))
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
      event.newData.completed.value = 100;
    event.newData.completed.status = event.newData.status.status;
    this.table.updateRow(event.data, event.newData);
    event.confirm.resolve();
    */
    console.log(event);
  }

  public onRowCreateConfirm(event: any): void {
    /*
    if (event.newData.status.text == "Završeno")
      event.newData.completed.value = 100;
    event.newData.completed.status = event.newData.status.status;
    this.table.insertRow(event.data);
    event.confirm.resolve();*/
    console.log(event);
  }

  public onRowDeleteConfirm(event: any): void {
    this.table.deleteRow(event.data);
    event.confirm.resolve();
  }

}
