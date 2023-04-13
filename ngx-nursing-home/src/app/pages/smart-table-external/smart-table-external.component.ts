import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionChangedModel } from 'shared-components/lib/models/smart-table.model';
import { ServerSourceConf } from 'ng2-smart-table/lib/lib/data-source/server/server-source.conf';
import { NbWindowService } from '@nebular/theme';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { SmartTableColumn, SmartTableComponent, TABLE_SPECIAL_TYPES, UserType } from 'shared-components';

@Component({
  selector: 'sample-smart-table-external',
  templateUrl: './smart-table-external.component.html',
  styleUrls: ['./smart-table-external.component.scss']
})
export class SmartTableExternalComponent implements OnInit, AfterViewInit {

  constructor(private windowService: NbWindowService) { }

  @ViewChild(SmartTableComponent) smartTable: SmartTableComponent;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  public config: ServerSourceConf = {
    endPoint: "https://my.api.mockaroo.com/smart_table_external?key=6158fab0",
    sortFieldKey: 'order_by',
    sortDirKey: 'order',
    pagerPageKey: 'page',
    pagerLimitKey: 'page_size',
    filterFieldKey: '#field#',
    totalKey: 'total_items',
    dataKey: 'items'
  };

  public columns: SmartTableColumn[] = [
    new SmartTableColumn("").Property("user").Filter(false).SpecialType(new UserType().UserFieldIsObject(true).PictureAttribute("picture").NameAttribute("name").TitleAttribute("title")
      .ShowName(true).ShowTitle(true).Size("large").ShowInitials(true).UserPictureFromServer(true).ServerPictureAttribute("picture").ServerKeyAttributeForPicture("id")
      .ServerEndpoint("https://my.api.mockaroo.com/picture_shema.json?key=444719d0")),
    new SmartTableColumn("ID").Property("id"),
    new SmartTableColumn("Ime i prezime").Property("name"),
    new SmartTableColumn("Korisničko ime").Property("username"),
    new SmartTableColumn("Email").Property("email")
  ];

  public onSelectionChanged(event: SelectionChangedModel) {
    console.log(event);
  }

  public onFiltersReseted(event: boolean): void {
    alert("Filteri resetirani");
  }

  public onCreateStarted(): void {
    this.windowService.open(AddEditUserComponent, {
      title: "Dodaj korisnika",
      windowClass: "add-edit-user-window",
      context: {
        isNew: true,
        id: 0,
        name: undefined,
        username: undefined,
        email: undefined
      }
    }).onClose.subscribe((data: boolean) => {
      if (data) {
        this.smartTable.refreshSource();
      }
    });
  }

  public onEditStarted(event: any): void {
    this.windowService.open(AddEditUserComponent, {
      title: "Uredi korisnika",
      windowClass: "add-edit-user-window",
      context: {
        isNew: false,
        id: event.data.id,
        name: event.data.name,
        username: event.data.username,
        email: event.data.email
      }
    }).onClose.subscribe((data: boolean) => {
      if (data)
        this.smartTable.refreshSource();
    });
  }

  public onDeleteStarted(event: any): void {
    alert("Brisanje!");
    console.log(event);
  }
}
