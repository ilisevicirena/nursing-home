import { GRID_DATE_PICKER, GRID_DATA_TYPE } from '../resources/mode-enums';
export declare abstract class GridColumnFilter {
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
    constructor();
    getTableSpecialFilter(): GRID_DATA_TYPE;
    getShow(): boolean;
    Show(x: boolean): GridColumnFilter;
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
}
export declare class GridTextboxFilter extends GridColumnFilter {
    constructor();
}
export declare class GridSelectFilter extends GridColumnFilter {
    constructor();
    DataSource(x: any[]): GridSelectFilter;
    KeyExpression(x: string): GridSelectFilter;
    DisplayExpression(x: string): GridSelectFilter;
    ServerDataSource(x: boolean): GridSelectFilter;
    ServerEndpoint(x: string): GridSelectFilter;
    ServerMethod(x: string): GridSelectFilter;
    ServerParams(x: any): GridSelectFilter;
    ClearText(x: string): GridSelectFilter;
}
export declare class GridNumberBoxFilter extends GridColumnFilter {
    constructor();
    Min(x: number): GridNumberBoxFilter;
    Max(x: number): GridNumberBoxFilter;
}
export declare class GridDateboxFilter extends GridColumnFilter {
    constructor();
    PickerType(x: GRID_DATE_PICKER): GridDateboxFilter;
    Format(x: string): GridDateboxFilter;
    FilterDates(x: any): GridDateboxFilter;
    ShowNavigation(x: boolean): GridDateboxFilter;
    ShowWeekNumbers(x: boolean): GridDateboxFilter;
    SingleColumn(x: boolean): GridDateboxFilter;
    ShowSeconds(x: boolean): GridDateboxFilter;
    TwelveHoursFormat(x: boolean): GridDateboxFilter;
    TimeStep(x: number): GridDateboxFilter;
    ApplyButtonText(x: string): GridDateboxFilter;
    CurrentTimeButtonText(x: string): GridDateboxFilter;
    ShowCurrentTimeButton(x: boolean): GridDateboxFilter;
    TimeText(x: string): GridDateboxFilter;
    HoursText(x: string): GridDateboxFilter;
    MinutesText(x: string): GridDateboxFilter;
    SecondsText(x: string): GridDateboxFilter;
    ShowFooter(x: boolean): GridDateboxFilter;
}
export declare class GridCheckboxFilter extends GridColumnFilter {
    constructor();
}
export declare class GridToggleFilter extends GridColumnFilter {
    constructor();
}
