import { EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class GridToolbarComponent implements OnInit {
    constructor();
    ngOnInit(): void;
    visible: boolean;
    selectedRowsTitleEnabled: boolean;
    selectionMultiple: boolean;
    selectedRows: number;
    selectedRowsTitle: string;
    addEnabled: boolean;
    addTooltip: string;
    addNewClicked: EventEmitter<any>;
    addNewClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridToolbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridToolbarComponent, "ngx-grid-toolbar", never, { "visible": "visible"; "selectedRowsTitleEnabled": "selectedRowsTitleEnabled"; "selectionMultiple": "selectionMultiple"; "selectedRows": "selectedRows"; "selectedRowsTitle": "selectedRowsTitle"; "addEnabled": "addEnabled"; "addTooltip": "addTooltip"; }, { "addNewClicked": "addNewClicked"; }, never, never, false, never>;
}
