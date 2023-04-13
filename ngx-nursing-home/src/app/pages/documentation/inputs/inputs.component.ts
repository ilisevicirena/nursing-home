import { Component, Input, OnInit } from '@angular/core';
import { SampleInputs } from '../documentation.model';

@Component({
  selector: 'sample-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {

  constructor() { }

  @Input() public items: SampleInputs[] = [];

  ngOnInit(): void {
  }

}
