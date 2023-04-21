import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sample-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent implements OnInit {

  constructor() { }

  @Input() title: string = "";

  ngOnInit(): void {
  }

}
