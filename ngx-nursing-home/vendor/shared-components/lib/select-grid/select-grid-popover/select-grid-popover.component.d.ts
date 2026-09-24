import { AfterViewInit, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { GridColumn } from '../../models/grid-column.model';
import { GridComponent } from '../../grid/grid.component';
import { IGridSelection } from '../../models/grid.model';
import * as i0 from "@angular/core";
export declare class SelectGridPopoverComponent implements AfterViewInit, OnInit {
    private ref;
    width: number;
    selectGridId: string;
    columns: GridColumn[];
    multiple: boolean;
    source: any[];
    searchEnabled: boolean;
    selected: any;
    valueAttr: string;
    grid: GridComponent;
    gridSelectionChanged: EventEmitter<IGridSelection>;
    constructor(ref: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    selectionChanged(event: IGridSelection): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectGridPopoverComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectGridPopoverComponent, "ngx-select-grid-popover", never, { "width": "width"; "selectGridId": "selectGridId"; "columns": "columns"; "multiple": "multiple"; "source": "source"; "searchEnabled": "searchEnabled"; "selected": "selected"; "valueAttr": "valueAttr"; }, { "gridSelectionChanged": "gridSelectionChanged"; }, never, never, false, never>;
}
