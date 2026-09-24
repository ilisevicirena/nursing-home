import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { GridColumn } from '../../models/grid-column.model';
import { GRID_DATE_PICKER, GRID_DATA_TYPE } from '../../resources/mode-enums';
import { HttpClient } from '@angular/common/http';
import { IGridFilter } from '../../models/grid.model';
import { TranslationService } from '../../resources/translation.service';
import * as i0 from "@angular/core";
export declare class ColumnFilterComponent implements OnInit, OnDestroy {
    private http;
    private translationService;
    constructor(http: HttpClient, translationService: TranslationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    column: GridColumn;
    filterChanged: EventEmitter<IGridFilter>;
    private _subs;
    types: typeof GRID_DATA_TYPE;
    selectFilterDataSource: any[];
    datePickerTypes: typeof GRID_DATE_PICKER;
    value: any;
    private getDataSourceFromServer;
    onFilterChanged(): void;
    resetFilter(): void;
    onRangeChange(ev: any): void;
    rangePickerModelChange(ev: any): void;
    private translateEditorDefaultOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnFilterComponent, "ngx-column-filter", never, { "column": "column"; }, { "filterChanged": "filterChanged"; }, never, never, false, never>;
}
