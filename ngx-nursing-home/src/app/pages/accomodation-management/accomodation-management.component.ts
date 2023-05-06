import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rest/rooms.service';
import { Subscription } from 'rxjs';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PersonsService } from '../../services/rest/persons.service';
import { getString } from '../../resources/strings';

@Component({
  selector: 'sample-accomodation-management',
  templateUrl: './accomodation-management.component.html',
  styleUrls: ['./accomodation-management.component.scss']
})
export class AccomodationManagementComponent implements OnInit, OnDestroy {

  constructor(private roomsService: RoomsService, private personsService: PersonsService) { }

  public noRoomPersons: any[] = [];
  public mainSource: any[] = [];
  public getString = getString;

  private subscriptions: Subscription[] = [];
  private originalSource: any;

  ngOnInit(): void {
    this.getAccomodationManagement();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  private getAccomodationManagement(): void {
    this.mainSource = [];
    this.subscriptions.push(this.roomsService.getAccomodationManagement().subscribe(data => {
      if (data) {
        this.originalSource = data;
        this.noRoomPersons = data.Persons.filter(x => !x.RoomId);

        data.Floors.forEach(floor => {
          var newFloor = floor;
          newFloor.Rooms = data.Rooms.filter(x => x.FloorId == floor.Id);
          newFloor.Rooms.forEach(room => {
            room.People = data.Persons.filter(x => x.RoomId == room.Id);
          });

          this.mainSource.push(newFloor);
        });
      }
    }));
  }

  public drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer != event.container) {
      var personId = event.item.data.PersonId;
      var roomId = event.container.data[0].Id;

      if (personId && roomId) {
        // just save and reload
        this.subscriptions.push(this.personsService.changeRoom(personId, roomId).subscribe(() => {
          this.getAccomodationManagement();
        }));
      } else if (personId) {
        // just save and reload
        this.subscriptions.push(this.personsService.deactivateRoom(personId).subscribe(() => {
          this.getAccomodationManagement();
        }));
      }

    }
  }

  public checkCanDropInList(item: CdkDrag, dropList: CdkDropList) {
    var dropContainer = dropList.data[0];
    var canDrop: boolean = false;
    //check room capacity higher then 0, room has free space and person gender is same as other persons in room
    if (dropContainer.Capacity > 0 && dropContainer.FreeSpace > 0 && (dropContainer.RoomGenderId == null || dropContainer.RoomGenderId == item.data.GenderId)) canDrop = true;

    return canDrop;
  }
  public getConnectedTo(): string[] {
    var arr = [];
    if (this.originalSource) {
      arr = this.originalSource.Rooms.map(x => {
        return 'drop-room-' + x.Id;
      });
    } arr.push('no-room');

    return arr;
  }

}
