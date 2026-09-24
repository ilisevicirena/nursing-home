import { OnInit } from '@angular/core';
import { GRID_DATA_TYPE } from '../../../resources/mode-enums';
import { IGridExportDocumentSettings, IGridExportHeader } from '../../../models/grid.model';
import * as i0 from "@angular/core";
export declare class GridExcelExportComponent implements OnInit {
    headers: IGridExportHeader[];
    data: any[];
    specialTypes: typeof GRID_DATA_TYPE;
    settings: IGridExportDocumentSettings;
    constructor();
    ngOnInit(): void;
    exportExcel(data: any, headers: IGridExportHeader[]): void;
    getFilename(item: any, header: IGridExportHeader): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridExcelExportComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridExcelExportComponent, "ngx-grid-excel-export", never, { "settings": "settings"; }, {}, never, never, false, never>;
}
