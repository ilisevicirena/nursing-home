import { OnDestroy, OnInit, QueryList } from '@angular/core';
import { GridColumn } from '../models/grid-column.model';
import { NbDialogService, NbMenuItem, NbMenuService, NbPosition, NbWindowService } from '@nebular/theme';
import { IGridAddEditPopupSettings, IGridCellButton, IGridDeletePopupSettings, IGridExportDocumentSettings, IGridFilter } from '../models/grid.model';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { GRID_ACTIONS_POSITION, GRID_MODE, GRID_SORT, GRID_STATE } from '../resources/mode-enums';
import { GridPdfExportComponent } from './export/grid-pdf-export/grid-pdf-export.component';
import { GridExcelExportComponent } from './export/grid-excel-export/grid-excel-export.component';
import { GridButtonType } from '../models/grid-button-type.model';
import { TranslationService } from '../resources/translation.service';
import * as i0 from "@angular/core";
export declare class GridComponent implements OnInit, OnDestroy {
    private _menuService;
    private _windowService;
    private _dialogService;
    private _translationService;
    constructor(_menuService: NbMenuService, _windowService: NbWindowService, _dialogService: NbDialogService, _translationService: TranslationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    _filtersChildren: QueryList<ColumnFilterComponent>;
    _exportPDFComponent: GridPdfExportComponent;
    _exportExcelComponent: GridExcelExportComponent;
    set data(value: any[]);
    get data(): any[];
    columns: GridColumn[];
    columnOptionsEnabled: boolean;
    entriesPerPageEnabled: boolean;
    entriesPerPageOptions: number[];
    pagerEnabled: boolean;
    defaultPerPageOption: number;
    entriesPerPageTooltip: string;
    exportPdfEnabled: boolean;
    exportPdfTooltip: string;
    exportExcelEnabled: boolean;
    exportExcelTooltip: string;
    customExportFunction: boolean;
    exportSettings: IGridExportDocumentSettings;
    selectionMultiple: boolean;
    selectRowByClick: boolean;
    selectAllEnabled: boolean;
    selectedRowsTitle: string;
    selectedRowsTitleEnabled: boolean;
    selectionEnabled: boolean;
    loadingEnabled: boolean;
    loadingMessage: string;
    loading: boolean;
    filtersEnabled: boolean;
    actionsPosition: GRID_ACTIONS_POSITION;
    actionsColumnTitle: string;
    addEnabled: boolean;
    addTooltip: string;
    editEnabled: boolean;
    deleteEnabled: boolean;
    addEditPopupSettings: IGridAddEditPopupSettings;
    deletePopupSettings: IGridDeletePopupSettings;
    refreshEnabled: boolean;
    refreshTooltip: string;
    noDataMessage: string;
    gridMode: GRID_MODE;
    rowHeight: number;
    private entriesPerPageSelectionChanged;
    private selectionChanged;
    private pageChanged;
    private sourceFiltersReseted;
    private sortChanged;
    private filterChanged;
    private pdfExport;
    private excelExport;
    private createConfirm;
    private editConfirm;
    private deleteConfirm;
    private actionBtnClick;
    private createStarted;
    private editStarted;
    private deleteStarted;
    private groupingChanged;
    private _data;
    private _selectedRows;
    private _subs;
    private _filters;
    private _sort;
    private _dockedColumns;
    private _rowInEditingInlineData;
    page: number;
    position: typeof NbPosition;
    sortStates: typeof GRID_SORT;
    dataToRender: any[];
    gridState: GRID_STATE;
    gridStates: typeof GRID_STATE;
    gridModes: typeof GRID_MODE;
    newRowData: any;
    groupedColumn: GridColumn | null;
    groupColspan: number;
    id: string;
    /**
     *
     */
    private checkAnyGroupedColumns;
    /**
     *
     * @param row selected row to be edited
     */
    private startGridEdit;
    /**
     *
     * @param row row data to be deleted
     */
    private startGridDelete;
    /**
     * Initializes columns context menus and subscribes to clicks if column context menu is enabled
     */
    private initializeColumnsContextMenus;
    /**
     * Initializes grid column for actions if some of actions are enabled
     */
    private initializeActionsColumn;
    /**
     * Performs action based on column context menu item that was clicked
     * @param item {NbMenuItem} object that is clicked
     */
    private onColumnContextMenuClick;
    /**
     * It saves selected column to _dockedColumns array and calculates docked columns positions in grid
     * @param column {GridColumn} instance that was selected to docking
     * @param dock {boolean} flag indicating whether dock or undock is performed
     */
    private onColumnDockingChange;
    /**
     * Refreshes rendered data by applied filtering, sorting and grouping columns
     */
    private refreshDataToRender;
    /**
     * It groups data based on selected column, only one column can be grouped at a time
     * @param column {GridColumn} instance that is selected for grouping
     * @param group {boolean} flag indicating whether grouping or ungrouping is performed
     */
    private onColumnGroupingChange;
    /**
     * It sorts data based on selected column and direction
     * @param asc {boolean} flag indicating whether ascending or descending sorting is performed
     * @param column {GridColumn} instance that is selected for sorting
     */
    private onColumnSortChange;
    /**
     * It opens add or edit grid popup
     * @param row row data to be edited, if undefined then add new action is performed
     */
    private openAddEditPopup;
    /**
     * Opens delete row confirmation dialog
     * @param row Row data to be deleted
     */
    private openDeletePopup;
    /**
     * Sets new grid state, sets state for all modes except external 'couse in external mode state cannot be changed back to none
     * @param state GRID_STATE to be set
     */
    private setGridState;
    /**
     * Resets grid state to none
     */
    private resetGridState;
    /**
     *
     * @returns Boolean indicating whether the grid can be modified
     */
    private gridCanBeModified;
    /**
     *
     * @param row row data to be saved, if null then save new row data
     */
    private saveInlineGridForm;
    private scrollGridToTop;
    /**
     *
     * @returns any[] array of selected rows
     */
    getSelectedRows(): any[];
    /**
     * Starts grid loading
     */
    startLoading(): void;
    /**
     * Stops grid loading
     */
    stopLoading(): void;
    /**
     * Toggle grid loading
     */
    toggleLoading(): void;
    /***
     * Selects specific rows by provided key
     * @param key String key on which to select
     * @param rows Array of rows to select, if no array is provided then it assumes single row selected
     */
    selectRows(rows: any, key: string): void;
    /**
     * Resets grid selection
     */
    unselectAll(): void;
    /**
     *
     * @param entriesPerPage Number of entries per page
     */
    onSelectedChangePagerPerPage(entriesPerPage: number): void;
    /**
     *
     * @param row Clicked row data
     * @param selected Boolean flag indicating whether row is selected or not
     */
    onSelectionCheckboxClick(row: any, selected: boolean): void;
    /**
     * Performs selection if selection by click is enabled and if clicked column is not button column (if buttons then button click event is fired)
     * if grid state is edit or insert it prevents selection
     * @param row Row data that was clicked
     * @param column Cell column that was clicked
     */
    onRowDataClick(row: any, column: GridColumn): void;
    /**
     *
     * @param selected Boolean flag indicating whether select all is performed or deselect all
     */
    onSelectAllCheckedChange(selected: boolean): void;
    /**
     * Emits pageChanged event
     */
    onPageChanged(): void;
    /**
     * Resets all filtering, sorting, grouping, selection and paging to default
     */
    onClickResetFilters(): void;
    /**
     *
     * @param selectedFilter Changed filter
     */
    onGridFilterChange(selectedFilter: IGridFilter): void;
    /**
     *
     * @param column Selected column to be sorted
     */
    onSortButtonClick(column: GridColumn): void;
    /**
     *
     * @param selectedButton Action button that was clicked
     */
    onActionButtonClick(selectedButton: IGridCellButton): void;
    addNewClick(): void;
    exportPdfBtnClick(): void;
    /**
     * Fires excelExport output event if customExportFunction is enabled.
     * If custumExportFunction is disabled initializes built in Excel export functionality.
     */
    exportExcelBtnClick(): void;
    /**
     * Calculates left column position in pixels for every docked column so it can stay sticky on horizontal scrolling
     * @returns {number} left column position for docked column, or null if column is not docked
     */
    calculateLeftPosition(column: GridColumn): any;
    /**
     * Grid toolbar is visible if addEnabled (add button is visible), selectionMultiple and selectionRowsTitle is enabled and something is selected
     * @returns {boolean} flag indicating whether the grid toolbar is visible
     */
    getGridToolbarVisibility(): boolean;
    /**
     * Footer is visible if any of buttons in footer is visible, otherwise grid height is full container height
     * @returns {boolean} flag indicating whether the footer is visible
     */
    getGridFooterVisibility(): boolean;
    /**
     *
     * @param btn GridButton that is clicked
     * @param row Selected row data
     */
    inlineEditCellBtnClick(btn: GridButtonType, row?: any): void;
    /**
     *
     * @param column Selected header column to apply class list
     * @returns {string} List of column classes
     */
    getColumnHeaderClassList(column: GridColumn): string;
    /**
     *
     * @param column Selected column to ungroup
     */
    onUngroupButtonClick(column: GridColumn): void;
    onGroupRowClick(row: any): void;
    onColumnContextMenuButtonClick(items: NbMenuItem[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridComponent, "ngx-grid", never, { "data": "data"; "columns": "columns"; "columnOptionsEnabled": "columnOptionsEnabled"; "entriesPerPageEnabled": "entriesPerPageEnabled"; "entriesPerPageOptions": "entriesPerPageOptions"; "pagerEnabled": "pagerEnabled"; "defaultPerPageOption": "defaultPerPageOption"; "exportPdfEnabled": "exportPdfEnabled"; "exportExcelEnabled": "exportExcelEnabled"; "customExportFunction": "customExportFunction"; "exportSettings": "exportSettings"; "selectionMultiple": "selectionMultiple"; "selectRowByClick": "selectRowByClick"; "selectAllEnabled": "selectAllEnabled"; "selectedRowsTitleEnabled": "selectedRowsTitleEnabled"; "selectionEnabled": "selectionEnabled"; "loadingEnabled": "loadingEnabled"; "loading": "loading"; "filtersEnabled": "filtersEnabled"; "actionsPosition": "actionsPosition"; "addEnabled": "addEnabled"; "editEnabled": "editEnabled"; "deleteEnabled": "deleteEnabled"; "addEditPopupSettings": "addEditPopupSettings"; "deletePopupSettings": "deletePopupSettings"; "refreshEnabled": "refreshEnabled"; "noDataMessage": "noDataMessage"; "gridMode": "gridMode"; "rowHeight": "rowHeight"; }, { "entriesPerPageSelectionChanged": "entriesPerPageSelectionChanged"; "selectionChanged": "selectionChanged"; "pageChanged": "pageChanged"; "sourceFiltersReseted": "sourceFiltersReseted"; "sortChanged": "sortChanged"; "filterChanged": "filterChanged"; "pdfExport": "pdfExport"; "excelExport": "excelExport"; "createConfirm": "createConfirm"; "editConfirm": "editConfirm"; "deleteConfirm": "deleteConfirm"; "actionBtnClick": "actionBtnClick"; "createStarted": "createStarted"; "editStarted": "editStarted"; "deleteStarted": "deleteStarted"; "groupingChanged": "groupingChanged"; }, never, never, false, never>;
}
