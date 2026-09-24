import { NbMenuItem } from '@nebular/theme';
import { FILE_CARD_MODE, GRID_DATA_TYPE, GRID_SORT } from '../resources/mode-enums';
import { GridColumn } from './grid-column.model';
import { GridButtonType } from './grid-button-type.model';
export interface IGridFilter {
    column: GridColumn;
    filterValue: any;
}
export interface IGridSort {
    column: GridColumn;
    sortState: GRID_SORT;
}
export interface IGridCellButton {
    button: GridButtonType;
    row: any;
}
export interface IGridExportDocumentSettings {
    title?: string;
    docName: string;
    subtitle?: string;
    showOrdinalNumbers: boolean;
    ordNumColumnName?: string;
    yesValueText?: string;
    noValueText?: string;
}
export interface IGridAddEditPopupSettings {
    newRecordTitle?: string;
    editRecordTitle?: string;
    saveBtnTitle?: string;
    requiredTooltip?: string;
    cancelBtnTitle?: string;
    showMinimizeBtn: boolean;
    showMaximizeBtn: boolean;
    showFullScreenBtn: boolean;
    closeOnBackdropClick: boolean;
    closeOnEscClick: boolean;
    hasBacktrop: boolean;
}
export interface IGridDeletePopupSettings {
    useDefaultDialog: boolean;
    title?: string;
    text?: string;
    yesBtnText?: string;
    noBtnText?: string;
    closeOnEsc: boolean;
    closeOnBackdropClick: boolean;
}
export interface IGridSelection {
    selectedRows: any[];
    currentRowEmitting: any;
    checked: boolean;
}
export interface IGridExportHeader {
    property: string;
    export: boolean;
    columnType: string;
    specialType: GRID_DATA_TYPE | undefined;
    headerToShow: string;
    format: string | undefined;
}
export interface IGridRowMenuItem {
    menuItem: NbMenuItem;
    rowData: any;
}
export interface IGridPopupEditor {
    id: string;
    label: string;
    disabledForAdding: boolean;
    disabledForEditing: boolean;
    type: GRID_DATA_TYPE;
    widthClass: string;
    valueExpr: string;
    displayExpr: string;
    source: any;
    format: string;
    filter: any;
    showNavigation: boolean;
    showWeekNumber: boolean;
    singleColumn: boolean;
    withSeconds: boolean;
    twelveHoursFormat: boolean;
    step: number;
    applyButtonText: string;
    timeTitle: string;
    currentTimeButtonText: string;
    amPmText: string;
    hoursText: string;
    minutesText: string;
    secondsText: string;
    showFooter: boolean;
    rows: number;
    required: boolean;
    textboxType: string;
    returnObjectAsValue: boolean;
    status: string;
    displayValue: boolean;
    min: number | undefined;
    max: number | undefined;
    numberStep: number | undefined;
    visible: boolean;
    multiple: boolean;
    displayFileSize: boolean;
    maxFiles: number;
    showAcceptedFormats: boolean;
    showMaxFilesNumber: boolean;
    accept: string;
    allowedFilesPlaceholder: string;
    buttonPlaceholder: string;
    emptyPlaceholder: string;
    maxFilesPlaceholder: string;
    maxFilesWarningMessage: string;
    fileSettings: IGridFileSettings;
    maxFilesInitial: number;
}
export interface IGridFileSettings {
    canDownload: boolean;
    canPreview: boolean;
    canDelete: boolean;
    deleteTitle: string;
    previewTitle: string;
    downloadTitle: string;
    customFileActions: NbMenuItem[];
    sizeTitle: string;
    detailsEnabled: boolean;
    authorTitle: string;
    filenameTitle: string;
    extensionTitle: string;
    dateTitle: string;
    mode: FILE_CARD_MODE;
    useCustomPreview: boolean;
    useCustomDownload: boolean;
    widthClass: string;
    listOfFiles: boolean;
    fileFromServer: boolean;
    bytesAttribute: string | undefined;
    keyAttribute: string | undefined;
    serverEndpoint: string | undefined;
}
export interface IGridGroup {
    column: GridColumn;
    grouped: boolean;
}
export interface IGridEditedRow {
    data: any;
    newData: any;
}
