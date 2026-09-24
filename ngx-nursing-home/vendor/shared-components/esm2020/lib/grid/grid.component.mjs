import { Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { GridColumn } from '../models/grid-column.model';
import { GRID_CONF } from '../resources/defaults';
import { strings } from '../resources/strings';
import { NbPosition, } from '@nebular/theme';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { filter, map } from 'rxjs/operators';
import { GRID_ACTIONS_POSITION, GRID_BUTTON_TYPE, GRID_DATA_TYPE, GRID_MENU_ACTION, GRID_MODE, GRID_SORT, GRID_STATE, } from '../resources/mode-enums';
import { GridFilterService } from './grid-filter.service';
import { GridSortService } from './grid-sort.service';
import { GridButtonsColumn } from '../models/grid-column-type.model';
import { GridActionsEditor } from '../models/grid-column-editor.model';
import { GridExport } from './export/grid-export.class';
import { GridPdfExportComponent } from './export/grid-pdf-export/grid-pdf-export.component';
import { GridExcelExportComponent } from './export/grid-excel-export/grid-excel-export.component';
import { PopupComponent } from './popup/popup.component';
import { GridPopup } from './popup/grid-popup.class';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { GridValidationService } from './grid-validation.service';
import { GridGroupService } from './grid-group.service';
import { GridButtonType } from '../models/grid-button-type.model';
import { makeId, pushToArrayAtIndexRange } from '../functions/functions';
import * as i0 from "@angular/core";
import * as i1 from "@nebular/theme";
import * as i2 from "../resources/translation.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "./cell-display/cell-display.component";
import * as i6 from "./column-filter/column-filter.component";
import * as i7 from "./cell-edit/cell-edit.component";
import * as i8 from "./export/grid-pdf-export/grid-pdf-export.component";
import * as i9 from "./export/grid-excel-export/grid-excel-export.component";
import * as i10 from "./grid-footer/grid-footer.component";
import * as i11 from "./grid-toolbar/grid-toolbar.component";
import * as i12 from "ngx-pagination";
export class GridComponent {
    constructor(_menuService, _windowService, _dialogService, _translationService) {
        this._menuService = _menuService;
        this._windowService = _windowService;
        this._dialogService = _dialogService;
        this._translationService = _translationService;
        // -------------------------------------------------- VIEW CHILDREN ----------------------------------------------------
        this._filtersChildren = new QueryList();
        // ******************** COLUMNS SETTINGS ****************
        this.columns = []; // grid columns definition
        this.columnOptionsEnabled = true; // shows or hides columns context menu
        // ******************** PAGER SETTINGS ****************
        this.entriesPerPageEnabled = true; // shows or hides picker for entries per page
        this.entriesPerPageOptions = GRID_CONF.entriesPerPageOptions; // array with options for entries per page selection if entriesPerPage enabled
        this.pagerEnabled = true; // shows or hides table pager
        this.defaultPerPageOption = this.entriesPerPageOptions?.length > 0
            ? this.entriesPerPageOptions[0]
            : GRID_CONF.defaultEntriesPerPage; // starting value of pager -> if not set then first from entriesPerPageOptions array option is used
        this.entriesPerPageTooltip = this._translationService.translate('gridEntriesPerPageTooltip'); // tooltip to be shown on entries per pege selection hover -> empty string disables tooltip
        // ******************** EXPORT SETTINGS ****************
        this.exportPdfEnabled = true; // shows or hides export PDF button
        this.exportPdfTooltip = this._translationService.translate('gridExportPdfTooltip'); // tooltip to be shown on PDF export button hover -> empty string disables tooltip
        this.exportExcelEnabled = true; // shows or hides export Excel button
        this.exportExcelTooltip = this._translationService.translate('gridExcelExportTooltip'); // tooltip to be shown on Excel export button hover -> empty string disables tooltip
        this.customExportFunction = false; // if set to true click on export buttons fires only click event but doesn't do default export
        this.exportSettings = {
            title: undefined,
            subtitle: undefined,
            showOrdinalNumbers: true,
            ordNumColumnName: this._translationService.translate('gridTableOrdNumber'),
            docName: GRID_CONF.exportDocName,
            yesValueText: this._translationService
                .translate('gridTableYes')
                .toLowerCase(),
            noValueText: this._translationService
                .translate('gridTableNo')
                .toLowerCase(), // no (false) value for boolean data
        }; // setting object for built in export
        // ******************** SELECTION SETTINGS ****************
        this.selectionMultiple = false; // if false then selection mode is single -> depends on selectionEnabled (if not enabled then no selection mode is required)
        this.selectRowByClick = true; // enables or disables row selection by table row click
        this.selectAllEnabled = false; // enables or disables select all checkbox
        this.selectedRowsTitle = this._translationService.translate('gridSelectedRows'); // selected rows title when selection multiple enabled
        this.selectedRowsTitleEnabled = true; // show or hides number of selected rows when selection multiple enabled
        this.selectionEnabled = true; // enables/disables grid row selection
        // ******************** LOADING SETTINGS ****************
        this.loadingEnabled = true; // enables or disables spinner loading on table
        this.loadingMessage = this._translationService.translate('gridLoading'); // message to be shown on spinner loading if loading is enabled -> empty string disables message
        this.loading = false; // for manual triggering of load spinner, works correctly if automatic loading is disabled (loadingEnabled=false)
        // ******************** FILTERS SETTINGS ****************
        this.filtersEnabled = true; // show or hides filters row for all columns
        // ******************** ACTIONS SETTINGS ****************
        this.actionsPosition = GRID_CONF.actionsPosition; // can be left or right
        this.actionsColumnTitle = this._translationService.translate('gridActions'); // title for action column if actions are enabled
        this.addEnabled = true; // shows or hides add button
        this.addTooltip = this._translationService.translate('gridAddBtn'); // add button tooltip
        this.editEnabled = true; // shows or hides edit buttons on rows
        this.deleteEnabled = true; // shows or hides delete buttons on rows
        this.addEditPopupSettings = {
            newRecordTitle: this._translationService.translate('gridNewRecord'),
            editRecordTitle: this._translationService.translate('gridEditRecord'),
            saveBtnTitle: this._translationService.translate('gridSaveBtnText'),
            cancelBtnTitle: this._translationService.translate('gridCancelBtnText'),
            requiredTooltip: this._translationService.translate('gridRequiredTooltip'),
            hasBacktrop: true,
            showFullScreenBtn: true,
            showMaximizeBtn: true,
            showMinimizeBtn: true,
            closeOnBackdropClick: false,
            closeOnEscClick: false, // enables or disables popup closing on esc key press
        }; // setting object for add/edit popup if table mode popup
        this.deletePopupSettings = {
            useDefaultDialog: true,
            title: this._translationService.translate('gridDeleteConfirmTitle'),
            text: this._translationService.translate('gridDeleteConfirmText'),
            yesBtnText: this._translationService.translate('gridTableYes'),
            noBtnText: this._translationService.translate('gridTableNo'),
            closeOnBackdropClick: true,
            closeOnEsc: true, // enables or disables dialog closing on esc key press
        }; // setting object for delete dialog if table mode popup
        // ******************** GRID SETTINGS ****************
        this.refreshEnabled = true; // shows or hides refresh table button
        this.refreshTooltip = this._translationService.translate('gridRefreshTooltip'); // tooltip to be shown on Refresh button hover -> empty string disables tooltip
        this.noDataMessage = this._translationService.translate('gridNoData'); // message to be displayed when there's no data in source
        this.gridMode = GRID_MODE.INLINE; // grid insert and edit mode
        this.rowHeight = 0; // grid row height in px - if 0 then auto height
        // --------------------------------------------- OUTPUTS -----------------------------------------------------------
        this.entriesPerPageSelectionChanged = new EventEmitter(); // fires when selected option of entries per page changed
        this.selectionChanged = new EventEmitter(); // fires when selected row changed if selection is enabled
        this.pageChanged = new EventEmitter(); // fires when page changed
        this.sourceFiltersReseted = new EventEmitter(); // fires when reset button is clicked
        this.sortChanged = new EventEmitter(); // fires when sorting option changed
        this.filterChanged = new EventEmitter(); // fires when sorting option changed
        this.pdfExport = new EventEmitter(); // fires when PDF export button is clicked
        this.excelExport = new EventEmitter(); // fires when Excel export button is clicked
        this.createConfirm = new EventEmitter(); // fires if table mode inline or popup when save button is clicked on new record
        this.editConfirm = new EventEmitter(); // fires if table mode inline or popup when save button is clicked on new record
        this.deleteConfirm = new EventEmitter(); // fires if table mode inline or popup when save button is clicked on new record
        this.actionBtnClick = new EventEmitter(); // fires if grid action button is clicked
        this.createStarted = new EventEmitter(); // fires if table mode external when new record button is clicked
        this.editStarted = new EventEmitter(); // fires if table mode external when edit button on row is clicked
        this.deleteStarted = new EventEmitter(); // fires if table mode external when delete button on row is clicked
        this.groupingChanged = new EventEmitter(); // fires when column grouping is changed
        this._selectedRows = [];
        this._subs = [];
        this._filters = []; // all applied filters
        this._sort = []; // all applied sorting
        this._dockedColumns = []; // all docked columns
        // ------------------------------------------- PUBLIC FIELDS -------------------------------------------------------
        this.page = 1;
        this.position = NbPosition;
        this.sortStates = GRID_SORT;
        this.dataToRender = []; // filtered and sorted data to be rendered in table
        this.gridState = GRID_STATE.NONE; // current grid state
        this.gridStates = GRID_STATE;
        this.gridModes = GRID_MODE;
        this.newRowData = {}; // new row data for grid inline edit mode
        this.groupedColumn = null; // all grouped columns
        this.groupColspan = 1;
        this.id = makeId(30);
    }
    ngOnInit() {
        // check if translations are already loaded (from external app)
        if (!this._translationService.isTranslationsLoaded()) {
            this._translationService.setTranslations(strings);
        }
        // set columns indexes
        this.columns.map((x, index) => x.Index(index));
        // subscribe to column context menu click
        if (this.columnOptionsEnabled)
            this.initializeColumnsContextMenus();
        // if edit or delete enabled initialize actions column
        if (this.editEnabled || this.deleteEnabled)
            this.initializeActionsColumn();
        this.groupColspan = this.columns.length;
        if (this.selectionEnabled)
            this.groupColspan++;
    }
    ngOnDestroy() {
        this._subs.forEach((element) => {
            element.unsubscribe();
        });
    }
    // --------------------------------------------- INPUTS ----------------------------------------------------------------
    // ******************** DATA SOURCE SETTINGS ****************
    set data(value) {
        // reset row index if data source changed
        value = value.map((val, index) => {
            val._RowIndex = index;
            return val;
        });
        this._data = value;
        this.checkAnyGroupedColumns();
        this.refreshDataToRender(); // refresh data in table
        this._selectedRows = []; // reset selection if data source changed
    }
    get data() {
        return this._data;
    }
    // ------------------------------------------ PRIVATE METHODS -----------------------------------------------------
    /**
     *
     */
    checkAnyGroupedColumns() {
        var column = this.columns.find((x) => x.getGrouped());
        if (column)
            this.groupedColumn = column;
    }
    /**
     *
     * @param row selected row to be edited
     */
    startGridEdit(row) {
        if (this.gridCanBeModified()) {
            this.editStarted.emit({ data: row });
            if (this.gridMode == GRID_MODE.POPUP)
                this.openAddEditPopup(row);
            else if (this.gridMode == GRID_MODE.INLINE) {
                this._rowInEditingInlineData = JSON.parse(JSON.stringify(row));
                row.mode = 'edit';
            }
            this.setGridState(GRID_STATE.EDIT);
        }
    }
    /**
     *
     * @param row row data to be deleted
     */
    startGridDelete(row) {
        if (this.gridCanBeModified()) {
            this.deleteStarted.emit({ data: row });
            // if use default delete dialog open popup, default dialog doesn't depend on grid mode
            if (this.deletePopupSettings.useDefaultDialog)
                this.openDeletePopup(row);
            this.setGridState(GRID_STATE.DELETE);
        }
    }
    /**
     * Initializes columns context menus and subscribes to clicks if column context menu is enabled
     */
    initializeColumnsContextMenus() {
        this._subs.push(this._menuService
            .onItemClick()
            .pipe(filter(({ tag }) => {
            return tag?.startsWith('column-context-menu-' + this.id + '-');
        }), map(({ item }) => item))
            .subscribe((item) => {
            this.onColumnContextMenuClick(item);
        }));
    }
    /**
     * Initializes grid column for actions if some of actions are enabled
     */
    initializeActionsColumn() {
        var buttons = [];
        if (this.editEnabled)
            buttons.push(new GridButtonType()
                .Type(GRID_BUTTON_TYPE.EDIT)
                .Icon('edit-outline')
                .Tooltip(this._translationService.translate('gridEditTooltip')));
        if (this.deleteEnabled)
            buttons.push(new GridButtonType()
                .Type(GRID_BUTTON_TYPE.DELETE)
                .Icon('trash-outline')
                .Tooltip(this._translationService.translate('gridDeleteTooltip')));
        var actionColumn = new GridColumn()
            .Title(this.actionsColumnTitle)
            .Type(new GridButtonsColumn()
            .Editable(this.editEnabled)
            .Removable(this.deleteEnabled)
            .Buttons(buttons))
            .Sortable(false)
            .Filter(false)
            .Export(false)
            .GroupingEnabled(false)
            .Width('120px')
            .Editor(new GridActionsEditor().Buttons([
            new GridButtonType()
                .Type(GRID_BUTTON_TYPE.SAVE)
                .Icon('checkmark-outline')
                .Tooltip(this._translationService.translate('gridSaveTooltip')),
            new GridButtonType()
                .Type(GRID_BUTTON_TYPE.CANCEL)
                .Icon('close-outline')
                .Tooltip(this._translationService.translate('gridCancelTooltip')),
        ]));
        // default action columns position is right, otherwise action column needs to be set in first place in columns array (so it could be rendered on table start)
        if (this.actionsPosition == GRID_ACTIONS_POSITION.RIGHT)
            this.columns.push(actionColumn);
        else
            this.columns.unshift(actionColumn);
    }
    /**
     * Performs action based on column context menu item that was clicked
     * @param item {NbMenuItem} object that is clicked
     */
    onColumnContextMenuClick(item) {
        switch (item.data.action) {
            case GRID_MENU_ACTION.DOCK:
                this.onColumnDockingChange(item.data.column, true);
                break;
            case GRID_MENU_ACTION.UNDOCK:
                this.onColumnDockingChange(item.data.column, false);
                break;
            case GRID_MENU_ACTION.SORT_ASC:
                this.onColumnSortChange(true, item.data.column);
                break;
            case GRID_MENU_ACTION.SORT_DESC:
                this.onColumnSortChange(false, item.data.column);
                break;
            case GRID_MENU_ACTION.GROUP:
                this.onColumnGroupingChange(item.data.column, true);
                break;
            case GRID_MENU_ACTION.UNGROUP:
                this.onColumnGroupingChange(item.data.column, false);
                break;
            case GRID_MENU_ACTION.SHOW_GROUP_COUNT:
                item.data.column.ShowGroupCount(true);
                break;
            case GRID_MENU_ACTION.HIDE_GROUP_COUNT:
                item.data.column.ShowGroupCount(false);
                break;
        }
    }
    /**
     * It saves selected column to _dockedColumns array and calculates docked columns positions in grid
     * @param column {GridColumn} instance that was selected to docking
     * @param dock {boolean} flag indicating whether dock or undock is performed
     */
    onColumnDockingChange(column, dock) {
        column.Docked(dock);
        if (dock)
            this._dockedColumns.push(column);
        else {
            var index = this._dockedColumns.findIndex((x) => x.getId() == column.getId());
            this._dockedColumns.splice(index, 1);
        }
        // sort docked columns by index so left position can be calculated correctly
        this._dockedColumns.sort((a, b) => a.getIndex() - b.getIndex());
    }
    /**
     * Refreshes rendered data by applied filtering, sorting and grouping columns
     */
    refreshDataToRender() {
        var filteredData = GridFilterService.filterData(this._filters, this.data); // filter grid data by all set filters
        // sort filtered data
        if (this._sort.length > 0)
            var sortedData = GridSortService.sortData(filteredData, this._sort);
        else
            var sortedData = GridSortService.resetSort(filteredData);
        // group sorted and filtered data
        if (this.groupedColumn)
            this.dataToRender = GridGroupService.groupData(this.groupedColumn, sortedData);
        else
            this.dataToRender = sortedData;
    }
    /**
     * It groups data based on selected column, only one column can be grouped at a time
     * @param column {GridColumn} instance that is selected for grouping
     * @param group {boolean} flag indicating whether grouping or ungrouping is performed
     */
    onColumnGroupingChange(column, group) {
        if (group) {
            // check already grouped --> ungroup it first
            if (this.groupedColumn)
                this.groupedColumn.Grouped(false);
            this.groupedColumn = column;
        }
        else
            this.groupedColumn = null;
        column.Grouped(group);
        this.refreshDataToRender();
        this.groupingChanged.emit({ column: column, grouped: group });
    }
    /**
     * It sorts data based on selected column and direction
     * @param asc {boolean} flag indicating whether ascending or descending sorting is performed
     * @param column {GridColumn} instance that is selected for sorting
     */
    onColumnSortChange(asc, column) {
        column.setSortState(asc ? GRID_SORT.ASC : GRID_SORT.DESC);
        // try to find index of column for sorting, if it exists just update sort state
        var columnIndex = this._sort.findIndex((sort) => sort.column.getId() == column.getId());
        var sortState = column.getSortState();
        if (sortState != GRID_SORT.NONE) {
            if (columnIndex > -1)
                this._sort[columnIndex].sortState = sortState;
            // if column sorting already applied, then only change its sort state
            else
                this._sort.push({ sortState: sortState, column: column }); // otherwise add column sorting to sorts
        }
        else
            this._sort.splice(columnIndex, 1); // if sorting reseted for column --> delete column from sorts
        this.refreshDataToRender();
        this.sortChanged.emit({ column: column, sortState: column.getSortState() });
    }
    /**
     * It opens add or edit grid popup
     * @param row row data to be edited, if undefined then add new action is performed
     */
    openAddEditPopup(row = undefined) {
        this._subs.push(this._windowService
            .open(PopupComponent, GridPopup.getPopupConfiguration(row ? false : true, row
            ? this.addEditPopupSettings.editRecordTitle
            : this.addEditPopupSettings.newRecordTitle, this.columns, row, this.addEditPopupSettings.saveBtnTitle, this.addEditPopupSettings.cancelBtnTitle, this.addEditPopupSettings.showMinimizeBtn, this.addEditPopupSettings.showMaximizeBtn, this.addEditPopupSettings.showFullScreenBtn, this.addEditPopupSettings.hasBacktrop, this.addEditPopupSettings.closeOnBackdropClick, this.addEditPopupSettings.closeOnEscClick, this.addEditPopupSettings.requiredTooltip))
            .onClose.subscribe((data) => {
            if (typeof data !== 'boolean' && data !== undefined) {
                if (row)
                    this.editConfirm.emit(data);
                else
                    this.createConfirm.emit(data);
            }
            this.resetGridState();
        }));
    }
    /**
     * Opens delete row confirmation dialog
     * @param row Row data to be deleted
     */
    openDeletePopup(row) {
        this._subs.push(this._dialogService
            .open(DeletePopupComponent, GridPopup.getDeletePopupConfiguration(this.deletePopupSettings))
            .onClose.subscribe((data) => {
            if (data)
                this.deleteConfirm.emit({ data: row, newData: row });
            this.resetGridState();
        }));
    }
    /**
     * Sets new grid state, sets state for all modes except external 'couse in external mode state cannot be changed back to none
     * @param state GRID_STATE to be set
     */
    setGridState(state) {
        if (this.gridMode == GRID_MODE.POPUP || this.gridMode == GRID_MODE.INLINE)
            this.gridState = state;
        else
            this.resetGridState();
    }
    /**
     * Resets grid state to none
     */
    resetGridState() {
        this.gridState = GRID_STATE.NONE;
    }
    /**
     *
     * @returns Boolean indicating whether the grid can be modified
     */
    gridCanBeModified() {
        return this.gridState == GRID_STATE.NONE;
    }
    /**
     *
     * @param row row data to be saved, if null then save new row data
     */
    saveInlineGridForm(row = null) {
        var formIsValid = GridValidationService.validate(this.columns, row ?? this.newRowData);
        // save if form is valid
        if (formIsValid) {
            if (!row)
                this.createConfirm.emit(this.newRowData);
            else {
                this.editConfirm.emit({
                    data: this._rowInEditingInlineData,
                    newData: row,
                });
                row.mode = '';
            }
            this._rowInEditingInlineData = {};
            this.resetGridState();
        }
    }
    scrollGridToTop() {
        var list = document
            .getElementById(this.id)
            ?.getElementsByClassName('ngx-grid-table');
        if (list && list.length > 0)
            list[0].scrollTop = 0;
    }
    // ----------------------------------------- PUBLIC METHODS -------------------------------------------------------
    /**
     *
     * @returns any[] array of selected rows
     */
    getSelectedRows() {
        return this._selectedRows;
    }
    /**
     * Starts grid loading
     */
    startLoading() {
        this.loading = true;
    }
    /**
     * Stops grid loading
     */
    stopLoading() {
        this.loading = false;
    }
    /**
     * Toggle grid loading
     */
    toggleLoading() {
        this.loading = !this.loading;
    }
    /***
     * Selects specific rows by provided key
     * @param key String key on which to select
     * @param rows Array of rows to select, if no array is provided then it assumes single row selected
     */
    selectRows(rows, key) {
        if (!Array.isArray(rows))
            rows = [rows];
        rows.forEach((element) => {
            var row = this._data.find((x) => x[key] == element);
            if (row) {
                row.selected = true;
                this.onSelectionCheckboxClick(row, true);
            }
        });
    }
    /**
     * Resets grid selection
     */
    unselectAll() {
        this._selectedRows = [];
        this._data.map((x) => (x.selected = false));
    }
    // ------------------------------------------ DOM LISTENERS -------------------------------------------------------
    /**
     *
     * @param entriesPerPage Number of entries per page
     */
    onSelectedChangePagerPerPage(entriesPerPage) {
        this.page = 1; // reset page to start
        this.entriesPerPageSelectionChanged.emit(entriesPerPage);
        this.onPageChanged();
    }
    /**
     *
     * @param row Clicked row data
     * @param selected Boolean flag indicating whether row is selected or not
     */
    onSelectionCheckboxClick(row, selected) {
        // if single selection first deselect current selected row and reset selectedRows array, then push new selected row
        if (!this.selectionMultiple) {
            this._selectedRows.map((row) => (row.selected = false));
            this._selectedRows = [];
            if (selected)
                this._selectedRows.push(row);
        }
        else {
            if (selected)
                this._selectedRows.push(row);
            else {
                row.selected = false;
                this._selectedRows = this._selectedRows.filter((row) => row.selected == true);
            }
        }
        // emit selection event
        this.selectionChanged.emit({
            selectedRows: this._selectedRows,
            currentRowEmitting: row,
            checked: selected,
        });
    }
    /**
     * Performs selection if selection by click is enabled and if clicked column is not button column (if buttons then button click event is fired)
     * if grid state is edit or insert it prevents selection
     * @param row Row data that was clicked
     * @param column Cell column that was clicked
     */
    onRowDataClick(row, column) {
        if (this.selectionEnabled) {
            if (this.selectRowByClick &&
                column.getType() != GRID_DATA_TYPE.BUTTONS &&
                this.gridCanBeModified()) {
                row.selected = !row.selected;
                this.onSelectionCheckboxClick(row, row.selected);
            }
        }
    }
    /**
     *
     * @param selected Boolean flag indicating whether select all is performed or deselect all
     */
    onSelectAllCheckedChange(selected) {
        if (selected) {
            this.data.map((row) => (row.selected = true));
            this._selectedRows = this.data;
        }
        else {
            this._selectedRows.map((x) => (x.selected = false));
            this._selectedRows = [];
        }
        // emit selection event
        this.selectionChanged.emit({
            selectedRows: this._selectedRows,
            currentRowEmitting: {},
            checked: selected,
        });
    }
    /**
     * Emits pageChanged event
     */
    onPageChanged() {
        this.scrollGridToTop();
        this.pageChanged.emit(this.page);
    }
    /**
     * Resets all filtering, sorting, grouping, selection and paging to default
     */
    onClickResetFilters() {
        // deselect all rows
        this.onSelectAllCheckedChange(false);
        // reset pageing to first page
        this.page = 1;
        // reset all set filters
        if (this._filtersChildren.length > 0) {
            this._filtersChildren.forEach((element) => {
                element.resetFilter();
            });
        }
        this._filters = [];
        // reset all set sorting
        this._sort = [];
        this.columns.map((column) => column.setSortState(GRID_SORT.NONE));
        // reset grouping
        this.groupedColumn?.Grouped(false);
        this.groupedColumn = null;
        // refresh rendered data
        this.refreshDataToRender();
        // scroll grid
        this.scrollGridToTop();
        // emit grid filter reset event
        this.sourceFiltersReseted.emit(true);
    }
    /**
     *
     * @param selectedFilter Changed filter
     */
    onGridFilterChange(selectedFilter) {
        var columnIndex = this._filters.findIndex((filter) => filter.column.getId() == selectedFilter.column.getId()); // check if column is already filtered
        const filterNotReseted = (selectedFilter.filterValue != '' &&
            selectedFilter.filterValue != null &&
            selectedFilter.filterValue != undefined) ||
            selectedFilter.filterValue == false; // if filter value is cleared then treat it as filter reset --> here we check if there is any value in filter
        if (filterNotReseted) {
            if (columnIndex > -1)
                this._filters[columnIndex].filterValue = selectedFilter.filterValue;
            // if column already filtered then just alter its filter value
            else
                this._filters.push(selectedFilter); // otherwise push new filter
        }
        else
            this._filters.splice(columnIndex, 1); // if empty filter value then remove column from filtering
        this.refreshDataToRender();
        this.filterChanged.emit(selectedFilter);
    }
    /**
     *
     * @param column Selected column to be sorted
     */
    onSortButtonClick(column) {
        this.onColumnSortChange(column.getSortState() == GRID_SORT.ASC ? false : true, column);
    }
    /**
     *
     * @param selectedButton Action button that was clicked
     */
    onActionButtonClick(selectedButton) {
        switch (selectedButton.button.getType()) {
            case GRID_BUTTON_TYPE.EDIT:
                this.startGridEdit(selectedButton.row);
                break;
            case GRID_BUTTON_TYPE.DELETE:
                this.startGridDelete(selectedButton.row);
                break;
            case GRID_BUTTON_TYPE.OTHER:
                this.actionBtnClick.emit(selectedButton);
                break;
        }
    }
    addNewClick() {
        if (this.gridCanBeModified()) {
            this.newRowData = {}; // rest new row data
            this.createStarted.emit(true);
            if (this.gridMode == GRID_MODE.POPUP)
                this.openAddEditPopup();
            this.setGridState(GRID_STATE.INSERT);
        }
    }
    /*
      Fires pdfExport output event if customExportFunction is enabled.
      If custumExportFunction is disabled initializes built in PDF export functionality.
    */
    exportPdfBtnClick() {
        if (this.customExportFunction)
            this.pdfExport.emit(true);
        else {
            var dataToExport = GridGroupService.ungroupData(this.dataToRender);
            if (this.loadingEnabled)
                this.loading = true;
            if (dataToExport?.length > 0) {
                var headers = GridExport.configureIGridExportHeaders(this.columns);
                this._exportPDFComponent.exportPdf(dataToExport, headers);
                if (this.loadingEnabled)
                    this.loading = false;
            }
            else {
                if (this.loadingEnabled)
                    this.loading = false;
            }
        }
    }
    /**
     * Fires excelExport output event if customExportFunction is enabled.
     * If custumExportFunction is disabled initializes built in Excel export functionality.
     */
    exportExcelBtnClick() {
        if (this.customExportFunction)
            this.excelExport.emit(true);
        else {
            var dataToExport = GridGroupService.ungroupData(this.dataToRender);
            if (this.loadingEnabled)
                this.loading = true;
            if (dataToExport?.length > 0) {
                var headers = GridExport.configureIGridExportHeaders(this.columns);
                this._exportExcelComponent.exportExcel(dataToExport, headers);
                if (this.loadingEnabled)
                    this.loading = false;
            }
            else {
                if (this.loadingEnabled)
                    this.loading = false;
            }
        }
    }
    /**
     * Calculates left column position in pixels for every docked column so it can stay sticky on horizontal scrolling
     * @returns {number} left column position for docked column, or null if column is not docked
     */
    calculateLeftPosition(column) {
        if (column.getDocked()) {
            let leftPosition = 0;
            var index = this._dockedColumns.findIndex((x) => x.getId() == column.getId());
            for (let i = 0; i < index; i++) {
                const element = document.getElementById(this._dockedColumns[i].getId());
                if (element) {
                    const width = element.offsetWidth;
                    leftPosition += width;
                }
            }
            return leftPosition;
        }
        return null;
    }
    /**
     * Grid toolbar is visible if addEnabled (add button is visible), selectionMultiple and selectionRowsTitle is enabled and something is selected
     * @returns {boolean} flag indicating whether the grid toolbar is visible
     */
    getGridToolbarVisibility() {
        return (this.addEnabled ||
            (this.selectionMultiple &&
                this.getSelectedRows().length > 0 &&
                this.selectedRowsTitleEnabled));
    }
    /**
     * Footer is visible if any of buttons in footer is visible, otherwise grid height is full container height
     * @returns {boolean} flag indicating whether the footer is visible
     */
    getGridFooterVisibility() {
        return (this.refreshEnabled ||
            this.exportPdfEnabled ||
            this.exportExcelEnabled ||
            this.entriesPerPageEnabled ||
            this.pagerEnabled);
    }
    /**
     *
     * @param btn GridButton that is clicked
     * @param row Selected row data
     */
    inlineEditCellBtnClick(btn, row = null) {
        switch (btn.getType()) {
            case GRID_BUTTON_TYPE.SAVE:
                this.saveInlineGridForm(row);
                break;
            case GRID_BUTTON_TYPE.CANCEL:
                if (row)
                    row.mode = '';
                this.resetGridState();
                break;
            case GRID_BUTTON_TYPE.OTHER:
                this.actionBtnClick.emit({ row: row, button: btn });
                break;
        }
    }
    /**
     *
     * @param column Selected header column to apply class list
     * @returns {string} List of column classes
     */
    getColumnHeaderClassList(column) {
        var classList = 'sticky-th';
        if (column.getSortState() != GRID_SORT.NONE)
            classList += ' sorted';
        if (column.getDocked())
            classList += ' docked docked-header';
        if (column.getGrouped())
            classList += ' grouped';
        return classList;
    }
    /**
     *
     * @param column Selected column to ungroup
     */
    onUngroupButtonClick(column) {
        this.onColumnGroupingChange(column, false);
    }
    onGroupRowClick(row) {
        row._GroupExpanded = !row._GroupExpanded;
        if (row._GroupExpanded) {
            // on expand insert collapsed row data into dataToRender
            pushToArrayAtIndexRange(this.dataToRender, row._GroupCollapsedElements, row._GroupFirstElementIndex);
            row._GroupCollapsedElements = null;
        }
        else {
            var firstRowIndex = this.dataToRender.findIndex((x) => x._RowIndex === row._GroupFirstElement._RowIndex);
            // delete group rows from dataToRender
            if (firstRowIndex > -1) {
                row._GroupFirstElementIndex = firstRowIndex;
                row._GroupCollapsedElements = this.dataToRender.splice(firstRowIndex, row._GroupCount);
            }
        }
    }
    onColumnContextMenuButtonClick(items) {
        setTimeout(() => {
            var elements = document.getElementsByClassName('ngx-grid-column-context-menu');
            if (elements.length > 0) {
                var element = elements[0];
                element
                    .closest('.cdk-overlay-container')
                    ?.classList.add('ngx-grid-context-menu-cdk-overlay-container');
                // translate menu items title
                items.forEach((item) => {
                    item.title = this._translationService.translate(item.title);
                });
            }
        }, 100);
    }
}
GridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridComponent, deps: [{ token: i1.NbMenuService }, { token: i1.NbWindowService }, { token: i1.NbDialogService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
GridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: GridComponent, selector: "ngx-grid", inputs: { data: "data", columns: "columns", columnOptionsEnabled: "columnOptionsEnabled", entriesPerPageEnabled: "entriesPerPageEnabled", entriesPerPageOptions: "entriesPerPageOptions", pagerEnabled: "pagerEnabled", defaultPerPageOption: "defaultPerPageOption", exportPdfEnabled: "exportPdfEnabled", exportExcelEnabled: "exportExcelEnabled", customExportFunction: "customExportFunction", exportSettings: "exportSettings", selectionMultiple: "selectionMultiple", selectRowByClick: "selectRowByClick", selectAllEnabled: "selectAllEnabled", selectedRowsTitleEnabled: "selectedRowsTitleEnabled", selectionEnabled: "selectionEnabled", loadingEnabled: "loadingEnabled", loading: "loading", filtersEnabled: "filtersEnabled", actionsPosition: "actionsPosition", addEnabled: "addEnabled", editEnabled: "editEnabled", deleteEnabled: "deleteEnabled", addEditPopupSettings: "addEditPopupSettings", deletePopupSettings: "deletePopupSettings", refreshEnabled: "refreshEnabled", noDataMessage: "noDataMessage", gridMode: "gridMode", rowHeight: "rowHeight" }, outputs: { entriesPerPageSelectionChanged: "entriesPerPageSelectionChanged", selectionChanged: "selectionChanged", pageChanged: "pageChanged", sourceFiltersReseted: "sourceFiltersReseted", sortChanged: "sortChanged", filterChanged: "filterChanged", pdfExport: "pdfExport", excelExport: "excelExport", createConfirm: "createConfirm", editConfirm: "editConfirm", deleteConfirm: "deleteConfirm", actionBtnClick: "actionBtnClick", createStarted: "createStarted", editStarted: "editStarted", deleteStarted: "deleteStarted", groupingChanged: "groupingChanged" }, viewQueries: [{ propertyName: "_exportPDFComponent", first: true, predicate: GridPdfExportComponent, descendants: true }, { propertyName: "_exportExcelComponent", first: true, predicate: GridExcelExportComponent, descendants: true }, { propertyName: "_filtersChildren", predicate: ColumnFilterComponent, descendants: true }], ngImport: i0, template: "<div\r\n  class=\"ngx-grid\"\r\n  [id]=\"id\"\r\n  [nbSpinner]=\"loading\"\r\n  nbSpinnerSize=\"large\"\r\n  nbSpinnerStatus=\"primary\"\r\n  [nbSpinnerMessage]=\"loadingMessage\"\r\n>\r\n  <ngx-grid-toolbar\r\n    [visible]=\"getGridToolbarVisibility()\"\r\n    [selectedRowsTitleEnabled]=\"selectedRowsTitleEnabled\"\r\n    [selectionMultiple]=\"selectionMultiple\"\r\n    [selectedRows]=\"getSelectedRows().length\"\r\n    [selectedRowsTitle]=\"selectedRowsTitle\"\r\n    [addEnabled]=\"addEnabled\"\r\n    [addTooltip]=\"addTooltip\"\r\n    (addNewClicked)=\"addNewClick()\"\r\n  >\r\n  </ngx-grid-toolbar>\r\n\r\n  <!--------------------------------------------------- TABLE START ---------------------------------------------------------------------->\r\n  <div\r\n    class=\"ngx-grid-table\"\r\n    [ngClass]=\"getGridFooterVisibility() ? '' : 'no-footer'\"\r\n    [class]=\"getGridToolbarVisibility() ? '' : 'no-header'\"\r\n  >\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <!--------------------------------------------------- SELECT ALL -------------------------------------------------------------->\r\n          <th *ngIf=\"selectionEnabled\" class=\"text-center sticky-th select-all\">\r\n            <nb-checkbox\r\n              *ngIf=\"selectionMultiple && selectAllEnabled\"\r\n              indeterminate\r\n              (checkedChange)=\"onSelectAllCheckedChange($event)\"\r\n            ></nb-checkbox>\r\n          </th>\r\n\r\n          <!--------------------------------------------------- TABLE HEADERS -------------------------------------------------------------->\r\n          <th\r\n            *ngFor=\"let column of columns\"\r\n            [hidden]=\"!column.getVisible()\"\r\n            [ngClass]=\"getColumnHeaderClassList(column)\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n            [style.min-width]=\"column.getWidth()\"\r\n            [style.max-width]=\"column.getWidth()\"\r\n            [id]=\"column.getId()\"\r\n          >\r\n            {{ column.getTitle() }}\r\n            <button\r\n              class=\"column-sort-btn\"\r\n              nbButton\r\n              ghost\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              *ngIf=\"column?.getSortState() != sortStates.NONE\"\r\n              (click)=\"onSortButtonClick(column)\"\r\n            >\r\n              <nb-icon\r\n                pack=\"eva\"\r\n                [icon]=\"\r\n                  column?.getSortState() == sortStates.ASC\r\n                    ? 'arrow-upward-outline'\r\n                    : 'arrow-downward-outline'\r\n                \"\r\n              ></nb-icon>\r\n            </button>\r\n            <button\r\n              class=\"column-group-btn\"\r\n              nbButton\r\n              ghost\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              *ngIf=\"column?.getGrouped()\"\r\n              (click)=\"onUngroupButtonClick(column)\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"layers-outline\"></nb-icon>\r\n            </button>\r\n            <button\r\n              *ngIf=\"columnOptionsEnabled\"\r\n              class=\"column-context-menu-btn\"\r\n              nbButton\r\n              ghost\r\n              size=\"small\"\r\n              shape=\"round\"\r\n              [nbContextMenu]=\"column.getContextMenuItems()\"\r\n              [nbContextMenuClass]=\"'ngx-grid-column-context-menu'\"\r\n              [nbContextMenuTag]=\"\r\n                'column-context-menu-' + id + '-' + column.getContextMenuId()\r\n              \"\r\n              [nbContextMenuPlacement]=\"position.BOTTOM_END\"\r\n              (click)=\"\r\n                onColumnContextMenuButtonClick(column.getContextMenuItems())\r\n              \"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"more-horizontal-outline\"></nb-icon>\r\n            </button>\r\n          </th>\r\n        </tr>\r\n\r\n        <!--------------------------------------------------- TABLE FILTERS -------------------------------------------------------------->\r\n        <tr *ngIf=\"filtersEnabled\" class=\"filter-panel\">\r\n          <th *ngIf=\"selectionEnabled\"></th>\r\n          <th\r\n            *ngFor=\"let column of columns\"\r\n            [hidden]=\"!column.getVisible()\"\r\n            [ngClass]=\"column.getDocked() ? 'docked' : ''\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n          >\r\n            <ngx-column-filter\r\n              [column]=\"column\"\r\n              (filterChanged)=\"onGridFilterChange($event)\"\r\n            ></ngx-column-filter>\r\n          </th>\r\n        </tr>\r\n      </thead>\r\n\r\n      <!--------------------------------------------------- TABLE DATA -------------------------------------------------------------->\r\n      <tbody>\r\n        <tr\r\n          [style.height.px]=\"rowHeight > 0 ? rowHeight : null\"\r\n          *ngIf=\"dataToRender.length == 0 && gridState == gridStates.NONE\"\r\n        >\r\n          <td [colSpan]=\"columns.length\">{{ noDataMessage }}</td>\r\n        </tr>\r\n\r\n        <!--------------------------------------------------- INLINE INSERT -------------------------------------------------------------->\r\n        <tr\r\n          *ngIf=\"gridState == gridStates.INSERT && gridMode == gridModes.INLINE\"\r\n        >\r\n          <td *ngIf=\"selectionEnabled\"></td>\r\n          <td *ngFor=\"let column of columns\">\r\n            <ngx-cell-edit\r\n              [column]=\"column\"\r\n              [(cellValue)]=\"newRowData[column.getDataField()]\"\r\n              (cellButtonClick)=\"inlineEditCellBtnClick($event)\"\r\n              [isNew]=\"true\"\r\n            ></ngx-cell-edit>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr\r\n          [style.height.px]=\"rowHeight > 0 ? rowHeight : null\"\r\n          [ngClass]=\"row.selected ? 'selected' : ''\"\r\n          [class]=\"selectRowByClick && selectionEnabled ? 'clicable' : ''\"\r\n          *ngFor=\"\r\n            let row of dataToRender\r\n              | paginate\r\n                : {\r\n                    itemsPerPage: pagerEnabled ? defaultPerPageOption : 10000,\r\n                    currentPage: page,\r\n                    totalItems: dataToRender.length\r\n                  }\r\n          \"\r\n        >\r\n          <td *ngIf=\"selectionEnabled && !row._GroupRow\">\r\n            <div class=\"d-flex justify-content-center align-items-center\">\r\n              <nb-checkbox\r\n                [(ngModel)]=\"row.selected\"\r\n                (checkedChange)=\"onSelectionCheckboxClick(row, $event)\"\r\n              ></nb-checkbox>\r\n            </div>\r\n          </td>\r\n\r\n          <!--------------------------------------------------- RENDER TABLE DATA -------------------------------------------------------------->\r\n\r\n          <td\r\n            (click)=\"onGroupRowClick(row)\"\r\n            [attr.colspan]=\"groupColspan\"\r\n            *ngIf=\"row._GroupRow\"\r\n            class=\"group-row\"\r\n          >\r\n            <div class=\"d-flex w-100\">\r\n              <div class=\"group-row-name\">\r\n                {{ row._GroupName }}\r\n                <span *ngIf=\"groupedColumn?.getShowGroupCount()\"\r\n                  >({{ row._GroupCount }})</span\r\n                >\r\n              </div>\r\n              <div class=\"col m-0 p-0 d-flex justify-content-end\">\r\n                <nb-icon\r\n                  class=\"me-3\"\r\n                  pack=\"eva\"\r\n                  status=\"basic\"\r\n                  [icon]=\"\r\n                    row._GroupExpanded\r\n                      ? 'chevron-up-outline'\r\n                      : 'chevron-down-outline'\r\n                  \"\r\n                ></nb-icon>\r\n              </div>\r\n            </div>\r\n          </td>\r\n\r\n          <td\r\n            *ngFor=\"let column of columns; index as i\"\r\n            [hidden]=\"row._GroupRow ? true : !column.getVisible()\"\r\n            (click)=\"onRowDataClick(row, column)\"\r\n            [ngClass]=\"column.getDocked() ? 'docked' : ''\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n          >\r\n            <ngx-cell-display\r\n              *ngIf=\"row.mode != 'edit'\"\r\n              [column]=\"column\"\r\n              [row]=\"row\"\r\n              (buttonClick)=\"onActionButtonClick($event)\"\r\n            ></ngx-cell-display>\r\n\r\n            <ngx-cell-edit\r\n              *ngIf=\"\r\n                row.mode == 'edit' &&\r\n                gridState == gridStates.EDIT &&\r\n                gridMode == gridModes.INLINE\r\n              \"\r\n              [column]=\"column\"\r\n              [isNew]=\"false\"\r\n              [(cellValue)]=\"row[column.getDataField()]\"\r\n              (cellButtonClick)=\"inlineEditCellBtnClick($event, row)\"\r\n            ></ngx-cell-edit>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <ngx-grid-footer\r\n    [visible]=\"getGridFooterVisibility()\"\r\n    [(page)]=\"page\"\r\n    (pageChanged)=\"onPageChanged()\"\r\n    [refreshEnabled]=\"refreshEnabled\"\r\n    [refreshTooltip]=\"refreshTooltip\"\r\n    [exportPdfEnabled]=\"exportPdfEnabled\"\r\n    [exportExcelEnabled]=\"exportExcelEnabled\"\r\n    [exportPdfTooltip]=\"exportPdfTooltip\"\r\n    [exportExcelTooltip]=\"exportExcelTooltip\"\r\n    [entriesPerPageEnabled]=\"entriesPerPageEnabled\"\r\n    [entriesPerPageTooltip]=\"entriesPerPageTooltip\"\r\n    [(defaultPerPageOption)]=\"defaultPerPageOption\"\r\n    [entriesPerPageOptions]=\"entriesPerPageOptions\"\r\n    (resetFiltersClicked)=\"onClickResetFilters()\"\r\n    (exportPdfClicked)=\"exportPdfBtnClick()\"\r\n    (exportExcelClicked)=\"exportExcelBtnClick()\"\r\n    (selectionPerPageChanged)=\"onSelectedChangePagerPerPage($event)\"\r\n  ></ngx-grid-footer>\r\n</div>\r\n<ngx-grid-excel-export [settings]=\"exportSettings\"></ngx-grid-excel-export>\r\n<ngx-grid-pdf-export [settings]=\"exportSettings\"></ngx-grid-pdf-export>\r\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep .menu-item a .menu-title{margin-right:.5rem}:host .ngx-grid{height:100%;display:flex;flex-flow:column}:host .ngx-grid .group-row-name{font-weight:600;color:var(--color-basic-600);padding-left:1rem;width:max-content}:host .ngx-grid .group-row{background-color:var(--background-basic-color-3);border-color:var(--background-basic-color-3)}:host .ngx-grid .ngx-grid-table.no-header{height:calc(100% - 4rem)}:host .ngx-grid .ngx-grid-table.no-footer{height:100%}:host .ngx-grid .ngx-grid-table.no-header.no-footer{height:100%}:host .ngx-grid .ngx-grid-table{overflow:auto;height:calc(100% - 7rem)}:host .ngx-grid .ngx-grid-table table{width:100%;border-collapse:separate}:host .ngx-grid .ngx-grid-table table .docked{position:sticky;z-index:3;background-color:var(--background-basic-color-3)}:host .ngx-grid .ngx-grid-table thead th.sticky-th{position:sticky;top:-1px;z-index:2;background-color:var(--background-basic-color-3);padding:.7rem;font-size:14px;font-weight:800;color:var(--color-basic-600);text-transform:uppercase;white-space:break-spaces}:host .ngx-grid .ngx-grid-table thead th.sticky-th .column-context-menu-btn{position:absolute;right:.5rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th:has(.column-context-menu-btn){padding:.7rem 3rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted{padding:.7rem 5.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted .column-sort-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.grouped{padding:.7rem 5.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.grouped .column-group-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped{padding:.7rem 7.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped .column-sort-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped .column-group-btn{position:absolute;right:5rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.select-all{padding:.7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.docked{z-index:4}:host .ngx-grid .ngx-grid-table thead tr.filter-panel th{background-color:var(--background-basic-color-3);padding:0 0 .5rem}:host .ngx-grid .ngx-grid-table tbody td{padding:.5rem .25rem}:host .ngx-grid .ngx-grid-table tbody tr:nth-child(2n){background-color:var(--smart-table-bg-even)}:host .ngx-grid .ngx-grid-table tbody tr.selected{background-color:var(--scrollbar-color)}:host .ngx-grid .ngx-grid-table tbody tr.selected .docked{background-color:var(--scrollbar-color)}:host .ngx-grid .ngx-grid-table tbody tr.clicable:hover{cursor:pointer}:host .ngx-grid table th:first-child,:host .ngx-grid table td:first-child{border-left:1px solid var(--smart-table-separator)}:host .ngx-grid table th:last-child,:host .ngx-grid table td:last-child{border-right:1px solid var(--smart-table-separator)}:host ::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width)}:host ::-webkit-scrollbar-thumb{background:var(--scrollbar-color);border-radius:10px}:host ::-webkit-scrollbar-thumb:hover{background:var(--color-basic-500)}:host .selected-rows{width:max-content;align-items:end}:host .selected-rows span:first-child{font-size:smaller;font-weight:500}:host .selected-rows span:last-child{font-weight:600}::ng-deep nb-select.appearance-outline.status-basic .select-button.placeholder{opacity:unset}::ng-deep .cdk-overlay-container.ngx-grid-context-menu-cdk-overlay-container{z-index:1050!important}\n"], dependencies: [{ kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.NbCheckboxComponent, selector: "nb-checkbox", inputs: ["checked", "disabled", "status", "indeterminate"], outputs: ["checkedChange"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i1.NbSpinnerDirective, selector: "[nbSpinner]", inputs: ["nbSpinnerMessage", "nbSpinnerStatus", "nbSpinnerSize", "nbSpinner"] }, { kind: "directive", type: i1.NbContextMenuDirective, selector: "[nbContextMenu]", inputs: ["nbContextMenuPlacement", "nbContextMenuAdjustment", "nbContextMenuTag", "nbContextMenu", "nbContextMenuTrigger", "nbContextMenuClass"] }, { kind: "component", type: i5.CellDisplayComponent, selector: "ngx-cell-display", inputs: ["column", "row"], outputs: ["buttonClick"] }, { kind: "component", type: i6.ColumnFilterComponent, selector: "ngx-column-filter", inputs: ["column"], outputs: ["filterChanged"] }, { kind: "component", type: i7.CellEditComponent, selector: "ngx-cell-edit", inputs: ["isNew", "column", "cellValue"], outputs: ["cellValueChange", "cellButtonClick"] }, { kind: "component", type: i8.GridPdfExportComponent, selector: "ngx-grid-pdf-export", inputs: ["settings"] }, { kind: "component", type: i9.GridExcelExportComponent, selector: "ngx-grid-excel-export", inputs: ["settings"] }, { kind: "component", type: i10.GridFooterComponent, selector: "ngx-grid-footer", inputs: ["entriesPerPageOptions", "visible", "page", "refreshEnabled", "refreshTooltip", "exportPdfEnabled", "exportPdfTooltip", "exportExcelEnabled", "exportExcelTooltip", "entriesPerPageEnabled", "entriesPerPageTooltip", "defaultPerPageOption"], outputs: ["defaultPerPageOptionChange", "pageChanged", "resetFiltersClicked", "exportPdfClicked", "exportExcelClicked", "selectionPerPageChanged", "pageChange"] }, { kind: "component", type: i11.GridToolbarComponent, selector: "ngx-grid-toolbar", inputs: ["visible", "selectedRowsTitleEnabled", "selectionMultiple", "selectedRows", "selectedRowsTitle", "addEnabled", "addTooltip"], outputs: ["addNewClicked"] }, { kind: "pipe", type: i12.PaginatePipe, name: "paginate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-grid', template: "<div\r\n  class=\"ngx-grid\"\r\n  [id]=\"id\"\r\n  [nbSpinner]=\"loading\"\r\n  nbSpinnerSize=\"large\"\r\n  nbSpinnerStatus=\"primary\"\r\n  [nbSpinnerMessage]=\"loadingMessage\"\r\n>\r\n  <ngx-grid-toolbar\r\n    [visible]=\"getGridToolbarVisibility()\"\r\n    [selectedRowsTitleEnabled]=\"selectedRowsTitleEnabled\"\r\n    [selectionMultiple]=\"selectionMultiple\"\r\n    [selectedRows]=\"getSelectedRows().length\"\r\n    [selectedRowsTitle]=\"selectedRowsTitle\"\r\n    [addEnabled]=\"addEnabled\"\r\n    [addTooltip]=\"addTooltip\"\r\n    (addNewClicked)=\"addNewClick()\"\r\n  >\r\n  </ngx-grid-toolbar>\r\n\r\n  <!--------------------------------------------------- TABLE START ---------------------------------------------------------------------->\r\n  <div\r\n    class=\"ngx-grid-table\"\r\n    [ngClass]=\"getGridFooterVisibility() ? '' : 'no-footer'\"\r\n    [class]=\"getGridToolbarVisibility() ? '' : 'no-header'\"\r\n  >\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <!--------------------------------------------------- SELECT ALL -------------------------------------------------------------->\r\n          <th *ngIf=\"selectionEnabled\" class=\"text-center sticky-th select-all\">\r\n            <nb-checkbox\r\n              *ngIf=\"selectionMultiple && selectAllEnabled\"\r\n              indeterminate\r\n              (checkedChange)=\"onSelectAllCheckedChange($event)\"\r\n            ></nb-checkbox>\r\n          </th>\r\n\r\n          <!--------------------------------------------------- TABLE HEADERS -------------------------------------------------------------->\r\n          <th\r\n            *ngFor=\"let column of columns\"\r\n            [hidden]=\"!column.getVisible()\"\r\n            [ngClass]=\"getColumnHeaderClassList(column)\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n            [style.min-width]=\"column.getWidth()\"\r\n            [style.max-width]=\"column.getWidth()\"\r\n            [id]=\"column.getId()\"\r\n          >\r\n            {{ column.getTitle() }}\r\n            <button\r\n              class=\"column-sort-btn\"\r\n              nbButton\r\n              ghost\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              *ngIf=\"column?.getSortState() != sortStates.NONE\"\r\n              (click)=\"onSortButtonClick(column)\"\r\n            >\r\n              <nb-icon\r\n                pack=\"eva\"\r\n                [icon]=\"\r\n                  column?.getSortState() == sortStates.ASC\r\n                    ? 'arrow-upward-outline'\r\n                    : 'arrow-downward-outline'\r\n                \"\r\n              ></nb-icon>\r\n            </button>\r\n            <button\r\n              class=\"column-group-btn\"\r\n              nbButton\r\n              ghost\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              *ngIf=\"column?.getGrouped()\"\r\n              (click)=\"onUngroupButtonClick(column)\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"layers-outline\"></nb-icon>\r\n            </button>\r\n            <button\r\n              *ngIf=\"columnOptionsEnabled\"\r\n              class=\"column-context-menu-btn\"\r\n              nbButton\r\n              ghost\r\n              size=\"small\"\r\n              shape=\"round\"\r\n              [nbContextMenu]=\"column.getContextMenuItems()\"\r\n              [nbContextMenuClass]=\"'ngx-grid-column-context-menu'\"\r\n              [nbContextMenuTag]=\"\r\n                'column-context-menu-' + id + '-' + column.getContextMenuId()\r\n              \"\r\n              [nbContextMenuPlacement]=\"position.BOTTOM_END\"\r\n              (click)=\"\r\n                onColumnContextMenuButtonClick(column.getContextMenuItems())\r\n              \"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"more-horizontal-outline\"></nb-icon>\r\n            </button>\r\n          </th>\r\n        </tr>\r\n\r\n        <!--------------------------------------------------- TABLE FILTERS -------------------------------------------------------------->\r\n        <tr *ngIf=\"filtersEnabled\" class=\"filter-panel\">\r\n          <th *ngIf=\"selectionEnabled\"></th>\r\n          <th\r\n            *ngFor=\"let column of columns\"\r\n            [hidden]=\"!column.getVisible()\"\r\n            [ngClass]=\"column.getDocked() ? 'docked' : ''\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n          >\r\n            <ngx-column-filter\r\n              [column]=\"column\"\r\n              (filterChanged)=\"onGridFilterChange($event)\"\r\n            ></ngx-column-filter>\r\n          </th>\r\n        </tr>\r\n      </thead>\r\n\r\n      <!--------------------------------------------------- TABLE DATA -------------------------------------------------------------->\r\n      <tbody>\r\n        <tr\r\n          [style.height.px]=\"rowHeight > 0 ? rowHeight : null\"\r\n          *ngIf=\"dataToRender.length == 0 && gridState == gridStates.NONE\"\r\n        >\r\n          <td [colSpan]=\"columns.length\">{{ noDataMessage }}</td>\r\n        </tr>\r\n\r\n        <!--------------------------------------------------- INLINE INSERT -------------------------------------------------------------->\r\n        <tr\r\n          *ngIf=\"gridState == gridStates.INSERT && gridMode == gridModes.INLINE\"\r\n        >\r\n          <td *ngIf=\"selectionEnabled\"></td>\r\n          <td *ngFor=\"let column of columns\">\r\n            <ngx-cell-edit\r\n              [column]=\"column\"\r\n              [(cellValue)]=\"newRowData[column.getDataField()]\"\r\n              (cellButtonClick)=\"inlineEditCellBtnClick($event)\"\r\n              [isNew]=\"true\"\r\n            ></ngx-cell-edit>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr\r\n          [style.height.px]=\"rowHeight > 0 ? rowHeight : null\"\r\n          [ngClass]=\"row.selected ? 'selected' : ''\"\r\n          [class]=\"selectRowByClick && selectionEnabled ? 'clicable' : ''\"\r\n          *ngFor=\"\r\n            let row of dataToRender\r\n              | paginate\r\n                : {\r\n                    itemsPerPage: pagerEnabled ? defaultPerPageOption : 10000,\r\n                    currentPage: page,\r\n                    totalItems: dataToRender.length\r\n                  }\r\n          \"\r\n        >\r\n          <td *ngIf=\"selectionEnabled && !row._GroupRow\">\r\n            <div class=\"d-flex justify-content-center align-items-center\">\r\n              <nb-checkbox\r\n                [(ngModel)]=\"row.selected\"\r\n                (checkedChange)=\"onSelectionCheckboxClick(row, $event)\"\r\n              ></nb-checkbox>\r\n            </div>\r\n          </td>\r\n\r\n          <!--------------------------------------------------- RENDER TABLE DATA -------------------------------------------------------------->\r\n\r\n          <td\r\n            (click)=\"onGroupRowClick(row)\"\r\n            [attr.colspan]=\"groupColspan\"\r\n            *ngIf=\"row._GroupRow\"\r\n            class=\"group-row\"\r\n          >\r\n            <div class=\"d-flex w-100\">\r\n              <div class=\"group-row-name\">\r\n                {{ row._GroupName }}\r\n                <span *ngIf=\"groupedColumn?.getShowGroupCount()\"\r\n                  >({{ row._GroupCount }})</span\r\n                >\r\n              </div>\r\n              <div class=\"col m-0 p-0 d-flex justify-content-end\">\r\n                <nb-icon\r\n                  class=\"me-3\"\r\n                  pack=\"eva\"\r\n                  status=\"basic\"\r\n                  [icon]=\"\r\n                    row._GroupExpanded\r\n                      ? 'chevron-up-outline'\r\n                      : 'chevron-down-outline'\r\n                  \"\r\n                ></nb-icon>\r\n              </div>\r\n            </div>\r\n          </td>\r\n\r\n          <td\r\n            *ngFor=\"let column of columns; index as i\"\r\n            [hidden]=\"row._GroupRow ? true : !column.getVisible()\"\r\n            (click)=\"onRowDataClick(row, column)\"\r\n            [ngClass]=\"column.getDocked() ? 'docked' : ''\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n          >\r\n            <ngx-cell-display\r\n              *ngIf=\"row.mode != 'edit'\"\r\n              [column]=\"column\"\r\n              [row]=\"row\"\r\n              (buttonClick)=\"onActionButtonClick($event)\"\r\n            ></ngx-cell-display>\r\n\r\n            <ngx-cell-edit\r\n              *ngIf=\"\r\n                row.mode == 'edit' &&\r\n                gridState == gridStates.EDIT &&\r\n                gridMode == gridModes.INLINE\r\n              \"\r\n              [column]=\"column\"\r\n              [isNew]=\"false\"\r\n              [(cellValue)]=\"row[column.getDataField()]\"\r\n              (cellButtonClick)=\"inlineEditCellBtnClick($event, row)\"\r\n            ></ngx-cell-edit>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <ngx-grid-footer\r\n    [visible]=\"getGridFooterVisibility()\"\r\n    [(page)]=\"page\"\r\n    (pageChanged)=\"onPageChanged()\"\r\n    [refreshEnabled]=\"refreshEnabled\"\r\n    [refreshTooltip]=\"refreshTooltip\"\r\n    [exportPdfEnabled]=\"exportPdfEnabled\"\r\n    [exportExcelEnabled]=\"exportExcelEnabled\"\r\n    [exportPdfTooltip]=\"exportPdfTooltip\"\r\n    [exportExcelTooltip]=\"exportExcelTooltip\"\r\n    [entriesPerPageEnabled]=\"entriesPerPageEnabled\"\r\n    [entriesPerPageTooltip]=\"entriesPerPageTooltip\"\r\n    [(defaultPerPageOption)]=\"defaultPerPageOption\"\r\n    [entriesPerPageOptions]=\"entriesPerPageOptions\"\r\n    (resetFiltersClicked)=\"onClickResetFilters()\"\r\n    (exportPdfClicked)=\"exportPdfBtnClick()\"\r\n    (exportExcelClicked)=\"exportExcelBtnClick()\"\r\n    (selectionPerPageChanged)=\"onSelectedChangePagerPerPage($event)\"\r\n  ></ngx-grid-footer>\r\n</div>\r\n<ngx-grid-excel-export [settings]=\"exportSettings\"></ngx-grid-excel-export>\r\n<ngx-grid-pdf-export [settings]=\"exportSettings\"></ngx-grid-pdf-export>\r\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep .menu-item a .menu-title{margin-right:.5rem}:host .ngx-grid{height:100%;display:flex;flex-flow:column}:host .ngx-grid .group-row-name{font-weight:600;color:var(--color-basic-600);padding-left:1rem;width:max-content}:host .ngx-grid .group-row{background-color:var(--background-basic-color-3);border-color:var(--background-basic-color-3)}:host .ngx-grid .ngx-grid-table.no-header{height:calc(100% - 4rem)}:host .ngx-grid .ngx-grid-table.no-footer{height:100%}:host .ngx-grid .ngx-grid-table.no-header.no-footer{height:100%}:host .ngx-grid .ngx-grid-table{overflow:auto;height:calc(100% - 7rem)}:host .ngx-grid .ngx-grid-table table{width:100%;border-collapse:separate}:host .ngx-grid .ngx-grid-table table .docked{position:sticky;z-index:3;background-color:var(--background-basic-color-3)}:host .ngx-grid .ngx-grid-table thead th.sticky-th{position:sticky;top:-1px;z-index:2;background-color:var(--background-basic-color-3);padding:.7rem;font-size:14px;font-weight:800;color:var(--color-basic-600);text-transform:uppercase;white-space:break-spaces}:host .ngx-grid .ngx-grid-table thead th.sticky-th .column-context-menu-btn{position:absolute;right:.5rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th:has(.column-context-menu-btn){padding:.7rem 3rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted{padding:.7rem 5.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted .column-sort-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.grouped{padding:.7rem 5.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.grouped .column-group-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped{padding:.7rem 7.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped .column-sort-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped .column-group-btn{position:absolute;right:5rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.select-all{padding:.7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.docked{z-index:4}:host .ngx-grid .ngx-grid-table thead tr.filter-panel th{background-color:var(--background-basic-color-3);padding:0 0 .5rem}:host .ngx-grid .ngx-grid-table tbody td{padding:.5rem .25rem}:host .ngx-grid .ngx-grid-table tbody tr:nth-child(2n){background-color:var(--smart-table-bg-even)}:host .ngx-grid .ngx-grid-table tbody tr.selected{background-color:var(--scrollbar-color)}:host .ngx-grid .ngx-grid-table tbody tr.selected .docked{background-color:var(--scrollbar-color)}:host .ngx-grid .ngx-grid-table tbody tr.clicable:hover{cursor:pointer}:host .ngx-grid table th:first-child,:host .ngx-grid table td:first-child{border-left:1px solid var(--smart-table-separator)}:host .ngx-grid table th:last-child,:host .ngx-grid table td:last-child{border-right:1px solid var(--smart-table-separator)}:host ::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width)}:host ::-webkit-scrollbar-thumb{background:var(--scrollbar-color);border-radius:10px}:host ::-webkit-scrollbar-thumb:hover{background:var(--color-basic-500)}:host .selected-rows{width:max-content;align-items:end}:host .selected-rows span:first-child{font-size:smaller;font-weight:500}:host .selected-rows span:last-child{font-weight:600}::ng-deep nb-select.appearance-outline.status-basic .select-button.placeholder{opacity:unset}::ng-deep .cdk-overlay-container.ngx-grid-context-menu-cdk-overlay-container{z-index:1050!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NbMenuService }, { type: i1.NbWindowService }, { type: i1.NbDialogService }, { type: i2.TranslationService }]; }, propDecorators: { _filtersChildren: [{
                type: ViewChildren,
                args: [ColumnFilterComponent]
            }], _exportPDFComponent: [{
                type: ViewChild,
                args: [GridPdfExportComponent]
            }], _exportExcelComponent: [{
                type: ViewChild,
                args: [GridExcelExportComponent]
            }], data: [{
                type: Input
            }], columns: [{
                type: Input
            }], columnOptionsEnabled: [{
                type: Input
            }], entriesPerPageEnabled: [{
                type: Input
            }], entriesPerPageOptions: [{
                type: Input
            }], pagerEnabled: [{
                type: Input
            }], defaultPerPageOption: [{
                type: Input
            }], exportPdfEnabled: [{
                type: Input
            }], exportExcelEnabled: [{
                type: Input
            }], customExportFunction: [{
                type: Input
            }], exportSettings: [{
                type: Input
            }], selectionMultiple: [{
                type: Input
            }], selectRowByClick: [{
                type: Input
            }], selectAllEnabled: [{
                type: Input
            }], selectedRowsTitleEnabled: [{
                type: Input
            }], selectionEnabled: [{
                type: Input
            }], loadingEnabled: [{
                type: Input
            }], loading: [{
                type: Input
            }], filtersEnabled: [{
                type: Input
            }], actionsPosition: [{
                type: Input
            }], addEnabled: [{
                type: Input
            }], editEnabled: [{
                type: Input
            }], deleteEnabled: [{
                type: Input
            }], addEditPopupSettings: [{
                type: Input
            }], deletePopupSettings: [{
                type: Input
            }], refreshEnabled: [{
                type: Input
            }], noDataMessage: [{
                type: Input
            }], gridMode: [{
                type: Input
            }], rowHeight: [{
                type: Input
            }], entriesPerPageSelectionChanged: [{
                type: Output
            }], selectionChanged: [{
                type: Output
            }], pageChanged: [{
                type: Output
            }], sourceFiltersReseted: [{
                type: Output
            }], sortChanged: [{
                type: Output
            }], filterChanged: [{
                type: Output
            }], pdfExport: [{
                type: Output
            }], excelExport: [{
                type: Output
            }], createConfirm: [{
                type: Output
            }], editConfirm: [{
                type: Output
            }], deleteConfirm: [{
                type: Output
            }], actionBtnClick: [{
                type: Output
            }], createStarted: [{
                type: Output
            }], editStarted: [{
                type: Output
            }], deleteStarted: [{
                type: Output
            }], groupingChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zaGFyZWQtY29tcG9uZW50cy9zcmMvbGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zaGFyZWQtY29tcG9uZW50cy9zcmMvbGliL2dyaWQvZ3JpZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFJTCxVQUFVLEdBRVgsTUFBTSxnQkFBZ0IsQ0FBQztBQWF4QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUVoRixPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEdBQ1gsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFRekUsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFDVSxZQUEyQixFQUMzQixjQUErQixFQUMvQixjQUErQixFQUMvQixtQkFBdUM7UUFIdkMsaUJBQVksR0FBWixZQUFZLENBQWU7UUFDM0IsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQy9CLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUMvQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBNEJqRCx3SEFBd0g7UUFHeEgscUJBQWdCLEdBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7UUE0QnJFLHlEQUF5RDtRQUN6QyxZQUFPLEdBQWlCLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQjtRQUN0RCx5QkFBb0IsR0FBWSxJQUFJLENBQUMsQ0FBQyxzQ0FBc0M7UUFFNUYsdURBQXVEO1FBQ3ZDLDBCQUFxQixHQUFZLElBQUksQ0FBQyxDQUFDLDZDQUE2QztRQUNwRiwwQkFBcUIsR0FDbkMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUMsOEVBQThFO1FBQ2pHLGlCQUFZLEdBQVksSUFBSSxDQUFDLENBQUMsNkJBQTZCO1FBQzNELHlCQUFvQixHQUNsQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsTUFBTSxHQUFHLENBQUM7WUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLG1HQUFtRztRQUNuSSwwQkFBcUIsR0FBVyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUN2RSwyQkFBMkIsQ0FDNUIsQ0FBQyxDQUFDLDJGQUEyRjtRQUU5Rix3REFBd0Q7UUFDeEMscUJBQWdCLEdBQVksSUFBSSxDQUFDLENBQUMsbUNBQW1DO1FBQzlFLHFCQUFnQixHQUFXLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQ2xFLHNCQUFzQixDQUN2QixDQUFDLENBQUMsa0ZBQWtGO1FBQ3JFLHVCQUFrQixHQUFZLElBQUksQ0FBQyxDQUFDLHFDQUFxQztRQUNsRix1QkFBa0IsR0FBVyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUNwRSx3QkFBd0IsQ0FDekIsQ0FBQyxDQUFDLG9GQUFvRjtRQUN2RSx5QkFBb0IsR0FBWSxLQUFLLENBQUMsQ0FBQyw4RkFBOEY7UUFDckksbUJBQWMsR0FBZ0M7WUFDNUQsS0FBSyxFQUFFLFNBQVM7WUFDaEIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO1lBQzFFLE9BQU8sRUFBRSxTQUFTLENBQUMsYUFBYTtZQUNoQyxZQUFZLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtpQkFDbkMsU0FBUyxDQUFDLGNBQWMsQ0FBQztpQkFDekIsV0FBVyxFQUFFO1lBQ2hCLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CO2lCQUNsQyxTQUFTLENBQUMsYUFBYSxDQUFDO2lCQUN4QixXQUFXLEVBQUUsRUFBRSxvQ0FBb0M7U0FDdkQsQ0FBQyxDQUFDLHFDQUFxQztRQUV4QywyREFBMkQ7UUFDM0Msc0JBQWlCLEdBQVksS0FBSyxDQUFDLENBQUMsNEhBQTRIO1FBQ2hLLHFCQUFnQixHQUFZLElBQUksQ0FBQyxDQUFDLHVEQUF1RDtRQUN6RixxQkFBZ0IsR0FBWSxLQUFLLENBQUMsQ0FBQywwQ0FBMEM7UUFDdEYsc0JBQWlCLEdBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtRQUNoRyw2QkFBd0IsR0FBWSxJQUFJLENBQUMsQ0FBQyx3RUFBd0U7UUFDbEgscUJBQWdCLEdBQVksSUFBSSxDQUFDLENBQUMsc0NBQXNDO1FBRXhGLHlEQUF5RDtRQUN6QyxtQkFBYyxHQUFZLElBQUksQ0FBQyxDQUFDLCtDQUErQztRQUN4RixtQkFBYyxHQUNuQixJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsZ0dBQWdHO1FBQ3JJLFlBQU8sR0FBWSxLQUFLLENBQUMsQ0FBQyxpSEFBaUg7UUFFM0oseURBQXlEO1FBQ3pDLG1CQUFjLEdBQVksSUFBSSxDQUFDLENBQUMsNENBQTRDO1FBRTVGLHlEQUF5RDtRQUN6QyxvQkFBZSxHQUM3QixTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsdUJBQXVCO1FBQzdDLHVCQUFrQixHQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsaURBQWlEO1FBQ3RGLGVBQVUsR0FBWSxJQUFJLENBQUMsQ0FBQyw0QkFBNEI7UUFDakUsZUFBVSxHQUFXLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7UUFDbkYsZ0JBQVcsR0FBWSxJQUFJLENBQUMsQ0FBQyxzQ0FBc0M7UUFDbkUsa0JBQWEsR0FBWSxJQUFJLENBQUMsQ0FBQyx3Q0FBd0M7UUFDdkUseUJBQW9CLEdBQThCO1lBQ2hFLGNBQWMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztZQUNuRSxlQUFlLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNyRSxZQUFZLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztZQUNuRSxjQUFjLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztZQUN2RSxlQUFlLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQztZQUMxRSxXQUFXLEVBQUUsSUFBSTtZQUNqQixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLG9CQUFvQixFQUFFLEtBQUs7WUFDM0IsZUFBZSxFQUFFLEtBQUssRUFBRSxxREFBcUQ7U0FDOUUsQ0FBQyxDQUFDLHdEQUF3RDtRQUMzQyx3QkFBbUIsR0FBNkI7WUFDOUQsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixLQUFLLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQztZQUNuRSxJQUFJLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQztZQUNqRSxVQUFVLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7WUFDOUQsU0FBUyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQzVELG9CQUFvQixFQUFFLElBQUk7WUFDMUIsVUFBVSxFQUFFLElBQUksRUFBRSxzREFBc0Q7U0FDekUsQ0FBQyxDQUFDLHVEQUF1RDtRQUUxRCxzREFBc0Q7UUFDdEMsbUJBQWMsR0FBWSxJQUFJLENBQUMsQ0FBQyxzQ0FBc0M7UUFDL0UsbUJBQWMsR0FDbkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsK0VBQStFO1FBQzNILGtCQUFhLEdBQVcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLHlEQUF5RDtRQUNuSSxhQUFRLEdBQWMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLDRCQUE0QjtRQUNwRSxjQUFTLEdBQVcsQ0FBQyxDQUFDLENBQUMsZ0RBQWdEO1FBRXZGLG9IQUFvSDtRQUVsRyxtQ0FBOEIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDLENBQUMseURBQXlEO1FBQ3RILHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDLENBQUMsMERBQTBEO1FBQ2pILGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQyxDQUFDLDBCQUEwQjtRQUNwRSx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDLENBQUMscUNBQXFDO1FBQ3pGLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQyxDQUFDLG9DQUFvQztRQUNqRixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFlLENBQUMsQ0FBQyxvQ0FBb0M7UUFDckYsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUMsQ0FBQywwQ0FBMEM7UUFDL0UsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDLENBQUMsNENBQTRDO1FBQ25GLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUMsQ0FBQyxnRkFBZ0Y7UUFDcEksZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQyxDQUFDLGdGQUFnRjtRQUNsSSxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDLENBQUMsZ0ZBQWdGO1FBQ3BJLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUMsQ0FBQyx5Q0FBeUM7UUFDL0Ysa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDLENBQUMsaUVBQWlFO1FBQzlHLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQyxDQUFDLGtFQUFrRTtRQUN6RyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUMsQ0FBQyxvRUFBb0U7UUFDN0csb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDLENBQUMsd0NBQXdDO1FBS3BHLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzFCLFVBQUssR0FBbUIsRUFBRSxDQUFDO1FBQzNCLGFBQVEsR0FBa0IsRUFBRSxDQUFDLENBQUMsc0JBQXNCO1FBQ3BELFVBQUssR0FBZ0IsRUFBRSxDQUFDLENBQUMsc0JBQXNCO1FBQy9DLG1CQUFjLEdBQWlCLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQjtRQUdoRSxvSEFBb0g7UUFFN0csU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxTQUFTLENBQUM7UUFDdkIsaUJBQVksR0FBVSxFQUFFLENBQUMsQ0FBQyxtREFBbUQ7UUFDN0UsY0FBUyxHQUFlLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxxQkFBcUI7UUFDOUQsZUFBVSxHQUFHLFVBQVUsQ0FBQztRQUN4QixjQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLGVBQVUsR0FBUSxFQUFFLENBQUMsQ0FBQyx5Q0FBeUM7UUFDL0Qsa0JBQWEsR0FBc0IsSUFBSSxDQUFDLENBQUMsc0JBQXNCO1FBQy9ELGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLE9BQUUsR0FBVyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUF0TTVCLENBQUM7SUFFSixRQUFRO1FBQ04sK0RBQStEO1FBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsb0JBQW9CLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25EO1FBRUQsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRS9DLHlDQUF5QztRQUN6QyxJQUFJLElBQUksQ0FBQyxvQkFBb0I7WUFBRSxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUVwRSxzREFBc0Q7UUFDdEQsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFhO1lBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFFM0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUN4QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0I7WUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFjRCx3SEFBd0g7SUFFeEgsNkRBQTZEO0lBQzdELElBQWEsSUFBSSxDQUFDLEtBQVk7UUFDNUIseUNBQXlDO1FBQ3pDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3BDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLHdCQUF3QjtRQUNwRCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLHlDQUF5QztJQUNwRSxDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFnSkQsbUhBQW1IO0lBRW5IOztPQUVHO0lBQ0ssc0JBQXNCO1FBQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU07WUFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssYUFBYSxDQUFDLEdBQVE7UUFDNUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBRXJDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsS0FBSztnQkFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzVELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO2dCQUMxQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO2FBQ25CO1lBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssZUFBZSxDQUFDLEdBQVE7UUFDOUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLHNGQUFzRjtZQUN0RixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0I7Z0JBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV6RSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNLLDZCQUE2QjtRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLENBQUMsWUFBWTthQUNkLFdBQVcsRUFBRTthQUNiLElBQUksQ0FDSCxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7WUFDakIsT0FBTyxHQUFHLEVBQUUsVUFBVSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQ3hCO2FBQ0EsU0FBUyxDQUFDLENBQUMsSUFBZ0IsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ssdUJBQXVCO1FBQzdCLElBQUksT0FBTyxHQUFxQixFQUFFLENBQUM7UUFFbkMsSUFBSSxJQUFJLENBQUMsV0FBVztZQUNsQixPQUFPLENBQUMsSUFBSSxDQUNWLElBQUksY0FBYyxFQUFFO2lCQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO2lCQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDO2lCQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQ2xFLENBQUM7UUFFSixJQUFJLElBQUksQ0FBQyxhQUFhO1lBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQ1YsSUFBSSxjQUFjLEVBQUU7aUJBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7aUJBQzdCLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FDcEUsQ0FBQztRQUVKLElBQUksWUFBWSxHQUFlLElBQUksVUFBVSxFQUFFO2FBQzVDLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7YUFDOUIsSUFBSSxDQUNILElBQUksaUJBQWlCLEVBQUU7YUFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7YUFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUNwQjthQUNBLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDZixNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNiLGVBQWUsQ0FBQyxLQUFLLENBQUM7YUFDdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUNkLE1BQU0sQ0FDTCxJQUFJLGlCQUFpQixFQUFFLENBQUMsT0FBTyxDQUFDO1lBQzlCLElBQUksY0FBYyxFQUFFO2lCQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO2lCQUMzQixJQUFJLENBQUMsbUJBQW1CLENBQUM7aUJBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDakUsSUFBSSxjQUFjLEVBQUU7aUJBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7aUJBQzdCLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDcEUsQ0FBQyxDQUNILENBQUM7UUFFSiw2SkFBNko7UUFDN0osSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLHFCQUFxQixDQUFDLEtBQUs7WUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7O09BR0c7SUFDSyx3QkFBd0IsQ0FBQyxJQUFnQjtRQUMvQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3hCLEtBQUssZ0JBQWdCLENBQUMsSUFBSTtnQkFDeEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxNQUFNO1lBRVIsS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUMxQixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3BELE1BQU07WUFFUixLQUFLLGdCQUFnQixDQUFDLFFBQVE7Z0JBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEQsTUFBTTtZQUVSLEtBQUssZ0JBQWdCLENBQUMsU0FBUztnQkFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxNQUFNO1lBRVIsS0FBSyxnQkFBZ0IsQ0FBQyxLQUFLO2dCQUN6QixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BELE1BQU07WUFFUixLQUFLLGdCQUFnQixDQUFDLE9BQU87Z0JBQzNCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckQsTUFBTTtZQUVSLEtBQUssZ0JBQWdCLENBQUMsZ0JBQWdCO2dCQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQXFCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0RCxNQUFNO1lBRVIsS0FBSyxnQkFBZ0IsQ0FBQyxnQkFBZ0I7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBcUIsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZELE1BQU07U0FDVDtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0sscUJBQXFCLENBQUMsTUFBa0IsRUFBRSxJQUFhO1FBQzdELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEIsSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdEM7WUFDSCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDdkMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ25DLENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdEM7UUFFRCw0RUFBNEU7UUFDNUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOztPQUVHO0lBQ0ssbUJBQW1CO1FBQ3pCLElBQUksWUFBWSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHNDQUFzQztRQUNqSCxxQkFBcUI7UUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3ZCLElBQUksVUFBVSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7WUFDakUsSUFBSSxVQUFVLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU5RCxpQ0FBaUM7UUFDakMsSUFBSSxJQUFJLENBQUMsYUFBYTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FDNUMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsVUFBVSxDQUNYLENBQUM7O1lBQ0MsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxzQkFBc0IsQ0FBQyxNQUFrQixFQUFFLEtBQWM7UUFDL0QsSUFBSSxLQUFLLEVBQUU7WUFDVCw2Q0FBNkM7WUFDN0MsSUFBSSxJQUFJLENBQUMsYUFBYTtnQkFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztTQUM3Qjs7WUFBTSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUVqQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGtCQUFrQixDQUFDLEdBQVksRUFBRSxNQUFrQjtRQUN6RCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFELCtFQUErRTtRQUMvRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDcEMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxDQUNoRCxDQUFDO1FBRUYsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXRDLElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDL0IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUNwRSxxRUFBcUU7O2dCQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyx3Q0FBd0M7U0FDekc7O1lBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsNkRBQTZEO1FBRXZHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssZ0JBQWdCLENBQUMsTUFBVyxTQUFTO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNiLElBQUksQ0FBQyxjQUFjO2FBQ2hCLElBQUksQ0FDSCxjQUFjLEVBQ2QsU0FBUyxDQUFDLHFCQUFxQixDQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUNsQixHQUFHO1lBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlO1lBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUM1QyxJQUFJLENBQUMsT0FBTyxFQUNaLEdBQUcsRUFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUN0QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUN4QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxFQUN6QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxFQUN6QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLEVBQzNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQ3JDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsRUFDOUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsRUFDekMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FDMUMsQ0FDRjthQUNBLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUE4QixFQUFFLEVBQUU7WUFDcEQsSUFBSSxPQUFPLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDbkQsSUFBSSxHQUFHO29CQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztvQkFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSyxlQUFlLENBQUMsR0FBUTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLENBQUMsY0FBYzthQUNoQixJQUFJLENBQ0gsb0JBQW9CLEVBQ3BCLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FDaEU7YUFDQSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBYSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxJQUFJO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSyxZQUFZLENBQUMsS0FBaUI7UUFDcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsTUFBTTtZQUN2RSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7WUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNLLGNBQWM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSyxpQkFBaUI7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGtCQUFrQixDQUFDLE1BQVcsSUFBSTtRQUN4QyxJQUFJLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQzlDLElBQUksQ0FBQyxPQUFPLEVBQ1osR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQ3ZCLENBQUM7UUFFRix3QkFBd0I7UUFDeEIsSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLENBQUMsR0FBRztnQkFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzlDO2dCQUNILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLHVCQUF1QjtvQkFDbEMsT0FBTyxFQUFFLEdBQUc7aUJBQ2IsQ0FBQyxDQUFDO2dCQUVILEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2FBQ2Y7WUFFRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFTyxlQUFlO1FBQ3JCLElBQUksSUFBSSxHQUFHLFFBQVE7YUFDaEIsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDeEIsRUFBRSxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzdDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxtSEFBbUg7SUFFbkg7OztPQUdHO0lBQ0ksZUFBZTtRQUNwQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksWUFBWTtRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLGFBQWE7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxVQUFVLENBQUMsSUFBUyxFQUFFLEdBQVc7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQzVCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUM7WUFDekQsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDMUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLFdBQVc7UUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxtSEFBbUg7SUFFbkg7OztPQUdHO0lBQ0ksNEJBQTRCLENBQUMsY0FBc0I7UUFDeEQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7UUFDckMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx3QkFBd0IsQ0FBQyxHQUFRLEVBQUUsUUFBaUI7UUFDekQsbUhBQW1IO1FBQ25ILElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLElBQUksUUFBUTtnQkFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsSUFBSSxRQUFRO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN0QztnQkFDSCxHQUFHLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FDNUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUM5QixDQUFDO2FBQ0g7U0FDRjtRQUVELHVCQUF1QjtRQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1lBQ3pCLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNoQyxrQkFBa0IsRUFBRSxHQUFHO1lBQ3ZCLE9BQU8sRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLGNBQWMsQ0FBQyxHQUFRLEVBQUUsTUFBa0I7UUFDaEQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFDRSxJQUFJLENBQUMsZ0JBQWdCO2dCQUNyQixNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksY0FBYyxDQUFDLE9BQU87Z0JBQzFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUN4QjtnQkFDQSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEQ7U0FDRjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSSx3QkFBd0IsQ0FBQyxRQUFpQjtRQUMvQyxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztTQUN6QjtRQUVELHVCQUF1QjtRQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1lBQ3pCLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNoQyxrQkFBa0IsRUFBRSxFQUFFO1lBQ3RCLE9BQU8sRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLGFBQWE7UUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQkFBbUI7UUFDeEIsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFFZCx3QkFBd0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3hDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFFbkIsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWxFLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUUxQix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFM0IsY0FBYztRQUNkLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV2QiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksa0JBQWtCLENBQUMsY0FBMkI7UUFDbkQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQ3ZDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ25FLENBQUMsQ0FBQyxzQ0FBc0M7UUFFekMsTUFBTSxnQkFBZ0IsR0FDcEIsQ0FBQyxjQUFjLENBQUMsV0FBVyxJQUFJLEVBQUU7WUFDL0IsY0FBYyxDQUFDLFdBQVcsSUFBSSxJQUFJO1lBQ2xDLGNBQWMsQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDO1lBQzFDLGNBQWMsQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLENBQUMsNkdBQTZHO1FBRXBKLElBQUksZ0JBQWdCLEVBQUU7WUFDcEIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDO1lBQ3RFLDhEQUE4RDs7Z0JBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsNEJBQTRCO1NBQ3RFOztZQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLDBEQUEwRDtRQUV2RyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUJBQWlCLENBQUMsTUFBa0I7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUNyQixNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3JELE1BQU0sQ0FDUCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNJLG1CQUFtQixDQUFDLGNBQStCO1FBQ3hELFFBQVEsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN2QyxLQUFLLGdCQUFnQixDQUFDLElBQUk7Z0JBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNO1lBRVIsS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekMsTUFBTTtZQUVSLEtBQUssZ0JBQWdCLENBQUMsS0FBSztnQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU07U0FDVDtJQUNILENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQyxvQkFBb0I7WUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxLQUFLO2dCQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVEOzs7TUFHRTtJQUNLLGlCQUFpQjtRQUN0QixJQUFJLElBQUksQ0FBQyxvQkFBb0I7WUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwRDtZQUNILElBQUksWUFBWSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkUsSUFBSSxJQUFJLENBQUMsY0FBYztnQkFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUM3QyxJQUFJLFlBQVksRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLE9BQU8sR0FDVCxVQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxJQUFJLENBQUMsY0FBYztvQkFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUMvQztpQkFBTTtnQkFDTCxJQUFJLElBQUksQ0FBQyxjQUFjO29CQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQy9DO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksbUJBQW1CO1FBQ3hCLElBQUksSUFBSSxDQUFDLG9CQUFvQjtZQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3REO1lBQ0gsSUFBSSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuRSxJQUFJLElBQUksQ0FBQyxjQUFjO2dCQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQzdDLElBQUksWUFBWSxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksT0FBTyxHQUNULFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLElBQUksQ0FBQyxjQUFjO29CQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQy9DO2lCQUFNO2dCQUNMLElBQUksSUFBSSxDQUFDLGNBQWM7b0JBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDL0M7U0FDRjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSSxxQkFBcUIsQ0FBQyxNQUFrQjtRQUM3QyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUN0QixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ3ZDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxDQUNuQyxDQUFDO1lBRUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUIsTUFBTSxPQUFPLEdBQXVCLFFBQVEsQ0FBQyxjQUFjLENBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQy9CLENBQUM7Z0JBRUYsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsTUFBTSxLQUFLLEdBQVcsT0FBTyxDQUFDLFdBQVcsQ0FBQztvQkFDMUMsWUFBWSxJQUFJLEtBQUssQ0FBQztpQkFDdkI7YUFDRjtZQUVELE9BQU8sWUFBWSxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksd0JBQXdCO1FBQzdCLE9BQU8sQ0FDTCxJQUFJLENBQUMsVUFBVTtZQUNmLENBQUMsSUFBSSxDQUFDLGlCQUFpQjtnQkFDckIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FDakMsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSSx1QkFBdUI7UUFDNUIsT0FBTyxDQUNMLElBQUksQ0FBQyxjQUFjO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0I7WUFDckIsSUFBSSxDQUFDLGtCQUFrQjtZQUN2QixJQUFJLENBQUMscUJBQXFCO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQ2xCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHNCQUFzQixDQUFDLEdBQW1CLEVBQUUsTUFBVyxJQUFJO1FBQ2hFLFFBQVEsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JCLEtBQUssZ0JBQWdCLENBQUMsSUFBSTtnQkFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixNQUFNO1lBRVIsS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUMxQixJQUFJLEdBQUc7b0JBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsTUFBTTtZQUVSLEtBQUssZ0JBQWdCLENBQUMsS0FBSztnQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHdCQUF3QixDQUFDLE1BQWtCO1FBQ2hELElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQztRQUM1QixJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxTQUFTLENBQUMsSUFBSTtZQUFFLFNBQVMsSUFBSSxTQUFTLENBQUM7UUFDcEUsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQUUsU0FBUyxJQUFJLHVCQUF1QixDQUFDO1FBQzdELElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUFFLFNBQVMsSUFBSSxVQUFVLENBQUM7UUFFakQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG9CQUFvQixDQUFDLE1BQWtCO1FBQzVDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLGVBQWUsQ0FBQyxHQUFRO1FBQzdCLEdBQUcsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO1FBRXpDLElBQUksR0FBRyxDQUFDLGNBQWMsRUFBRTtZQUN0Qix3REFBd0Q7WUFDeEQsdUJBQXVCLENBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLEdBQUcsQ0FBQyx1QkFBdUIsRUFDM0IsR0FBRyxDQUFDLHVCQUF1QixDQUM1QixDQUFDO1lBQ0YsR0FBRyxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztTQUNwQzthQUFNO1lBQ0wsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQzdDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQzdELENBQUM7WUFDRixzQ0FBc0M7WUFDdEMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RCLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxhQUFhLENBQUM7Z0JBQzVDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDcEQsYUFBYSxFQUNiLEdBQUcsQ0FBQyxXQUFXLENBQ2hCLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQztJQUVNLDhCQUE4QixDQUFDLEtBQW1CO1FBQ3ZELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQzVDLDhCQUE4QixDQUMvQixDQUFDO1lBRUYsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUxQixPQUFPO3FCQUNKLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztvQkFDbEMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7Z0JBRWpFLDZCQUE2QjtnQkFDN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5RCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQzs7MkdBNTlCVSxhQUFhOytGQUFiLGFBQWEsc3FEQXdDYixzQkFBc0Isd0ZBRXRCLHdCQUF3QixzRUFQckIscUJBQXFCLGdEQ3JHckMsNDRUQXNQQTs0RkRwTGEsYUFBYTtrQkFMekIsU0FBUzsrQkFDRSxVQUFVO2lNQXdDcEIsZ0JBQWdCO3NCQURmLFlBQVk7dUJBQUMscUJBQXFCO2dCQU1uQyxtQkFBbUI7c0JBRGxCLFNBQVM7dUJBQUMsc0JBQXNCO2dCQUdqQyxxQkFBcUI7c0JBRHBCLFNBQVM7dUJBQUMsd0JBQXdCO2dCQU10QixJQUFJO3NCQUFoQixLQUFLO2dCQWlCVSxPQUFPO3NCQUF0QixLQUFLO2dCQUNVLG9CQUFvQjtzQkFBbkMsS0FBSztnQkFHVSxxQkFBcUI7c0JBQXBDLEtBQUs7Z0JBQ1UscUJBQXFCO3NCQUFwQyxLQUFLO2dCQUVVLFlBQVk7c0JBQTNCLEtBQUs7Z0JBQ1Usb0JBQW9CO3NCQUFuQyxLQUFLO2dCQVNVLGdCQUFnQjtzQkFBL0IsS0FBSztnQkFJVSxrQkFBa0I7c0JBQWpDLEtBQUs7Z0JBSVUsb0JBQW9CO3NCQUFuQyxLQUFLO2dCQUNVLGNBQWM7c0JBQTdCLEtBQUs7Z0JBZVUsaUJBQWlCO3NCQUFoQyxLQUFLO2dCQUNVLGdCQUFnQjtzQkFBL0IsS0FBSztnQkFDVSxnQkFBZ0I7c0JBQS9CLEtBQUs7Z0JBR1Usd0JBQXdCO3NCQUF2QyxLQUFLO2dCQUNVLGdCQUFnQjtzQkFBL0IsS0FBSztnQkFHVSxjQUFjO3NCQUE3QixLQUFLO2dCQUdVLE9BQU87c0JBQXRCLEtBQUs7Z0JBR1UsY0FBYztzQkFBN0IsS0FBSztnQkFHVSxlQUFlO3NCQUE5QixLQUFLO2dCQUlVLFVBQVU7c0JBQXpCLEtBQUs7Z0JBRVUsV0FBVztzQkFBMUIsS0FBSztnQkFDVSxhQUFhO3NCQUE1QixLQUFLO2dCQUNVLG9CQUFvQjtzQkFBbkMsS0FBSztnQkFhVSxtQkFBbUI7c0JBQWxDLEtBQUs7Z0JBV1UsY0FBYztzQkFBN0IsS0FBSztnQkFHVSxhQUFhO3NCQUE1QixLQUFLO2dCQUNVLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ1UsU0FBUztzQkFBeEIsS0FBSztnQkFJWSw4QkFBOEI7c0JBQS9DLE1BQU07Z0JBQ1csZ0JBQWdCO3NCQUFqQyxNQUFNO2dCQUNXLFdBQVc7c0JBQTVCLE1BQU07Z0JBQ1csb0JBQW9CO3NCQUFyQyxNQUFNO2dCQUNXLFdBQVc7c0JBQTVCLE1BQU07Z0JBQ1csYUFBYTtzQkFBOUIsTUFBTTtnQkFDVyxTQUFTO3NCQUExQixNQUFNO2dCQUNXLFdBQVc7c0JBQTVCLE1BQU07Z0JBQ1csYUFBYTtzQkFBOUIsTUFBTTtnQkFDVyxXQUFXO3NCQUE1QixNQUFNO2dCQUNXLGFBQWE7c0JBQTlCLE1BQU07Z0JBQ1csY0FBYztzQkFBL0IsTUFBTTtnQkFDVyxhQUFhO3NCQUE5QixNQUFNO2dCQUNXLFdBQVc7c0JBQTVCLE1BQU07Z0JBQ1csYUFBYTtzQkFBOUIsTUFBTTtnQkFDVyxlQUFlO3NCQUFoQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0NoaWxkcmVuLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHcmlkQ29sdW1uIH0gZnJvbSAnLi4vbW9kZWxzL2dyaWQtY29sdW1uLm1vZGVsJztcclxuaW1wb3J0IHsgR1JJRF9DT05GIH0gZnJvbSAnLi4vcmVzb3VyY2VzL2RlZmF1bHRzJztcclxuaW1wb3J0IHsgc3RyaW5ncyB9IGZyb20gJy4uL3Jlc291cmNlcy9zdHJpbmdzJztcclxuaW1wb3J0IHtcclxuICBOYkRpYWxvZ1NlcnZpY2UsXHJcbiAgTmJNZW51SXRlbSxcclxuICBOYk1lbnVTZXJ2aWNlLFxyXG4gIE5iUG9zaXRpb24sXHJcbiAgTmJXaW5kb3dTZXJ2aWNlLFxyXG59IGZyb20gJ0BuZWJ1bGFyL3RoZW1lJztcclxuaW1wb3J0IHtcclxuICBJR3JpZEFkZEVkaXRQb3B1cFNldHRpbmdzLFxyXG4gIElHcmlkQ2VsbEJ1dHRvbixcclxuICBJR3JpZEdyb3VwLFxyXG4gIElHcmlkRGVsZXRlUG9wdXBTZXR0aW5ncyxcclxuICBJR3JpZEV4cG9ydERvY3VtZW50U2V0dGluZ3MsXHJcbiAgSUdyaWRFeHBvcnRIZWFkZXIsXHJcbiAgSUdyaWRGaWx0ZXIsXHJcbiAgSUdyaWRTZWxlY3Rpb24sXHJcbiAgSUdyaWRTb3J0LFxyXG4gIElHcmlkRWRpdGVkUm93LFxyXG59IGZyb20gJy4uL21vZGVscy9ncmlkLm1vZGVsJztcclxuaW1wb3J0IHsgQ29sdW1uRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb2x1bW4tZmlsdGVyL2NvbHVtbi1maWx0ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1xyXG4gIEdSSURfQUNUSU9OU19QT1NJVElPTixcclxuICBHUklEX0JVVFRPTl9UWVBFLFxyXG4gIEdSSURfREFUQV9UWVBFLFxyXG4gIEdSSURfTUVOVV9BQ1RJT04sXHJcbiAgR1JJRF9NT0RFLFxyXG4gIEdSSURfU09SVCxcclxuICBHUklEX1NUQVRFLFxyXG59IGZyb20gJy4uL3Jlc291cmNlcy9tb2RlLWVudW1zJztcclxuaW1wb3J0IHsgR3JpZEZpbHRlclNlcnZpY2UgfSBmcm9tICcuL2dyaWQtZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmlkU29ydFNlcnZpY2UgfSBmcm9tICcuL2dyaWQtc29ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JpZEJ1dHRvbnNDb2x1bW4gfSBmcm9tICcuLi9tb2RlbHMvZ3JpZC1jb2x1bW4tdHlwZS5tb2RlbCc7XHJcbmltcG9ydCB7IEdyaWRBY3Rpb25zRWRpdG9yIH0gZnJvbSAnLi4vbW9kZWxzL2dyaWQtY29sdW1uLWVkaXRvci5tb2RlbCc7XHJcbmltcG9ydCB7IEdyaWRFeHBvcnQgfSBmcm9tICcuL2V4cG9ydC9ncmlkLWV4cG9ydC5jbGFzcyc7XHJcbmltcG9ydCB7IEdyaWRQZGZFeHBvcnRDb21wb25lbnQgfSBmcm9tICcuL2V4cG9ydC9ncmlkLXBkZi1leHBvcnQvZ3JpZC1wZGYtZXhwb3J0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdyaWRFeGNlbEV4cG9ydENvbXBvbmVudCB9IGZyb20gJy4vZXhwb3J0L2dyaWQtZXhjZWwtZXhwb3J0L2dyaWQtZXhjZWwtZXhwb3J0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9wb3B1cC9wb3B1cC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkUG9wdXAgfSBmcm9tICcuL3BvcHVwL2dyaWQtcG9wdXAuY2xhc3MnO1xyXG5pbXBvcnQgeyBEZWxldGVQb3B1cENvbXBvbmVudCB9IGZyb20gJy4vZGVsZXRlLXBvcHVwL2RlbGV0ZS1wb3B1cC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL2dyaWQtdmFsaWRhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JpZEdyb3VwU2VydmljZSB9IGZyb20gJy4vZ3JpZC1ncm91cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JpZEJ1dHRvblR5cGUgfSBmcm9tICcuLi9tb2RlbHMvZ3JpZC1idXR0b24tdHlwZS5tb2RlbCc7XHJcbmltcG9ydCB7IG1ha2VJZCwgcHVzaFRvQXJyYXlBdEluZGV4UmFuZ2UgfSBmcm9tICcuLi9mdW5jdGlvbnMvZnVuY3Rpb25zJztcclxuaW1wb3J0IHsgVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vcmVzb3VyY2VzL3RyYW5zbGF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtZ3JpZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2dyaWQuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9tZW51U2VydmljZTogTmJNZW51U2VydmljZSxcclxuICAgIHByaXZhdGUgX3dpbmRvd1NlcnZpY2U6IE5iV2luZG93U2VydmljZSxcclxuICAgIHByaXZhdGUgX2RpYWxvZ1NlcnZpY2U6IE5iRGlhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgX3RyYW5zbGF0aW9uU2VydmljZTogVHJhbnNsYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIGNoZWNrIGlmIHRyYW5zbGF0aW9ucyBhcmUgYWxyZWFkeSBsb2FkZWQgKGZyb20gZXh0ZXJuYWwgYXBwKVxyXG4gICAgaWYgKCF0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UuaXNUcmFuc2xhdGlvbnNMb2FkZWQoKSkge1xyXG4gICAgICB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2Uuc2V0VHJhbnNsYXRpb25zKHN0cmluZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldCBjb2x1bW5zIGluZGV4ZXNcclxuICAgIHRoaXMuY29sdW1ucy5tYXAoKHgsIGluZGV4KSA9PiB4LkluZGV4KGluZGV4KSk7XHJcblxyXG4gICAgLy8gc3Vic2NyaWJlIHRvIGNvbHVtbiBjb250ZXh0IG1lbnUgY2xpY2tcclxuICAgIGlmICh0aGlzLmNvbHVtbk9wdGlvbnNFbmFibGVkKSB0aGlzLmluaXRpYWxpemVDb2x1bW5zQ29udGV4dE1lbnVzKCk7XHJcblxyXG4gICAgLy8gaWYgZWRpdCBvciBkZWxldGUgZW5hYmxlZCBpbml0aWFsaXplIGFjdGlvbnMgY29sdW1uXHJcbiAgICBpZiAodGhpcy5lZGl0RW5hYmxlZCB8fCB0aGlzLmRlbGV0ZUVuYWJsZWQpIHRoaXMuaW5pdGlhbGl6ZUFjdGlvbnNDb2x1bW4oKTtcclxuXHJcbiAgICB0aGlzLmdyb3VwQ29sc3BhbiA9IHRoaXMuY29sdW1ucy5sZW5ndGg7XHJcbiAgICBpZiAodGhpcy5zZWxlY3Rpb25FbmFibGVkKSB0aGlzLmdyb3VwQ29sc3BhbisrO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zdWJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgZWxlbWVudC51bnN1YnNjcmliZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBWSUVXIENISUxEUkVOIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgQFZpZXdDaGlsZHJlbihDb2x1bW5GaWx0ZXJDb21wb25lbnQpXHJcbiAgX2ZpbHRlcnNDaGlsZHJlbjogUXVlcnlMaXN0PENvbHVtbkZpbHRlckNvbXBvbmVudD4gPSBuZXcgUXVlcnlMaXN0KCk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gVklFVyBDSElMRCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBAVmlld0NoaWxkKEdyaWRQZGZFeHBvcnRDb21wb25lbnQpXHJcbiAgX2V4cG9ydFBERkNvbXBvbmVudCE6IEdyaWRQZGZFeHBvcnRDb21wb25lbnQ7IC8vIGV4cG9ydCBQREYgY29tcG9uZW50IGluc3RhbmNlXHJcbiAgQFZpZXdDaGlsZChHcmlkRXhjZWxFeHBvcnRDb21wb25lbnQpXHJcbiAgX2V4cG9ydEV4Y2VsQ29tcG9uZW50ITogR3JpZEV4Y2VsRXhwb3J0Q29tcG9uZW50OyAvLyBleHBvcnQgRXhjZWwgY29tcG9uZW50IGluc3RhbmNlXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBJTlBVVFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKiBEQVRBIFNPVVJDRSBTRVRUSU5HUyAqKioqKioqKioqKioqKioqXHJcbiAgQElucHV0KCkgc2V0IGRhdGEodmFsdWU6IGFueVtdKSB7XHJcbiAgICAvLyByZXNldCByb3cgaW5kZXggaWYgZGF0YSBzb3VyY2UgY2hhbmdlZFxyXG4gICAgdmFsdWUgPSB2YWx1ZS5tYXAoKHZhbDogYW55LCBpbmRleCkgPT4ge1xyXG4gICAgICB2YWwuX1Jvd0luZGV4ID0gaW5kZXg7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICB0aGlzLmNoZWNrQW55R3JvdXBlZENvbHVtbnMoKTtcclxuICAgIHRoaXMucmVmcmVzaERhdGFUb1JlbmRlcigpOyAvLyByZWZyZXNoIGRhdGEgaW4gdGFibGVcclxuICAgIHRoaXMuX3NlbGVjdGVkUm93cyA9IFtdOyAvLyByZXNldCBzZWxlY3Rpb24gaWYgZGF0YSBzb3VyY2UgY2hhbmdlZFxyXG4gIH1cclxuICBnZXQgZGF0YSgpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICB9XHJcblxyXG4gIC8vICoqKioqKioqKioqKioqKioqKioqIENPTFVNTlMgU0VUVElOR1MgKioqKioqKioqKioqKioqKlxyXG4gIEBJbnB1dCgpIHB1YmxpYyBjb2x1bW5zOiBHcmlkQ29sdW1uW10gPSBbXTsgLy8gZ3JpZCBjb2x1bW5zIGRlZmluaXRpb25cclxuICBASW5wdXQoKSBwdWJsaWMgY29sdW1uT3B0aW9uc0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlOyAvLyBzaG93cyBvciBoaWRlcyBjb2x1bW5zIGNvbnRleHQgbWVudVxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKiBQQUdFUiBTRVRUSU5HUyAqKioqKioqKioqKioqKioqXHJcbiAgQElucHV0KCkgcHVibGljIGVudHJpZXNQZXJQYWdlRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7IC8vIHNob3dzIG9yIGhpZGVzIHBpY2tlciBmb3IgZW50cmllcyBwZXIgcGFnZVxyXG4gIEBJbnB1dCgpIHB1YmxpYyBlbnRyaWVzUGVyUGFnZU9wdGlvbnM6IG51bWJlcltdID1cclxuICAgIEdSSURfQ09ORi5lbnRyaWVzUGVyUGFnZU9wdGlvbnM7IC8vIGFycmF5IHdpdGggb3B0aW9ucyBmb3IgZW50cmllcyBwZXIgcGFnZSBzZWxlY3Rpb24gaWYgZW50cmllc1BlclBhZ2UgZW5hYmxlZFxyXG4gIEBJbnB1dCgpIHB1YmxpYyBwYWdlckVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlOyAvLyBzaG93cyBvciBoaWRlcyB0YWJsZSBwYWdlclxyXG4gIEBJbnB1dCgpIHB1YmxpYyBkZWZhdWx0UGVyUGFnZU9wdGlvbjogbnVtYmVyID1cclxuICAgIHRoaXMuZW50cmllc1BlclBhZ2VPcHRpb25zPy5sZW5ndGggPiAwXHJcbiAgICAgID8gdGhpcy5lbnRyaWVzUGVyUGFnZU9wdGlvbnNbMF1cclxuICAgICAgOiBHUklEX0NPTkYuZGVmYXVsdEVudHJpZXNQZXJQYWdlOyAvLyBzdGFydGluZyB2YWx1ZSBvZiBwYWdlciAtPiBpZiBub3Qgc2V0IHRoZW4gZmlyc3QgZnJvbSBlbnRyaWVzUGVyUGFnZU9wdGlvbnMgYXJyYXkgb3B0aW9uIGlzIHVzZWRcclxuICBwdWJsaWMgZW50cmllc1BlclBhZ2VUb29sdGlwOiBzdHJpbmcgPSB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKFxyXG4gICAgJ2dyaWRFbnRyaWVzUGVyUGFnZVRvb2x0aXAnXHJcbiAgKTsgLy8gdG9vbHRpcCB0byBiZSBzaG93biBvbiBlbnRyaWVzIHBlciBwZWdlIHNlbGVjdGlvbiBob3ZlciAtPiBlbXB0eSBzdHJpbmcgZGlzYWJsZXMgdG9vbHRpcFxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKiBFWFBPUlQgU0VUVElOR1MgKioqKioqKioqKioqKioqKlxyXG4gIEBJbnB1dCgpIHB1YmxpYyBleHBvcnRQZGZFbmFibGVkOiBib29sZWFuID0gdHJ1ZTsgLy8gc2hvd3Mgb3IgaGlkZXMgZXhwb3J0IFBERiBidXR0b25cclxuICBwdWJsaWMgZXhwb3J0UGRmVG9vbHRpcDogc3RyaW5nID0gdGhpcy5fdHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZShcclxuICAgICdncmlkRXhwb3J0UGRmVG9vbHRpcCdcclxuICApOyAvLyB0b29sdGlwIHRvIGJlIHNob3duIG9uIFBERiBleHBvcnQgYnV0dG9uIGhvdmVyIC0+IGVtcHR5IHN0cmluZyBkaXNhYmxlcyB0b29sdGlwXHJcbiAgQElucHV0KCkgcHVibGljIGV4cG9ydEV4Y2VsRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7IC8vIHNob3dzIG9yIGhpZGVzIGV4cG9ydCBFeGNlbCBidXR0b25cclxuICBwdWJsaWMgZXhwb3J0RXhjZWxUb29sdGlwOiBzdHJpbmcgPSB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKFxyXG4gICAgJ2dyaWRFeGNlbEV4cG9ydFRvb2x0aXAnXHJcbiAgKTsgLy8gdG9vbHRpcCB0byBiZSBzaG93biBvbiBFeGNlbCBleHBvcnQgYnV0dG9uIGhvdmVyIC0+IGVtcHR5IHN0cmluZyBkaXNhYmxlcyB0b29sdGlwXHJcbiAgQElucHV0KCkgcHVibGljIGN1c3RvbUV4cG9ydEZ1bmN0aW9uOiBib29sZWFuID0gZmFsc2U7IC8vIGlmIHNldCB0byB0cnVlIGNsaWNrIG9uIGV4cG9ydCBidXR0b25zIGZpcmVzIG9ubHkgY2xpY2sgZXZlbnQgYnV0IGRvZXNuJ3QgZG8gZGVmYXVsdCBleHBvcnRcclxuICBASW5wdXQoKSBwdWJsaWMgZXhwb3J0U2V0dGluZ3M6IElHcmlkRXhwb3J0RG9jdW1lbnRTZXR0aW5ncyA9IHtcclxuICAgIHRpdGxlOiB1bmRlZmluZWQsIC8vIHRpdGxlIHNob3duIG9uIGZpcnN0IHBhZ2VcclxuICAgIHN1YnRpdGxlOiB1bmRlZmluZWQsIC8vIHN1YnRpdGxlIHNob3duIG9uIGZpcnN0IHBhZ2VcclxuICAgIHNob3dPcmRpbmFsTnVtYmVyczogdHJ1ZSwgLy8gc2hvd3Mgb3IgaGlkZXMgcm93IG51bWJlcnNcclxuICAgIG9yZE51bUNvbHVtbk5hbWU6IHRoaXMuX3RyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2dyaWRUYWJsZU9yZE51bWJlcicpLCAvLyBjb2x1bW4gbmFtZSBmb3Igcm93IG51bWJlcnNcclxuICAgIGRvY05hbWU6IEdSSURfQ09ORi5leHBvcnREb2NOYW1lLCAvLyBleHBvcnQgZG9jdW1lbnQgbmFtZVxyXG4gICAgeWVzVmFsdWVUZXh0OiB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2VcclxuICAgICAgLnRyYW5zbGF0ZSgnZ3JpZFRhYmxlWWVzJylcclxuICAgICAgLnRvTG93ZXJDYXNlKCksIC8vIHllcyAodHJ1ZSkgdmFsdWUgZm9yIGJvb2xlYW4gZGF0YVxyXG4gICAgbm9WYWx1ZVRleHQ6IHRoaXMuX3RyYW5zbGF0aW9uU2VydmljZVxyXG4gICAgICAudHJhbnNsYXRlKCdncmlkVGFibGVObycpXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpLCAvLyBubyAoZmFsc2UpIHZhbHVlIGZvciBib29sZWFuIGRhdGFcclxuICB9OyAvLyBzZXR0aW5nIG9iamVjdCBmb3IgYnVpbHQgaW4gZXhwb3J0XHJcblxyXG4gIC8vICoqKioqKioqKioqKioqKioqKioqIFNFTEVDVElPTiBTRVRUSU5HUyAqKioqKioqKioqKioqKioqXHJcbiAgQElucHV0KCkgcHVibGljIHNlbGVjdGlvbk11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7IC8vIGlmIGZhbHNlIHRoZW4gc2VsZWN0aW9uIG1vZGUgaXMgc2luZ2xlIC0+IGRlcGVuZHMgb24gc2VsZWN0aW9uRW5hYmxlZCAoaWYgbm90IGVuYWJsZWQgdGhlbiBubyBzZWxlY3Rpb24gbW9kZSBpcyByZXF1aXJlZClcclxuICBASW5wdXQoKSBwdWJsaWMgc2VsZWN0Um93QnlDbGljazogYm9vbGVhbiA9IHRydWU7IC8vIGVuYWJsZXMgb3IgZGlzYWJsZXMgcm93IHNlbGVjdGlvbiBieSB0YWJsZSByb3cgY2xpY2tcclxuICBASW5wdXQoKSBwdWJsaWMgc2VsZWN0QWxsRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlOyAvLyBlbmFibGVzIG9yIGRpc2FibGVzIHNlbGVjdCBhbGwgY2hlY2tib3hcclxuICBwdWJsaWMgc2VsZWN0ZWRSb3dzVGl0bGU6IHN0cmluZyA9XHJcbiAgICB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdncmlkU2VsZWN0ZWRSb3dzJyk7IC8vIHNlbGVjdGVkIHJvd3MgdGl0bGUgd2hlbiBzZWxlY3Rpb24gbXVsdGlwbGUgZW5hYmxlZFxyXG4gIEBJbnB1dCgpIHB1YmxpYyBzZWxlY3RlZFJvd3NUaXRsZUVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlOyAvLyBzaG93IG9yIGhpZGVzIG51bWJlciBvZiBzZWxlY3RlZCByb3dzIHdoZW4gc2VsZWN0aW9uIG11bHRpcGxlIGVuYWJsZWRcclxuICBASW5wdXQoKSBwdWJsaWMgc2VsZWN0aW9uRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7IC8vIGVuYWJsZXMvZGlzYWJsZXMgZ3JpZCByb3cgc2VsZWN0aW9uXHJcblxyXG4gIC8vICoqKioqKioqKioqKioqKioqKioqIExPQURJTkcgU0VUVElOR1MgKioqKioqKioqKioqKioqKlxyXG4gIEBJbnB1dCgpIHB1YmxpYyBsb2FkaW5nRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7IC8vIGVuYWJsZXMgb3IgZGlzYWJsZXMgc3Bpbm5lciBsb2FkaW5nIG9uIHRhYmxlXHJcbiAgcHVibGljIGxvYWRpbmdNZXNzYWdlOiBzdHJpbmcgPVxyXG4gICAgdGhpcy5fdHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZSgnZ3JpZExvYWRpbmcnKTsgLy8gbWVzc2FnZSB0byBiZSBzaG93biBvbiBzcGlubmVyIGxvYWRpbmcgaWYgbG9hZGluZyBpcyBlbmFibGVkIC0+IGVtcHR5IHN0cmluZyBkaXNhYmxlcyBtZXNzYWdlXHJcbiAgQElucHV0KCkgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTsgLy8gZm9yIG1hbnVhbCB0cmlnZ2VyaW5nIG9mIGxvYWQgc3Bpbm5lciwgd29ya3MgY29ycmVjdGx5IGlmIGF1dG9tYXRpYyBsb2FkaW5nIGlzIGRpc2FibGVkIChsb2FkaW5nRW5hYmxlZD1mYWxzZSlcclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKiogRklMVEVSUyBTRVRUSU5HUyAqKioqKioqKioqKioqKioqXHJcbiAgQElucHV0KCkgcHVibGljIGZpbHRlcnNFbmFibGVkOiBib29sZWFuID0gdHJ1ZTsgLy8gc2hvdyBvciBoaWRlcyBmaWx0ZXJzIHJvdyBmb3IgYWxsIGNvbHVtbnNcclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKiogQUNUSU9OUyBTRVRUSU5HUyAqKioqKioqKioqKioqKioqXHJcbiAgQElucHV0KCkgcHVibGljIGFjdGlvbnNQb3NpdGlvbjogR1JJRF9BQ1RJT05TX1BPU0lUSU9OID1cclxuICAgIEdSSURfQ09ORi5hY3Rpb25zUG9zaXRpb247IC8vIGNhbiBiZSBsZWZ0IG9yIHJpZ2h0XHJcbiAgcHVibGljIGFjdGlvbnNDb2x1bW5UaXRsZTogc3RyaW5nID1cclxuICAgIHRoaXMuX3RyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2dyaWRBY3Rpb25zJyk7IC8vIHRpdGxlIGZvciBhY3Rpb24gY29sdW1uIGlmIGFjdGlvbnMgYXJlIGVuYWJsZWRcclxuICBASW5wdXQoKSBwdWJsaWMgYWRkRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7IC8vIHNob3dzIG9yIGhpZGVzIGFkZCBidXR0b25cclxuICBwdWJsaWMgYWRkVG9vbHRpcDogc3RyaW5nID0gdGhpcy5fdHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZSgnZ3JpZEFkZEJ0bicpOyAvLyBhZGQgYnV0dG9uIHRvb2x0aXBcclxuICBASW5wdXQoKSBwdWJsaWMgZWRpdEVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlOyAvLyBzaG93cyBvciBoaWRlcyBlZGl0IGJ1dHRvbnMgb24gcm93c1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkZWxldGVFbmFibGVkOiBib29sZWFuID0gdHJ1ZTsgLy8gc2hvd3Mgb3IgaGlkZXMgZGVsZXRlIGJ1dHRvbnMgb24gcm93c1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhZGRFZGl0UG9wdXBTZXR0aW5nczogSUdyaWRBZGRFZGl0UG9wdXBTZXR0aW5ncyA9IHtcclxuICAgIG5ld1JlY29yZFRpdGxlOiB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdncmlkTmV3UmVjb3JkJyksIC8vIHBvcHVwIHRpdGxlIGZvciBhZGRpbmcgbmV3IHJlY29yZFxyXG4gICAgZWRpdFJlY29yZFRpdGxlOiB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdncmlkRWRpdFJlY29yZCcpLCAvLyBwb3B1cCB0aXRsZSBmb3IgZWRpdGluZyByZWNvcmRcclxuICAgIHNhdmVCdG5UaXRsZTogdGhpcy5fdHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZSgnZ3JpZFNhdmVCdG5UZXh0JyksIC8vIHBvcHVwIHNhdmUgYnV0dG9uIHRleHRcclxuICAgIGNhbmNlbEJ0blRpdGxlOiB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdncmlkQ2FuY2VsQnRuVGV4dCcpLCAvLyBwb3B1cCBjYW5jZWwgYnV0dG9uIHRleHRcclxuICAgIHJlcXVpcmVkVG9vbHRpcDogdGhpcy5fdHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZSgnZ3JpZFJlcXVpcmVkVG9vbHRpcCcpLCAvLyBwb3B1cCByZXF1aXJlZCBmaWVsZCB0b29sdGlwXHJcbiAgICBoYXNCYWNrdHJvcDogdHJ1ZSwgLy8gc2hvd3Mgb3IgaGlkZXMgYmFja3JvcCBvbiBwb3B1cFxyXG4gICAgc2hvd0Z1bGxTY3JlZW5CdG46IHRydWUsIC8vIHNob3dzIG9yIGhpZGVzIGZ1bGwgc2NyZWVuIGJ1dHRvbiBvbiBwb3B1cFxyXG4gICAgc2hvd01heGltaXplQnRuOiB0cnVlLCAvLyBzaG93cyBvciBoaWRlcyBtYXhpbWl6ZSBidXR0b24gb24gcG9wdXBcclxuICAgIHNob3dNaW5pbWl6ZUJ0bjogdHJ1ZSwgLy8gc2hvd3Mgb3IgaGlkZXMgbWluaW1pemUgYnV0dG9uIG9uIHBvcHVwXHJcbiAgICBjbG9zZU9uQmFja2Ryb3BDbGljazogZmFsc2UsIC8vIGVuYWJsZXMgb3IgZGlzYWJsZXMgcG9wdXAgY2xvc2luZyBvbiBiYWNrZHJvcCBjbGlja1xyXG4gICAgY2xvc2VPbkVzY0NsaWNrOiBmYWxzZSwgLy8gZW5hYmxlcyBvciBkaXNhYmxlcyBwb3B1cCBjbG9zaW5nIG9uIGVzYyBrZXkgcHJlc3NcclxuICB9OyAvLyBzZXR0aW5nIG9iamVjdCBmb3IgYWRkL2VkaXQgcG9wdXAgaWYgdGFibGUgbW9kZSBwb3B1cFxyXG4gIEBJbnB1dCgpIHB1YmxpYyBkZWxldGVQb3B1cFNldHRpbmdzOiBJR3JpZERlbGV0ZVBvcHVwU2V0dGluZ3MgPSB7XHJcbiAgICB1c2VEZWZhdWx0RGlhbG9nOiB0cnVlLCAvLyBpZiB0cnVlIGRlZmF1bHQgdGFibGUgZGlhbG9nIGlzIHVzZWQsIGVsc2UgZGVmYXVsdCBkZWxldGUgZXZlbnQgaXMgZmlyZWRcclxuICAgIHRpdGxlOiB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdncmlkRGVsZXRlQ29uZmlybVRpdGxlJyksIC8vIGRlbGV0ZSBkaWFsb2cgdGl0bGVcclxuICAgIHRleHQ6IHRoaXMuX3RyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2dyaWREZWxldGVDb25maXJtVGV4dCcpLCAvLyBkZWxldGUgZGlhbG9nIGJvZHkgdGV4dFxyXG4gICAgeWVzQnRuVGV4dDogdGhpcy5fdHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZSgnZ3JpZFRhYmxlWWVzJyksIC8vIHllcyAoY29uZmlybSkgZGlhbG9nIGJ1dHRvbiB0ZXh0XHJcbiAgICBub0J0blRleHQ6IHRoaXMuX3RyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2dyaWRUYWJsZU5vJyksIC8vIG5vIChjYW5jZWwpIGRpYWxvZyBidXR0b24gdGV4dFxyXG4gICAgY2xvc2VPbkJhY2tkcm9wQ2xpY2s6IHRydWUsIC8vIGVuYWJsZXMgb3IgZGlzYWJsZXMgZGlhbG9nIGNsb3Npbmcgb24gYmFja2Ryb3AgY2xpY2tcclxuICAgIGNsb3NlT25Fc2M6IHRydWUsIC8vIGVuYWJsZXMgb3IgZGlzYWJsZXMgZGlhbG9nIGNsb3Npbmcgb24gZXNjIGtleSBwcmVzc1xyXG4gIH07IC8vIHNldHRpbmcgb2JqZWN0IGZvciBkZWxldGUgZGlhbG9nIGlmIHRhYmxlIG1vZGUgcG9wdXBcclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKiogR1JJRCBTRVRUSU5HUyAqKioqKioqKioqKioqKioqXHJcbiAgQElucHV0KCkgcHVibGljIHJlZnJlc2hFbmFibGVkOiBib29sZWFuID0gdHJ1ZTsgLy8gc2hvd3Mgb3IgaGlkZXMgcmVmcmVzaCB0YWJsZSBidXR0b25cclxuICBwdWJsaWMgcmVmcmVzaFRvb2x0aXA6IHN0cmluZyA9XHJcbiAgICB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdncmlkUmVmcmVzaFRvb2x0aXAnKTsgLy8gdG9vbHRpcCB0byBiZSBzaG93biBvbiBSZWZyZXNoIGJ1dHRvbiBob3ZlciAtPiBlbXB0eSBzdHJpbmcgZGlzYWJsZXMgdG9vbHRpcFxyXG4gIEBJbnB1dCgpIHB1YmxpYyBub0RhdGFNZXNzYWdlOiBzdHJpbmcgPSB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdncmlkTm9EYXRhJyk7IC8vIG1lc3NhZ2UgdG8gYmUgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyBkYXRhIGluIHNvdXJjZVxyXG4gIEBJbnB1dCgpIHB1YmxpYyBncmlkTW9kZTogR1JJRF9NT0RFID0gR1JJRF9NT0RFLklOTElORTsgLy8gZ3JpZCBpbnNlcnQgYW5kIGVkaXQgbW9kZVxyXG4gIEBJbnB1dCgpIHB1YmxpYyByb3dIZWlnaHQ6IG51bWJlciA9IDA7IC8vIGdyaWQgcm93IGhlaWdodCBpbiBweCAtIGlmIDAgdGhlbiBhdXRvIGhlaWdodFxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gT1VUUFVUUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBAT3V0cHV0KCkgcHJpdmF0ZSBlbnRyaWVzUGVyUGFnZVNlbGVjdGlvbkNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTsgLy8gZmlyZXMgd2hlbiBzZWxlY3RlZCBvcHRpb24gb2YgZW50cmllcyBwZXIgcGFnZSBjaGFuZ2VkXHJcbiAgQE91dHB1dCgpIHByaXZhdGUgc2VsZWN0aW9uQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SUdyaWRTZWxlY3Rpb24+KCk7IC8vIGZpcmVzIHdoZW4gc2VsZWN0ZWQgcm93IGNoYW5nZWQgaWYgc2VsZWN0aW9uIGlzIGVuYWJsZWRcclxuICBAT3V0cHV0KCkgcHJpdmF0ZSBwYWdlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpOyAvLyBmaXJlcyB3aGVuIHBhZ2UgY2hhbmdlZFxyXG4gIEBPdXRwdXQoKSBwcml2YXRlIHNvdXJjZUZpbHRlcnNSZXNldGVkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpOyAvLyBmaXJlcyB3aGVuIHJlc2V0IGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgQE91dHB1dCgpIHByaXZhdGUgc29ydENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPElHcmlkU29ydD4oKTsgLy8gZmlyZXMgd2hlbiBzb3J0aW5nIG9wdGlvbiBjaGFuZ2VkXHJcbiAgQE91dHB1dCgpIHByaXZhdGUgZmlsdGVyQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SUdyaWRGaWx0ZXI+KCk7IC8vIGZpcmVzIHdoZW4gc29ydGluZyBvcHRpb24gY2hhbmdlZFxyXG4gIEBPdXRwdXQoKSBwcml2YXRlIHBkZkV4cG9ydCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpOyAvLyBmaXJlcyB3aGVuIFBERiBleHBvcnQgYnV0dG9uIGlzIGNsaWNrZWRcclxuICBAT3V0cHV0KCkgcHJpdmF0ZSBleGNlbEV4cG9ydCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpOyAvLyBmaXJlcyB3aGVuIEV4Y2VsIGV4cG9ydCBidXR0b24gaXMgY2xpY2tlZFxyXG4gIEBPdXRwdXQoKSBwcml2YXRlIGNyZWF0ZUNvbmZpcm0gPSBuZXcgRXZlbnRFbWl0dGVyPElHcmlkRWRpdGVkUm93PigpOyAvLyBmaXJlcyBpZiB0YWJsZSBtb2RlIGlubGluZSBvciBwb3B1cCB3aGVuIHNhdmUgYnV0dG9uIGlzIGNsaWNrZWQgb24gbmV3IHJlY29yZFxyXG4gIEBPdXRwdXQoKSBwcml2YXRlIGVkaXRDb25maXJtID0gbmV3IEV2ZW50RW1pdHRlcjxJR3JpZEVkaXRlZFJvdz4oKTsgLy8gZmlyZXMgaWYgdGFibGUgbW9kZSBpbmxpbmUgb3IgcG9wdXAgd2hlbiBzYXZlIGJ1dHRvbiBpcyBjbGlja2VkIG9uIG5ldyByZWNvcmRcclxuICBAT3V0cHV0KCkgcHJpdmF0ZSBkZWxldGVDb25maXJtID0gbmV3IEV2ZW50RW1pdHRlcjxJR3JpZEVkaXRlZFJvdz4oKTsgLy8gZmlyZXMgaWYgdGFibGUgbW9kZSBpbmxpbmUgb3IgcG9wdXAgd2hlbiBzYXZlIGJ1dHRvbiBpcyBjbGlja2VkIG9uIG5ldyByZWNvcmRcclxuICBAT3V0cHV0KCkgcHJpdmF0ZSBhY3Rpb25CdG5DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8SUdyaWRDZWxsQnV0dG9uPigpOyAvLyBmaXJlcyBpZiBncmlkIGFjdGlvbiBidXR0b24gaXMgY2xpY2tlZFxyXG4gIEBPdXRwdXQoKSBwcml2YXRlIGNyZWF0ZVN0YXJ0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7IC8vIGZpcmVzIGlmIHRhYmxlIG1vZGUgZXh0ZXJuYWwgd2hlbiBuZXcgcmVjb3JkIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgQE91dHB1dCgpIHByaXZhdGUgZWRpdFN0YXJ0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTsgLy8gZmlyZXMgaWYgdGFibGUgbW9kZSBleHRlcm5hbCB3aGVuIGVkaXQgYnV0dG9uIG9uIHJvdyBpcyBjbGlja2VkXHJcbiAgQE91dHB1dCgpIHByaXZhdGUgZGVsZXRlU3RhcnRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpOyAvLyBmaXJlcyBpZiB0YWJsZSBtb2RlIGV4dGVybmFsIHdoZW4gZGVsZXRlIGJ1dHRvbiBvbiByb3cgaXMgY2xpY2tlZFxyXG4gIEBPdXRwdXQoKSBwcml2YXRlIGdyb3VwaW5nQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SUdyaWRHcm91cD4oKTsgLy8gZmlyZXMgd2hlbiBjb2x1bW4gZ3JvdXBpbmcgaXMgY2hhbmdlZFxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBSSVZBVEUgRklFTERTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwcml2YXRlIF9kYXRhOiBhbnk7XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRSb3dzOiBhbnlbXSA9IFtdO1xyXG4gIHByaXZhdGUgX3N1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBfZmlsdGVyczogSUdyaWRGaWx0ZXJbXSA9IFtdOyAvLyBhbGwgYXBwbGllZCBmaWx0ZXJzXHJcbiAgcHJpdmF0ZSBfc29ydDogSUdyaWRTb3J0W10gPSBbXTsgLy8gYWxsIGFwcGxpZWQgc29ydGluZ1xyXG4gIHByaXZhdGUgX2RvY2tlZENvbHVtbnM6IEdyaWRDb2x1bW5bXSA9IFtdOyAvLyBhbGwgZG9ja2VkIGNvbHVtbnNcclxuICBwcml2YXRlIF9yb3dJbkVkaXRpbmdJbmxpbmVEYXRhOiBhbnk7IC8vIG9sZCByb3cgZGF0YSBmb3IgZ3JpZCBpbmxpbmUgZWRpdCBtb2RlXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUFVCTElDIEZJRUxEUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHB1YmxpYyBwYWdlOiBudW1iZXIgPSAxO1xyXG4gIHB1YmxpYyBwb3NpdGlvbiA9IE5iUG9zaXRpb247XHJcbiAgcHVibGljIHNvcnRTdGF0ZXMgPSBHUklEX1NPUlQ7XHJcbiAgcHVibGljIGRhdGFUb1JlbmRlcjogYW55W10gPSBbXTsgLy8gZmlsdGVyZWQgYW5kIHNvcnRlZCBkYXRhIHRvIGJlIHJlbmRlcmVkIGluIHRhYmxlXHJcbiAgcHVibGljIGdyaWRTdGF0ZTogR1JJRF9TVEFURSA9IEdSSURfU1RBVEUuTk9ORTsgLy8gY3VycmVudCBncmlkIHN0YXRlXHJcbiAgcHVibGljIGdyaWRTdGF0ZXMgPSBHUklEX1NUQVRFO1xyXG4gIHB1YmxpYyBncmlkTW9kZXMgPSBHUklEX01PREU7XHJcbiAgcHVibGljIG5ld1Jvd0RhdGE6IGFueSA9IHt9OyAvLyBuZXcgcm93IGRhdGEgZm9yIGdyaWQgaW5saW5lIGVkaXQgbW9kZVxyXG4gIHB1YmxpYyBncm91cGVkQ29sdW1uOiBHcmlkQ29sdW1uIHwgbnVsbCA9IG51bGw7IC8vIGFsbCBncm91cGVkIGNvbHVtbnNcclxuICBwdWJsaWMgZ3JvdXBDb2xzcGFuOiBudW1iZXIgPSAxO1xyXG4gIHB1YmxpYyBpZDogc3RyaW5nID0gbWFrZUlkKDMwKTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBSSVZBVEUgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2hlY2tBbnlHcm91cGVkQ29sdW1ucygpOiB2b2lkIHtcclxuICAgIHZhciBjb2x1bW4gPSB0aGlzLmNvbHVtbnMuZmluZCgoeDogR3JpZENvbHVtbikgPT4geC5nZXRHcm91cGVkKCkpO1xyXG4gICAgaWYgKGNvbHVtbikgdGhpcy5ncm91cGVkQ29sdW1uID0gY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm93IHNlbGVjdGVkIHJvdyB0byBiZSBlZGl0ZWRcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXJ0R3JpZEVkaXQocm93OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmdyaWRDYW5CZU1vZGlmaWVkKCkpIHtcclxuICAgICAgdGhpcy5lZGl0U3RhcnRlZC5lbWl0KHsgZGF0YTogcm93IH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXMuZ3JpZE1vZGUgPT0gR1JJRF9NT0RFLlBPUFVQKSB0aGlzLm9wZW5BZGRFZGl0UG9wdXAocm93KTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5ncmlkTW9kZSA9PSBHUklEX01PREUuSU5MSU5FKSB7XHJcbiAgICAgICAgdGhpcy5fcm93SW5FZGl0aW5nSW5saW5lRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocm93KSk7XHJcbiAgICAgICAgcm93Lm1vZGUgPSAnZWRpdCc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc2V0R3JpZFN0YXRlKEdSSURfU1RBVEUuRURJVCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSByb3cgcm93IGRhdGEgdG8gYmUgZGVsZXRlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhcnRHcmlkRGVsZXRlKHJvdzogYW55KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5ncmlkQ2FuQmVNb2RpZmllZCgpKSB7XHJcbiAgICAgIHRoaXMuZGVsZXRlU3RhcnRlZC5lbWl0KHsgZGF0YTogcm93IH0pO1xyXG4gICAgICAvLyBpZiB1c2UgZGVmYXVsdCBkZWxldGUgZGlhbG9nIG9wZW4gcG9wdXAsIGRlZmF1bHQgZGlhbG9nIGRvZXNuJ3QgZGVwZW5kIG9uIGdyaWQgbW9kZVxyXG4gICAgICBpZiAodGhpcy5kZWxldGVQb3B1cFNldHRpbmdzLnVzZURlZmF1bHREaWFsb2cpIHRoaXMub3BlbkRlbGV0ZVBvcHVwKHJvdyk7XHJcblxyXG4gICAgICB0aGlzLnNldEdyaWRTdGF0ZShHUklEX1NUQVRFLkRFTEVURSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyBjb2x1bW5zIGNvbnRleHQgbWVudXMgYW5kIHN1YnNjcmliZXMgdG8gY2xpY2tzIGlmIGNvbHVtbiBjb250ZXh0IG1lbnUgaXMgZW5hYmxlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUNvbHVtbnNDb250ZXh0TWVudXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zdWJzLnB1c2goXHJcbiAgICAgIHRoaXMuX21lbnVTZXJ2aWNlXHJcbiAgICAgICAgLm9uSXRlbUNsaWNrKClcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGZpbHRlcigoeyB0YWcgfSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFnPy5zdGFydHNXaXRoKCdjb2x1bW4tY29udGV4dC1tZW51LScgKyB0aGlzLmlkICsgJy0nKTtcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgbWFwKCh7IGl0ZW0gfSkgPT4gaXRlbSlcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgoaXRlbTogTmJNZW51SXRlbSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vbkNvbHVtbkNvbnRleHRNZW51Q2xpY2soaXRlbSk7XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyBncmlkIGNvbHVtbiBmb3IgYWN0aW9ucyBpZiBzb21lIG9mIGFjdGlvbnMgYXJlIGVuYWJsZWRcclxuICAgKi9cclxuICBwcml2YXRlIGluaXRpYWxpemVBY3Rpb25zQ29sdW1uKCk6IHZvaWQge1xyXG4gICAgdmFyIGJ1dHRvbnM6IEdyaWRCdXR0b25UeXBlW10gPSBbXTtcclxuXHJcbiAgICBpZiAodGhpcy5lZGl0RW5hYmxlZClcclxuICAgICAgYnV0dG9ucy5wdXNoKFxyXG4gICAgICAgIG5ldyBHcmlkQnV0dG9uVHlwZSgpXHJcbiAgICAgICAgICAuVHlwZShHUklEX0JVVFRPTl9UWVBFLkVESVQpXHJcbiAgICAgICAgICAuSWNvbignZWRpdC1vdXRsaW5lJylcclxuICAgICAgICAgIC5Ub29sdGlwKHRoaXMuX3RyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2dyaWRFZGl0VG9vbHRpcCcpKVxyXG4gICAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLmRlbGV0ZUVuYWJsZWQpXHJcbiAgICAgIGJ1dHRvbnMucHVzaChcclxuICAgICAgICBuZXcgR3JpZEJ1dHRvblR5cGUoKVxyXG4gICAgICAgICAgLlR5cGUoR1JJRF9CVVRUT05fVFlQRS5ERUxFVEUpXHJcbiAgICAgICAgICAuSWNvbigndHJhc2gtb3V0bGluZScpXHJcbiAgICAgICAgICAuVG9vbHRpcCh0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdncmlkRGVsZXRlVG9vbHRpcCcpKVxyXG4gICAgICApO1xyXG5cclxuICAgIHZhciBhY3Rpb25Db2x1bW46IEdyaWRDb2x1bW4gPSBuZXcgR3JpZENvbHVtbigpXHJcbiAgICAgIC5UaXRsZSh0aGlzLmFjdGlvbnNDb2x1bW5UaXRsZSlcclxuICAgICAgLlR5cGUoXHJcbiAgICAgICAgbmV3IEdyaWRCdXR0b25zQ29sdW1uKClcclxuICAgICAgICAgIC5FZGl0YWJsZSh0aGlzLmVkaXRFbmFibGVkKVxyXG4gICAgICAgICAgLlJlbW92YWJsZSh0aGlzLmRlbGV0ZUVuYWJsZWQpXHJcbiAgICAgICAgICAuQnV0dG9ucyhidXR0b25zKVxyXG4gICAgICApXHJcbiAgICAgIC5Tb3J0YWJsZShmYWxzZSlcclxuICAgICAgLkZpbHRlcihmYWxzZSlcclxuICAgICAgLkV4cG9ydChmYWxzZSlcclxuICAgICAgLkdyb3VwaW5nRW5hYmxlZChmYWxzZSlcclxuICAgICAgLldpZHRoKCcxMjBweCcpXHJcbiAgICAgIC5FZGl0b3IoXHJcbiAgICAgICAgbmV3IEdyaWRBY3Rpb25zRWRpdG9yKCkuQnV0dG9ucyhbXHJcbiAgICAgICAgICBuZXcgR3JpZEJ1dHRvblR5cGUoKVxyXG4gICAgICAgICAgICAuVHlwZShHUklEX0JVVFRPTl9UWVBFLlNBVkUpXHJcbiAgICAgICAgICAgIC5JY29uKCdjaGVja21hcmstb3V0bGluZScpXHJcbiAgICAgICAgICAgIC5Ub29sdGlwKHRoaXMuX3RyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2dyaWRTYXZlVG9vbHRpcCcpKSxcclxuICAgICAgICAgIG5ldyBHcmlkQnV0dG9uVHlwZSgpXHJcbiAgICAgICAgICAgIC5UeXBlKEdSSURfQlVUVE9OX1RZUEUuQ0FOQ0VMKVxyXG4gICAgICAgICAgICAuSWNvbignY2xvc2Utb3V0bGluZScpXHJcbiAgICAgICAgICAgIC5Ub29sdGlwKHRoaXMuX3RyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2dyaWRDYW5jZWxUb29sdGlwJykpLFxyXG4gICAgICAgIF0pXHJcbiAgICAgICk7XHJcblxyXG4gICAgLy8gZGVmYXVsdCBhY3Rpb24gY29sdW1ucyBwb3NpdGlvbiBpcyByaWdodCwgb3RoZXJ3aXNlIGFjdGlvbiBjb2x1bW4gbmVlZHMgdG8gYmUgc2V0IGluIGZpcnN0IHBsYWNlIGluIGNvbHVtbnMgYXJyYXkgKHNvIGl0IGNvdWxkIGJlIHJlbmRlcmVkIG9uIHRhYmxlIHN0YXJ0KVxyXG4gICAgaWYgKHRoaXMuYWN0aW9uc1Bvc2l0aW9uID09IEdSSURfQUNUSU9OU19QT1NJVElPTi5SSUdIVClcclxuICAgICAgdGhpcy5jb2x1bW5zLnB1c2goYWN0aW9uQ29sdW1uKTtcclxuICAgIGVsc2UgdGhpcy5jb2x1bW5zLnVuc2hpZnQoYWN0aW9uQ29sdW1uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm1zIGFjdGlvbiBiYXNlZCBvbiBjb2x1bW4gY29udGV4dCBtZW51IGl0ZW0gdGhhdCB3YXMgY2xpY2tlZFxyXG4gICAqIEBwYXJhbSBpdGVtIHtOYk1lbnVJdGVtfSBvYmplY3QgdGhhdCBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkNvbHVtbkNvbnRleHRNZW51Q2xpY2soaXRlbTogTmJNZW51SXRlbSk6IHZvaWQge1xyXG4gICAgc3dpdGNoIChpdGVtLmRhdGEuYWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgR1JJRF9NRU5VX0FDVElPTi5ET0NLOlxyXG4gICAgICAgIHRoaXMub25Db2x1bW5Eb2NraW5nQ2hhbmdlKGl0ZW0uZGF0YS5jb2x1bW4sIHRydWUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBHUklEX01FTlVfQUNUSU9OLlVORE9DSzpcclxuICAgICAgICB0aGlzLm9uQ29sdW1uRG9ja2luZ0NoYW5nZShpdGVtLmRhdGEuY29sdW1uLCBmYWxzZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIEdSSURfTUVOVV9BQ1RJT04uU09SVF9BU0M6XHJcbiAgICAgICAgdGhpcy5vbkNvbHVtblNvcnRDaGFuZ2UodHJ1ZSwgaXRlbS5kYXRhLmNvbHVtbik7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIEdSSURfTUVOVV9BQ1RJT04uU09SVF9ERVNDOlxyXG4gICAgICAgIHRoaXMub25Db2x1bW5Tb3J0Q2hhbmdlKGZhbHNlLCBpdGVtLmRhdGEuY29sdW1uKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgR1JJRF9NRU5VX0FDVElPTi5HUk9VUDpcclxuICAgICAgICB0aGlzLm9uQ29sdW1uR3JvdXBpbmdDaGFuZ2UoaXRlbS5kYXRhLmNvbHVtbiwgdHJ1ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIEdSSURfTUVOVV9BQ1RJT04uVU5HUk9VUDpcclxuICAgICAgICB0aGlzLm9uQ29sdW1uR3JvdXBpbmdDaGFuZ2UoaXRlbS5kYXRhLmNvbHVtbiwgZmFsc2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBHUklEX01FTlVfQUNUSU9OLlNIT1dfR1JPVVBfQ09VTlQ6XHJcbiAgICAgICAgKGl0ZW0uZGF0YS5jb2x1bW4gYXMgR3JpZENvbHVtbikuU2hvd0dyb3VwQ291bnQodHJ1ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIEdSSURfTUVOVV9BQ1RJT04uSElERV9HUk9VUF9DT1VOVDpcclxuICAgICAgICAoaXRlbS5kYXRhLmNvbHVtbiBhcyBHcmlkQ29sdW1uKS5TaG93R3JvdXBDb3VudChmYWxzZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJdCBzYXZlcyBzZWxlY3RlZCBjb2x1bW4gdG8gX2RvY2tlZENvbHVtbnMgYXJyYXkgYW5kIGNhbGN1bGF0ZXMgZG9ja2VkIGNvbHVtbnMgcG9zaXRpb25zIGluIGdyaWRcclxuICAgKiBAcGFyYW0gY29sdW1uIHtHcmlkQ29sdW1ufSBpbnN0YW5jZSB0aGF0IHdhcyBzZWxlY3RlZCB0byBkb2NraW5nXHJcbiAgICogQHBhcmFtIGRvY2sge2Jvb2xlYW59IGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIGRvY2sgb3IgdW5kb2NrIGlzIHBlcmZvcm1lZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Db2x1bW5Eb2NraW5nQ2hhbmdlKGNvbHVtbjogR3JpZENvbHVtbiwgZG9jazogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgY29sdW1uLkRvY2tlZChkb2NrKTtcclxuXHJcbiAgICBpZiAoZG9jaykgdGhpcy5fZG9ja2VkQ29sdW1ucy5wdXNoKGNvbHVtbik7XHJcbiAgICBlbHNlIHtcclxuICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZG9ja2VkQ29sdW1ucy5maW5kSW5kZXgoXHJcbiAgICAgICAgKHgpID0+IHguZ2V0SWQoKSA9PSBjb2x1bW4uZ2V0SWQoKVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLl9kb2NrZWRDb2x1bW5zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc29ydCBkb2NrZWQgY29sdW1ucyBieSBpbmRleCBzbyBsZWZ0IHBvc2l0aW9uIGNhbiBiZSBjYWxjdWxhdGVkIGNvcnJlY3RseVxyXG4gICAgdGhpcy5fZG9ja2VkQ29sdW1ucy5zb3J0KChhLCBiKSA9PiBhLmdldEluZGV4KCkgLSBiLmdldEluZGV4KCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVmcmVzaGVzIHJlbmRlcmVkIGRhdGEgYnkgYXBwbGllZCBmaWx0ZXJpbmcsIHNvcnRpbmcgYW5kIGdyb3VwaW5nIGNvbHVtbnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlZnJlc2hEYXRhVG9SZW5kZXIoKTogdm9pZCB7XHJcbiAgICB2YXIgZmlsdGVyZWREYXRhID0gR3JpZEZpbHRlclNlcnZpY2UuZmlsdGVyRGF0YSh0aGlzLl9maWx0ZXJzLCB0aGlzLmRhdGEpOyAvLyBmaWx0ZXIgZ3JpZCBkYXRhIGJ5IGFsbCBzZXQgZmlsdGVyc1xyXG4gICAgLy8gc29ydCBmaWx0ZXJlZCBkYXRhXHJcbiAgICBpZiAodGhpcy5fc29ydC5sZW5ndGggPiAwKVxyXG4gICAgICB2YXIgc29ydGVkRGF0YSA9IEdyaWRTb3J0U2VydmljZS5zb3J0RGF0YShmaWx0ZXJlZERhdGEsIHRoaXMuX3NvcnQpO1xyXG4gICAgZWxzZSB2YXIgc29ydGVkRGF0YSA9IEdyaWRTb3J0U2VydmljZS5yZXNldFNvcnQoZmlsdGVyZWREYXRhKTtcclxuXHJcbiAgICAvLyBncm91cCBzb3J0ZWQgYW5kIGZpbHRlcmVkIGRhdGFcclxuICAgIGlmICh0aGlzLmdyb3VwZWRDb2x1bW4pXHJcbiAgICAgIHRoaXMuZGF0YVRvUmVuZGVyID0gR3JpZEdyb3VwU2VydmljZS5ncm91cERhdGEoXHJcbiAgICAgICAgdGhpcy5ncm91cGVkQ29sdW1uLFxyXG4gICAgICAgIHNvcnRlZERhdGFcclxuICAgICAgKTtcclxuICAgIGVsc2UgdGhpcy5kYXRhVG9SZW5kZXIgPSBzb3J0ZWREYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSXQgZ3JvdXBzIGRhdGEgYmFzZWQgb24gc2VsZWN0ZWQgY29sdW1uLCBvbmx5IG9uZSBjb2x1bW4gY2FuIGJlIGdyb3VwZWQgYXQgYSB0aW1lXHJcbiAgICogQHBhcmFtIGNvbHVtbiB7R3JpZENvbHVtbn0gaW5zdGFuY2UgdGhhdCBpcyBzZWxlY3RlZCBmb3IgZ3JvdXBpbmdcclxuICAgKiBAcGFyYW0gZ3JvdXAge2Jvb2xlYW59IGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIGdyb3VwaW5nIG9yIHVuZ3JvdXBpbmcgaXMgcGVyZm9ybWVkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkNvbHVtbkdyb3VwaW5nQ2hhbmdlKGNvbHVtbjogR3JpZENvbHVtbiwgZ3JvdXA6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICAvLyBjaGVjayBhbHJlYWR5IGdyb3VwZWQgLS0+IHVuZ3JvdXAgaXQgZmlyc3RcclxuICAgICAgaWYgKHRoaXMuZ3JvdXBlZENvbHVtbikgdGhpcy5ncm91cGVkQ29sdW1uLkdyb3VwZWQoZmFsc2UpO1xyXG4gICAgICB0aGlzLmdyb3VwZWRDb2x1bW4gPSBjb2x1bW47XHJcbiAgICB9IGVsc2UgdGhpcy5ncm91cGVkQ29sdW1uID0gbnVsbDtcclxuXHJcbiAgICBjb2x1bW4uR3JvdXBlZChncm91cCk7XHJcbiAgICB0aGlzLnJlZnJlc2hEYXRhVG9SZW5kZXIoKTtcclxuICAgIHRoaXMuZ3JvdXBpbmdDaGFuZ2VkLmVtaXQoeyBjb2x1bW46IGNvbHVtbiwgZ3JvdXBlZDogZ3JvdXAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJdCBzb3J0cyBkYXRhIGJhc2VkIG9uIHNlbGVjdGVkIGNvbHVtbiBhbmQgZGlyZWN0aW9uXHJcbiAgICogQHBhcmFtIGFzYyB7Ym9vbGVhbn0gZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgYXNjZW5kaW5nIG9yIGRlc2NlbmRpbmcgc29ydGluZyBpcyBwZXJmb3JtZWRcclxuICAgKiBAcGFyYW0gY29sdW1uIHtHcmlkQ29sdW1ufSBpbnN0YW5jZSB0aGF0IGlzIHNlbGVjdGVkIGZvciBzb3J0aW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkNvbHVtblNvcnRDaGFuZ2UoYXNjOiBib29sZWFuLCBjb2x1bW46IEdyaWRDb2x1bW4pOiB2b2lkIHtcclxuICAgIGNvbHVtbi5zZXRTb3J0U3RhdGUoYXNjID8gR1JJRF9TT1JULkFTQyA6IEdSSURfU09SVC5ERVNDKTtcclxuXHJcbiAgICAvLyB0cnkgdG8gZmluZCBpbmRleCBvZiBjb2x1bW4gZm9yIHNvcnRpbmcsIGlmIGl0IGV4aXN0cyBqdXN0IHVwZGF0ZSBzb3J0IHN0YXRlXHJcbiAgICB2YXIgY29sdW1uSW5kZXggPSB0aGlzLl9zb3J0LmZpbmRJbmRleChcclxuICAgICAgKHNvcnQpID0+IHNvcnQuY29sdW1uLmdldElkKCkgPT0gY29sdW1uLmdldElkKClcclxuICAgICk7XHJcblxyXG4gICAgdmFyIHNvcnRTdGF0ZSA9IGNvbHVtbi5nZXRTb3J0U3RhdGUoKTtcclxuXHJcbiAgICBpZiAoc29ydFN0YXRlICE9IEdSSURfU09SVC5OT05FKSB7XHJcbiAgICAgIGlmIChjb2x1bW5JbmRleCA+IC0xKSB0aGlzLl9zb3J0W2NvbHVtbkluZGV4XS5zb3J0U3RhdGUgPSBzb3J0U3RhdGU7XHJcbiAgICAgIC8vIGlmIGNvbHVtbiBzb3J0aW5nIGFscmVhZHkgYXBwbGllZCwgdGhlbiBvbmx5IGNoYW5nZSBpdHMgc29ydCBzdGF0ZVxyXG4gICAgICBlbHNlIHRoaXMuX3NvcnQucHVzaCh7IHNvcnRTdGF0ZTogc29ydFN0YXRlLCBjb2x1bW46IGNvbHVtbiB9KTsgLy8gb3RoZXJ3aXNlIGFkZCBjb2x1bW4gc29ydGluZyB0byBzb3J0c1xyXG4gICAgfSBlbHNlIHRoaXMuX3NvcnQuc3BsaWNlKGNvbHVtbkluZGV4LCAxKTsgLy8gaWYgc29ydGluZyByZXNldGVkIGZvciBjb2x1bW4gLS0+IGRlbGV0ZSBjb2x1bW4gZnJvbSBzb3J0c1xyXG5cclxuICAgIHRoaXMucmVmcmVzaERhdGFUb1JlbmRlcigpO1xyXG4gICAgdGhpcy5zb3J0Q2hhbmdlZC5lbWl0KHsgY29sdW1uOiBjb2x1bW4sIHNvcnRTdGF0ZTogY29sdW1uLmdldFNvcnRTdGF0ZSgpIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSXQgb3BlbnMgYWRkIG9yIGVkaXQgZ3JpZCBwb3B1cFxyXG4gICAqIEBwYXJhbSByb3cgcm93IGRhdGEgdG8gYmUgZWRpdGVkLCBpZiB1bmRlZmluZWQgdGhlbiBhZGQgbmV3IGFjdGlvbiBpcyBwZXJmb3JtZWRcclxuICAgKi9cclxuICBwcml2YXRlIG9wZW5BZGRFZGl0UG9wdXAocm93OiBhbnkgPSB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIHRoaXMuX3N1YnMucHVzaChcclxuICAgICAgdGhpcy5fd2luZG93U2VydmljZVxyXG4gICAgICAgIC5vcGVuKFxyXG4gICAgICAgICAgUG9wdXBDb21wb25lbnQsXHJcbiAgICAgICAgICBHcmlkUG9wdXAuZ2V0UG9wdXBDb25maWd1cmF0aW9uKFxyXG4gICAgICAgICAgICByb3cgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgIHJvd1xyXG4gICAgICAgICAgICAgID8gdGhpcy5hZGRFZGl0UG9wdXBTZXR0aW5ncy5lZGl0UmVjb3JkVGl0bGVcclxuICAgICAgICAgICAgICA6IHRoaXMuYWRkRWRpdFBvcHVwU2V0dGluZ3MubmV3UmVjb3JkVGl0bGUsXHJcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucyxcclxuICAgICAgICAgICAgcm93LFxyXG4gICAgICAgICAgICB0aGlzLmFkZEVkaXRQb3B1cFNldHRpbmdzLnNhdmVCdG5UaXRsZSxcclxuICAgICAgICAgICAgdGhpcy5hZGRFZGl0UG9wdXBTZXR0aW5ncy5jYW5jZWxCdG5UaXRsZSxcclxuICAgICAgICAgICAgdGhpcy5hZGRFZGl0UG9wdXBTZXR0aW5ncy5zaG93TWluaW1pemVCdG4sXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRWRpdFBvcHVwU2V0dGluZ3Muc2hvd01heGltaXplQnRuLFxyXG4gICAgICAgICAgICB0aGlzLmFkZEVkaXRQb3B1cFNldHRpbmdzLnNob3dGdWxsU2NyZWVuQnRuLFxyXG4gICAgICAgICAgICB0aGlzLmFkZEVkaXRQb3B1cFNldHRpbmdzLmhhc0JhY2t0cm9wLFxyXG4gICAgICAgICAgICB0aGlzLmFkZEVkaXRQb3B1cFNldHRpbmdzLmNsb3NlT25CYWNrZHJvcENsaWNrLFxyXG4gICAgICAgICAgICB0aGlzLmFkZEVkaXRQb3B1cFNldHRpbmdzLmNsb3NlT25Fc2NDbGljayxcclxuICAgICAgICAgICAgdGhpcy5hZGRFZGl0UG9wdXBTZXR0aW5ncy5yZXF1aXJlZFRvb2x0aXBcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICAgLm9uQ2xvc2Uuc3Vic2NyaWJlKChkYXRhOiBJR3JpZEVkaXRlZFJvdyB8IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gJ2Jvb2xlYW4nICYmIGRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAocm93KSB0aGlzLmVkaXRDb25maXJtLmVtaXQoZGF0YSk7XHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5jcmVhdGVDb25maXJtLmVtaXQoZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnJlc2V0R3JpZFN0YXRlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyBkZWxldGUgcm93IGNvbmZpcm1hdGlvbiBkaWFsb2dcclxuICAgKiBAcGFyYW0gcm93IFJvdyBkYXRhIHRvIGJlIGRlbGV0ZWRcclxuICAgKi9cclxuICBwcml2YXRlIG9wZW5EZWxldGVQb3B1cChyb3c6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3Vicy5wdXNoKFxyXG4gICAgICB0aGlzLl9kaWFsb2dTZXJ2aWNlXHJcbiAgICAgICAgLm9wZW4oXHJcbiAgICAgICAgICBEZWxldGVQb3B1cENvbXBvbmVudCxcclxuICAgICAgICAgIEdyaWRQb3B1cC5nZXREZWxldGVQb3B1cENvbmZpZ3VyYXRpb24odGhpcy5kZWxldGVQb3B1cFNldHRpbmdzKVxyXG4gICAgICAgIClcclxuICAgICAgICAub25DbG9zZS5zdWJzY3JpYmUoKGRhdGE6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgIGlmIChkYXRhKSB0aGlzLmRlbGV0ZUNvbmZpcm0uZW1pdCh7IGRhdGE6IHJvdywgbmV3RGF0YTogcm93IH0pO1xyXG4gICAgICAgICAgdGhpcy5yZXNldEdyaWRTdGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBuZXcgZ3JpZCBzdGF0ZSwgc2V0cyBzdGF0ZSBmb3IgYWxsIG1vZGVzIGV4Y2VwdCBleHRlcm5hbCAnY291c2UgaW4gZXh0ZXJuYWwgbW9kZSBzdGF0ZSBjYW5ub3QgYmUgY2hhbmdlZCBiYWNrIHRvIG5vbmVcclxuICAgKiBAcGFyYW0gc3RhdGUgR1JJRF9TVEFURSB0byBiZSBzZXRcclxuICAgKi9cclxuICBwcml2YXRlIHNldEdyaWRTdGF0ZShzdGF0ZTogR1JJRF9TVEFURSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZ3JpZE1vZGUgPT0gR1JJRF9NT0RFLlBPUFVQIHx8IHRoaXMuZ3JpZE1vZGUgPT0gR1JJRF9NT0RFLklOTElORSlcclxuICAgICAgdGhpcy5ncmlkU3RhdGUgPSBzdGF0ZTtcclxuICAgIGVsc2UgdGhpcy5yZXNldEdyaWRTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXRzIGdyaWQgc3RhdGUgdG8gbm9uZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzZXRHcmlkU3RhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRTdGF0ZSA9IEdSSURfU1RBVEUuTk9ORTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgQm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGdyaWQgY2FuIGJlIG1vZGlmaWVkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBncmlkQ2FuQmVNb2RpZmllZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmdyaWRTdGF0ZSA9PSBHUklEX1NUQVRFLk5PTkU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSByb3cgcm93IGRhdGEgdG8gYmUgc2F2ZWQsIGlmIG51bGwgdGhlbiBzYXZlIG5ldyByb3cgZGF0YVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2F2ZUlubGluZUdyaWRGb3JtKHJvdzogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgdmFyIGZvcm1Jc1ZhbGlkID0gR3JpZFZhbGlkYXRpb25TZXJ2aWNlLnZhbGlkYXRlKFxyXG4gICAgICB0aGlzLmNvbHVtbnMsXHJcbiAgICAgIHJvdyA/PyB0aGlzLm5ld1Jvd0RhdGFcclxuICAgICk7XHJcblxyXG4gICAgLy8gc2F2ZSBpZiBmb3JtIGlzIHZhbGlkXHJcbiAgICBpZiAoZm9ybUlzVmFsaWQpIHtcclxuICAgICAgaWYgKCFyb3cpIHRoaXMuY3JlYXRlQ29uZmlybS5lbWl0KHRoaXMubmV3Um93RGF0YSk7XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZWRpdENvbmZpcm0uZW1pdCh7XHJcbiAgICAgICAgICBkYXRhOiB0aGlzLl9yb3dJbkVkaXRpbmdJbmxpbmVEYXRhLFxyXG4gICAgICAgICAgbmV3RGF0YTogcm93LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByb3cubW9kZSA9ICcnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9yb3dJbkVkaXRpbmdJbmxpbmVEYXRhID0ge307XHJcbiAgICAgIHRoaXMucmVzZXRHcmlkU3RhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2Nyb2xsR3JpZFRvVG9wKCk6IHZvaWQge1xyXG4gICAgdmFyIGxpc3QgPSBkb2N1bWVudFxyXG4gICAgICAuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZClcclxuICAgICAgPy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduZ3gtZ3JpZC10YWJsZScpO1xyXG4gICAgaWYgKGxpc3QgJiYgbGlzdC5sZW5ndGggPiAwKSBsaXN0WzBdLnNjcm9sbFRvcCA9IDA7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQVUJMSUMgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgYW55W10gYXJyYXkgb2Ygc2VsZWN0ZWQgcm93c1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRTZWxlY3RlZFJvd3MoKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUm93cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBncmlkIGxvYWRpbmdcclxuICAgKi9cclxuICBwdWJsaWMgc3RhcnRMb2FkaW5nKCk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3BzIGdyaWQgbG9hZGluZ1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzdG9wTG9hZGluZygpOiB2b2lkIHtcclxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIGdyaWQgbG9hZGluZ1xyXG4gICAqL1xyXG4gIHB1YmxpYyB0b2dnbGVMb2FkaW5nKCk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkaW5nID0gIXRoaXMubG9hZGluZztcclxuICB9XHJcblxyXG4gIC8qKipcclxuICAgKiBTZWxlY3RzIHNwZWNpZmljIHJvd3MgYnkgcHJvdmlkZWQga2V5XHJcbiAgICogQHBhcmFtIGtleSBTdHJpbmcga2V5IG9uIHdoaWNoIHRvIHNlbGVjdFxyXG4gICAqIEBwYXJhbSByb3dzIEFycmF5IG9mIHJvd3MgdG8gc2VsZWN0LCBpZiBubyBhcnJheSBpcyBwcm92aWRlZCB0aGVuIGl0IGFzc3VtZXMgc2luZ2xlIHJvdyBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZWxlY3RSb3dzKHJvd3M6IGFueSwga2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShyb3dzKSkgcm93cyA9IFtyb3dzXTtcclxuXHJcbiAgICByb3dzLmZvckVhY2goKGVsZW1lbnQ6IGFueSkgPT4ge1xyXG4gICAgICB2YXIgcm93ID0gdGhpcy5fZGF0YS5maW5kKCh4OiBhbnkpID0+IHhba2V5XSA9PSBlbGVtZW50KTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIHJvdy5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoZWNrYm94Q2xpY2socm93LCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldHMgZ3JpZCBzZWxlY3Rpb25cclxuICAgKi9cclxuICBwdWJsaWMgdW5zZWxlY3RBbGwoKSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZFJvd3MgPSBbXTtcclxuICAgIHRoaXMuX2RhdGEubWFwKCh4OiBhbnkpID0+ICh4LnNlbGVjdGVkID0gZmFsc2UpKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBET00gTElTVEVORVJTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZW50cmllc1BlclBhZ2UgTnVtYmVyIG9mIGVudHJpZXMgcGVyIHBhZ2VcclxuICAgKi9cclxuICBwdWJsaWMgb25TZWxlY3RlZENoYW5nZVBhZ2VyUGVyUGFnZShlbnRyaWVzUGVyUGFnZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhZ2UgPSAxOyAvLyByZXNldCBwYWdlIHRvIHN0YXJ0XHJcbiAgICB0aGlzLmVudHJpZXNQZXJQYWdlU2VsZWN0aW9uQ2hhbmdlZC5lbWl0KGVudHJpZXNQZXJQYWdlKTtcclxuICAgIHRoaXMub25QYWdlQ2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm93IENsaWNrZWQgcm93IGRhdGFcclxuICAgKiBAcGFyYW0gc2VsZWN0ZWQgQm9vbGVhbiBmbGFnIGluZGljYXRpbmcgd2hldGhlciByb3cgaXMgc2VsZWN0ZWQgb3Igbm90XHJcbiAgICovXHJcbiAgcHVibGljIG9uU2VsZWN0aW9uQ2hlY2tib3hDbGljayhyb3c6IGFueSwgc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIC8vIGlmIHNpbmdsZSBzZWxlY3Rpb24gZmlyc3QgZGVzZWxlY3QgY3VycmVudCBzZWxlY3RlZCByb3cgYW5kIHJlc2V0IHNlbGVjdGVkUm93cyBhcnJheSwgdGhlbiBwdXNoIG5ldyBzZWxlY3RlZCByb3dcclxuICAgIGlmICghdGhpcy5zZWxlY3Rpb25NdWx0aXBsZSkge1xyXG4gICAgICB0aGlzLl9zZWxlY3RlZFJvd3MubWFwKChyb3cpID0+IChyb3cuc2VsZWN0ZWQgPSBmYWxzZSkpO1xyXG4gICAgICB0aGlzLl9zZWxlY3RlZFJvd3MgPSBbXTtcclxuICAgICAgaWYgKHNlbGVjdGVkKSB0aGlzLl9zZWxlY3RlZFJvd3MucHVzaChyb3cpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHNlbGVjdGVkKSB0aGlzLl9zZWxlY3RlZFJvd3MucHVzaChyb3cpO1xyXG4gICAgICBlbHNlIHtcclxuICAgICAgICByb3cuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZFJvd3MgPSB0aGlzLl9zZWxlY3RlZFJvd3MuZmlsdGVyKFxyXG4gICAgICAgICAgKHJvdykgPT4gcm93LnNlbGVjdGVkID09IHRydWVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW1pdCBzZWxlY3Rpb24gZXZlbnRcclxuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgc2VsZWN0ZWRSb3dzOiB0aGlzLl9zZWxlY3RlZFJvd3MsXHJcbiAgICAgIGN1cnJlbnRSb3dFbWl0dGluZzogcm93LFxyXG4gICAgICBjaGVja2VkOiBzZWxlY3RlZCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybXMgc2VsZWN0aW9uIGlmIHNlbGVjdGlvbiBieSBjbGljayBpcyBlbmFibGVkIGFuZCBpZiBjbGlja2VkIGNvbHVtbiBpcyBub3QgYnV0dG9uIGNvbHVtbiAoaWYgYnV0dG9ucyB0aGVuIGJ1dHRvbiBjbGljayBldmVudCBpcyBmaXJlZClcclxuICAgKiBpZiBncmlkIHN0YXRlIGlzIGVkaXQgb3IgaW5zZXJ0IGl0IHByZXZlbnRzIHNlbGVjdGlvblxyXG4gICAqIEBwYXJhbSByb3cgUm93IGRhdGEgdGhhdCB3YXMgY2xpY2tlZFxyXG4gICAqIEBwYXJhbSBjb2x1bW4gQ2VsbCBjb2x1bW4gdGhhdCB3YXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvblJvd0RhdGFDbGljayhyb3c6IGFueSwgY29sdW1uOiBHcmlkQ29sdW1uKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3Rpb25FbmFibGVkKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnNlbGVjdFJvd0J5Q2xpY2sgJiZcclxuICAgICAgICBjb2x1bW4uZ2V0VHlwZSgpICE9IEdSSURfREFUQV9UWVBFLkJVVFRPTlMgJiZcclxuICAgICAgICB0aGlzLmdyaWRDYW5CZU1vZGlmaWVkKClcclxuICAgICAgKSB7XHJcbiAgICAgICAgcm93LnNlbGVjdGVkID0gIXJvdy5zZWxlY3RlZDtcclxuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hlY2tib3hDbGljayhyb3csIHJvdy5zZWxlY3RlZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlbGVjdGVkIEJvb2xlYW4gZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgc2VsZWN0IGFsbCBpcyBwZXJmb3JtZWQgb3IgZGVzZWxlY3QgYWxsXHJcbiAgICovXHJcbiAgcHVibGljIG9uU2VsZWN0QWxsQ2hlY2tlZENoYW5nZShzZWxlY3RlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuZGF0YS5tYXAoKHJvdykgPT4gKHJvdy5zZWxlY3RlZCA9IHRydWUpKTtcclxuICAgICAgdGhpcy5fc2VsZWN0ZWRSb3dzID0gdGhpcy5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc2VsZWN0ZWRSb3dzLm1hcCgoeCkgPT4gKHguc2VsZWN0ZWQgPSBmYWxzZSkpO1xyXG4gICAgICB0aGlzLl9zZWxlY3RlZFJvd3MgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBlbWl0IHNlbGVjdGlvbiBldmVudFxyXG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VkLmVtaXQoe1xyXG4gICAgICBzZWxlY3RlZFJvd3M6IHRoaXMuX3NlbGVjdGVkUm93cyxcclxuICAgICAgY3VycmVudFJvd0VtaXR0aW5nOiB7fSxcclxuICAgICAgY2hlY2tlZDogc2VsZWN0ZWQsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIHBhZ2VDaGFuZ2VkIGV2ZW50XHJcbiAgICovXHJcbiAgcHVibGljIG9uUGFnZUNoYW5nZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNjcm9sbEdyaWRUb1RvcCgpO1xyXG4gICAgdGhpcy5wYWdlQ2hhbmdlZC5lbWl0KHRoaXMucGFnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldHMgYWxsIGZpbHRlcmluZywgc29ydGluZywgZ3JvdXBpbmcsIHNlbGVjdGlvbiBhbmQgcGFnaW5nIHRvIGRlZmF1bHRcclxuICAgKi9cclxuICBwdWJsaWMgb25DbGlja1Jlc2V0RmlsdGVycygpOiB2b2lkIHtcclxuICAgIC8vIGRlc2VsZWN0IGFsbCByb3dzXHJcbiAgICB0aGlzLm9uU2VsZWN0QWxsQ2hlY2tlZENoYW5nZShmYWxzZSk7XHJcblxyXG4gICAgLy8gcmVzZXQgcGFnZWluZyB0byBmaXJzdCBwYWdlXHJcbiAgICB0aGlzLnBhZ2UgPSAxO1xyXG5cclxuICAgIC8vIHJlc2V0IGFsbCBzZXQgZmlsdGVyc1xyXG4gICAgaWYgKHRoaXMuX2ZpbHRlcnNDaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuX2ZpbHRlcnNDaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5yZXNldEZpbHRlcigpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuX2ZpbHRlcnMgPSBbXTtcclxuXHJcbiAgICAvLyByZXNldCBhbGwgc2V0IHNvcnRpbmdcclxuICAgIHRoaXMuX3NvcnQgPSBbXTtcclxuICAgIHRoaXMuY29sdW1ucy5tYXAoKGNvbHVtbikgPT4gY29sdW1uLnNldFNvcnRTdGF0ZShHUklEX1NPUlQuTk9ORSkpO1xyXG5cclxuICAgIC8vIHJlc2V0IGdyb3VwaW5nXHJcbiAgICB0aGlzLmdyb3VwZWRDb2x1bW4/Lkdyb3VwZWQoZmFsc2UpO1xyXG4gICAgdGhpcy5ncm91cGVkQ29sdW1uID0gbnVsbDtcclxuXHJcbiAgICAvLyByZWZyZXNoIHJlbmRlcmVkIGRhdGFcclxuICAgIHRoaXMucmVmcmVzaERhdGFUb1JlbmRlcigpO1xyXG5cclxuICAgIC8vIHNjcm9sbCBncmlkXHJcbiAgICB0aGlzLnNjcm9sbEdyaWRUb1RvcCgpO1xyXG5cclxuICAgIC8vIGVtaXQgZ3JpZCBmaWx0ZXIgcmVzZXQgZXZlbnRcclxuICAgIHRoaXMuc291cmNlRmlsdGVyc1Jlc2V0ZWQuZW1pdCh0cnVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlbGVjdGVkRmlsdGVyIENoYW5nZWQgZmlsdGVyXHJcbiAgICovXHJcbiAgcHVibGljIG9uR3JpZEZpbHRlckNoYW5nZShzZWxlY3RlZEZpbHRlcjogSUdyaWRGaWx0ZXIpOiB2b2lkIHtcclxuICAgIHZhciBjb2x1bW5JbmRleCA9IHRoaXMuX2ZpbHRlcnMuZmluZEluZGV4KFxyXG4gICAgICAoZmlsdGVyKSA9PiBmaWx0ZXIuY29sdW1uLmdldElkKCkgPT0gc2VsZWN0ZWRGaWx0ZXIuY29sdW1uLmdldElkKClcclxuICAgICk7IC8vIGNoZWNrIGlmIGNvbHVtbiBpcyBhbHJlYWR5IGZpbHRlcmVkXHJcblxyXG4gICAgY29uc3QgZmlsdGVyTm90UmVzZXRlZCA9XHJcbiAgICAgIChzZWxlY3RlZEZpbHRlci5maWx0ZXJWYWx1ZSAhPSAnJyAmJlxyXG4gICAgICAgIHNlbGVjdGVkRmlsdGVyLmZpbHRlclZhbHVlICE9IG51bGwgJiZcclxuICAgICAgICBzZWxlY3RlZEZpbHRlci5maWx0ZXJWYWx1ZSAhPSB1bmRlZmluZWQpIHx8XHJcbiAgICAgIHNlbGVjdGVkRmlsdGVyLmZpbHRlclZhbHVlID09IGZhbHNlOyAvLyBpZiBmaWx0ZXIgdmFsdWUgaXMgY2xlYXJlZCB0aGVuIHRyZWF0IGl0IGFzIGZpbHRlciByZXNldCAtLT4gaGVyZSB3ZSBjaGVjayBpZiB0aGVyZSBpcyBhbnkgdmFsdWUgaW4gZmlsdGVyXHJcblxyXG4gICAgaWYgKGZpbHRlck5vdFJlc2V0ZWQpIHtcclxuICAgICAgaWYgKGNvbHVtbkluZGV4ID4gLTEpXHJcbiAgICAgICAgdGhpcy5fZmlsdGVyc1tjb2x1bW5JbmRleF0uZmlsdGVyVmFsdWUgPSBzZWxlY3RlZEZpbHRlci5maWx0ZXJWYWx1ZTtcclxuICAgICAgLy8gaWYgY29sdW1uIGFscmVhZHkgZmlsdGVyZWQgdGhlbiBqdXN0IGFsdGVyIGl0cyBmaWx0ZXIgdmFsdWVcclxuICAgICAgZWxzZSB0aGlzLl9maWx0ZXJzLnB1c2goc2VsZWN0ZWRGaWx0ZXIpOyAvLyBvdGhlcndpc2UgcHVzaCBuZXcgZmlsdGVyXHJcbiAgICB9IGVsc2UgdGhpcy5fZmlsdGVycy5zcGxpY2UoY29sdW1uSW5kZXgsIDEpOyAvLyBpZiBlbXB0eSBmaWx0ZXIgdmFsdWUgdGhlbiByZW1vdmUgY29sdW1uIGZyb20gZmlsdGVyaW5nXHJcblxyXG4gICAgdGhpcy5yZWZyZXNoRGF0YVRvUmVuZGVyKCk7XHJcblxyXG4gICAgdGhpcy5maWx0ZXJDaGFuZ2VkLmVtaXQoc2VsZWN0ZWRGaWx0ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29sdW1uIFNlbGVjdGVkIGNvbHVtbiB0byBiZSBzb3J0ZWRcclxuICAgKi9cclxuICBwdWJsaWMgb25Tb3J0QnV0dG9uQ2xpY2soY29sdW1uOiBHcmlkQ29sdW1uKSB7XHJcbiAgICB0aGlzLm9uQ29sdW1uU29ydENoYW5nZShcclxuICAgICAgY29sdW1uLmdldFNvcnRTdGF0ZSgpID09IEdSSURfU09SVC5BU0MgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgIGNvbHVtblxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlbGVjdGVkQnV0dG9uIEFjdGlvbiBidXR0b24gdGhhdCB3YXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvbkFjdGlvbkJ1dHRvbkNsaWNrKHNlbGVjdGVkQnV0dG9uOiBJR3JpZENlbGxCdXR0b24pOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoc2VsZWN0ZWRCdXR0b24uYnV0dG9uLmdldFR5cGUoKSkge1xyXG4gICAgICBjYXNlIEdSSURfQlVUVE9OX1RZUEUuRURJVDpcclxuICAgICAgICB0aGlzLnN0YXJ0R3JpZEVkaXQoc2VsZWN0ZWRCdXR0b24ucm93KTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgR1JJRF9CVVRUT05fVFlQRS5ERUxFVEU6XHJcbiAgICAgICAgdGhpcy5zdGFydEdyaWREZWxldGUoc2VsZWN0ZWRCdXR0b24ucm93KTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgR1JJRF9CVVRUT05fVFlQRS5PVEhFUjpcclxuICAgICAgICB0aGlzLmFjdGlvbkJ0bkNsaWNrLmVtaXQoc2VsZWN0ZWRCdXR0b24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZE5ld0NsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZ3JpZENhbkJlTW9kaWZpZWQoKSkge1xyXG4gICAgICB0aGlzLm5ld1Jvd0RhdGEgPSB7fTsgLy8gcmVzdCBuZXcgcm93IGRhdGFcclxuICAgICAgdGhpcy5jcmVhdGVTdGFydGVkLmVtaXQodHJ1ZSk7XHJcbiAgICAgIGlmICh0aGlzLmdyaWRNb2RlID09IEdSSURfTU9ERS5QT1BVUCkgdGhpcy5vcGVuQWRkRWRpdFBvcHVwKCk7XHJcbiAgICAgIHRoaXMuc2V0R3JpZFN0YXRlKEdSSURfU1RBVEUuSU5TRVJUKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICBGaXJlcyBwZGZFeHBvcnQgb3V0cHV0IGV2ZW50IGlmIGN1c3RvbUV4cG9ydEZ1bmN0aW9uIGlzIGVuYWJsZWQuXHJcbiAgICBJZiBjdXN0dW1FeHBvcnRGdW5jdGlvbiBpcyBkaXNhYmxlZCBpbml0aWFsaXplcyBidWlsdCBpbiBQREYgZXhwb3J0IGZ1bmN0aW9uYWxpdHkuXHJcbiAgKi9cclxuICBwdWJsaWMgZXhwb3J0UGRmQnRuQ2xpY2soKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jdXN0b21FeHBvcnRGdW5jdGlvbikgdGhpcy5wZGZFeHBvcnQuZW1pdCh0cnVlKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICB2YXIgZGF0YVRvRXhwb3J0ID0gR3JpZEdyb3VwU2VydmljZS51bmdyb3VwRGF0YSh0aGlzLmRhdGFUb1JlbmRlcik7XHJcbiAgICAgIGlmICh0aGlzLmxvYWRpbmdFbmFibGVkKSB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICBpZiAoZGF0YVRvRXhwb3J0Py5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIGhlYWRlcnM6IElHcmlkRXhwb3J0SGVhZGVyW10gPVxyXG4gICAgICAgICAgR3JpZEV4cG9ydC5jb25maWd1cmVJR3JpZEV4cG9ydEhlYWRlcnModGhpcy5jb2x1bW5zKTtcclxuICAgICAgICB0aGlzLl9leHBvcnRQREZDb21wb25lbnQuZXhwb3J0UGRmKGRhdGFUb0V4cG9ydCwgaGVhZGVycyk7XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0VuYWJsZWQpIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdFbmFibGVkKSB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZXMgZXhjZWxFeHBvcnQgb3V0cHV0IGV2ZW50IGlmIGN1c3RvbUV4cG9ydEZ1bmN0aW9uIGlzIGVuYWJsZWQuXHJcbiAgICogSWYgY3VzdHVtRXhwb3J0RnVuY3Rpb24gaXMgZGlzYWJsZWQgaW5pdGlhbGl6ZXMgYnVpbHQgaW4gRXhjZWwgZXhwb3J0IGZ1bmN0aW9uYWxpdHkuXHJcbiAgICovXHJcbiAgcHVibGljIGV4cG9ydEV4Y2VsQnRuQ2xpY2soKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jdXN0b21FeHBvcnRGdW5jdGlvbikgdGhpcy5leGNlbEV4cG9ydC5lbWl0KHRydWUpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIHZhciBkYXRhVG9FeHBvcnQgPSBHcmlkR3JvdXBTZXJ2aWNlLnVuZ3JvdXBEYXRhKHRoaXMuZGF0YVRvUmVuZGVyKTtcclxuICAgICAgaWYgKHRoaXMubG9hZGluZ0VuYWJsZWQpIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgIGlmIChkYXRhVG9FeHBvcnQ/Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgaGVhZGVyczogSUdyaWRFeHBvcnRIZWFkZXJbXSA9XHJcbiAgICAgICAgICBHcmlkRXhwb3J0LmNvbmZpZ3VyZUlHcmlkRXhwb3J0SGVhZGVycyh0aGlzLmNvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMuX2V4cG9ydEV4Y2VsQ29tcG9uZW50LmV4cG9ydEV4Y2VsKGRhdGFUb0V4cG9ydCwgaGVhZGVycyk7XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0VuYWJsZWQpIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdFbmFibGVkKSB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyBsZWZ0IGNvbHVtbiBwb3NpdGlvbiBpbiBwaXhlbHMgZm9yIGV2ZXJ5IGRvY2tlZCBjb2x1bW4gc28gaXQgY2FuIHN0YXkgc3RpY2t5IG9uIGhvcml6b250YWwgc2Nyb2xsaW5nXHJcbiAgICogQHJldHVybnMge251bWJlcn0gbGVmdCBjb2x1bW4gcG9zaXRpb24gZm9yIGRvY2tlZCBjb2x1bW4sIG9yIG51bGwgaWYgY29sdW1uIGlzIG5vdCBkb2NrZWRcclxuICAgKi9cclxuICBwdWJsaWMgY2FsY3VsYXRlTGVmdFBvc2l0aW9uKGNvbHVtbjogR3JpZENvbHVtbik6IGFueSB7XHJcbiAgICBpZiAoY29sdW1uLmdldERvY2tlZCgpKSB7XHJcbiAgICAgIGxldCBsZWZ0UG9zaXRpb24gPSAwO1xyXG4gICAgICB2YXIgaW5kZXggPSB0aGlzLl9kb2NrZWRDb2x1bW5zLmZpbmRJbmRleChcclxuICAgICAgICAoeCkgPT4geC5nZXRJZCgpID09IGNvbHVtbi5nZXRJZCgpXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4OyBpKyspIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgICAgIHRoaXMuX2RvY2tlZENvbHVtbnNbaV0uZ2V0SWQoKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICBjb25zdCB3aWR0aDogbnVtYmVyID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgIGxlZnRQb3NpdGlvbiArPSB3aWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBsZWZ0UG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHcmlkIHRvb2xiYXIgaXMgdmlzaWJsZSBpZiBhZGRFbmFibGVkIChhZGQgYnV0dG9uIGlzIHZpc2libGUpLCBzZWxlY3Rpb25NdWx0aXBsZSBhbmQgc2VsZWN0aW9uUm93c1RpdGxlIGlzIGVuYWJsZWQgYW5kIHNvbWV0aGluZyBpcyBzZWxlY3RlZFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0aGUgZ3JpZCB0b29sYmFyIGlzIHZpc2libGVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0R3JpZFRvb2xiYXJWaXNpYmlsaXR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5hZGRFbmFibGVkIHx8XHJcbiAgICAgICh0aGlzLnNlbGVjdGlvbk11bHRpcGxlICYmXHJcbiAgICAgICAgdGhpcy5nZXRTZWxlY3RlZFJvd3MoKS5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3NUaXRsZUVuYWJsZWQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9vdGVyIGlzIHZpc2libGUgaWYgYW55IG9mIGJ1dHRvbnMgaW4gZm9vdGVyIGlzIHZpc2libGUsIG90aGVyd2lzZSBncmlkIGhlaWdodCBpcyBmdWxsIGNvbnRhaW5lciBoZWlnaHRcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGZvb3RlciBpcyB2aXNpYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGdldEdyaWRGb290ZXJWaXNpYmlsaXR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5yZWZyZXNoRW5hYmxlZCB8fFxyXG4gICAgICB0aGlzLmV4cG9ydFBkZkVuYWJsZWQgfHxcclxuICAgICAgdGhpcy5leHBvcnRFeGNlbEVuYWJsZWQgfHxcclxuICAgICAgdGhpcy5lbnRyaWVzUGVyUGFnZUVuYWJsZWQgfHxcclxuICAgICAgdGhpcy5wYWdlckVuYWJsZWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBidG4gR3JpZEJ1dHRvbiB0aGF0IGlzIGNsaWNrZWRcclxuICAgKiBAcGFyYW0gcm93IFNlbGVjdGVkIHJvdyBkYXRhXHJcbiAgICovXHJcbiAgcHVibGljIGlubGluZUVkaXRDZWxsQnRuQ2xpY2soYnRuOiBHcmlkQnV0dG9uVHlwZSwgcm93OiBhbnkgPSBudWxsKSB7XHJcbiAgICBzd2l0Y2ggKGJ0bi5nZXRUeXBlKCkpIHtcclxuICAgICAgY2FzZSBHUklEX0JVVFRPTl9UWVBFLlNBVkU6XHJcbiAgICAgICAgdGhpcy5zYXZlSW5saW5lR3JpZEZvcm0ocm93KTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgR1JJRF9CVVRUT05fVFlQRS5DQU5DRUw6XHJcbiAgICAgICAgaWYgKHJvdykgcm93Lm1vZGUgPSAnJztcclxuICAgICAgICB0aGlzLnJlc2V0R3JpZFN0YXRlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIEdSSURfQlVUVE9OX1RZUEUuT1RIRVI6XHJcbiAgICAgICAgdGhpcy5hY3Rpb25CdG5DbGljay5lbWl0KHsgcm93OiByb3csIGJ1dHRvbjogYnRuIH0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29sdW1uIFNlbGVjdGVkIGhlYWRlciBjb2x1bW4gdG8gYXBwbHkgY2xhc3MgbGlzdFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IExpc3Qgb2YgY29sdW1uIGNsYXNzZXNcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29sdW1uSGVhZGVyQ2xhc3NMaXN0KGNvbHVtbjogR3JpZENvbHVtbik6IHN0cmluZyB7XHJcbiAgICB2YXIgY2xhc3NMaXN0ID0gJ3N0aWNreS10aCc7XHJcbiAgICBpZiAoY29sdW1uLmdldFNvcnRTdGF0ZSgpICE9IEdSSURfU09SVC5OT05FKSBjbGFzc0xpc3QgKz0gJyBzb3J0ZWQnO1xyXG4gICAgaWYgKGNvbHVtbi5nZXREb2NrZWQoKSkgY2xhc3NMaXN0ICs9ICcgZG9ja2VkIGRvY2tlZC1oZWFkZXInO1xyXG4gICAgaWYgKGNvbHVtbi5nZXRHcm91cGVkKCkpIGNsYXNzTGlzdCArPSAnIGdyb3VwZWQnO1xyXG5cclxuICAgIHJldHVybiBjbGFzc0xpc3Q7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb2x1bW4gU2VsZWN0ZWQgY29sdW1uIHRvIHVuZ3JvdXBcclxuICAgKi9cclxuICBwdWJsaWMgb25Vbmdyb3VwQnV0dG9uQ2xpY2soY29sdW1uOiBHcmlkQ29sdW1uKSB7XHJcbiAgICB0aGlzLm9uQ29sdW1uR3JvdXBpbmdDaGFuZ2UoY29sdW1uLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Hcm91cFJvd0NsaWNrKHJvdzogYW55KTogdm9pZCB7XHJcbiAgICByb3cuX0dyb3VwRXhwYW5kZWQgPSAhcm93Ll9Hcm91cEV4cGFuZGVkO1xyXG5cclxuICAgIGlmIChyb3cuX0dyb3VwRXhwYW5kZWQpIHtcclxuICAgICAgLy8gb24gZXhwYW5kIGluc2VydCBjb2xsYXBzZWQgcm93IGRhdGEgaW50byBkYXRhVG9SZW5kZXJcclxuICAgICAgcHVzaFRvQXJyYXlBdEluZGV4UmFuZ2UoXHJcbiAgICAgICAgdGhpcy5kYXRhVG9SZW5kZXIsXHJcbiAgICAgICAgcm93Ll9Hcm91cENvbGxhcHNlZEVsZW1lbnRzLFxyXG4gICAgICAgIHJvdy5fR3JvdXBGaXJzdEVsZW1lbnRJbmRleFxyXG4gICAgICApO1xyXG4gICAgICByb3cuX0dyb3VwQ29sbGFwc2VkRWxlbWVudHMgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGZpcnN0Um93SW5kZXggPSB0aGlzLmRhdGFUb1JlbmRlci5maW5kSW5kZXgoXHJcbiAgICAgICAgKHg6IGFueSkgPT4geC5fUm93SW5kZXggPT09IHJvdy5fR3JvdXBGaXJzdEVsZW1lbnQuX1Jvd0luZGV4XHJcbiAgICAgICk7XHJcbiAgICAgIC8vIGRlbGV0ZSBncm91cCByb3dzIGZyb20gZGF0YVRvUmVuZGVyXHJcbiAgICAgIGlmIChmaXJzdFJvd0luZGV4ID4gLTEpIHtcclxuICAgICAgICByb3cuX0dyb3VwRmlyc3RFbGVtZW50SW5kZXggPSBmaXJzdFJvd0luZGV4O1xyXG4gICAgICAgIHJvdy5fR3JvdXBDb2xsYXBzZWRFbGVtZW50cyA9IHRoaXMuZGF0YVRvUmVuZGVyLnNwbGljZShcclxuICAgICAgICAgIGZpcnN0Um93SW5kZXgsXHJcbiAgICAgICAgICByb3cuX0dyb3VwQ291bnRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Db2x1bW5Db250ZXh0TWVudUJ1dHRvbkNsaWNrKGl0ZW1zOiBOYk1lbnVJdGVtW10pOiB2b2lkIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxyXG4gICAgICAgICduZ3gtZ3JpZC1jb2x1bW4tY29udGV4dC1tZW51J1xyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzWzBdO1xyXG5cclxuICAgICAgICBlbGVtZW50XHJcbiAgICAgICAgICAuY2xvc2VzdCgnLmNkay1vdmVybGF5LWNvbnRhaW5lcicpXHJcbiAgICAgICAgICA/LmNsYXNzTGlzdC5hZGQoJ25neC1ncmlkLWNvbnRleHQtbWVudS1jZGstb3ZlcmxheS1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgLy8gdHJhbnNsYXRlIG1lbnUgaXRlbXMgdGl0bGVcclxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy5fdHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZShpdGVtLnRpdGxlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSwgMTAwKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdlxyXG4gIGNsYXNzPVwibmd4LWdyaWRcIlxyXG4gIFtpZF09XCJpZFwiXHJcbiAgW25iU3Bpbm5lcl09XCJsb2FkaW5nXCJcclxuICBuYlNwaW5uZXJTaXplPVwibGFyZ2VcIlxyXG4gIG5iU3Bpbm5lclN0YXR1cz1cInByaW1hcnlcIlxyXG4gIFtuYlNwaW5uZXJNZXNzYWdlXT1cImxvYWRpbmdNZXNzYWdlXCJcclxuPlxyXG4gIDxuZ3gtZ3JpZC10b29sYmFyXHJcbiAgICBbdmlzaWJsZV09XCJnZXRHcmlkVG9vbGJhclZpc2liaWxpdHkoKVwiXHJcbiAgICBbc2VsZWN0ZWRSb3dzVGl0bGVFbmFibGVkXT1cInNlbGVjdGVkUm93c1RpdGxlRW5hYmxlZFwiXHJcbiAgICBbc2VsZWN0aW9uTXVsdGlwbGVdPVwic2VsZWN0aW9uTXVsdGlwbGVcIlxyXG4gICAgW3NlbGVjdGVkUm93c109XCJnZXRTZWxlY3RlZFJvd3MoKS5sZW5ndGhcIlxyXG4gICAgW3NlbGVjdGVkUm93c1RpdGxlXT1cInNlbGVjdGVkUm93c1RpdGxlXCJcclxuICAgIFthZGRFbmFibGVkXT1cImFkZEVuYWJsZWRcIlxyXG4gICAgW2FkZFRvb2x0aXBdPVwiYWRkVG9vbHRpcFwiXHJcbiAgICAoYWRkTmV3Q2xpY2tlZCk9XCJhZGROZXdDbGljaygpXCJcclxuICA+XHJcbiAgPC9uZ3gtZ3JpZC10b29sYmFyPlxyXG5cclxuICA8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBUQUJMRSBTVEFSVCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG4gIDxkaXZcclxuICAgIGNsYXNzPVwibmd4LWdyaWQtdGFibGVcIlxyXG4gICAgW25nQ2xhc3NdPVwiZ2V0R3JpZEZvb3RlclZpc2liaWxpdHkoKSA/ICcnIDogJ25vLWZvb3RlcidcIlxyXG4gICAgW2NsYXNzXT1cImdldEdyaWRUb29sYmFyVmlzaWJpbGl0eSgpID8gJycgOiAnbm8taGVhZGVyJ1wiXHJcbiAgPlxyXG4gICAgPHRhYmxlPlxyXG4gICAgICA8dGhlYWQ+XHJcbiAgICAgICAgPHRyPlxyXG4gICAgICAgICAgPCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU0VMRUNUIEFMTCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuICAgICAgICAgIDx0aCAqbmdJZj1cInNlbGVjdGlvbkVuYWJsZWRcIiBjbGFzcz1cInRleHQtY2VudGVyIHN0aWNreS10aCBzZWxlY3QtYWxsXCI+XHJcbiAgICAgICAgICAgIDxuYi1jaGVja2JveFxyXG4gICAgICAgICAgICAgICpuZ0lmPVwic2VsZWN0aW9uTXVsdGlwbGUgJiYgc2VsZWN0QWxsRW5hYmxlZFwiXHJcbiAgICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZVxyXG4gICAgICAgICAgICAgIChjaGVja2VkQ2hhbmdlKT1cIm9uU2VsZWN0QWxsQ2hlY2tlZENoYW5nZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgPjwvbmItY2hlY2tib3g+XHJcbiAgICAgICAgICA8L3RoPlxyXG5cclxuICAgICAgICAgIDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFRBQkxFIEhFQURFUlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcbiAgICAgICAgICA8dGhcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCJcclxuICAgICAgICAgICAgW2hpZGRlbl09XCIhY29sdW1uLmdldFZpc2libGUoKVwiXHJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldENvbHVtbkhlYWRlckNsYXNzTGlzdChjb2x1bW4pXCJcclxuICAgICAgICAgICAgW3N0eWxlLmxlZnQucHhdPVwiY2FsY3VsYXRlTGVmdFBvc2l0aW9uKGNvbHVtbilcIlxyXG4gICAgICAgICAgICBbc3R5bGUubWluLXdpZHRoXT1cImNvbHVtbi5nZXRXaWR0aCgpXCJcclxuICAgICAgICAgICAgW3N0eWxlLm1heC13aWR0aF09XCJjb2x1bW4uZ2V0V2lkdGgoKVwiXHJcbiAgICAgICAgICAgIFtpZF09XCJjb2x1bW4uZ2V0SWQoKVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt7IGNvbHVtbi5nZXRUaXRsZSgpIH19XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICBjbGFzcz1cImNvbHVtbi1zb3J0LWJ0blwiXHJcbiAgICAgICAgICAgICAgbmJCdXR0b25cclxuICAgICAgICAgICAgICBnaG9zdFxyXG4gICAgICAgICAgICAgIHNoYXBlPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXHJcbiAgICAgICAgICAgICAgKm5nSWY9XCJjb2x1bW4/LmdldFNvcnRTdGF0ZSgpICE9IHNvcnRTdGF0ZXMuTk9ORVwiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uU29ydEJ1dHRvbkNsaWNrKGNvbHVtbilcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPG5iLWljb25cclxuICAgICAgICAgICAgICAgIHBhY2s9XCJldmFcIlxyXG4gICAgICAgICAgICAgICAgW2ljb25dPVwiXHJcbiAgICAgICAgICAgICAgICAgIGNvbHVtbj8uZ2V0U29ydFN0YXRlKCkgPT0gc29ydFN0YXRlcy5BU0NcclxuICAgICAgICAgICAgICAgICAgICA/ICdhcnJvdy11cHdhcmQtb3V0bGluZSdcclxuICAgICAgICAgICAgICAgICAgICA6ICdhcnJvdy1kb3dud2FyZC1vdXRsaW5lJ1xyXG4gICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICA+PC9uYi1pY29uPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiY29sdW1uLWdyb3VwLWJ0blwiXHJcbiAgICAgICAgICAgICAgbmJCdXR0b25cclxuICAgICAgICAgICAgICBnaG9zdFxyXG4gICAgICAgICAgICAgIHNoYXBlPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXHJcbiAgICAgICAgICAgICAgKm5nSWY9XCJjb2x1bW4/LmdldEdyb3VwZWQoKVwiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uVW5ncm91cEJ1dHRvbkNsaWNrKGNvbHVtbilcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPG5iLWljb24gcGFjaz1cImV2YVwiIGljb249XCJsYXllcnMtb3V0bGluZVwiPjwvbmItaWNvbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAqbmdJZj1cImNvbHVtbk9wdGlvbnNFbmFibGVkXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImNvbHVtbi1jb250ZXh0LW1lbnUtYnRuXCJcclxuICAgICAgICAgICAgICBuYkJ1dHRvblxyXG4gICAgICAgICAgICAgIGdob3N0XHJcbiAgICAgICAgICAgICAgc2l6ZT1cInNtYWxsXCJcclxuICAgICAgICAgICAgICBzaGFwZT1cInJvdW5kXCJcclxuICAgICAgICAgICAgICBbbmJDb250ZXh0TWVudV09XCJjb2x1bW4uZ2V0Q29udGV4dE1lbnVJdGVtcygpXCJcclxuICAgICAgICAgICAgICBbbmJDb250ZXh0TWVudUNsYXNzXT1cIiduZ3gtZ3JpZC1jb2x1bW4tY29udGV4dC1tZW51J1wiXHJcbiAgICAgICAgICAgICAgW25iQ29udGV4dE1lbnVUYWddPVwiXHJcbiAgICAgICAgICAgICAgICAnY29sdW1uLWNvbnRleHQtbWVudS0nICsgaWQgKyAnLScgKyBjb2x1bW4uZ2V0Q29udGV4dE1lbnVJZCgpXHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICBbbmJDb250ZXh0TWVudVBsYWNlbWVudF09XCJwb3NpdGlvbi5CT1RUT01fRU5EXCJcclxuICAgICAgICAgICAgICAoY2xpY2spPVwiXHJcbiAgICAgICAgICAgICAgICBvbkNvbHVtbkNvbnRleHRNZW51QnV0dG9uQ2xpY2soY29sdW1uLmdldENvbnRleHRNZW51SXRlbXMoKSlcclxuICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPG5iLWljb24gcGFjaz1cImV2YVwiIGljb249XCJtb3JlLWhvcml6b250YWwtb3V0bGluZVwiPjwvbmItaWNvbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L3RoPlxyXG4gICAgICAgIDwvdHI+XHJcblxyXG4gICAgICAgIDwhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFRBQkxFIEZJTFRFUlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XHJcbiAgICAgICAgPHRyICpuZ0lmPVwiZmlsdGVyc0VuYWJsZWRcIiBjbGFzcz1cImZpbHRlci1wYW5lbFwiPlxyXG4gICAgICAgICAgPHRoICpuZ0lmPVwic2VsZWN0aW9uRW5hYmxlZFwiPjwvdGg+XHJcbiAgICAgICAgICA8dGhcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCJcclxuICAgICAgICAgICAgW2hpZGRlbl09XCIhY29sdW1uLmdldFZpc2libGUoKVwiXHJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImNvbHVtbi5nZXREb2NrZWQoKSA/ICdkb2NrZWQnIDogJydcIlxyXG4gICAgICAgICAgICBbc3R5bGUubGVmdC5weF09XCJjYWxjdWxhdGVMZWZ0UG9zaXRpb24oY29sdW1uKVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxuZ3gtY29sdW1uLWZpbHRlclxyXG4gICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcclxuICAgICAgICAgICAgICAoZmlsdGVyQ2hhbmdlZCk9XCJvbkdyaWRGaWx0ZXJDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgID48L25neC1jb2x1bW4tZmlsdGVyPlxyXG4gICAgICAgICAgPC90aD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICA8L3RoZWFkPlxyXG5cclxuICAgICAgPCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gVEFCTEUgREFUQSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuICAgICAgPHRib2R5PlxyXG4gICAgICAgIDx0clxyXG4gICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJyb3dIZWlnaHQgPiAwID8gcm93SGVpZ2h0IDogbnVsbFwiXHJcbiAgICAgICAgICAqbmdJZj1cImRhdGFUb1JlbmRlci5sZW5ndGggPT0gMCAmJiBncmlkU3RhdGUgPT0gZ3JpZFN0YXRlcy5OT05FXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8dGQgW2NvbFNwYW5dPVwiY29sdW1ucy5sZW5ndGhcIj57eyBub0RhdGFNZXNzYWdlIH19PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG5cclxuICAgICAgICA8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBJTkxJTkUgSU5TRVJUIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxyXG4gICAgICAgIDx0clxyXG4gICAgICAgICAgKm5nSWY9XCJncmlkU3RhdGUgPT0gZ3JpZFN0YXRlcy5JTlNFUlQgJiYgZ3JpZE1vZGUgPT0gZ3JpZE1vZGVzLklOTElORVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHRkICpuZ0lmPVwic2VsZWN0aW9uRW5hYmxlZFwiPjwvdGQ+XHJcbiAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCI+XHJcbiAgICAgICAgICAgIDxuZ3gtY2VsbC1lZGl0XHJcbiAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxyXG4gICAgICAgICAgICAgIFsoY2VsbFZhbHVlKV09XCJuZXdSb3dEYXRhW2NvbHVtbi5nZXREYXRhRmllbGQoKV1cIlxyXG4gICAgICAgICAgICAgIChjZWxsQnV0dG9uQ2xpY2spPVwiaW5saW5lRWRpdENlbGxCdG5DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgICBbaXNOZXddPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgID48L25neC1jZWxsLWVkaXQ+XHJcbiAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcblxyXG4gICAgICAgIDx0clxyXG4gICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJyb3dIZWlnaHQgPiAwID8gcm93SGVpZ2h0IDogbnVsbFwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJyb3cuc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJydcIlxyXG4gICAgICAgICAgW2NsYXNzXT1cInNlbGVjdFJvd0J5Q2xpY2sgJiYgc2VsZWN0aW9uRW5hYmxlZCA/ICdjbGljYWJsZScgOiAnJ1wiXHJcbiAgICAgICAgICAqbmdGb3I9XCJcclxuICAgICAgICAgICAgbGV0IHJvdyBvZiBkYXRhVG9SZW5kZXJcclxuICAgICAgICAgICAgICB8IHBhZ2luYXRlXHJcbiAgICAgICAgICAgICAgICA6IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1BlclBhZ2U6IHBhZ2VyRW5hYmxlZCA/IGRlZmF1bHRQZXJQYWdlT3B0aW9uIDogMTAwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IHBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxJdGVtczogZGF0YVRvUmVuZGVyLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICBcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDx0ZCAqbmdJZj1cInNlbGVjdGlvbkVuYWJsZWQgJiYgIXJvdy5fR3JvdXBSb3dcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgIDxuYi1jaGVja2JveFxyXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJyb3cuc2VsZWN0ZWRcIlxyXG4gICAgICAgICAgICAgICAgKGNoZWNrZWRDaGFuZ2UpPVwib25TZWxlY3Rpb25DaGVja2JveENsaWNrKHJvdywgJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgPjwvbmItY2hlY2tib3g+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC90ZD5cclxuXHJcbiAgICAgICAgICA8IS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBSRU5ERVIgVEFCTEUgREFUQSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cclxuXHJcbiAgICAgICAgICA8dGRcclxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uR3JvdXBSb3dDbGljayhyb3cpXCJcclxuICAgICAgICAgICAgW2F0dHIuY29sc3Bhbl09XCJncm91cENvbHNwYW5cIlxyXG4gICAgICAgICAgICAqbmdJZj1cInJvdy5fR3JvdXBSb3dcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImdyb3VwLXJvd1wiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggdy0xMDBcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXAtcm93LW5hbWVcIj5cclxuICAgICAgICAgICAgICAgIHt7IHJvdy5fR3JvdXBOYW1lIH19XHJcbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImdyb3VwZWRDb2x1bW4/LmdldFNob3dHcm91cENvdW50KClcIlxyXG4gICAgICAgICAgICAgICAgICA+KHt7IHJvdy5fR3JvdXBDb3VudCB9fSk8L3NwYW5cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIG0tMCBwLTAgZC1mbGV4IGp1c3RpZnktY29udGVudC1lbmRcIj5cclxuICAgICAgICAgICAgICAgIDxuYi1pY29uXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWUtM1wiXHJcbiAgICAgICAgICAgICAgICAgIHBhY2s9XCJldmFcIlxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXM9XCJiYXNpY1wiXHJcbiAgICAgICAgICAgICAgICAgIFtpY29uXT1cIlxyXG4gICAgICAgICAgICAgICAgICAgIHJvdy5fR3JvdXBFeHBhbmRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgPyAnY2hldnJvbi11cC1vdXRsaW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgOiAnY2hldnJvbi1kb3duLW91dGxpbmUnXHJcbiAgICAgICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgICA+PC9uYi1pY29uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvdGQ+XHJcblxyXG4gICAgICAgICAgPHRkXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uczsgaW5kZXggYXMgaVwiXHJcbiAgICAgICAgICAgIFtoaWRkZW5dPVwicm93Ll9Hcm91cFJvdyA/IHRydWUgOiAhY29sdW1uLmdldFZpc2libGUoKVwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJvblJvd0RhdGFDbGljayhyb3csIGNvbHVtbilcIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJjb2x1bW4uZ2V0RG9ja2VkKCkgPyAnZG9ja2VkJyA6ICcnXCJcclxuICAgICAgICAgICAgW3N0eWxlLmxlZnQucHhdPVwiY2FsY3VsYXRlTGVmdFBvc2l0aW9uKGNvbHVtbilcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8bmd4LWNlbGwtZGlzcGxheVxyXG4gICAgICAgICAgICAgICpuZ0lmPVwicm93Lm1vZGUgIT0gJ2VkaXQnXCJcclxuICAgICAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXHJcbiAgICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxyXG4gICAgICAgICAgICAgIChidXR0b25DbGljayk9XCJvbkFjdGlvbkJ1dHRvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgICA+PC9uZ3gtY2VsbC1kaXNwbGF5PlxyXG5cclxuICAgICAgICAgICAgPG5neC1jZWxsLWVkaXRcclxuICAgICAgICAgICAgICAqbmdJZj1cIlxyXG4gICAgICAgICAgICAgICAgcm93Lm1vZGUgPT0gJ2VkaXQnICYmXHJcbiAgICAgICAgICAgICAgICBncmlkU3RhdGUgPT0gZ3JpZFN0YXRlcy5FRElUICYmXHJcbiAgICAgICAgICAgICAgICBncmlkTW9kZSA9PSBncmlkTW9kZXMuSU5MSU5FXHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXHJcbiAgICAgICAgICAgICAgW2lzTmV3XT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICBbKGNlbGxWYWx1ZSldPVwicm93W2NvbHVtbi5nZXREYXRhRmllbGQoKV1cIlxyXG4gICAgICAgICAgICAgIChjZWxsQnV0dG9uQ2xpY2spPVwiaW5saW5lRWRpdENlbGxCdG5DbGljaygkZXZlbnQsIHJvdylcIlxyXG4gICAgICAgICAgICA+PC9uZ3gtY2VsbC1lZGl0PlxyXG4gICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICA8L3Rib2R5PlxyXG4gICAgPC90YWJsZT5cclxuICA8L2Rpdj5cclxuICA8bmd4LWdyaWQtZm9vdGVyXHJcbiAgICBbdmlzaWJsZV09XCJnZXRHcmlkRm9vdGVyVmlzaWJpbGl0eSgpXCJcclxuICAgIFsocGFnZSldPVwicGFnZVwiXHJcbiAgICAocGFnZUNoYW5nZWQpPVwib25QYWdlQ2hhbmdlZCgpXCJcclxuICAgIFtyZWZyZXNoRW5hYmxlZF09XCJyZWZyZXNoRW5hYmxlZFwiXHJcbiAgICBbcmVmcmVzaFRvb2x0aXBdPVwicmVmcmVzaFRvb2x0aXBcIlxyXG4gICAgW2V4cG9ydFBkZkVuYWJsZWRdPVwiZXhwb3J0UGRmRW5hYmxlZFwiXHJcbiAgICBbZXhwb3J0RXhjZWxFbmFibGVkXT1cImV4cG9ydEV4Y2VsRW5hYmxlZFwiXHJcbiAgICBbZXhwb3J0UGRmVG9vbHRpcF09XCJleHBvcnRQZGZUb29sdGlwXCJcclxuICAgIFtleHBvcnRFeGNlbFRvb2x0aXBdPVwiZXhwb3J0RXhjZWxUb29sdGlwXCJcclxuICAgIFtlbnRyaWVzUGVyUGFnZUVuYWJsZWRdPVwiZW50cmllc1BlclBhZ2VFbmFibGVkXCJcclxuICAgIFtlbnRyaWVzUGVyUGFnZVRvb2x0aXBdPVwiZW50cmllc1BlclBhZ2VUb29sdGlwXCJcclxuICAgIFsoZGVmYXVsdFBlclBhZ2VPcHRpb24pXT1cImRlZmF1bHRQZXJQYWdlT3B0aW9uXCJcclxuICAgIFtlbnRyaWVzUGVyUGFnZU9wdGlvbnNdPVwiZW50cmllc1BlclBhZ2VPcHRpb25zXCJcclxuICAgIChyZXNldEZpbHRlcnNDbGlja2VkKT1cIm9uQ2xpY2tSZXNldEZpbHRlcnMoKVwiXHJcbiAgICAoZXhwb3J0UGRmQ2xpY2tlZCk9XCJleHBvcnRQZGZCdG5DbGljaygpXCJcclxuICAgIChleHBvcnRFeGNlbENsaWNrZWQpPVwiZXhwb3J0RXhjZWxCdG5DbGljaygpXCJcclxuICAgIChzZWxlY3Rpb25QZXJQYWdlQ2hhbmdlZCk9XCJvblNlbGVjdGVkQ2hhbmdlUGFnZXJQZXJQYWdlKCRldmVudClcIlxyXG4gID48L25neC1ncmlkLWZvb3Rlcj5cclxuPC9kaXY+XHJcbjxuZ3gtZ3JpZC1leGNlbC1leHBvcnQgW3NldHRpbmdzXT1cImV4cG9ydFNldHRpbmdzXCI+PC9uZ3gtZ3JpZC1leGNlbC1leHBvcnQ+XHJcbjxuZ3gtZ3JpZC1wZGYtZXhwb3J0IFtzZXR0aW5nc109XCJleHBvcnRTZXR0aW5nc1wiPjwvbmd4LWdyaWQtcGRmLWV4cG9ydD5cclxuIl19