import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rest/rooms.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sample-accomodation-management',
  templateUrl: './accomodation-management.component.html',
  styleUrls: ['./accomodation-management.component.scss']
})
export class AccomodationManagementComponent implements OnInit, OnDestroy {

  constructor(private roomsService: RoomsService) { }

  public noRoomPersons: any[] = [];
  public mainSource: any[] = [];

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
}
