import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rest/rooms.service';

@Component({
  selector: 'sample-accomodation-management',
  templateUrl: './accomodation-management.component.html',
  styleUrls: ['./accomodation-management.component.scss']
})
export class AccomodationManagementComponent implements OnInit {

  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.roomsService.getAccomodationManagement().subscribe(data => {
      console.log(data)
    })
  }

}
