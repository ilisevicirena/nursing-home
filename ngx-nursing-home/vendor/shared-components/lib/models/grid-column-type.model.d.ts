import { NbComponentShape, NbTagAppearance } from '@nebular/theme';
import { GRID_DATA_TYPE } from '../resources/mode-enums';
import { GridButtonType } from './grid-button-type.model';
export declare abstract class GridColumnType {
    protected _Type: GRID_DATA_TYPE;
    protected _Format: string;
    protected _LookupColumn: string;
    protected _ColorColumn: string;
    protected _Appearance: NbTagAppearance;
    protected _Shape: NbComponentShape;
    protected _DisplayValue: boolean;
    protected _Editable: boolean;
    protected _Removable: boolean;
    protected _ButtonsFromDataField: string | boolean;
    protected _Buttons: GridButtonType[];
    protected _IconColumn: string;
    protected _IsEvaIcon: boolean;
    constructor();
    getTableSpecialType(): GRID_DATA_TYPE;
    getFormat(): string;
    getLookupColumn(): string;
    getColorColumn(): string;
    getAppearance(): NbTagAppearance;
    getShape(): NbComponentShape;
    getDisplayValue(): boolean;
    getEditable(): boolean;
    getRemovable(): boolean;
    getButtonsFromDataField(): string | boolean;
    getButtons(): GridButtonType[];
    getIconColumn(): string;
    getIsEvaIcon(): boolean;
}
export declare class GridNumberColumn extends GridColumnType {
    constructor();
}
export declare class GridTextColumn extends GridColumnType {
    constructor();
}
export declare class GridDateColumn extends GridColumnType {
    constructor();
    Format(x: string): GridDateColumn;
}
export declare class GridToggleColumn extends GridColumnType {
    constructor();
}
export declare class GridCheckboxColumn extends GridColumnType {
    constructor();
}
export declare class GridTagColumn extends GridColumnType {
    constructor();
    LookupColumn(x: string): GridTagColumn;
    ColorColumn(x: string): GridTagColumn;
    IconColumn(x: string): GridTagColumn;
    Appearance(x: NbTagAppearance): GridTagColumn;
    Shape(x: NbComponentShape): GridTagColumn;
    IsEvaIcon(x: boolean): GridTagColumn;
}
export declare class GridProgressbarColumn extends GridColumnType {
    constructor();
    ColorColumn(x: string): GridProgressbarColumn;
    DisplayValue(x: boolean): GridProgressbarColumn;
}
export declare class GridDateRangeColumn extends GridColumnType {
    constructor();
    Format(x: string): GridDateRangeColumn;
}
export declare class GridLookupColumn extends GridColumnType {
    constructor();
    LookupColumn(x: string): GridLookupColumn;
}
export declare class GridButtonsColumn extends GridColumnType {
    constructor();
    Editable(x: boolean): GridButtonsColumn;
    Removable(x: boolean): GridButtonsColumn;
    ButtonsFromDataField(x: string | boolean): GridButtonsColumn;
    Buttons(x: GridButtonType[]): GridButtonsColumn;
}
export declare class GridColorpickerColumn extends GridColumnType {
    constructor();
}
