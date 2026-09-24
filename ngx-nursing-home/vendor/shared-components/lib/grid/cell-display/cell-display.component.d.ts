import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { GridColumn } from '../../models/grid-column.model';
import { GRID_BUTTON_TYPE, GRID_DATA_TYPE } from '../../resources/mode-enums';
import { IGridCellButton } from '../../models/grid.model';
import { GridButtonType } from '../../models/grid-button-type.model';
import * as i0 from "@angular/core";
export declare class CellDisplayComponent implements OnInit, OnDestroy {
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    column: GridColumn;
    row: any;
    buttonClick: EventEmitter<IGridCellButton>;
    types: typeof GRID_DATA_TYPE;
    btnTypes: typeof GRID_BUTTON_TYPE;
    buttons: GridButtonType[];
    hexToRgbA(hex: string | undefined): string;
    onButtonClick(btn: GridButtonType): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CellDisplayComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CellDisplayComponent, "ngx-cell-display", never, { "column": "column"; "row": "row"; }, { "buttonClick": "buttonClick"; }, never, never, false, never>;
}
