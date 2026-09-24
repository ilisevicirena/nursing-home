import { GridColumn } from '../../models/grid-column.model';
import { IGridExportHeader } from '../../models/grid.model';
export declare abstract class GridExport {
    static configureIGridExportHeaders(columns: GridColumn[]): IGridExportHeader[];
    static getFilename(item: any, header: IGridExportHeader): string;
}
