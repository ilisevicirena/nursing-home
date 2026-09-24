import { ViewToggleButton } from '../models/schedule.model';
import { GRID_ACTIONS_POSITION, TABLE_ACTIONS_POSITION, TABLE_SOURCE_TYPES } from './mode-enums';
import { NbTagAppearance } from '@nebular/theme';
export declare const ICONS: {
    download: string;
    preview: string;
    delete: string;
};
export declare const FILE_SIZES: string[];
export declare const WINDOW_SIZE: {
    width: number;
    height: number;
};
export declare const PDF_PAGE_CONF: {
    columnsToPortrait: number;
    fontSize: number;
    pageSize: string;
    pageMargins: number[];
};
export declare const DATE_FORMATS: {
    date: string;
    dateTime: string;
    time: string;
};
export declare const EDITORS_CONF: {
    timepickerStep: number;
    filepickerMaxFiles: number;
    filepickerAccept: string;
    widthClass: string;
    textareaRows: number;
    testareaMaxChar: number;
    textboxType: string;
    buttonStatus: string;
};
export declare const TABLE_CONF: {
    entriesPerPageOptions: number[];
    exportDocName: string;
    sourceType: TABLE_SOURCE_TYPES;
    actionsPosition: TABLE_ACTIONS_POSITION;
};
export declare const GRID_CONF: {
    entriesPerPageOptions: number[];
    defaultEntriesPerPage: number;
    exportDocName: string;
    sourceType: TABLE_SOURCE_TYPES;
    actionsPosition: GRID_ACTIONS_POSITION;
};
export declare const GRID_EDITORS_CONF: {
    timepickerStep: number;
    filepickerMaxFiles: number;
    filepickerAccept: string;
    widthClass: string;
    textareaRows: number;
    testareaMaxChar: number;
    textboxType: string;
    buttonStatus: string;
};
export declare const PROGRESSBAR_SPINNER_CONF: {
    size: string;
    status: string;
    progressbarSize: string;
};
export declare const SCHEDULE_CONF: {
    tagAppereance: NbTagAppearance;
    startYear: number;
    endYear: number;
    tagWidth: string;
    firstTagTopSpaceing: string;
    tagHeight: number;
    betweenTagSpaceing: number;
    minWeekRowHeight: number;
    views: ViewToggleButton[];
};
