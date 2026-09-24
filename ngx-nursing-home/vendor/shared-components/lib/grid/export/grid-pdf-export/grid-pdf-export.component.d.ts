import { ElementRef, OnInit } from '@angular/core';
import { GRID_DATA_TYPE } from '../../../resources/mode-enums';
import { IGridExportDocumentSettings, IGridExportHeader } from '../../../models/grid.model';
import * as i0 from "@angular/core";
export declare class GridPdfExportComponent implements OnInit {
    headers: IGridExportHeader[];
    data: any[];
    specialTypes: typeof GRID_DATA_TYPE;
    content: ElementRef;
    settings: IGridExportDocumentSettings;
    constructor();
    ngOnInit(): void;
    exportPdf(data: any, headers: any): void;
    getFilename(item: any, header: IGridExportHeader): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridPdfExportComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridPdfExportComponent, "ngx-grid-pdf-export", never, { "settings": "settings"; }, {}, never, never, false, never>;
}
