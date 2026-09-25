import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { DialogService } from "../dialog.service";
import { getString } from "../../../resources/strings";

@Component({
    selector: "sample-dialog",
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.scss"],
    standalone: false
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: NbDialogRef<DialogComponent>,
    private _dialogService: DialogService
  ) {}

  public dialogTitle: string;
  public dialogBody: string;
  public getString = getString;

  ngOnInit(): void {}

  public close(result: boolean): void {
    this.dialogRef.close(result);
    this._dialogService.ngOnDestroy();
  }
}
