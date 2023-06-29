import { Injectable, OnDestroy, Optional, TemplateRef, Type } from '@angular/core';
import { NbDialogConfig, NbDialogRef, NbDialogService } from '@nebular/theme';
import { Location } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService implements OnDestroy {

  private dialogRefs: NbDialogRef<any>[] = [];

  constructor(
    @Optional() private dialogService: NbDialogService,
    private location: Location,
  ) {
    this.location.onUrlChange(x => this.ngOnDestroy());
  }

  ngOnDestroy(): void {
    while (this.dialogRefs.length) {
      this.close(this.dialogRefs.pop());
    }
  }

  public close(dialog: NbDialogRef<any>, result?: any): void {
    if (dialog) dialog.close(result);
  }

  public getActive(): NbDialogRef<any> {
    return this.dialogRefs.length ? this.dialogRefs[this.dialogRefs.length - 1] : new NbDialogRef<any>(null);
  }

  public open<T>(content: Type<T> | TemplateRef<T>, userConfig?: Partial<NbDialogConfig<Partial<T> | string>>, onClose?: Function): NbDialogRef<T> {
    const dialogRef = this.dialogService.open(content, userConfig);
    this.dialogRefs.push(dialogRef);

    return dialogRef;
  }

  public async openYesNoDialog(title: string, body: string): Promise<number> {
    const dialogRef = this.open(DialogComponent, {
      context: {
        dialogTitle: title,
        dialogBody: body
      },
      autoFocus: false
    });

    return dialogRef.onClose
      .toPromise()
      .then(result => {
        return Promise.resolve(result);
      });
  }
}
