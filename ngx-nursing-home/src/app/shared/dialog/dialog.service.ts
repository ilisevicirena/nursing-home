import {
  Injectable,
  OnDestroy,
  Optional,
  TemplateRef,
  Type,
} from "@angular/core";
import { NbDialogConfig, NbDialogRef, NbDialogService } from "@nebular/theme";
import { Location } from "@angular/common";
import { DialogComponent } from "./dialog/dialog.component";

@Injectable({
  providedIn: "root",
})
export class DialogService implements OnDestroy {
  private _dialogRefs: NbDialogRef<any>[] = [];

  constructor(
    @Optional() private _dialogService: NbDialogService,
    private _location: Location
  ) {
    this._location.onUrlChange((x) => this.ngOnDestroy());
  }

  ngOnDestroy(): void {
    while (this._dialogRefs.length) {
      this.close(this._dialogRefs.pop());
    }
  }

  public close(dialog: NbDialogRef<any>, result?: any): void {
    if (dialog) dialog.close(result);
  }

  public getActive(): NbDialogRef<any> {
    return this._dialogRefs.length
      ? this._dialogRefs[this._dialogRefs.length - 1]
      : new NbDialogRef<any>(null);
  }

  public open<T>(
    content: Type<T> | TemplateRef<T>,
    userConfig?: Partial<NbDialogConfig<Partial<T> | string>>,
    onClose?: Function
  ): NbDialogRef<T> {
    const dialogRef = this._dialogService.open(content, userConfig);
    this._dialogRefs.push(dialogRef);

    return dialogRef;
  }

  public async openYesNoDialog(title: string, body: string): Promise<number> {
    const dialogRef = this.open(DialogComponent, {
      context: {
        dialogTitle: title,
        dialogBody: body,
      },
      autoFocus: false,
    });

    return dialogRef.onClose.toPromise().then((result) => {
      return Promise.resolve(result);
    });
  }
}
