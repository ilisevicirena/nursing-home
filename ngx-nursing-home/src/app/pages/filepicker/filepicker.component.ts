import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filepicker',
  templateUrl: './filepicker.component.html',
  styleUrls: ['./filepicker.component.scss']
})
export class NgxFilepickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public filepickerOnValueChanged(files: File[]) {
    alert("Value changed");
    console.log(files);
  }
}
