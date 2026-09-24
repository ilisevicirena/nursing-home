import { GRID_DATE_PICKER, GRID_DATA_TYPE } from '../resources/mode-enums';
import { GridButtonType } from './grid-button-type.model';
export declare abstract class GridColumnEditor {
    private _Show;
    protected _Type: GRID_DATA_TYPE;
    protected _DataSource: any[];
    protected _KeyExpression: string;
    protected _DisplayExpression: string;
    protected _ServerDataSource: boolean;
    protected _ServerEndpoint: string;
    protected _ServerMethod: string;
    protected _ServerParams: any;
    protected _ClearText: string;
    protected _Min: number | undefined | Date;
    protected _Max: number | undefined | Date;
    protected _DatePickerType: GRID_DATE_PICKER;
    protected _Format: string;
    protected _FilterDates: any;
    protected _ShowNavigation: boolean;
    protected _ShowWeekNumbers: boolean;
    protected _SingleColumn: boolean;
    protected _ShowSeconds: boolean;
    protected _TwelveHoursFormat: boolean;
    protected _TimeStep: number;
    protected _ApplyButtonText: string;
    protected _CurrentTimeButtonText: string;
    protected _ShowCurrentTimeButton: boolean;
    protected _TimeText: string;
    protected _HoursText: string;
    protected _MinutesText: string;
    protected _SecondsText: string;
    protected _ShowFooter: boolean;
    private _Disabled;
    protected _Buttons: GridButtonType[];
    private _WidthClass;
    private _Label;
    private _Required;
    protected _Rows: number;
    protected _TextboxType: string;
    protected _Pattern: string;
    protected _LettersDisabled: boolean;
    protected _DisplayArrow: boolean;
    protected _AttributesToFilter: string[];
    protected _AttributesToShow: string[];
    protected _AttributesToShowInTag: string[];
    protected _Multiple: boolean;
    constructor();
    getTableSpecialEditor(): GRID_DATA_TYPE;
    getRows(): number;
    getTextboxType(): string;
    getShow(): boolean;
    Show(x: boolean): GridColumnEditor;
    getDataSource(): any[];
    getKeyExpression(): string;
    getDisplayExpression(): string;
    getServerDataSource(): boolean;
    getServerEndpoint(): string;
    getServerMethod(): string;
    getServerParams(): any;
    getClearText(): string;
    getMin(): number | undefined | Date;
    getMax(): number | undefined | Date;
    getDatePickerType(): GRID_DATE_PICKER;
    getFormat(): string;
    getFilterDates(): any;
    getShowNavigation(): boolean;
    getShowWeekNumbers(): boolean;
    getSingleColumn(): boolean;
    getShowSeconds(): boolean;
    getTwelveHoursFormat(): boolean;
    getTimeStep(): number;
    getApplyButtonText(): string;
    getCurrentTimeButtonText(): string;
    getShowCurrentTimeButton(): boolean;
    getTimeText(): string;
    getHoursText(): string;
    getMinutesText(): string;
    getSecondsText(): string;
    getShowFooter(): boolean;
    getDisabled(): boolean;
    Disabled(x: boolean): GridColumnEditor;
    getButtons(): GridButtonType[];
    WidthClass(x: string): GridColumnEditor;
    getWidthClass(): string;
    Label(x: string): GridColumnEditor;
    getLabel(): string;
    Required(x: boolean): GridColumnEditor;
    getRequired(): boolean;
    getPattern(): string;
    getLettersDisabled(): boolean;
    getDisplayArrow(): boolean;
    getAttributesToFilter(): string[];
    getAttributesToShow(): string[];
    getAttributesToShowInTag(): string[];
    getMultiple(): boolean;
}
export declare class GridTextboxEditor extends GridColumnEditor {
    constructor();
    Pattern(x: string): GridTextboxEditor;
    LettersDisabled(x: boolean): GridTextboxEditor;
}
export declare class GridSelectEditor extends GridColumnEditor {
    constructor();
    DataSource(x: any[]): GridSelectEditor;
    KeyExpression(x: string): GridSelectEditor;
    DisplayExpression(x: string): GridSelectEditor;
    ServerDataSource(x: boolean): GridSelectEditor;
    ServerEndpoint(x: string): GridSelectEditor;
    ServerMethod(x: string): GridSelectEditor;
    ServerParams(x: any): GridSelectEditor;
    ClearText(x: string): GridSelectEditor;
}
export declare class GridNumberBoxEditor extends GridColumnEditor {
    constructor();
    Min(x: number): GridNumberBoxEditor;
    Max(x: number): GridNumberBoxEditor;
}
export declare class GridDateboxEditor extends GridColumnEditor {
    constructor();
    PickerType(x: GRID_DATE_PICKER): GridDateboxEditor;
    Format(x: string): GridDateboxEditor;
    FilterDates(x: any): GridDateboxEditor;
    ShowNavigation(x: boolean): GridDateboxEditor;
    ShowWeekNumbers(x: boolean): GridDateboxEditor;
    SingleColumn(x: boolean): GridDateboxEditor;
    ShowSeconds(x: boolean): GridDateboxEditor;
    TwelveHoursFormat(x: boolean): GridDateboxEditor;
    TimeStep(x: number): GridDateboxEditor;
    ApplyButtonText(x: string): GridDateboxEditor;
    CurrentTimeButtonText(x: string): GridDateboxEditor;
    ShowCurrentTimeButton(x: boolean): GridDateboxEditor;
    TimeText(x: string): GridDateboxEditor;
    HoursText(x: string): GridDateboxEditor;
    MinutesText(x: string): GridDateboxEditor;
    SecondsText(x: string): GridDateboxEditor;
    ShowFooter(x: boolean): GridDateboxEditor;
}
export declare class GridCheckboxEditor extends GridColumnEditor {
    constructor();
}
export declare class GridToggleEditor extends GridColumnEditor {
    constructor();
}
export declare class GridActionsEditor extends GridColumnEditor {
    constructor();
    Buttons(x: GridButtonType[]): GridActionsEditor;
}
export declare class GridColorpickerEditor extends GridColumnEditor {
    constructor();
}
export declare class GridTextAreaEditor extends GridColumnEditor {
    constructor();
    Rows(x: number): GridTextAreaEditor;
    Max(x: number): GridTextAreaEditor;
}
export declare class GridAutocompleteEditor extends GridColumnEditor {
    constructor();
    DataSource(x: any[]): GridAutocompleteEditor;
    KeyExpression(x: string): GridAutocompleteEditor;
    DisplayExpression(x: string): GridAutocompleteEditor;
    ServerDataSource(x: boolean): GridAutocompleteEditor;
    ServerEndpoint(x: string): GridAutocompleteEditor;
    ServerMethod(x: string): GridAutocompleteEditor;
    ServerParams(x: any): GridAutocompleteEditor;
    DisplayArrow(x: boolean): GridAutocompleteEditor;
    AttributesToFilter(x: string[]): GridAutocompleteEditor;
    AttributesToShow(x: string[]): GridAutocompleteEditor;
    AttributesToShowInTag(x: string[]): GridAutocompleteEditor;
    Multiple(x: boolean): GridAutocompleteEditor;
}
