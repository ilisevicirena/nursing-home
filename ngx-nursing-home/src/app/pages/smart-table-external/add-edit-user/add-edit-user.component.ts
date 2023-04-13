import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'sample-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  constructor(public windowRef: NbWindowRef) { }

  public id: number = 0;
  public name: string;
  public username: string;
  public email: string;

  public isNew: boolean = true;

  ngOnInit(): void {
  }

  public onClickSpremi(): void {
    this.windowRef.close(true);
  }
}
