import { OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { IGridDeletePopupSettings } from '../../models/grid.model';
import * as i0 from "@angular/core";
export declare class DeletePopupComponent implements OnInit {
    private ref;
    settings: IGridDeletePopupSettings;
    constructor(ref: NbDialogRef<DeletePopupComponent>);
    ngOnInit(): void;
    onNoClick(): void;
    onYesClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeletePopupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DeletePopupComponent, "ngx-delete-popup", never, {}, {}, never, never, false, never>;
}
