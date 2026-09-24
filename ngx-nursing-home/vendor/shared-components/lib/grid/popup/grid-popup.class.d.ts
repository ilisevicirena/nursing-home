import { EventEmitter } from '@angular/core';
import { GridColumn } from '../../models/grid-column.model';
import { IGridDeletePopupSettings, IGridRowMenuItem } from '../../models/grid.model';
export declare abstract class GridPopup {
    private static fileMenuItemClick;
    static getFileMenuItemClickEvent(): EventEmitter<IGridRowMenuItem>;
    static emitFileMenuItemClickEvent(model: IGridRowMenuItem): void;
    static getPopupConfiguration(isNew: boolean, editRecordTitle: string | undefined, columns: GridColumn[], data: any, saveBtnTitle: string | undefined, cancelBtnTitle: string | undefined, showMinimizeBtn: boolean, showMaximizeBtn: boolean, showFullScreenBtn: boolean, hasBacktrop: boolean, closeOnBackdropClick: boolean, closeOnEscClick: boolean, requiredTooltip: string | undefined): any;
    static getDeletePopupConfiguration(deletePopupSettings: IGridDeletePopupSettings): any;
}
