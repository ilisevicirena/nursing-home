import * as i0 from '@angular/core';
import { Injectable, Component, EventEmitter, HostBinding, Input, Output, ViewChild, HostListener, Pipe, QueryList, ViewChildren, Directive, LOCALE_ID, Inject, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as i1 from '@nebular/theme';
import { NbRevealCardComponent, NbPosition, NbPopoverDirective, NbTagModule, NbButtonModule, NbLayoutModule, NbIconModule, NbTooltipModule, NbCheckboxModule, NbSpinnerModule, NbSelectModule, NbProgressBarModule, NbActionsModule, NbToggleModule, NbDatepickerModule, NbInputModule, NbFormFieldModule, NbUserModule, NbCardModule, NbContextMenuModule, NbPopoverModule, NbAutocompleteModule, NbAccordionModule, NbAlertModule, NbButtonGroupModule, NbThemeModule, NbTimepickerModule, NbWindowModule, NbDialogModule } from '@nebular/theme';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1$1 from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import * as i4 from '@angular/common';
import { DatePipe, formatDate, CommonModule } from '@angular/common';
import * as i5 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i2 from '@nebular/date-fns';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { filter, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import * as XLSX from 'xlsx';
import * as i6 from 'ngx-colors';
import { NgxColorsModule } from 'ngx-colors';
import * as i4$1 from 'ngx-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import * as i3 from 'ngx-summernote';
import { NgxSummernoteModule } from 'ngx-summernote';

class SharedComponentsService {
    constructor() { }
}
SharedComponentsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SharedComponentsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class SharedComponentsComponent {
    constructor() { }
    ngOnInit() { }
}
SharedComponentsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SharedComponentsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SharedComponentsComponent, selector: "lib-shared-components", ngImport: i0, template: ` <p>shared-components works!</p> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-shared-components', template: ` <p>shared-components works!</p> ` }]
        }], ctorParameters: function () { return []; } });

class TestViewComponent {
    constructor() { }
    ngOnInit() {
    }
}
TestViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TestViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TestViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TestViewComponent, selector: "ngx-test-view", ngImport: i0, template: "<nb-tag text=\"Test view shared component works\" status=\"primary\"></nb-tag>", styles: [""], dependencies: [{ kind: "component", type: i1.NbTagComponent, selector: "nb-tag", inputs: ["text", "selected", "removable", "appearance", "status", "size", "role"], outputs: ["remove", "selectedChange"], exportAs: ["nbTag"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TestViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-test-view', template: "<nb-tag text=\"Test view shared component works\" status=\"primary\"></nb-tag>" }]
        }], ctorParameters: function () { return []; } });

function getError(code) {
    var err = errors.find((x) => x.code == code);
    var error = 'Error ' + code + ': ' + (err === null || err === void 0 ? void 0 : err.message);
    return err ? error : 'Unknown error ' + code;
}
var errors = [
    // file error codes starting with 100
    { code: 101, message: 'File type is not supported for preview.' },
    { code: 102, message: 'Multiple files not allowed.' },
    { code: 103, message: 'File download settings are not properly set.' },
    { code: 104, message: 'File preview settings are not properly set.' },
    {
        code: 105,
        message: 'Server endpoint responded with error. No file data provided.',
    },
    { code: 106, message: 'File bytes attribute is not properly set.' },
    // smart table error codes starting with 200
    {
        code: 201,
        message: 'User picture from server settings are not properly set.',
    },
    {
        code: 202,
        message: 'Server endpoint responded with error. No picture data provided.',
    },
    { code: 203, message: 'Select editor server endpoint is not properly set.' },
    {
        code: 204,
        message: 'Select editor server endpoint responded with error. No data provided.',
    },
    { code: 205, message: 'Select filter server endpoint is not properly set.' },
    {
        code: 206,
        message: 'Select filter server endpoint responded with error. No data provided.',
    },
    //select grid combo error codes starting with 300
    { code: 301, message: 'Value attribute name must be set.' },
    {
        code: 302,
        message: 'Can not assign array to selected items when select-grid mode is not multiple. Assign single key instead.',
    },
    {
        code: 303,
        message: 'Can not assign string to selected items. Assign array of keys instead.',
    },
];

var FILE_CARD_MODE;
(function (FILE_CARD_MODE) {
    FILE_CARD_MODE["CARD"] = "card";
    FILE_CARD_MODE["SMALL_CARD"] = "small-card";
    FILE_CARD_MODE["TABLE"] = "table";
    FILE_CARD_MODE["ROW"] = "row";
})(FILE_CARD_MODE || (FILE_CARD_MODE = {}));
var FILE_MENU_CODES;
(function (FILE_MENU_CODES) {
    FILE_MENU_CODES["DOWNLOAD"] = "download";
    FILE_MENU_CODES["PREVIEW"] = "preview";
    FILE_MENU_CODES["DELETE"] = "delete";
})(FILE_MENU_CODES || (FILE_MENU_CODES = {}));
var SPECIAL_EDITOR_TYPES;
(function (SPECIAL_EDITOR_TYPES) {
    SPECIAL_EDITOR_TYPES["SELECT"] = "select";
    SPECIAL_EDITOR_TYPES["CHECKBOX"] = "checkbox";
    SPECIAL_EDITOR_TYPES["TOGGLE"] = "toggle";
    SPECIAL_EDITOR_TYPES["DATE_PICKER"] = "datepicker";
    SPECIAL_EDITOR_TYPES["DATE_TIME_PICKER"] = "datetimepicker";
    SPECIAL_EDITOR_TYPES["DATE_RANGE_PICKER"] = "daterangepicker";
    SPECIAL_EDITOR_TYPES["TIME_PICKER"] = "timepicker";
    SPECIAL_EDITOR_TYPES["TEXTAREA"] = "textarea";
    SPECIAL_EDITOR_TYPES["TEXTBOX"] = "textbox";
    SPECIAL_EDITOR_TYPES["PROGRESSBAR"] = "progressbar";
    SPECIAL_EDITOR_TYPES["FILE"] = "file";
    SPECIAL_EDITOR_TYPES["BUTTONS"] = "buttons";
})(SPECIAL_EDITOR_TYPES || (SPECIAL_EDITOR_TYPES = {}));
var SPECIAL_FILTER_TYPES;
(function (SPECIAL_FILTER_TYPES) {
    SPECIAL_FILTER_TYPES["SELECT"] = "select";
    SPECIAL_FILTER_TYPES["CHECKBOX"] = "checkbox";
    SPECIAL_FILTER_TYPES["TOGGLE"] = "toggle";
    SPECIAL_FILTER_TYPES["DATE_PICKER"] = "datepicker";
    SPECIAL_FILTER_TYPES["DATE_TIME_PICKER"] = "datetimepicker";
    SPECIAL_FILTER_TYPES["DATE_RANGE_PICKER"] = "daterangepicker";
    SPECIAL_FILTER_TYPES["TIME_PICKER"] = "timepicker";
    SPECIAL_FILTER_TYPES["TEXTBOX"] = "textbox";
    SPECIAL_FILTER_TYPES["NUMBERBOX"] = "numberbox";
    SPECIAL_FILTER_TYPES["ACTION"] = "action";
    SPECIAL_FILTER_TYPES["TEXTAREA"] = "textarea";
    SPECIAL_FILTER_TYPES["PROGRESSBAR"] = "progressbar";
    SPECIAL_FILTER_TYPES["FILE"] = "file";
    SPECIAL_FILTER_TYPES["BUTTONS"] = "buttons";
    SPECIAL_FILTER_TYPES["COLORPICKER"] = "colorpicker";
    SPECIAL_FILTER_TYPES["AUTOCOMPLETE"] = "autocomplete";
})(SPECIAL_FILTER_TYPES || (SPECIAL_FILTER_TYPES = {}));
var TABLE_SOURCE_TYPES;
(function (TABLE_SOURCE_TYPES) {
    TABLE_SOURCE_TYPES["LOCAL"] = "local";
    TABLE_SOURCE_TYPES["SERVER"] = "server";
})(TABLE_SOURCE_TYPES || (TABLE_SOURCE_TYPES = {}));
var TABLE_ACTIONS_POSITION;
(function (TABLE_ACTIONS_POSITION) {
    TABLE_ACTIONS_POSITION["LEFT"] = "left";
    TABLE_ACTIONS_POSITION["RIGHT"] = "right";
})(TABLE_ACTIONS_POSITION || (TABLE_ACTIONS_POSITION = {}));
var TABLE_MODE;
(function (TABLE_MODE) {
    TABLE_MODE["INLINE"] = "inline";
    TABLE_MODE["EXTERNAL"] = "external";
    TABLE_MODE["POPUP"] = "popup";
})(TABLE_MODE || (TABLE_MODE = {}));
var TABLE_SPECIAL_TYPES;
(function (TABLE_SPECIAL_TYPES) {
    TABLE_SPECIAL_TYPES["TAG"] = "tag";
    TABLE_SPECIAL_TYPES["PROGRESSBAR"] = "progressbar";
    TABLE_SPECIAL_TYPES["CHECKBOX"] = "checkbox";
    TABLE_SPECIAL_TYPES["TOGGLE"] = "toggle";
    TABLE_SPECIAL_TYPES["DATE"] = "date";
    TABLE_SPECIAL_TYPES["DATERANGE"] = "daterange";
    TABLE_SPECIAL_TYPES["USER"] = "user";
    TABLE_SPECIAL_TYPES["BUTTONS"] = "buttons";
    TABLE_SPECIAL_TYPES["FILE"] = "file";
    TABLE_SPECIAL_TYPES["LOOKUP"] = "lookup";
    TABLE_SPECIAL_TYPES["TEXT"] = "text";
    TABLE_SPECIAL_TYPES["NUMBER"] = "number";
    TABLE_SPECIAL_TYPES["ACTIONS"] = "actions";
    TABLE_SPECIAL_TYPES["COLOR"] = "color";
})(TABLE_SPECIAL_TYPES || (TABLE_SPECIAL_TYPES = {}));
var SCHEDULE_VIEW;
(function (SCHEDULE_VIEW) {
    SCHEDULE_VIEW["DAY"] = "day";
    SCHEDULE_VIEW["WEEK"] = "week";
    SCHEDULE_VIEW["MONTH"] = "month";
})(SCHEDULE_VIEW || (SCHEDULE_VIEW = {}));
var GRID_DATE_PICKER;
(function (GRID_DATE_PICKER) {
    GRID_DATE_PICKER["DATE"] = "date";
    GRID_DATE_PICKER["DATE_TIME"] = "datetime";
    GRID_DATE_PICKER["TIME"] = "time";
    GRID_DATE_PICKER["DATE_RANGE"] = "daterange";
})(GRID_DATE_PICKER || (GRID_DATE_PICKER = {}));
var GRID_SORT;
(function (GRID_SORT) {
    GRID_SORT["ASC"] = "asc";
    GRID_SORT["DESC"] = "desc";
    GRID_SORT["NONE"] = "none";
})(GRID_SORT || (GRID_SORT = {}));
var GRID_MENU_ACTION;
(function (GRID_MENU_ACTION) {
    GRID_MENU_ACTION["SORT_ASC"] = "sortasc";
    GRID_MENU_ACTION["SORT_DESC"] = "sortdesc";
    GRID_MENU_ACTION["DOCK"] = "dock";
    GRID_MENU_ACTION["UNDOCK"] = "undock";
    GRID_MENU_ACTION["GROUP"] = "group";
    GRID_MENU_ACTION["UNGROUP"] = "ungroup";
    GRID_MENU_ACTION["SHOW_GROUP_COUNT"] = "showgroupcount";
    GRID_MENU_ACTION["HIDE_GROUP_COUNT"] = "hidegroupcount";
})(GRID_MENU_ACTION || (GRID_MENU_ACTION = {}));
var GRID_BUTTON_TYPE;
(function (GRID_BUTTON_TYPE) {
    GRID_BUTTON_TYPE["EDIT"] = "edit";
    GRID_BUTTON_TYPE["DELETE"] = "delete";
    GRID_BUTTON_TYPE["OTHER"] = "other";
    GRID_BUTTON_TYPE["SAVE"] = "save";
    GRID_BUTTON_TYPE["CANCEL"] = "cancel";
})(GRID_BUTTON_TYPE || (GRID_BUTTON_TYPE = {}));
var GRID_STATE;
(function (GRID_STATE) {
    GRID_STATE["NONE"] = "none";
    GRID_STATE["INSERT"] = "insert";
    GRID_STATE["EDIT"] = "edit";
    GRID_STATE["DELETE"] = "delete";
})(GRID_STATE || (GRID_STATE = {}));
var GRID_ACTIONS_POSITION;
(function (GRID_ACTIONS_POSITION) {
    GRID_ACTIONS_POSITION["LEFT"] = "left";
    GRID_ACTIONS_POSITION["RIGHT"] = "right";
})(GRID_ACTIONS_POSITION || (GRID_ACTIONS_POSITION = {}));
var GRID_MODE;
(function (GRID_MODE) {
    GRID_MODE["INLINE"] = "inline";
    GRID_MODE["EXTERNAL"] = "external";
    GRID_MODE["POPUP"] = "popup";
})(GRID_MODE || (GRID_MODE = {}));
var GRID_DATA_TYPE;
(function (GRID_DATA_TYPE) {
    GRID_DATA_TYPE["TAG"] = "tag";
    GRID_DATA_TYPE["PROGRESSBAR"] = "progressbar";
    GRID_DATA_TYPE["CHECKBOX"] = "checkbox";
    GRID_DATA_TYPE["TOGGLE"] = "toggle";
    GRID_DATA_TYPE["DATE"] = "date";
    GRID_DATA_TYPE["DATERANGE"] = "daterange";
    GRID_DATA_TYPE["USER"] = "user";
    GRID_DATA_TYPE["BUTTONS"] = "buttons";
    GRID_DATA_TYPE["FILE"] = "file";
    GRID_DATA_TYPE["LOOKUP"] = "lookup";
    GRID_DATA_TYPE["TEXT"] = "text";
    GRID_DATA_TYPE["NUMBER"] = "number";
    GRID_DATA_TYPE["ACTIONS"] = "actions";
    GRID_DATA_TYPE["COLOR"] = "color";
    GRID_DATA_TYPE["SELECT"] = "select";
    GRID_DATA_TYPE["DATE_PICKER"] = "datepicker";
    GRID_DATA_TYPE["DATE_TIME_PICKER"] = "datetimepicker";
    GRID_DATA_TYPE["DATE_RANGE_PICKER"] = "daterangepicker";
    GRID_DATA_TYPE["TIME_PICKER"] = "timepicker";
    GRID_DATA_TYPE["TEXTBOX"] = "textbox";
    GRID_DATA_TYPE["NUMBERBOX"] = "numberbox";
    GRID_DATA_TYPE["ACTION"] = "action";
    GRID_DATA_TYPE["TEXTAREA"] = "textarea";
    GRID_DATA_TYPE["COLORPICKER"] = "colorpicker";
    GRID_DATA_TYPE["AUTOCOMPLETE"] = "autocomplete";
})(GRID_DATA_TYPE || (GRID_DATA_TYPE = {}));

const ICONS = {
    download: 'download-outline',
    preview: 'external-link-outline',
    delete: 'trash-outline',
};
const FILE_SIZES = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
];
const WINDOW_SIZE = {
    width: 1500,
    height: 700,
};
const PDF_PAGE_CONF = {
    columnsToPortrait: 6,
    fontSize: 12,
    pageSize: 'A4',
    pageMargins: [20, 20, 20, 20],
};
const DATE_FORMATS = {
    date: 'dd.MM.yyyy.',
    dateTime: 'dd.MM.yyyy. HH:mm',
    time: 'HH:mm',
};
const EDITORS_CONF = {
    timepickerStep: 10,
    filepickerMaxFiles: 1,
    filepickerAccept: '*',
    widthClass: 'col-md-12',
    textareaRows: 5,
    testareaMaxChar: 2000,
    textboxType: 'text',
    buttonStatus: 'basic',
};
const TABLE_CONF = {
    entriesPerPageOptions: [5, 10, 15, 20, 25],
    exportDocName: 'export-file',
    sourceType: TABLE_SOURCE_TYPES.LOCAL,
    actionsPosition: TABLE_ACTIONS_POSITION.RIGHT,
};
const GRID_CONF = {
    entriesPerPageOptions: [5, 10, 15, 20, 25],
    defaultEntriesPerPage: 25,
    exportDocName: 'export-file',
    sourceType: TABLE_SOURCE_TYPES.LOCAL,
    actionsPosition: GRID_ACTIONS_POSITION.RIGHT,
};
const GRID_EDITORS_CONF = {
    timepickerStep: 10,
    filepickerMaxFiles: 1,
    filepickerAccept: '*',
    widthClass: 'col-md-12',
    textareaRows: 5,
    testareaMaxChar: 2000,
    textboxType: 'text',
    buttonStatus: 'basic',
};
const PROGRESSBAR_SPINNER_CONF = {
    size: 'large',
    status: 'primary',
    progressbarSize: 'col-10',
};
const SCHEDULE_CONF = {
    tagAppereance: 'outline',
    startYear: new Date().getFullYear() - 50,
    endYear: new Date().getFullYear() + 50,
    tagWidth: '100%',
    firstTagTopSpaceing: '35px',
    tagHeight: 30,
    betweenTagSpaceing: 5,
    minWeekRowHeight: 130,
    views: [
        {
            title: 'scheduleDay',
            view: SCHEDULE_VIEW.DAY,
            isActive: false,
        },
        {
            title: 'scheduleWeek',
            view: SCHEDULE_VIEW.WEEK,
            isActive: false,
        },
        {
            title: 'scheduleMonth',
            view: SCHEDULE_VIEW.MONTH,
            isActive: false,
        },
    ],
};

class TranslationService {
    constructor(http) {
        this.http = http;
        this.translations = [];
        this.map = new Map();
    }
    loadTranslations(url) {
        return new Promise((resolve, reject) => {
            this.http
                .get(url)
                .toPromise()
                .then((translations) => {
                this.setTranslations(translations);
                resolve();
            }, (error) => {
                console.error('Error loading translations:', error);
                reject(error);
            });
        });
    }
    setTranslations(translations) {
        this.translations = translations;
        this.map = new Map(this.translations.map((obj) => [obj.key, obj.value]));
    }
    translate(key) {
        return this.map.get(key) || key;
    }
    isTranslationsLoaded() {
        return this.translations.length > 0;
    }
}
TranslationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslationService, deps: [{ token: i1$1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
TranslationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.HttpClient }]; } });

class FilepickerComponent {
    constructor(_translationService) {
        this._translationService = _translationService;
        this.fileCount = 0;
        this.valueChanged = new EventEmitter();
        this.accept = this._translationService.translate('filepickerAccept');
        this._disabled = false;
        this._multiple = false;
        this.emptyPlaceholder = this._translationService.translate('filepickerEmpty');
        this.buttonPlaceholder = this._translationService.translate('filepickerButton');
        this.maxFilesPlaceholder = this._translationService.translate('filepickerMaxFiles');
        this.allowedFilesPlaceholder = this._translationService.translate('filepickerAllowedFiles');
        this.maxFilesWarningMessage = this._translationService.translate('filepickerMaxFilesWarning');
        this._displayFileSize = false;
        this._showAcceptedFormats = false;
        this._showMaxFilesNumber = false;
        this._files = [];
        this._isDragOver = false;
        this._onChange = (val) => { };
        this._onTouched = () => { };
    }
    ngOnInit() { }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = coerceBooleanProperty(val);
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    get multiple() {
        return this._multiple;
    }
    set displayFileSize(value) {
        this._displayFileSize = coerceBooleanProperty(value);
    }
    get displayFileSize() {
        return this._displayFileSize;
    }
    get files() {
        return this._files;
    }
    set showAcceptedFormats(value) {
        this._showAcceptedFormats = coerceBooleanProperty(value);
    }
    get showAcceptedFormats() {
        return this._showAcceptedFormats;
    }
    set showMaxFilesNumber(value) {
        this._showMaxFilesNumber = coerceBooleanProperty(value);
    }
    get showMaxFilesNumber() {
        return this._showMaxFilesNumber;
    }
    get isEmpty() {
        var _a;
        return !((_a = this.files) === null || _a === void 0 ? void 0 : _a.length);
    }
    get isDragover() {
        return this._isDragOver;
    }
    set isDragover(value) {
        if (!this.disabled) {
            this._isDragOver = value;
        }
    }
    writeValue(files) {
        const fileArray = this.convertToArray(files);
        if (fileArray.length < 2 || this.multiple) {
            if (this.maxFiles) {
                if (fileArray.length <= this.maxFiles) {
                    this._files = fileArray;
                    this.emitChanges(this._files);
                }
            }
            else {
                this._files = fileArray;
                this.emitChanges(this._files);
            }
        }
        else {
            throw Error(getError(102));
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    emitChanges(files) {
        this.valueChanged.emit(files);
        this._onChange(files);
    }
    addFiles(files) {
        const fileArray = this.convertToArray(files);
        if (this.multiple) {
            const merged = this.files.concat(fileArray);
            this.writeValue(merged);
        }
        else {
            this.writeValue(fileArray);
        }
    }
    removeFile(file) {
        const fileIndex = this.files.indexOf(file);
        if (fileIndex >= 0) {
            const currentFiles = this.files.slice();
            currentFiles.splice(fileIndex, 1);
            this.writeValue(currentFiles);
        }
    }
    clear() {
        this.writeValue([]);
    }
    change(event) {
        event.stopPropagation();
        this._onTouched();
        const fileList = event.target.files;
        if (fileList === null || fileList === void 0 ? void 0 : fileList.length) {
            this.addFiles(fileList);
        }
        event.target.value = '';
    }
    activate(e) {
        e.preventDefault();
        this.isDragover = true;
    }
    deactivate(e) {
        e.preventDefault();
        this.isDragover = false;
    }
    handleDrop(e) {
        this.deactivate(e);
        if (!this.disabled) {
            const fileList = e.dataTransfer.files;
            this.removeDirectories(fileList).then((files) => {
                if (files === null || files === void 0 ? void 0 : files.length) {
                    this.addFiles(files);
                }
                this._onTouched();
            });
        }
    }
    open() {
        var _a;
        if (!this.disabled) {
            (_a = this.fileInputEl) === null || _a === void 0 ? void 0 : _a.nativeElement.click();
        }
    }
    removeDirectories(files) {
        return new Promise((resolve, reject) => {
            const fileArray = this.convertToArray(files);
            const dirnames = [];
            const readerList = [];
            for (let i = 0; i < fileArray.length; i++) {
                const reader = new FileReader();
                reader.onerror = () => {
                    dirnames.push(fileArray[i].name);
                };
                reader.onloadend = () => addToReaderList(i);
                reader.readAsArrayBuffer(fileArray[i]);
            }
            function addToReaderList(val) {
                readerList.push(val);
                if (readerList.length === fileArray.length) {
                    resolve(fileArray.filter((file) => !dirnames.includes(file.name)));
                }
            }
        });
    }
    convertToArray(files) {
        if (files) {
            if (files instanceof File) {
                return [files];
            }
            else if (Array.isArray(files)) {
                return files;
            }
            else {
                return Array.prototype.slice.call(files);
            }
        }
        return [];
    }
    getFileName(file) {
        if (!this._displayFileSize) {
            return file.name;
        }
        const size = new BytePipe().transform(file.size);
        return `${file.name} (${size})`;
    }
}
FilepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FilepickerComponent, deps: [{ token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
FilepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: FilepickerComponent, selector: "ngx-filepicker", inputs: { disabled: "disabled", multiple: "multiple", displayFileSize: "displayFileSize", maxFiles: "maxFiles", showAcceptedFormats: "showAcceptedFormats", showMaxFilesNumber: "showMaxFilesNumber", accept: "accept", emptyPlaceholder: "emptyPlaceholder", buttonPlaceholder: "buttonPlaceholder", maxFilesPlaceholder: "maxFilesPlaceholder", allowedFilesPlaceholder: "allowedFilesPlaceholder", maxFilesWarningMessage: "maxFilesWarningMessage" }, outputs: { valueChanged: "valueChanged" }, host: { listeners: { "change": "change($event)", "dragenter": "activate($event)", "dragover": "activate($event)", "dragleave": "deactivate($event)", "drop": "handleDrop($event)", "click": "open()" }, properties: { "class.disabled": "this.disabled", "class.empty-input": "this.isEmpty" } }, viewQueries: [{ propertyName: "fileInputEl", first: true, predicate: ["fileInputEl"], descendants: true }], ngImport: i0, template: "<div class=\"placeholder-filepicker file-formats\" *ngIf=\"showAcceptedFormats || showMaxFilesNumber; else noFormat\">\n    <div *ngIf=\"showAcceptedFormats\">{{allowedFilesPlaceholder}} {{accept}}</div>\n    <div *ngIf=\"showMaxFilesNumber\">{{maxFilesPlaceholder}} {{maxFiles}}\n    </div>\n</div>\n<ng-template #noFormat>\n    <div class=\"placeholder-filepicker file-formats\">&nbsp;</div>\n</ng-template>\n<nb-tag-list *ngIf=\"files.length\">\n    <nb-tag nbTooltip={{file.size|byte}} nbTooltipPosition=\"top\" [nbTooltipDisabled]=\"displayFileSize\"\n        *ngFor=\"let file of files\" [removable]=\"!disabled\" [text]=\"getFileName(file)\" status=\"primary\"\n        appearance=\"filled\" (remove)=\"removeFile(file)\">\n    </nb-tag>\n</nb-tag-list>\n<div class=\"placeholder-filepicker text-center\" *ngIf=\"!files.length\">{{emptyPlaceholder}}<br><button type=\"button\"\n        [disabled]=\"disabled\" style=\"margin-top: 0.5rem; text-transform: none;\" nbButton size=\"small\" shape=\"round\"\n        status=\"primary\">{{buttonPlaceholder}}<nb-icon pack=\"eva\" icon=\"cloud-upload-outline\" nbSuffix>\n        </nb-icon>\n    </button>\n</div>\n<div class=\"placeholder-filepicker maxFiles\" *ngIf=\"files.length>=maxFiles!\">\n    <nb-icon status=\"danger\" pack=\"eva\" icon=\"alert-circle-outline\"></nb-icon>\n    {{maxFilesWarningMessage}} ({{maxFiles}}).\n</div>\n<input #fileInputEl class=\"hidden\" #fileInput name=\"filecontrol\" type=\"file\" [attr.multiple]=\"multiple? '' : null\"\n    [attr.accept]=\"accept\">", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */input{width:0px;height:0px;opacity:0;overflow:hidden;position:absolute;z-index:-1}:host{display:block;border:2px dashed;border-radius:1rem;min-height:9rem;max-width:100%;padding:.7rem;cursor:pointer}:host.disabled{opacity:.5;cursor:unset}:host .placeholder-filepicker{color:var(--color-primary-500);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .placeholder-filepicker.maxFiles{color:var(--color-basic-600);margin-top:.5rem;padding:.5rem;font-size:smaller}:host .placeholder-filepicker.file-formats{color:var(--color-basic-600);padding:.5rem;font-size:smaller}nb-tag{max-width:100%;text-transform:none}\n"], dependencies: [{ kind: "component", type: i0.forwardRef(function () { return i1.NbTagComponent; }), selector: "nb-tag", inputs: ["text", "selected", "removable", "appearance", "status", "size", "role"], outputs: ["remove", "selectedChange"], exportAs: ["nbTag"] }, { kind: "component", type: i0.forwardRef(function () { return i1.NbTagListComponent; }), selector: "nb-tag-list", inputs: ["size", "tabIndex", "role", "multiple"], outputs: ["tagRemove"], exportAs: ["nbTagList"] }, { kind: "component", type: i0.forwardRef(function () { return i1.NbButtonComponent; }), selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i0.forwardRef(function () { return i1.NbIconComponent; }), selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NbTooltipDirective; }), selector: "[nbTooltip]", inputs: ["nbTooltip", "nbTooltipPlacement", "nbTooltipAdjustment", "nbTooltipClass", "nbTooltipIcon", "nbTooltipStatus", "nbTooltipTrigger", "nbTooltipOffset", "nbTooltipDisabled"], outputs: ["nbTooltipShowStateChange"], exportAs: ["nbTooltip"] }, { kind: "directive", type: i0.forwardRef(function () { return i4.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i4.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NbSuffixDirective; }), selector: "[nbSuffix]" }, { kind: "pipe", type: i0.forwardRef(function () { return BytePipe; }), name: "byte" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FilepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-filepicker', template: "<div class=\"placeholder-filepicker file-formats\" *ngIf=\"showAcceptedFormats || showMaxFilesNumber; else noFormat\">\n    <div *ngIf=\"showAcceptedFormats\">{{allowedFilesPlaceholder}} {{accept}}</div>\n    <div *ngIf=\"showMaxFilesNumber\">{{maxFilesPlaceholder}} {{maxFiles}}\n    </div>\n</div>\n<ng-template #noFormat>\n    <div class=\"placeholder-filepicker file-formats\">&nbsp;</div>\n</ng-template>\n<nb-tag-list *ngIf=\"files.length\">\n    <nb-tag nbTooltip={{file.size|byte}} nbTooltipPosition=\"top\" [nbTooltipDisabled]=\"displayFileSize\"\n        *ngFor=\"let file of files\" [removable]=\"!disabled\" [text]=\"getFileName(file)\" status=\"primary\"\n        appearance=\"filled\" (remove)=\"removeFile(file)\">\n    </nb-tag>\n</nb-tag-list>\n<div class=\"placeholder-filepicker text-center\" *ngIf=\"!files.length\">{{emptyPlaceholder}}<br><button type=\"button\"\n        [disabled]=\"disabled\" style=\"margin-top: 0.5rem; text-transform: none;\" nbButton size=\"small\" shape=\"round\"\n        status=\"primary\">{{buttonPlaceholder}}<nb-icon pack=\"eva\" icon=\"cloud-upload-outline\" nbSuffix>\n        </nb-icon>\n    </button>\n</div>\n<div class=\"placeholder-filepicker maxFiles\" *ngIf=\"files.length>=maxFiles!\">\n    <nb-icon status=\"danger\" pack=\"eva\" icon=\"alert-circle-outline\"></nb-icon>\n    {{maxFilesWarningMessage}} ({{maxFiles}}).\n</div>\n<input #fileInputEl class=\"hidden\" #fileInput name=\"filecontrol\" type=\"file\" [attr.multiple]=\"multiple? '' : null\"\n    [attr.accept]=\"accept\">", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */input{width:0px;height:0px;opacity:0;overflow:hidden;position:absolute;z-index:-1}:host{display:block;border:2px dashed;border-radius:1rem;min-height:9rem;max-width:100%;padding:.7rem;cursor:pointer}:host.disabled{opacity:.5;cursor:unset}:host .placeholder-filepicker{color:var(--color-primary-500);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .placeholder-filepicker.maxFiles{color:var(--color-basic-600);margin-top:.5rem;padding:.5rem;font-size:smaller}:host .placeholder-filepicker.file-formats{color:var(--color-basic-600);padding:.5rem;font-size:smaller}nb-tag{max-width:100%;text-transform:none}\n"] }]
        }], ctorParameters: function () { return [{ type: TranslationService }]; }, propDecorators: { disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }, {
                type: Input
            }], multiple: [{
                type: Input
            }], displayFileSize: [{
                type: Input
            }], maxFiles: [{
                type: Input
            }], showAcceptedFormats: [{
                type: Input
            }], showMaxFilesNumber: [{
                type: Input
            }], isEmpty: [{
                type: HostBinding,
                args: ['class.empty-input']
            }], valueChanged: [{
                type: Output
            }], fileInputEl: [{
                type: ViewChild,
                args: ['fileInputEl']
            }], accept: [{
                type: Input
            }], emptyPlaceholder: [{
                type: Input
            }], buttonPlaceholder: [{
                type: Input
            }], maxFilesPlaceholder: [{
                type: Input
            }], allowedFilesPlaceholder: [{
                type: Input
            }], maxFilesWarningMessage: [{
                type: Input
            }], change: [{
                type: HostListener,
                args: ['change', ['$event']]
            }], activate: [{
                type: HostListener,
                args: ['dragenter', ['$event']]
            }, {
                type: HostListener,
                args: ['dragover', ['$event']]
            }], deactivate: [{
                type: HostListener,
                args: ['dragleave', ['$event']]
            }], handleDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }], open: [{
                type: HostListener,
                args: ['click']
            }] } });
class BytePipe {
    constructor() {
        this.unit = 'Bytes';
    }
    transform(value, decimals) {
        value = value.toString();
        if (parseInt(value, 10) >= 0) {
            value = this.formatBytes(+value, +decimals);
        }
        return value;
    }
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = FILE_SIZES;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
BytePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BytePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
BytePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: BytePipe, name: "byte" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BytePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'byte',
                }]
        }] });

;
const KNOWN_EXTENSIONS = [
    { extension: "pdf", icon: "far fa-file-pdf", color: "#ff0000" },
    { extension: "xls", icon: "far fa-file-excel", color: "#10793F" },
    { extension: "xlsx", icon: "far fa-file-excel", color: "#10793F" },
    { extension: "excel", icon: "far fa-file-excel", color: "#10793F" },
    { extension: "doc", icon: "far fa-file-word", color: "#1B5EBE" },
    { extension: "docx", icon: "far fa-file-word", color: "#1B5EBE" },
    { extension: "word", icon: "far fa-file-word", color: "#1B5EBE" },
    { extension: "ppt", icon: "far fa-file-powerpoint", color: "#C13B1B" },
    { extension: "pptx", icon: "far fa-file-powerpoint", color: "#C13B1B" },
    { extension: "powerpoint", icon: "far fa-file-powerpoint", color: "#C13B1B" },
    { extension: "png", icon: "far fa-file-image" },
    { extension: "jpg", icon: "far fa-file-image" },
    { extension: "jpeg", icon: "far fa-file-image" },
    { extension: "image", icon: "far fa-file-image" },
    { extension: "code", icon: "far fa-file-code" },
    { extension: "html", icon: "far fa-file-image" },
    { extension: "css", icon: "far fa-file-image" },
    { extension: "ts", icon: "far fa-file-image" },
    { extension: "js", icon: "far fa-file-image" },
    { extension: "scss", icon: "far fa-file-image" },
    { extension: "archive", icon: "far fa-file-archive" },
    { extension: "rar", icon: "far fa-file-archive" },
    { extension: "zip", icon: "far fa-file-archive" },
    { extension: "7z", icon: "far fa-file-archive" },
    { extension: "mp3", icon: "far fa-file-audio" },
    { extension: "audio", icon: "far fa-file-audio" },
    { extension: "mp4", icon: "far fa-file-video" },
    { extension: "video", icon: "far fa-file-video" },
    { extension: "csv", icon: "far fa-file-csv" },
    { extension: "txt", icon: "far fa-file-alt" },
];
const PREVIEWABLE_EXTENSIONS = [
    { extension: "pdf", type: "application/pdf;base64" },
    { extension: "jpeg", type: "data:image/jpeg;base64" },
    { extension: "jpg", type: "data:image/jpg;base64" },
    { extension: "png", type: "data:image/png;base64" },
];
const UNKNOWN_EXTENSION = { extension: "unknown", icon: "far fa-file" };

/*
    Generates unique id.
    Important if multiple elements of same type are initialized.
*/
function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
/*
    Downloads selected file with file data provided in base64 format, and provided filename
*/
function fileDownload(fileData, filename) {
    fileData = fileData.substr(fileData.indexOf(',') + 1);
    fileData = base64ToArrayBuffer(fileData);
    const blob = new Blob([fileData], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
}
/*
    Converts base64 to arrayBuffer.
*/
function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
/*
    Starts preview file in new window based on file type.
    Avaliable types for preview are pdf, jpeg, jpg and png for now.
    Function requires file in base64 format.
*/
function previewFile(base64, fileType, filename, windowWidth = WINDOW_SIZE.width, windowHeight = WINDOW_SIZE.height) {
    var previewableExtensions = PREVIEWABLE_EXTENSIONS;
    if (previewableExtensions.find((x) => x.extension == fileType.toLowerCase())) {
        var fileObj = previewableExtensions.find((x) => x.extension == fileType.toLowerCase());
        var type = fileObj === null || fileObj === void 0 ? void 0 : fileObj.type;
        if (fileObj.extension == 'pdf') {
            var byteCharacters = atob(base64);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var file = new Blob([byteArray], { type: type });
            var fileURL = URL.createObjectURL(file);
            popupCenter(fileURL, filename, windowWidth, windowHeight);
        }
        else {
            var w = popupCenter('about:blank', filename, windowWidth, windowHeight);
            setTimeout(function () {
                //FireFox seems to require a setTimeout for this to work.
                var element = w.document.createElement('iframe');
                element.style.height = '100%';
                element.style.width = '100%';
                w.document.body.appendChild(element).src = type + ',' + base64;
            }, 0);
        }
    }
    else {
        console.error(getError(101));
    }
}
/*
    Starts new browser window in the middle of screen.
*/
function popupCenter(url, title, w, h) {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
    const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : screen.width;
    const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : screen.height;
    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(url, title, `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `);
    newWindow === null || newWindow === void 0 ? void 0 : newWindow.focus();
    return newWindow;
}
function stringIsEmpty(str) {
    return !str || str.length === 0;
}
function pushToArrayAtIndexRange(arrayA, arrayB, startIndex) {
    // Check if the start index is valid
    if (startIndex < 0 || startIndex > arrayA.length)
        startIndex = 1;
    // Use splice to insert elements from arrayB into arrayA
    arrayA.splice(startIndex, 0, ...arrayB);
}

class FileCardComponent {
    // -------------------------------------------------- COMPONENT CONSTRUCTION -------------------------------------------------------------
    constructor(menuService, http, translationService) {
        this.menuService = menuService;
        this.http = http;
        this.translationService = translationService;
        // -------------------------------------------------- PUBLIC FIELDS ----------------------------------------------------------------------
        this.id = 'file-card-' + makeId(15); // unique component id
        this.menuItems = []; // items to show in file context menu
        this.menuId = 'file-more-menu-' + makeId(15); // component unique id
        this.extension = UNKNOWN_EXTENSION; // extension data to show in card icon
        this.fileCardModes = FILE_CARD_MODE; // card modes enum for HTML switch
        // -------------------------------------------------- PRIVATE FIELDS ---------------------------------------------------------------------
        this.knownExtensions = KNOWN_EXTENSIONS; // list of extesions supported
        this.subscriptions = [];
        // -------------------------------------------------- INPUTS -----------------------------------------------------------------------------
        this.canDownload = true; // shows/hides download option in file context menu
        this.canPreview = true; // shows/hides preview option in file context menu
        this.canDelete = true; // shows/hides delete option in file context menu
        this.deleteTitle = this.translationService.translate('fileDelete'); // title for delete option in file context menu
        this.previewTitle = this.translationService.translate('filePreview'); // title for preview option in file context menu
        this.downloadTitle = this.translationService.translate('fileDownload'); // title for download option in file context menu
        this.custumFileActions = []; // list of custom actions in file context menu
        this.sizeTitle = this.translationService.translate('fileSize'); // title for size attribute in file card details
        this.detailsEnabled = true; // shows/hides file details section
        this.authorTitle = this.translationService.translate('fileAuthor'); // title for author attribute in file card details
        this.filenameTitle = this.translationService.translate('fileName'); // title for file name in file card details
        this.extensionTitle = this.translationService.translate('fileExtension'); // title for extension in file card details
        this.dateTitle = this.translationService.translate('fileDate'); // title for date in file card details
        this.mode = FILE_CARD_MODE.CARD; // file card mode, can be card, table, row or small card
        this.useCustomPreview = false; // enables/disables built in file preview, if disabled only menuItemClick event is fired
        this.useCustomDownload = false; // enables/disables built in file download, if disabled only menuItemClick event is fired
        this.fileFromServer = false; // indicates file download/preview is from server
        this.serverEndpoint = undefined; // server endpoint URL
        this.keyAttribute = undefined; // name of key attribute to be sent to server as parameter
        this.bytesAttribute = undefined; // name of attribute in which base64 of file is stored (only for files coming from server)
        this.formatDate = false; // enables/disables date formating
        this.dateFromat = DATE_FORMATS.dateTime; // date format to use for formatting
        this.useBrandColors = true; // color logos of known brand extesions
        this.fileData = {
            // data to be shown
            id: '',
            filename: '',
            extension: '', // file type (extension)
        };
        // -------------------------------------------------- OUTPUTS ----------------------------------------------------------------------------
        this.fileMenuItemClick = new EventEmitter(); // fired when file context menu item is clicked, provides data about item selected
    }
    ngOnInit() {
        if (this.canDownload)
            this.menuItems.push({
                title: this.downloadTitle,
                icon: ICONS.download,
                data: { code: FILE_MENU_CODES.DOWNLOAD },
            });
        if (this.canPreview)
            this.menuItems.push({
                title: this.previewTitle,
                icon: ICONS.preview,
                data: { code: FILE_MENU_CODES.PREVIEW },
            });
        if (this.canDelete)
            this.menuItems.push({
                title: this.deleteTitle,
                icon: ICONS.delete,
                data: { code: FILE_MENU_CODES.DELETE },
            });
        if (this.custumFileActions.length > 0)
            this.menuItems = this.menuItems.concat(this.custumFileActions);
        this.subscriptions.push(this.menuService
            .onItemClick()
            .pipe(filter(({ tag }) => {
            return (tag === null || tag === void 0 ? void 0 : tag.indexOf(this.menuId)) > -1;
        }), map(({ item }) => item))
            .subscribe((item) => {
            item.data['file'] = this.fileData; // add file data to item.data, at this point file data is provided inside menu item clicked
            this.menuItemClick(item);
        }));
        var ext = this.knownExtensions.find((x) => { var _a; return x.extension == ((_a = this.fileData.extension) === null || _a === void 0 ? void 0 : _a.toLowerCase()); });
        if (ext)
            this.extension = ext;
        else
            this.extension = UNKNOWN_EXTENSION;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((element) => {
            element.unsubscribe();
        });
    }
    // -------------------------------------------------- PRIVATE METHODS --------------------------------------------------------------------
    /*
      Performs menu item click.
      If built in functions for download and preview are used, downloads and displays file.
      Emits fileMenuItemClick output event with NbMenuItem data and file data.
    */
    menuItemClick(item) {
        switch (item.data.code) {
            case FILE_MENU_CODES.DOWNLOAD:
                if (!this.useCustomDownload) {
                    // do built in download
                    if (this.fileFromServer) {
                        if (this.serverEndpoint &&
                            this.bytesAttribute &&
                            this.keyAttribute) {
                            var params = new HttpParams().append(this.keyAttribute, item.data.file[this.keyAttribute]);
                            this.subscriptions.push(this.http
                                .get(this.serverEndpoint, { params: params })
                                .subscribe((file) => {
                                if (file)
                                    fileDownload(file[this.bytesAttribute], item.data.file.filename);
                                else
                                    console.error(getError(105));
                            }));
                        }
                        else
                            console.error(getError(103));
                    }
                    else {
                        if (this.fileData.fileBytes)
                            fileDownload(this.fileData.fileBytes, item.data.file.filename);
                        else
                            console.error(getError(106));
                    }
                }
                break;
            case FILE_MENU_CODES.PREVIEW:
                if (!this.useCustomPreview) {
                    // do built in preview
                    if (this.fileFromServer) {
                        if (this.serverEndpoint &&
                            this.bytesAttribute &&
                            this.keyAttribute) {
                            var params = new HttpParams().append(this.keyAttribute, item.data.file[this.keyAttribute]);
                            this.subscriptions.push(this.http
                                .get(this.serverEndpoint, { params: params })
                                .subscribe((file) => {
                                if (file)
                                    previewFile(file[this.bytesAttribute], item.data.file.extension, item.data.file.filename);
                                else
                                    console.error(getError(105));
                            }));
                        }
                        else
                            console.error(getError(104));
                    }
                    else {
                        if (this.fileData.fileBytes)
                            previewFile(this.fileData.fileBytes, item.data.file.extension, item.data.file.filename);
                        else
                            console.error(getError(106));
                    }
                }
                break;
        }
        this.fileMenuItemClick.emit(item); // emit event click output with NbMenuItem data
    }
    // -------------------------------------------------- PUBLIC METHODS ---------------------------------------------------------------------
    // -------------------------------------------------- DOM LISTENERS ----------------------------------------------------------------------
    onClickRevealCard() {
        this.revealCard.toggle();
    }
    /*
      If card mode is row, then actions are displayed as buttons.
      Function emits fileMenuItemClick output event on button click with NbMenuItem data and file data.
    */
    onRowButtonClick(item) {
        item.data['file'] = this.fileData;
        this.menuItemClick(item);
    }
}
FileCardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FileCardComponent, deps: [{ token: i1.NbMenuService }, { token: i1$1.HttpClient }, { token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
FileCardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: FileCardComponent, selector: "ngx-file-card", inputs: { canDownload: "canDownload", canPreview: "canPreview", canDelete: "canDelete", deleteTitle: "deleteTitle", previewTitle: "previewTitle", downloadTitle: "downloadTitle", custumFileActions: "custumFileActions", sizeTitle: "sizeTitle", detailsEnabled: "detailsEnabled", authorTitle: "authorTitle", filenameTitle: "filenameTitle", extensionTitle: "extensionTitle", dateTitle: "dateTitle", mode: "mode", useCustomPreview: "useCustomPreview", useCustomDownload: "useCustomDownload", fileFromServer: "fileFromServer", serverEndpoint: "serverEndpoint", keyAttribute: "keyAttribute", bytesAttribute: "bytesAttribute", formatDate: "formatDate", dateFromat: "dateFromat", useBrandColors: "useBrandColors", fileData: "fileData" }, outputs: { fileMenuItemClick: "fileMenuItemClick" }, viewQueries: [{ propertyName: "revealCard", first: true, predicate: NbRevealCardComponent, descendants: true }], ngImport: i0, template: "<nb-reveal-card class=\"file-card\" [showToggleButton]=\"false\" *ngIf=\"mode==fileCardModes.CARD\" [id]=\"id\">\n    <nb-card-front>\n        <nb-card class=\"mb-0\">\n            <nb-card-body>\n                <div class=\"row w-100 justify-content-end info-container\" *ngIf=\"menuItems.length>0\">\n                    <div class=\"file-informations\">\n                        <button nbButton ghost shape=\"round\" [nbContextMenu]=\"menuItems\" [nbContextMenuTag]=\"menuId\">\n                            <nb-icon pack=\"eva\" icon=\"more-vertical-outline\"></nb-icon>\n                        </button>\n                    </div>\n                </div>\n                <div class=\"row w-100 m-0 justify-content-center\">\n                    <div class=\"file-icon\">\n                        <i [ngClass]=\"extension.icon\" [style]=\"useBrandColors ? 'color: '+extension.color:''\"></i>\n                    </div>\n                </div>\n                <div class=\"row w-100 m-0 justify-content-center\">\n                    <div class=\"file-name\">\n                        {{fileData.filename}}\n                    </div>\n                </div>\n                <div class=\"line\" *ngIf=\"fileData.size || detailsEnabled\"></div>\n                <div class=\"row w-100 ms-0 me-0 mt-2\" *ngIf=\"fileData.size || detailsEnabled\">\n                    <div class=\"col p-0\">\n                        <div class=\"row m-0 w-100 file-size-label\" *ngIf=\"fileData.size\">\n                            {{sizeTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\" *ngIf=\"fileData.size\">\n                            {{fileData.size}} <span class=\"p-0\" style=\"width: max-content;\"\n                                *ngIf=\"fileData.sizeUnit\">{{fileData.sizeUnit}}</span>\n                        </div>\n                    </div>\n                    <div class=\"col d-flex justify-content-end p-0 align-items-center\">\n                        <div class=\"file-actions\" *ngIf=\"detailsEnabled\">\n                            <button nbButton ghost shape=\"round\" (click)=\"onClickRevealCard()\">\n                                <nb-icon pack=\"eva\" icon=\"chevron-up-outline\"></nb-icon>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </nb-card-body>\n        </nb-card>\n    </nb-card-front>\n    <nb-card-back class=\"h-100\">\n        <nb-card class=\"h-100 mb-0\">\n            <nb-card-body>\n                <div class=\"row w-100 ms-0 me-0 mt-2\">\n                    <div class=\"col-md-6 pt-0 pe-0 ps-0 pb-2 ps-1\" *ngIf=\"fileData.filename\">\n                        <div class=\"row m-0 w-100 file-size-label\">\n                            {{filenameTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\">\n                            {{fileData.filename}}\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 pt-0 pe-0 ps-0 pb-2 ps-1\" *ngIf=\"fileData.extension\">\n                        <div class=\"row m-0 w-100 file-size-label\">\n                            {{extensionTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\">\n                            {{fileData.extension}}\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 pt-0 pe-0 ps-0 pb-2 ps-1\" *ngIf=\"fileData.author\">\n                        <div class=\"row m-0 w-100 file-size-label\">\n                            {{authorTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\">\n                            {{fileData.author}}\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 pt-0 pe-0 ps-0 pb-2 ps-1\" *ngIf=\"fileData.createdDate\">\n                        <div class=\"row m-0 w-100 file-size-label\">\n                            {{dateTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\">\n                            <span class=\"p-0\" *ngIf=\"!formatDate\">{{fileData.createdDate}}</span>\n                            <span class=\"p-0\" *ngIf=\"formatDate\">{{fileData.createdDate | date: dateFromat}}</span>\n                        </div>\n                    </div>\n                </div>\n            </nb-card-body>\n            <nb-card-footer>\n                <div class=\"line\" *ngIf=\"fileData.size || detailsEnabled\"></div>\n                <div class=\"row w-100 ms-0 me-0 mt-2\" *ngIf=\"fileData.size || detailsEnabled\">\n                    <div class=\"col p-0\">\n                        <div class=\"row m-0 w-100 file-size-label\" *ngIf=\"fileData.size\">\n                            {{sizeTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\" *ngIf=\"fileData.size\">\n                            {{fileData.size}} <span class=\"p-0\" style=\"width: max-content;\"\n                                *ngIf=\"fileData.sizeUnit\">{{fileData.sizeUnit}}</span>\n                        </div>\n                    </div>\n                    <div class=\"col d-flex justify-content-end p-0 align-items-center\">\n                        <div class=\"file-actions\" *ngIf=\"detailsEnabled\">\n                            <button nbButton ghost shape=\"round\" (click)=\"onClickRevealCard()\">\n                                <nb-icon pack=\"eva\" icon=\"chevron-down-outline\"></nb-icon>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </nb-card-footer>\n        </nb-card>\n    </nb-card-back>\n</nb-reveal-card>\n\n<nb-card *ngIf=\"mode==fileCardModes.ROW\" class=\"file-row-card mb-0\" [id]=\"id\">\n    <nb-card-body>\n        <div class=\"row m-0\">\n            <div class=\"p-0 d-flex justify-content-end align-items-center w-max-content\">\n                <div class=\"row m-0 justify-content-center w-max-content\">\n                    <div class=\"file-icon\">\n                        <i [ngClass]=\"extension.icon\" [style]=\"useBrandColors ? 'color: '+extension.color:''\"></i>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col d-flex align-items-center\">\n                <div class=\"file-name\">\n                    {{fileData.filename}}\n                </div>\n            </div>\n            <div class=\"col d-flex align-items-center\" style=\"flex-flow: wrap;\"\n                *ngIf=\"detailsEnabled && (fileData.extension || fileData.size)\">\n                <div class=\"row m-0 black-content\" *ngIf=\"fileData.extension\">\n                    {{fileData.extension}}\n                </div>\n                <div class=\"break\"></div>\n                <div class=\"row m-0 label\" *ngIf=\"fileData.size\">\n                    {{fileData.size}}<span class=\"w-max-content p-0\"\n                        *ngIf=\"fileData.sizeUnit\">{{fileData.sizeUnit}}</span>\n                </div>\n            </div>\n            <div class=\"col d-flex align-items-center\" style=\"flex-flow: wrap;\"\n                *ngIf=\"detailsEnabled && (fileData.author || fileData.createdDate)\">\n                <div class=\"row m-0 black-content\" *ngIf=\"fileData.author\">\n                    {{fileData.author}}\n                </div>\n                <div class=\"break\"></div>\n                <div class=\"row m-0 label\" *ngIf=\"fileData.createdDate\">\n                    <span class=\"p-0\" *ngIf=\"!formatDate\">{{fileData.createdDate}}</span>\n                    <span class=\"p-0\" *ngIf=\"formatDate\">{{fileData.createdDate | date: dateFromat}}</span>\n                </div>\n            </div>\n            <div class=\"d-flex justify-content-end p-0 align-items-center w-max-content\" *ngIf=\"menuItems.length>0\">\n                <div class=\"file-actions\">\n                    <button *ngFor=\"let item of menuItems\" nbButton ghost status=\"primary\" shape=\"round\" class=\"me-2\"\n                        [nbTooltip]=\"item.title\" nbTooltipPlacement=\"top\" (click)=\"onRowButtonClick(item)\">\n                        <nb-icon pack=\"eva\" [icon]=\"item.icon!.toString()\"></nb-icon>\n                    </button>\n                </div>\n            </div>\n        </div>\n    </nb-card-body>\n</nb-card>\n\n<nb-card *ngIf=\"mode==fileCardModes.TABLE\" class=\"file-table-card mb-0\" [id]=\"id\">\n    <nb-card-body>\n        <div class=\"row m-0\">\n            <div class=\"col-3 p-0 d-flex justify-content-end align-items-center\">\n                <div class=\"row w-100 m-0 justify-content-center\">\n                    <div class=\"file-icon\">\n                        <i [ngClass]=\"extension.icon\" [style]=\"useBrandColors ? 'color: '+extension.color:''\"></i>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-8 p-0 d-flex align-items-center\">\n                <div class=\"file-name\">\n                    {{fileData.filename}}\n                </div>\n            </div>\n            <div class=\"col-1 p-0 d-flex justify-content-end align-items-center\" *ngIf=\"menuItems.length>0\">\n                <button nbButton ghost shape=\"round\" [nbContextMenu]=\"menuItems\" [nbContextMenuTag]=\"menuId\">\n                    <nb-icon pack=\"eva\" icon=\"more-vertical-outline\"></nb-icon>\n                </button>\n            </div>\n        </div>\n    </nb-card-body>\n</nb-card>\n\n<nb-card *ngIf=\"mode==fileCardModes.SMALL_CARD\" class=\"file-card-small mb-0\" [id]=\"id\">\n    <nb-card-body>\n        <div class=\"row w-100 justify-content-end info-container\" *ngIf=\"menuItems.length>0\">\n            <div class=\"file-informations\">\n                <button nbButton ghost shape=\"round\" [nbContextMenu]=\"menuItems\" [nbContextMenuTag]=\"menuId\"\n                    size=\"small\">\n                    <nb-icon pack=\"eva\" icon=\"more-vertical-outline\"></nb-icon>\n                </button>\n            </div>\n        </div>\n        <div class=\"row w-100 m-0 justify-content-center\">\n            <div class=\"file-icon\">\n                <i [ngClass]=\"extension.icon\" [style]=\"useBrandColors ? 'color: '+extension.color:''\"></i>\n            </div>\n        </div>\n        <div class=\"row w-100 m-0 justify-content-center\">\n            <div class=\"file-name\">\n                {{fileData.filename}}\n            </div>\n        </div>\n    </nb-card-body>\n</nb-card>", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .file-card nb-card-body{overflow-x:hidden}:host .file-card .file-icon{padding:1.5rem;background-color:var(--color-basic-transparent-200);clip-path:polygon(0 0,0 100%,100% 100%,100% 25%,75% 0);border-top-left-radius:.5rem;border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem;width:max-content;margin-bottom:.5rem}:host .file-card .file-icon i{color:var(--color-basic-600);font-size:25px}:host .file-card .file-name{width:max-content;font-weight:600;font-size:small;overflow-wrap:break-word}:host .file-card .file-actions{width:max-content}:host .file-card .file-informations{width:max-content;position:absolute;top:-5px;right:-30px}:host .file-card .info-container{position:relative;height:10px}:host .file-card .line{padding:.5rem;border-bottom:2px solid var(--color-basic-transparent-200)}:host .file-card .file-size-label{font-weight:600;font-size:smaller}:host .file-card .label{font-weight:600;font-size:small;word-break:break-all}:host .file-card nb-card-back nb-card nb-card-footer{border:none;padding-top:0}:host .file-table-card nb-card-body{padding:.5rem}:host .file-table-card .file-name{width:max-content;font-weight:600;font-size:small;overflow-wrap:break-word}:host .file-table-card .file-icon{padding:.5rem;background-color:var(--color-basic-transparent-200);clip-path:polygon(0 0,0 100%,100% 100%,100% 25%,75% 0);border-top-left-radius:.3rem;border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;width:max-content}:host .file-table-card .file-icon i{color:var(--color-basic-600);font-size:15px}:host .file-row-card nb-card-body{padding:.5rem}:host .file-row-card .file-name{width:max-content;font-weight:600;font-size:small;overflow-wrap:break-word}:host .file-row-card .file-icon{padding:.5rem;background-color:var(--color-basic-transparent-200);clip-path:polygon(0 0,0 100%,100% 100%,100% 25%,75% 0);border-top-left-radius:.3rem;border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;width:max-content;margin-left:.5rem;margin-right:.5rem}:host .file-row-card .file-icon i{color:var(--color-basic-600);font-size:15px}:host .file-row-card .black-content{font-weight:600;font-size:small}:host .file-row-card .label{font-weight:600;font-size:small;word-break:break-all}:host .w-max-content{width:max-content}:host .file-card-small nb-card-body{overflow-x:hidden}:host .file-card-small .file-icon{padding:1rem;background-color:var(--color-basic-transparent-200);clip-path:polygon(0 0,0 100%,100% 100%,100% 25%,75% 0);border-top-left-radius:.5rem;border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem;width:max-content;margin-bottom:.5rem}:host .file-card-small .file-icon i{color:var(--color-basic-600);font-size:25px}:host .file-card-small .file-name{width:max-content;font-weight:600;font-size:small;overflow-wrap:break-word}:host .file-card-small .file-actions{width:max-content}:host .file-card-small .file-informations{width:max-content;position:absolute;top:-5px;right:-30px}:host .file-card-small .info-container{position:relative;height:10px}:host .file-card-small .line{padding:.5rem;border-bottom:2px solid var(--color-basic-transparent-200)}:host .file-card-small .file-size-label{font-weight:600;font-size:smaller}:host .file-card-small .label{font-weight:600;font-size:small;word-break:break-all}:host .file-card-small nb-card-back nb-card nb-card-footer{border:none;padding-top:0}:host .file-card-small .flip-container .file-actions{position:absolute;left:0;top:10px}.break{flex-basis:100%;height:0}\n"], dependencies: [{ kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i1.NbTooltipDirective, selector: "[nbTooltip]", inputs: ["nbTooltip", "nbTooltipPlacement", "nbTooltipAdjustment", "nbTooltipClass", "nbTooltipIcon", "nbTooltipStatus", "nbTooltipTrigger", "nbTooltipOffset", "nbTooltipDisabled"], outputs: ["nbTooltipShowStateChange"], exportAs: ["nbTooltip"] }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.NbCardComponent, selector: "nb-card", inputs: ["size", "status", "accent"] }, { kind: "component", type: i1.NbCardBodyComponent, selector: "nb-card-body" }, { kind: "component", type: i1.NbCardFooterComponent, selector: "nb-card-footer" }, { kind: "component", type: i1.NbRevealCardComponent, selector: "nb-reveal-card", inputs: ["revealed", "showToggleButton"] }, { kind: "component", type: i1.NbCardFrontComponent, selector: "nb-card-front" }, { kind: "component", type: i1.NbCardBackComponent, selector: "nb-card-back" }, { kind: "directive", type: i1.NbContextMenuDirective, selector: "[nbContextMenu]", inputs: ["nbContextMenuPlacement", "nbContextMenuAdjustment", "nbContextMenuTag", "nbContextMenu", "nbContextMenuTrigger", "nbContextMenuClass"] }, { kind: "pipe", type: i4.DatePipe, name: "date" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FileCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-file-card', template: "<nb-reveal-card class=\"file-card\" [showToggleButton]=\"false\" *ngIf=\"mode==fileCardModes.CARD\" [id]=\"id\">\n    <nb-card-front>\n        <nb-card class=\"mb-0\">\n            <nb-card-body>\n                <div class=\"row w-100 justify-content-end info-container\" *ngIf=\"menuItems.length>0\">\n                    <div class=\"file-informations\">\n                        <button nbButton ghost shape=\"round\" [nbContextMenu]=\"menuItems\" [nbContextMenuTag]=\"menuId\">\n                            <nb-icon pack=\"eva\" icon=\"more-vertical-outline\"></nb-icon>\n                        </button>\n                    </div>\n                </div>\n                <div class=\"row w-100 m-0 justify-content-center\">\n                    <div class=\"file-icon\">\n                        <i [ngClass]=\"extension.icon\" [style]=\"useBrandColors ? 'color: '+extension.color:''\"></i>\n                    </div>\n                </div>\n                <div class=\"row w-100 m-0 justify-content-center\">\n                    <div class=\"file-name\">\n                        {{fileData.filename}}\n                    </div>\n                </div>\n                <div class=\"line\" *ngIf=\"fileData.size || detailsEnabled\"></div>\n                <div class=\"row w-100 ms-0 me-0 mt-2\" *ngIf=\"fileData.size || detailsEnabled\">\n                    <div class=\"col p-0\">\n                        <div class=\"row m-0 w-100 file-size-label\" *ngIf=\"fileData.size\">\n                            {{sizeTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\" *ngIf=\"fileData.size\">\n                            {{fileData.size}} <span class=\"p-0\" style=\"width: max-content;\"\n                                *ngIf=\"fileData.sizeUnit\">{{fileData.sizeUnit}}</span>\n                        </div>\n                    </div>\n                    <div class=\"col d-flex justify-content-end p-0 align-items-center\">\n                        <div class=\"file-actions\" *ngIf=\"detailsEnabled\">\n                            <button nbButton ghost shape=\"round\" (click)=\"onClickRevealCard()\">\n                                <nb-icon pack=\"eva\" icon=\"chevron-up-outline\"></nb-icon>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </nb-card-body>\n        </nb-card>\n    </nb-card-front>\n    <nb-card-back class=\"h-100\">\n        <nb-card class=\"h-100 mb-0\">\n            <nb-card-body>\n                <div class=\"row w-100 ms-0 me-0 mt-2\">\n                    <div class=\"col-md-6 pt-0 pe-0 ps-0 pb-2 ps-1\" *ngIf=\"fileData.filename\">\n                        <div class=\"row m-0 w-100 file-size-label\">\n                            {{filenameTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\">\n                            {{fileData.filename}}\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 pt-0 pe-0 ps-0 pb-2 ps-1\" *ngIf=\"fileData.extension\">\n                        <div class=\"row m-0 w-100 file-size-label\">\n                            {{extensionTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\">\n                            {{fileData.extension}}\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 pt-0 pe-0 ps-0 pb-2 ps-1\" *ngIf=\"fileData.author\">\n                        <div class=\"row m-0 w-100 file-size-label\">\n                            {{authorTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\">\n                            {{fileData.author}}\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 pt-0 pe-0 ps-0 pb-2 ps-1\" *ngIf=\"fileData.createdDate\">\n                        <div class=\"row m-0 w-100 file-size-label\">\n                            {{dateTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\">\n                            <span class=\"p-0\" *ngIf=\"!formatDate\">{{fileData.createdDate}}</span>\n                            <span class=\"p-0\" *ngIf=\"formatDate\">{{fileData.createdDate | date: dateFromat}}</span>\n                        </div>\n                    </div>\n                </div>\n            </nb-card-body>\n            <nb-card-footer>\n                <div class=\"line\" *ngIf=\"fileData.size || detailsEnabled\"></div>\n                <div class=\"row w-100 ms-0 me-0 mt-2\" *ngIf=\"fileData.size || detailsEnabled\">\n                    <div class=\"col p-0\">\n                        <div class=\"row m-0 w-100 file-size-label\" *ngIf=\"fileData.size\">\n                            {{sizeTitle}}\n                        </div>\n                        <div class=\"row m-0 w-100 label\" *ngIf=\"fileData.size\">\n                            {{fileData.size}} <span class=\"p-0\" style=\"width: max-content;\"\n                                *ngIf=\"fileData.sizeUnit\">{{fileData.sizeUnit}}</span>\n                        </div>\n                    </div>\n                    <div class=\"col d-flex justify-content-end p-0 align-items-center\">\n                        <div class=\"file-actions\" *ngIf=\"detailsEnabled\">\n                            <button nbButton ghost shape=\"round\" (click)=\"onClickRevealCard()\">\n                                <nb-icon pack=\"eva\" icon=\"chevron-down-outline\"></nb-icon>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </nb-card-footer>\n        </nb-card>\n    </nb-card-back>\n</nb-reveal-card>\n\n<nb-card *ngIf=\"mode==fileCardModes.ROW\" class=\"file-row-card mb-0\" [id]=\"id\">\n    <nb-card-body>\n        <div class=\"row m-0\">\n            <div class=\"p-0 d-flex justify-content-end align-items-center w-max-content\">\n                <div class=\"row m-0 justify-content-center w-max-content\">\n                    <div class=\"file-icon\">\n                        <i [ngClass]=\"extension.icon\" [style]=\"useBrandColors ? 'color: '+extension.color:''\"></i>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col d-flex align-items-center\">\n                <div class=\"file-name\">\n                    {{fileData.filename}}\n                </div>\n            </div>\n            <div class=\"col d-flex align-items-center\" style=\"flex-flow: wrap;\"\n                *ngIf=\"detailsEnabled && (fileData.extension || fileData.size)\">\n                <div class=\"row m-0 black-content\" *ngIf=\"fileData.extension\">\n                    {{fileData.extension}}\n                </div>\n                <div class=\"break\"></div>\n                <div class=\"row m-0 label\" *ngIf=\"fileData.size\">\n                    {{fileData.size}}<span class=\"w-max-content p-0\"\n                        *ngIf=\"fileData.sizeUnit\">{{fileData.sizeUnit}}</span>\n                </div>\n            </div>\n            <div class=\"col d-flex align-items-center\" style=\"flex-flow: wrap;\"\n                *ngIf=\"detailsEnabled && (fileData.author || fileData.createdDate)\">\n                <div class=\"row m-0 black-content\" *ngIf=\"fileData.author\">\n                    {{fileData.author}}\n                </div>\n                <div class=\"break\"></div>\n                <div class=\"row m-0 label\" *ngIf=\"fileData.createdDate\">\n                    <span class=\"p-0\" *ngIf=\"!formatDate\">{{fileData.createdDate}}</span>\n                    <span class=\"p-0\" *ngIf=\"formatDate\">{{fileData.createdDate | date: dateFromat}}</span>\n                </div>\n            </div>\n            <div class=\"d-flex justify-content-end p-0 align-items-center w-max-content\" *ngIf=\"menuItems.length>0\">\n                <div class=\"file-actions\">\n                    <button *ngFor=\"let item of menuItems\" nbButton ghost status=\"primary\" shape=\"round\" class=\"me-2\"\n                        [nbTooltip]=\"item.title\" nbTooltipPlacement=\"top\" (click)=\"onRowButtonClick(item)\">\n                        <nb-icon pack=\"eva\" [icon]=\"item.icon!.toString()\"></nb-icon>\n                    </button>\n                </div>\n            </div>\n        </div>\n    </nb-card-body>\n</nb-card>\n\n<nb-card *ngIf=\"mode==fileCardModes.TABLE\" class=\"file-table-card mb-0\" [id]=\"id\">\n    <nb-card-body>\n        <div class=\"row m-0\">\n            <div class=\"col-3 p-0 d-flex justify-content-end align-items-center\">\n                <div class=\"row w-100 m-0 justify-content-center\">\n                    <div class=\"file-icon\">\n                        <i [ngClass]=\"extension.icon\" [style]=\"useBrandColors ? 'color: '+extension.color:''\"></i>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-8 p-0 d-flex align-items-center\">\n                <div class=\"file-name\">\n                    {{fileData.filename}}\n                </div>\n            </div>\n            <div class=\"col-1 p-0 d-flex justify-content-end align-items-center\" *ngIf=\"menuItems.length>0\">\n                <button nbButton ghost shape=\"round\" [nbContextMenu]=\"menuItems\" [nbContextMenuTag]=\"menuId\">\n                    <nb-icon pack=\"eva\" icon=\"more-vertical-outline\"></nb-icon>\n                </button>\n            </div>\n        </div>\n    </nb-card-body>\n</nb-card>\n\n<nb-card *ngIf=\"mode==fileCardModes.SMALL_CARD\" class=\"file-card-small mb-0\" [id]=\"id\">\n    <nb-card-body>\n        <div class=\"row w-100 justify-content-end info-container\" *ngIf=\"menuItems.length>0\">\n            <div class=\"file-informations\">\n                <button nbButton ghost shape=\"round\" [nbContextMenu]=\"menuItems\" [nbContextMenuTag]=\"menuId\"\n                    size=\"small\">\n                    <nb-icon pack=\"eva\" icon=\"more-vertical-outline\"></nb-icon>\n                </button>\n            </div>\n        </div>\n        <div class=\"row w-100 m-0 justify-content-center\">\n            <div class=\"file-icon\">\n                <i [ngClass]=\"extension.icon\" [style]=\"useBrandColors ? 'color: '+extension.color:''\"></i>\n            </div>\n        </div>\n        <div class=\"row w-100 m-0 justify-content-center\">\n            <div class=\"file-name\">\n                {{fileData.filename}}\n            </div>\n        </div>\n    </nb-card-body>\n</nb-card>", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .file-card nb-card-body{overflow-x:hidden}:host .file-card .file-icon{padding:1.5rem;background-color:var(--color-basic-transparent-200);clip-path:polygon(0 0,0 100%,100% 100%,100% 25%,75% 0);border-top-left-radius:.5rem;border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem;width:max-content;margin-bottom:.5rem}:host .file-card .file-icon i{color:var(--color-basic-600);font-size:25px}:host .file-card .file-name{width:max-content;font-weight:600;font-size:small;overflow-wrap:break-word}:host .file-card .file-actions{width:max-content}:host .file-card .file-informations{width:max-content;position:absolute;top:-5px;right:-30px}:host .file-card .info-container{position:relative;height:10px}:host .file-card .line{padding:.5rem;border-bottom:2px solid var(--color-basic-transparent-200)}:host .file-card .file-size-label{font-weight:600;font-size:smaller}:host .file-card .label{font-weight:600;font-size:small;word-break:break-all}:host .file-card nb-card-back nb-card nb-card-footer{border:none;padding-top:0}:host .file-table-card nb-card-body{padding:.5rem}:host .file-table-card .file-name{width:max-content;font-weight:600;font-size:small;overflow-wrap:break-word}:host .file-table-card .file-icon{padding:.5rem;background-color:var(--color-basic-transparent-200);clip-path:polygon(0 0,0 100%,100% 100%,100% 25%,75% 0);border-top-left-radius:.3rem;border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;width:max-content}:host .file-table-card .file-icon i{color:var(--color-basic-600);font-size:15px}:host .file-row-card nb-card-body{padding:.5rem}:host .file-row-card .file-name{width:max-content;font-weight:600;font-size:small;overflow-wrap:break-word}:host .file-row-card .file-icon{padding:.5rem;background-color:var(--color-basic-transparent-200);clip-path:polygon(0 0,0 100%,100% 100%,100% 25%,75% 0);border-top-left-radius:.3rem;border-bottom-left-radius:.3rem;border-bottom-right-radius:.3rem;width:max-content;margin-left:.5rem;margin-right:.5rem}:host .file-row-card .file-icon i{color:var(--color-basic-600);font-size:15px}:host .file-row-card .black-content{font-weight:600;font-size:small}:host .file-row-card .label{font-weight:600;font-size:small;word-break:break-all}:host .w-max-content{width:max-content}:host .file-card-small nb-card-body{overflow-x:hidden}:host .file-card-small .file-icon{padding:1rem;background-color:var(--color-basic-transparent-200);clip-path:polygon(0 0,0 100%,100% 100%,100% 25%,75% 0);border-top-left-radius:.5rem;border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem;width:max-content;margin-bottom:.5rem}:host .file-card-small .file-icon i{color:var(--color-basic-600);font-size:25px}:host .file-card-small .file-name{width:max-content;font-weight:600;font-size:small;overflow-wrap:break-word}:host .file-card-small .file-actions{width:max-content}:host .file-card-small .file-informations{width:max-content;position:absolute;top:-5px;right:-30px}:host .file-card-small .info-container{position:relative;height:10px}:host .file-card-small .line{padding:.5rem;border-bottom:2px solid var(--color-basic-transparent-200)}:host .file-card-small .file-size-label{font-weight:600;font-size:smaller}:host .file-card-small .label{font-weight:600;font-size:small;word-break:break-all}:host .file-card-small nb-card-back nb-card nb-card-footer{border:none;padding-top:0}:host .file-card-small .flip-container .file-actions{position:absolute;left:0;top:10px}.break{flex-basis:100%;height:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NbMenuService }, { type: i1$1.HttpClient }, { type: TranslationService }]; }, propDecorators: { canDownload: [{
                type: Input
            }], canPreview: [{
                type: Input
            }], canDelete: [{
                type: Input
            }], deleteTitle: [{
                type: Input
            }], previewTitle: [{
                type: Input
            }], downloadTitle: [{
                type: Input
            }], custumFileActions: [{
                type: Input
            }], sizeTitle: [{
                type: Input
            }], detailsEnabled: [{
                type: Input
            }], authorTitle: [{
                type: Input
            }], filenameTitle: [{
                type: Input
            }], extensionTitle: [{
                type: Input
            }], dateTitle: [{
                type: Input
            }], mode: [{
                type: Input
            }], useCustomPreview: [{
                type: Input
            }], useCustomDownload: [{
                type: Input
            }], fileFromServer: [{
                type: Input
            }], serverEndpoint: [{
                type: Input
            }], keyAttribute: [{
                type: Input
            }], bytesAttribute: [{
                type: Input
            }], formatDate: [{
                type: Input
            }], dateFromat: [{
                type: Input
            }], useBrandColors: [{
                type: Input
            }], fileData: [{
                type: Input
            }], fileMenuItemClick: [{
                type: Output
            }], revealCard: [{
                type: ViewChild,
                args: [NbRevealCardComponent]
            }] } });

const strings = [
    // ------------------------------------------- GRID STRINGS ----------------------------------
    { key: 'gridDatepickerApplyBtn', value: 'Odaberi' },
    { key: 'gridDatepickerNow', value: 'Sada' },
    { key: 'gridDatepickerAmPm', value: 'AM PM' },
    { key: 'gridDatepickerHours', value: 'Sati' },
    { key: 'gridDatepickerMinutes', value: 'Minute' },
    { key: 'gridDatepickerSeconds', value: 'Sekunde' },
    { key: 'gridSaveBtnText', value: 'Spremi' },
    { key: 'gridCancelBtnText', value: 'Odustani' },
    { key: 'gridActions', value: 'Akcije' },
    { key: 'gridNoData', value: 'Nema podataka za prikaz.' },
    { key: 'gridAddBtn', value: 'Dodaj novo' },
    { key: 'gridRefreshTooltip', value: 'Resetiranje filtera' },
    {
        key: 'gridExcelExportTooltip',
        value: 'Izvoz podataka iz tablice u Excel dokument',
    },
    { key: 'gridLoading', value: 'Učitavanje' },
    { key: 'gridEntriesPerPageTooltip', value: 'Broj zapisa po stranici' },
    { key: 'gridTableOrdNumber', value: 'Redni broj' },
    { key: 'gridSelectedRows', value: 'Odabrano redaka:' },
    { key: 'gridNewRecord', value: 'Novi zapis' },
    { key: 'gridEditRecord', value: 'Uređivanje zapisa' },
    { key: 'gridDeleteConfirmTitle', value: 'Jeste li sigurni?' },
    {
        key: 'gridDeleteConfirmText',
        value: 'Brisanje se ne može poništiti. Želite li nastaviti?',
    },
    { key: 'gridFilterShowAll', value: 'Prikaži sve' },
    { key: 'gridRequiredTooltip', value: 'Obavezno polje' },
    { key: 'gridSort', value: 'SORTIRANJE' },
    { key: 'gridSortAsc', value: 'Sortiraj uzlazno' },
    { key: 'gridSortDesc', value: 'Sortiraj silazno' },
    { key: 'gridDock', value: 'Zaključaj' },
    { key: 'gridUndock', value: 'Otključaj' },
    { key: 'gridOther', value: 'OSTALO' },
    { key: 'gridEditTooltip', value: 'Uredi' },
    { key: 'gridDeleteTooltip', value: 'Obriši' },
    { key: 'gridGrouping', value: 'GRUPIRANJE' },
    { key: 'gridUngroup', value: 'Razgrupiraj' },
    { key: 'gridGroup', value: 'Grupiraj' },
    { key: 'gridGroupCount', value: 'Broj zapisa' },
    {
        key: 'gridExportPdfTooltip',
        value: 'Izvoz podataka iz tablice u PDF dokument',
    },
    { key: 'gridTableYes', value: 'da' },
    { key: 'gridTableNo', value: 'ne' },
    // ------------------------------------------- FILE CARD STRINGS --------------------------------
    { key: 'fileDelete', value: 'Obriši' },
    { key: 'filePreview', value: 'Pregledaj' },
    { key: 'fileDownload', value: 'Preuzmi' },
    { key: 'fileSize', value: 'Veličina' },
    { key: 'fileAuthor', value: 'Autor' },
    { key: 'fileName', value: 'Naziv' },
    { key: 'fileExtension', value: 'Vrsta' },
    { key: 'fileDate', value: 'Stvoreno' },
    // ------------------------------------------- FILEPICKER STRINGS --------------------------------
    { key: 'filepickerEmpty', value: 'Dovuci ovdje' },
    { key: 'filepickerButton', value: 'ili odaberi datoteku' },
    { key: 'filepickerMaxFiles', value: 'Maksmalan broj datoteka: ' },
    { key: 'filepickerAllowedFiles', value: 'Dopuštene vrste datoteka: ' },
    {
        key: 'filepickerMaxFilesWarning',
        value: 'Dosegli ste maksimalan broj datoteka ',
    },
    { key: 'filepickerAccept', value: '*' },
    // ------------------------------------------ PROGRESS BAR SPINNER STRINGS --------------------------------
    { key: 'psLoading', value: 'Učitavanje...' },
    // ------------------------------------------ SCHEDULE STRINGS --------------------------------
    { key: 'schedulePreviousMonth', value: 'Prethodni mjesec' },
    { key: 'scheduleNextMonth', value: 'Sljedeći mjesec' },
    { key: 'scheduleTodayBtn', value: 'Danas' },
    { key: 'scheduleTodayBtnTooltip', value: 'Idi na današnji dan' },
    { key: 'scheduleDay', value: 'Dan' },
    { key: 'scheduleWeek', value: 'Tjedan' },
    { key: 'scheduleMonth', value: 'Mjesec' },
    { key: 'scheduleStart', value: 'Početak' },
    { key: 'scheduleEnd', value: 'Završetak' },
    { key: 'scheduleTitle', value: 'Naziv' },
    { key: 'scheduleDesc', value: 'Opis' },
    { key: 'scheduleAddNewBtn', value: 'Novi događaj' },
    { key: 'scheduleAddNewBtnTooltip', value: 'Dodaj novi događaj' },
    //------------------------------------------------ SELECT GRID STRINGS ----------------------------------------------------------------
    { key: 'sgPlaceholder', value: 'Odaberite' },
    // -------------------------------- TAGS AUTOCOMPLETE STRINGS ----------------------------------------------------------------
    { key: 'taEmptyPlaceholder', value: 'Odaberite...' },
    { key: 'taInputPlaceholder', value: 'Pretraživanje' },
    { key: 'taClearTooltip', value: 'Poništavanje odabira' },
    // ---------------------------------- TEXT EDITOR STRINGS -----------------------------
    { key: 'editorTypeText', value: 'Upiši tekst' },
];

class ProgressbarSpinnerComponent {
    // ----------------------------------------------------- COMPONENT CONSTRUCTION ----------------------------------------------
    constructor(_translationService) {
        this._translationService = _translationService;
        // ----------------------------------------------------- PRIVATE FIELDS ------------------------------------------------------
        // ----------------------------------------------------- PUBLIC FIELDS -------------------------------------------------------
        this.id = 'progressbar-spinner-' + makeId(15); // unique component id
        // ----------------------------------------------------- INPUTS --------------------------------------------------------------
        this.loading = false; // shows/hides progressbar spinner
        this.status = PROGRESSBAR_SPINNER_CONF.status; // status color of progressbar and spinner
        this.size = 'large'; // size of progressbar and spinner
        this.message = this._translationService.translate('psLoading'); // spinner message, empty string disabled message
        this.value = 0; // value of progressbar
        this.displayValue = false; // shows/hides percentage indicator on progressbar
        this.progressbarSize = PROGRESSBAR_SPINNER_CONF.progressbarSize; // class for progressbar size, bootstrap values (ex. col-md-10, col-3, col-sm-4)
    }
    ngOnInit() {
        // check if translations are already loaded (from external app)
        if (!this._translationService.isTranslationsLoaded()) {
            this._translationService.setTranslations(strings);
        }
    }
}
ProgressbarSpinnerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ProgressbarSpinnerComponent, deps: [{ token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ProgressbarSpinnerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ProgressbarSpinnerComponent, selector: "ngx-progressbar-spinner", inputs: { loading: "loading", status: "status", size: "size", message: "message", value: "value", displayValue: "displayValue", progressbarSize: "progressbarSize" }, ngImport: i0, template: "<nb-card class=\"progressbar-spinner-card\" [nbSpinner]=\"loading\" [nbSpinnerStatus]=\"status\" [nbSpinnerSize]=\"size\"\n    [id]=\"id\" *ngIf=\"loading\" [nbSpinnerMessage]=\"message\">\n    <div class=\"progressbar-container h-100 w-100  m-0 row justify-content-center d-flex align-items-center\">\n        <div [ngClass]=\"progressbarSize\">\n            <nb-progress-bar class=\"progress-margin\" [displayValue]=\"displayValue\" [value]=\"value\" [status]=\"status\">\n            </nb-progress-bar>\n        </div>\n    </div>\n</nb-card>", styles: [":host{position:absolute;top:0;left:0;height:-webkit-fill-available;width:-webkit-fill-available}.progressbar-spinner-card{height:100%;width:100%;margin:0;padding:0;background-color:transparent;border:none}.progressbar-spinner-card .progress-margin{margin-top:6rem}\n"], dependencies: [{ kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NbSpinnerDirective, selector: "[nbSpinner]", inputs: ["nbSpinnerMessage", "nbSpinnerStatus", "nbSpinnerSize", "nbSpinner"] }, { kind: "component", type: i1.NbProgressBarComponent, selector: "nb-progress-bar", inputs: ["value", "status", "size", "displayValue"] }, { kind: "component", type: i1.NbCardComponent, selector: "nb-card", inputs: ["size", "status", "accent"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ProgressbarSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-progressbar-spinner', template: "<nb-card class=\"progressbar-spinner-card\" [nbSpinner]=\"loading\" [nbSpinnerStatus]=\"status\" [nbSpinnerSize]=\"size\"\n    [id]=\"id\" *ngIf=\"loading\" [nbSpinnerMessage]=\"message\">\n    <div class=\"progressbar-container h-100 w-100  m-0 row justify-content-center d-flex align-items-center\">\n        <div [ngClass]=\"progressbarSize\">\n            <nb-progress-bar class=\"progress-margin\" [displayValue]=\"displayValue\" [value]=\"value\" [status]=\"status\">\n            </nb-progress-bar>\n        </div>\n    </div>\n</nb-card>", styles: [":host{position:absolute;top:0;left:0;height:-webkit-fill-available;width:-webkit-fill-available}.progressbar-spinner-card{height:100%;width:100%;margin:0;padding:0;background-color:transparent;border:none}.progressbar-spinner-card .progress-margin{margin-top:6rem}\n"] }]
        }], ctorParameters: function () { return [{ type: TranslationService }]; }, propDecorators: { loading: [{
                type: Input
            }], status: [{
                type: Input
            }], size: [{
                type: Input
            }], message: [{
                type: Input
            }], value: [{
                type: Input
            }], displayValue: [{
                type: Input
            }], progressbarSize: [{
                type: Input
            }] } });

class TagsAutocompleteComponent {
    // ----------------------------------------------------- COMPONENT CONSTRUCTION --------------------------------------------------
    constructor(translationService) {
        this.translationService = translationService;
        this.clickInsideComponent = false;
        // ----------------------------------------------------- PRIVATE FIELDS ----------------------------------------------------------
        this._source = [];
        this._selectedKeys = [];
        this.selectedKeysChange = new EventEmitter();
        this.selectedItems = []; // current selected items
        this.keyAttribute = undefined; // name of key attribute for data selection
        this.attributesToShow = []; // names of attributes to show in option
        this.attributesToShowInTag = []; // names of attributes to show in tag
        this.attributesToFilter = []; // names of attributes to filter data
        this.emptyPlaceholder = this.translationService.translate('taEmptyPlaceholder'); // empty autocomplete placeholder
        this.tagStatus = 'basic';
        this.tagAppereance = 'outline';
        this.inputWidthClass = 'col-md-12'; // width class for autocomplete input field
        this.inputPlaceholder = this.translationService.translate('taInputPlaceholder'); // placeholder for empty input field
        this.clearEnabled = true; // shows/hides clear button
        this.clearBtnTooltip = this.translationService.translate('taClearTooltip'); // clear button tooltip on hover
        this.expanded = false; // expandes/collapses autocomplete element
        this.displayArrow = false; // shows/hides arrow
        this.displayNumSelected = false; // shows/hides number of selected items
        this.displayDots = false; // shows/hides dots indicator for more
        this.multiple = true; // multiple select or singe
        this.floatingDroopDown = true; // displays dropdown as floating select box otherwise it expands content as an accordion
        this.disabled = false; // enables/disables control
        // ----------------------------------------------------- PUBLIC FIELDS -----------------------------------------------------------
        this.headerOverflown = false; // indicates if header of autocomplete has overflow
        this.id = 'tag-autocomplete-' + makeId(15); // unique component id
        this.filteredOptions$ = of(this.source); // filtered options for autocomplete
        // ----------------------------------------------------- OUTPUTS -----------------------------------------------------------------
        this.onSelectionChanged = new EventEmitter(); // fires on autocomplete selection
        this.onOptionRemoved = new EventEmitter(); // fires on tag remove
        this.onSelectionCleared = new EventEmitter(); // fires on clear button click
    }
    clickInside() {
        this.clickInsideComponent = true;
    }
    clickout() {
        if (!this.clickInsideComponent) {
            if (this.floatingDroopDown)
                this.accordionItem.close();
        }
        this.clickInsideComponent = false;
    }
    // ----------------------------------------------------- INPUTS ------------------------------------------------------------------
    set source(value) {
        this._source = value;
        setTimeout(() => {
            this.syncSelection();
        }, 100);
    }
    get source() {
        return this._source;
    }
    set selectedKeys(value) {
        this._selectedKeys = value;
        this.selectedKeysChange.emit(this._selectedKeys);
    } // current selected keys, only if keyAttribute is set
    get selectedKeys() {
        return this._selectedKeys;
    }
    ngOnInit() {
        // check if translations are already loaded (from external app)
        if (!this.translationService.isTranslationsLoaded()) {
            this.translationService.setTranslations(strings);
        }
        this.syncSelection();
        // await for div to resize
        setTimeout(() => {
            this.headerOverflown = this.checkOverflow();
        }, 100);
    }
    ngAfterViewInit() {
        var _a, _b;
        if (!this.displayArrow)
            (_a = document
                .querySelector('#' + this.id + ' .expansion-indicator')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
        else
            (_b = document
                .querySelector('#' + this.id + ' .expansion-indicator')) === null || _b === void 0 ? void 0 : _b.classList.add('status-basic');
    }
    // ----------------------------------------------------- PRIVATE METHODS ---------------------------------------------------------
    syncSelection() {
        if (this.selectedKeys == undefined)
            this.selectedKeys = [];
        else if (!Array.isArray(this.selectedKeys))
            this.selectedKeys = [this.selectedKeys];
        if (this.selectedItems || this.selectedKeys) {
            // sync selectedItems and selectedKeys
            if (this.keyAttribute) {
                // if both selectedItems and selectedKeys are set --> sync by selectedItems
                if (this.selectedItems.length > 0 && this.selectedKeys.length > 0) {
                    this.selectedKeys = this.selectedItems.map((x) => x[this.keyAttribute]);
                }
                // if only selectedKeys is set --> sync by key
                else if (this.selectedKeys.length > 0 &&
                    this.selectedItems.length == 0) {
                    this.selectedItems = this.source.filter((x) => this.selectedKeys.includes(x[this.keyAttribute]));
                }
                // if only selectedItems is set --> sync by items
                else if (this.selectedItems.length > 0 &&
                    this.selectedKeys.length == 0) {
                    this.selectedKeys = this.selectedItems.map((x) => x[this.keyAttribute]);
                }
            }
        }
        else {
            this.clear();
        }
    }
    filter(value) {
        const filterValue = value.toLowerCase();
        return this.source.filter((o) => Object.keys(o).some((k) => this.attributesToFilter.includes(k) &&
            o[k].toString().toLowerCase().includes(filterValue.toLowerCase())));
    }
    getFilteredOptions(value) {
        return of(value).pipe(map((filterString) => this.filter(filterString)));
    }
    // ----------------------------------------------------- PUBLIC METHODS ----------------------------------------------------------
    getTagText(tag) {
        var text = '';
        this.attributesToShowInTag.forEach((attribute) => {
            text = text + ' ' + tag[attribute];
        });
        return text;
    }
    getOptionText(option) {
        var text = '';
        this.attributesToShow.forEach((attribute) => {
            text = text + ' ' + option[attribute];
        });
        return text;
    }
    clearInputValue() {
        this.input.nativeElement.value = '';
    }
    showClearButton() {
        if (this.input) {
            if (this.input.nativeElement.value)
                return true;
            else
                return false;
        }
        else
            return false;
    }
    checkOverflow() {
        if (this.headerTags) {
            return (this.headerTags.nativeElement.scrollHeight >
                this.headerTags.nativeElement.clientHeight ||
                this.headerTags.nativeElement.scrollWidth >
                    this.headerTags.nativeElement.clientWidth);
        }
        else
            return false;
    }
    getSelectedItems() {
        return this.selectedItems;
    }
    getSelectedKeys() {
        return this.selectedKeys;
    }
    clear() {
        this.selectedItems = [];
        this.selectedKeys = [];
        this.clearInputValue();
        this.onSelectionCleared.emit(true);
    }
    setDataSource(source) {
        this.source = source;
        this.filteredOptions$ = of(this.source);
    }
    // ----------------------------------------------------- DOM LISTENERS -----------------------------------------------------------
    onChange() {
        this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
    }
    onSelectionChange($event) {
        this.clickInsideComponent = true;
        this.input.nativeElement.value = this.getOptionText($event);
        if (this.multiple) {
            if (!this.selectedItems.includes($event))
                this.selectedItems.push($event);
            if (this.keyAttribute) {
                if (!this.selectedKeys.includes($event[this.keyAttribute]))
                    this.selectedKeys.push($event[this.keyAttribute]);
                this.onSelectionChanged.emit({
                    selectedItem: $event,
                    selectedItemKey: $event[this.keyAttribute],
                    currentSelectedItems: this.selectedItems,
                    currentSelectedKeys: this.selectedKeys,
                });
            }
            else
                this.onSelectionChanged.emit({
                    selectedItem: $event,
                    currentSelectedItems: this.selectedItems,
                });
        }
        else {
            this.selectedItems = [];
            this.selectedItems.push($event);
            if (this.keyAttribute) {
                this.selectedKeys = [];
                this.selectedKeys.push($event[this.keyAttribute]);
                this.onSelectionChanged.emit({
                    selectedItem: $event,
                    selectedItemKey: $event[this.keyAttribute],
                    currentSelectedItems: this.selectedItems,
                    currentSelectedKeys: this.selectedKeys,
                });
            }
            else
                this.onSelectionChanged.emit({
                    selectedItem: $event,
                    currentSelectedItems: this.selectedItems,
                });
        }
        // await for div to resize
        setTimeout(() => {
            this.headerOverflown = this.checkOverflow();
        }, 100);
    }
    onTagRemove(tag) {
        this.selectedItems.splice(this.selectedItems.indexOf(tag), 1);
        if (this.keyAttribute) {
            this.selectedKeys.splice(this.selectedKeys.indexOf(tag[this.keyAttribute]), 1);
            this.onOptionRemoved.emit({
                removedItem: tag,
                removedItemKey: tag[this.keyAttribute],
                currentSelectedItems: this.selectedItems,
                currentSelectedKeys: this.selectedKeys,
            });
        }
        else
            this.onOptionRemoved.emit({
                removedItem: tag,
                currentSelectedItems: this.selectedItems,
            });
        // await for div to resize
        setTimeout(() => {
            this.headerOverflown = this.checkOverflow();
        }, 100);
    }
}
TagsAutocompleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TagsAutocompleteComponent, deps: [{ token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
TagsAutocompleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TagsAutocompleteComponent, selector: "ngx-tags-autocomplete", inputs: { source: "source", selectedKeys: "selectedKeys", selectedItems: "selectedItems", keyAttribute: "keyAttribute", attributesToShow: "attributesToShow", attributesToShowInTag: "attributesToShowInTag", attributesToFilter: "attributesToFilter", emptyPlaceholder: "emptyPlaceholder", tagStatus: "tagStatus", tagAppereance: "tagAppereance", inputWidthClass: "inputWidthClass", inputPlaceholder: "inputPlaceholder", clearEnabled: "clearEnabled", clearBtnTooltip: "clearBtnTooltip", expanded: "expanded", displayArrow: "displayArrow", displayNumSelected: "displayNumSelected", displayDots: "displayDots", multiple: "multiple", floatingDroopDown: "floatingDroopDown", disabled: "disabled" }, outputs: { selectedKeysChange: "selectedKeysChange", onSelectionChanged: "onSelectionChanged", onOptionRemoved: "onOptionRemoved", onSelectionCleared: "onSelectionCleared" }, host: { listeners: { "click": "clickInside()", "document:click": "clickout()" } }, viewQueries: [{ propertyName: "input", first: true, predicate: ["autoInput"], descendants: true }, { propertyName: "headerTags", first: true, predicate: ["headerTags"], descendants: true }, { propertyName: "accordionItem", first: true, predicate: ["tagsAutocompleteAccordionItem"], descendants: true }], ngImport: i0, template: "<nb-accordion [id]=\"id\" class=\"tags-autocomplete\">\n  <nb-accordion-item\n    [disabled]=\"disabled\"\n    [expanded]=\"expanded\"\n    #tagsAutocompleteAccordionItem\n  >\n    <nb-accordion-item-header [ngClass]=\"disabled ? 'disabled' : ''\">\n      <div\n        class=\"placeholder-accordion\"\n        *ngIf=\"selectedItems.length == 0; else showTags\"\n      >\n        {{ emptyPlaceholder }}\n      </div>\n      <ng-template #showTags>\n        <div class=\"header-tags-container d-flex w-100\">\n          <div\n            class=\"header-tags\"\n            #headerTags\n            [ngClass]=\"displayArrow ? 'col-11' : 'col'\"\n          >\n            <nb-tag-list>\n              <nb-tag\n                *ngFor=\"let tag of selectedItems\"\n                size=\"small\"\n                [text]=\"getTagText(tag)\"\n                [status]=\"tagStatus\"\n                [appearance]=\"tagAppereance\"\n              ></nb-tag>\n            </nb-tag-list>\n          </div>\n          <div\n            *ngIf=\"headerOverflown && displayDots\"\n            class=\"tag-overflown pt-0 pb-0 ps-2 pe-3\"\n          >\n            <nb-icon\n              pack=\"eva\"\n              icon=\"more-horizontal-outline\"\n              status=\"basic\"\n            ></nb-icon>\n          </div>\n          <div class=\"tags-sum\" *ngIf=\"displayNumSelected\">\n            <nb-tag\n              [appearance]=\"'filled'\"\n              size=\"small\"\n              [status]=\"tagStatus\"\n              [text]=\"selectedItems.length.toString()\"\n            >\n            </nb-tag>\n          </div>\n        </div>\n      </ng-template>\n    </nb-accordion-item-header>\n    <nb-accordion-item-body\n      [ngClass]=\"\n        floatingDroopDown ? 'tags-autocomplete-dropwdown-container' : ''\n      \"\n    >\n      <div class=\"tags-autocomplete-input-container row m-0 w-100\">\n        <div [ngClass]=\"inputWidthClass\" class=\"p-0\">\n          <nb-form-field>\n            <nb-icon pack=\"eva\" icon=\"search-outline\" nbPrefix></nb-icon>\n            <input\n              #autoInput\n              size=\"small\"\n              nbInput\n              fullWidth\n              type=\"text\"\n              (input)=\"onChange()\"\n              shape=\"round\"\n              [placeholder]=\"inputPlaceholder\"\n              [nbAutocomplete]=\"auto\"\n            />\n            <button\n              nbButton\n              nbSuffix\n              (click)=\"clearInputValue()\"\n              ghost\n              shape=\"round\"\n              *ngIf=\"showClearButton()\"\n            >\n              <nb-icon pack=\"eva\" icon=\"close-outline\"></nb-icon>\n            </button>\n          </nb-form-field>\n          <nb-autocomplete #auto (selectedChange)=\"onSelectionChange($event)\">\n            <nb-option\n              *ngFor=\"let option of filteredOptions$ | async\"\n              [value]=\"option\"\n            >\n              {{ getOptionText(option) }}\n            </nb-option>\n          </nb-autocomplete>\n        </div>\n      </div>\n      <div class=\"tags-autocomplete-tags-container row ms-0 me-0 w-100 mt-2\">\n        <nb-tag-list class=\"p-0\">\n          <nb-tag\n            *ngFor=\"let tag of selectedItems\"\n            [text]=\"getTagText(tag)\"\n            removable\n            [status]=\"tagStatus\"\n            [appearance]=\"tagAppereance\"\n            size=\"small\"\n            (remove)=\"onTagRemove(tag)\"\n          ></nb-tag>\n        </nb-tag-list>\n      </div>\n      <div class=\"accordion-footer mt-2\" *ngIf=\"clearEnabled\">\n        <div class=\"line w-100\"></div>\n        <div class=\"w-100 d-flex justify-content-end pt-2\">\n          <button\n            nbButton\n            ghost\n            shape=\"round\"\n            (click)=\"clear()\"\n            size=\"small\"\n            [nbTooltip]=\"clearBtnTooltip\"\n          >\n            <nb-icon pack=\"eva\" icon=\"refresh-outline\"></nb-icon>\n          </button>\n        </div>\n      </div>\n    </nb-accordion-item-body>\n  </nb-accordion-item>\n</nb-accordion>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .tags-autocomplete{box-shadow:none!important;position:relative}:host .tags-autocomplete .placeholder-accordion{color:var(--input-basic-placeholder-text-color);font-family:var(--input-placeholder-text-font-family);font-size:var(--input-medium-placeholder-text-font-size);font-weight:var(--input-medium-placeholder-text-font-weight);line-height:var(--tag-medium-text-line-height);padding:.12rem}:host .tags-autocomplete .tags-autocomplete-dropwdown-container{z-index:1000;position:absolute;top:40px;background-color:var(--card-background-color);width:100%}:host .tags-autocomplete nb-accordion-item-header{padding:.32rem 1rem;background-color:var(--input-basic-background-color);border-color:var(--input-basic-border-color);border-style:var(--input-border-style);border-width:var(--input-border-width);border-radius:var(--input-rectangle-border-radius);color:var(--input-basic-text-color);font-family:var(--input-text-font-family);font-size:var(--input-medium-text-font-size);font-weight:var(--input-medium-text-font-weight);line-height:var(--input-medium-text-line-height)}:host .tags-autocomplete nb-accordion-item-header.disabled{background-color:var(--input-basic-disabled-background-color);border-color:var(--input-basic-disabled-border-color);color:var(--input-basic-disabled-text-color)}:host .tags-autocomplete nb-accordion-item-header.disabled .placeholder-accordion{color:var(--input-basic-disabled-placeholder-text-color)}:host .tags-autocomplete ::ng-deep nb-accordion-item-body .item-body{padding:.5rem 1rem;border-color:var(--input-basic-border-color);border-style:var(--input-border-style);border-width:var(--input-border-width)}:host .tags-autocomplete .header-tags-container{padding:0;margin:0}:host .tags-autocomplete .header-tags-container .header-tags{height:1.8rem;overflow:hidden}:host .tags-autocomplete .header-tags-container .header-tags .nb-tag-list-tags-wrapper{margin:0}:host .tags-autocomplete .header-tags-container .header-tags .nb-tag-list-tags-wrapper nb-tag{margin-top:0;margin-left:0}:host .tags-autocomplete .header-tags-container .tag-overflown{width:max-content;display:flex;justify-content:center;align-items:center}:host .tags-autocomplete .header-tags-container .tags-sum{width:max-content}:host .tags-autocomplete .line{border-bottom:2px solid var(--input-basic-border-color)}\n"], dependencies: [{ kind: "component", type: i1.NbTagComponent, selector: "nb-tag", inputs: ["text", "selected", "removable", "appearance", "status", "size", "role"], outputs: ["remove", "selectedChange"], exportAs: ["nbTag"] }, { kind: "component", type: i1.NbTagListComponent, selector: "nb-tag-list", inputs: ["size", "tabIndex", "role", "multiple"], outputs: ["tagRemove"], exportAs: ["nbTagList"] }, { kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i1.NbTooltipDirective, selector: "[nbTooltip]", inputs: ["nbTooltip", "nbTooltipPlacement", "nbTooltipAdjustment", "nbTooltipClass", "nbTooltipIcon", "nbTooltipStatus", "nbTooltipTrigger", "nbTooltipOffset", "nbTooltipDisabled"], outputs: ["nbTooltipShowStateChange"], exportAs: ["nbTooltip"] }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.NbOptionComponent, selector: "nb-option", inputs: ["value", "disabled"], outputs: ["selectionChange"] }, { kind: "directive", type: i1.NbInputDirective, selector: "input[nbInput],textarea[nbInput]", inputs: ["fieldSize", "status", "shape", "fullWidth"] }, { kind: "component", type: i1.NbFormFieldComponent, selector: "nb-form-field" }, { kind: "directive", type: i1.NbPrefixDirective, selector: "[nbPrefix]" }, { kind: "directive", type: i1.NbSuffixDirective, selector: "[nbSuffix]" }, { kind: "component", type: i1.NbAutocompleteComponent, selector: "nb-autocomplete", inputs: ["handleDisplayFn", "size", "activeFirst", "optionsListClass", "optionsPanelClass", "optionsWidth"], outputs: ["selectedChange"] }, { kind: "directive", type: i1.NbAutocompleteDirective, selector: "input[nbAutocomplete]", inputs: ["nbAutocomplete", "overlayOffset", "scrollStrategy", "customOverlayHost"] }, { kind: "component", type: i1.NbAccordionComponent, selector: "nb-accordion", inputs: ["multi"] }, { kind: "component", type: i1.NbAccordionItemComponent, selector: "nb-accordion-item", inputs: ["collapsed", "expanded", "disabled"], outputs: ["collapsedChange"] }, { kind: "component", type: i1.NbAccordionItemHeaderComponent, selector: "nb-accordion-item-header" }, { kind: "component", type: i1.NbAccordionItemBodyComponent, selector: "nb-accordion-item-body" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TagsAutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-tags-autocomplete', template: "<nb-accordion [id]=\"id\" class=\"tags-autocomplete\">\n  <nb-accordion-item\n    [disabled]=\"disabled\"\n    [expanded]=\"expanded\"\n    #tagsAutocompleteAccordionItem\n  >\n    <nb-accordion-item-header [ngClass]=\"disabled ? 'disabled' : ''\">\n      <div\n        class=\"placeholder-accordion\"\n        *ngIf=\"selectedItems.length == 0; else showTags\"\n      >\n        {{ emptyPlaceholder }}\n      </div>\n      <ng-template #showTags>\n        <div class=\"header-tags-container d-flex w-100\">\n          <div\n            class=\"header-tags\"\n            #headerTags\n            [ngClass]=\"displayArrow ? 'col-11' : 'col'\"\n          >\n            <nb-tag-list>\n              <nb-tag\n                *ngFor=\"let tag of selectedItems\"\n                size=\"small\"\n                [text]=\"getTagText(tag)\"\n                [status]=\"tagStatus\"\n                [appearance]=\"tagAppereance\"\n              ></nb-tag>\n            </nb-tag-list>\n          </div>\n          <div\n            *ngIf=\"headerOverflown && displayDots\"\n            class=\"tag-overflown pt-0 pb-0 ps-2 pe-3\"\n          >\n            <nb-icon\n              pack=\"eva\"\n              icon=\"more-horizontal-outline\"\n              status=\"basic\"\n            ></nb-icon>\n          </div>\n          <div class=\"tags-sum\" *ngIf=\"displayNumSelected\">\n            <nb-tag\n              [appearance]=\"'filled'\"\n              size=\"small\"\n              [status]=\"tagStatus\"\n              [text]=\"selectedItems.length.toString()\"\n            >\n            </nb-tag>\n          </div>\n        </div>\n      </ng-template>\n    </nb-accordion-item-header>\n    <nb-accordion-item-body\n      [ngClass]=\"\n        floatingDroopDown ? 'tags-autocomplete-dropwdown-container' : ''\n      \"\n    >\n      <div class=\"tags-autocomplete-input-container row m-0 w-100\">\n        <div [ngClass]=\"inputWidthClass\" class=\"p-0\">\n          <nb-form-field>\n            <nb-icon pack=\"eva\" icon=\"search-outline\" nbPrefix></nb-icon>\n            <input\n              #autoInput\n              size=\"small\"\n              nbInput\n              fullWidth\n              type=\"text\"\n              (input)=\"onChange()\"\n              shape=\"round\"\n              [placeholder]=\"inputPlaceholder\"\n              [nbAutocomplete]=\"auto\"\n            />\n            <button\n              nbButton\n              nbSuffix\n              (click)=\"clearInputValue()\"\n              ghost\n              shape=\"round\"\n              *ngIf=\"showClearButton()\"\n            >\n              <nb-icon pack=\"eva\" icon=\"close-outline\"></nb-icon>\n            </button>\n          </nb-form-field>\n          <nb-autocomplete #auto (selectedChange)=\"onSelectionChange($event)\">\n            <nb-option\n              *ngFor=\"let option of filteredOptions$ | async\"\n              [value]=\"option\"\n            >\n              {{ getOptionText(option) }}\n            </nb-option>\n          </nb-autocomplete>\n        </div>\n      </div>\n      <div class=\"tags-autocomplete-tags-container row ms-0 me-0 w-100 mt-2\">\n        <nb-tag-list class=\"p-0\">\n          <nb-tag\n            *ngFor=\"let tag of selectedItems\"\n            [text]=\"getTagText(tag)\"\n            removable\n            [status]=\"tagStatus\"\n            [appearance]=\"tagAppereance\"\n            size=\"small\"\n            (remove)=\"onTagRemove(tag)\"\n          ></nb-tag>\n        </nb-tag-list>\n      </div>\n      <div class=\"accordion-footer mt-2\" *ngIf=\"clearEnabled\">\n        <div class=\"line w-100\"></div>\n        <div class=\"w-100 d-flex justify-content-end pt-2\">\n          <button\n            nbButton\n            ghost\n            shape=\"round\"\n            (click)=\"clear()\"\n            size=\"small\"\n            [nbTooltip]=\"clearBtnTooltip\"\n          >\n            <nb-icon pack=\"eva\" icon=\"refresh-outline\"></nb-icon>\n          </button>\n        </div>\n      </div>\n    </nb-accordion-item-body>\n  </nb-accordion-item>\n</nb-accordion>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .tags-autocomplete{box-shadow:none!important;position:relative}:host .tags-autocomplete .placeholder-accordion{color:var(--input-basic-placeholder-text-color);font-family:var(--input-placeholder-text-font-family);font-size:var(--input-medium-placeholder-text-font-size);font-weight:var(--input-medium-placeholder-text-font-weight);line-height:var(--tag-medium-text-line-height);padding:.12rem}:host .tags-autocomplete .tags-autocomplete-dropwdown-container{z-index:1000;position:absolute;top:40px;background-color:var(--card-background-color);width:100%}:host .tags-autocomplete nb-accordion-item-header{padding:.32rem 1rem;background-color:var(--input-basic-background-color);border-color:var(--input-basic-border-color);border-style:var(--input-border-style);border-width:var(--input-border-width);border-radius:var(--input-rectangle-border-radius);color:var(--input-basic-text-color);font-family:var(--input-text-font-family);font-size:var(--input-medium-text-font-size);font-weight:var(--input-medium-text-font-weight);line-height:var(--input-medium-text-line-height)}:host .tags-autocomplete nb-accordion-item-header.disabled{background-color:var(--input-basic-disabled-background-color);border-color:var(--input-basic-disabled-border-color);color:var(--input-basic-disabled-text-color)}:host .tags-autocomplete nb-accordion-item-header.disabled .placeholder-accordion{color:var(--input-basic-disabled-placeholder-text-color)}:host .tags-autocomplete ::ng-deep nb-accordion-item-body .item-body{padding:.5rem 1rem;border-color:var(--input-basic-border-color);border-style:var(--input-border-style);border-width:var(--input-border-width)}:host .tags-autocomplete .header-tags-container{padding:0;margin:0}:host .tags-autocomplete .header-tags-container .header-tags{height:1.8rem;overflow:hidden}:host .tags-autocomplete .header-tags-container .header-tags .nb-tag-list-tags-wrapper{margin:0}:host .tags-autocomplete .header-tags-container .header-tags .nb-tag-list-tags-wrapper nb-tag{margin-top:0;margin-left:0}:host .tags-autocomplete .header-tags-container .tag-overflown{width:max-content;display:flex;justify-content:center;align-items:center}:host .tags-autocomplete .header-tags-container .tags-sum{width:max-content}:host .tags-autocomplete .line{border-bottom:2px solid var(--input-basic-border-color)}\n"] }]
        }], ctorParameters: function () { return [{ type: TranslationService }]; }, propDecorators: { clickInside: [{
                type: HostListener,
                args: ['click']
            }], clickout: [{
                type: HostListener,
                args: ['document:click']
            }], input: [{
                type: ViewChild,
                args: ['autoInput']
            }], headerTags: [{
                type: ViewChild,
                args: ['headerTags']
            }], accordionItem: [{
                type: ViewChild,
                args: ['tagsAutocompleteAccordionItem']
            }], source: [{
                type: Input
            }], selectedKeys: [{
                type: Input
            }], selectedKeysChange: [{
                type: Output
            }], selectedItems: [{
                type: Input
            }], keyAttribute: [{
                type: Input
            }], attributesToShow: [{
                type: Input
            }], attributesToShowInTag: [{
                type: Input
            }], attributesToFilter: [{
                type: Input
            }], emptyPlaceholder: [{
                type: Input
            }], tagStatus: [{
                type: Input
            }], tagAppereance: [{
                type: Input
            }], inputWidthClass: [{
                type: Input
            }], inputPlaceholder: [{
                type: Input
            }], clearEnabled: [{
                type: Input
            }], clearBtnTooltip: [{
                type: Input
            }], expanded: [{
                type: Input
            }], displayArrow: [{
                type: Input
            }], displayNumSelected: [{
                type: Input
            }], displayDots: [{
                type: Input
            }], multiple: [{
                type: Input
            }], floatingDroopDown: [{
                type: Input
            }], disabled: [{
                type: Input
            }], onSelectionChanged: [{
                type: Output
            }], onOptionRemoved: [{
                type: Output
            }], onSelectionCleared: [{
                type: Output
            }] } });

class GridColumnFilter {
    constructor() {
        this._Show = true;
        this._Type = GRID_DATA_TYPE.TEXTBOX;
        this._DataSource = [];
        this._KeyExpression = '';
        this._DisplayExpression = '';
        this._ServerDataSource = false;
        this._ServerEndpoint = '';
        this._ServerMethod = '';
        this._ServerParams = {};
        this._ClearText = '';
        this._Min = undefined;
        this._Max = undefined;
        this._DatePickerType = GRID_DATE_PICKER.DATE;
        this._Format = 'dd.MM.yyyy';
        this._FilterDates = undefined;
        this._ShowNavigation = true;
        this._ShowWeekNumbers = false;
        this._SingleColumn = true;
        this._ShowSeconds = false;
        this._TwelveHoursFormat = true;
        this._TimeStep = EDITORS_CONF.timepickerStep;
        this._ApplyButtonText = '';
        this._CurrentTimeButtonText = '';
        this._ShowCurrentTimeButton = true;
        this._TimeText = '';
        this._HoursText = '';
        this._MinutesText = '';
        this._SecondsText = '';
        this._ShowFooter = true;
    }
    getTableSpecialFilter() {
        return this._Type;
    }
    getShow() {
        return this._Show;
    }
    Show(x) {
        this._Show = x;
        return this;
    }
    getDataSource() {
        return this._DataSource;
    }
    getKeyExpression() {
        return this._KeyExpression;
    }
    getDisplayExpression() {
        return this._DisplayExpression;
    }
    getServerDataSource() {
        return this._ServerDataSource;
    }
    getServerEndpoint() {
        return this._ServerEndpoint;
    }
    getServerMethod() {
        return this._ServerMethod;
    }
    getServerParams() {
        return this._ServerParams;
    }
    getClearText() {
        return this._ClearText;
    }
    getMin() {
        return this._Min;
    }
    getMax() {
        return this._Max;
    }
    getDatePickerType() {
        return this._DatePickerType;
    }
    getFormat() {
        return this._Format;
    }
    getFilterDates() {
        return this._FilterDates;
    }
    getShowNavigation() {
        return this._ShowNavigation;
    }
    getShowWeekNumbers() {
        return this._ShowWeekNumbers;
    }
    getSingleColumn() {
        return this._SingleColumn;
    }
    getShowSeconds() {
        return this._ShowSeconds;
    }
    getTwelveHoursFormat() {
        return this._TwelveHoursFormat;
    }
    getTimeStep() {
        return this._TimeStep;
    }
    getApplyButtonText() {
        return this._ApplyButtonText;
    }
    getCurrentTimeButtonText() {
        return this._CurrentTimeButtonText;
    }
    getShowCurrentTimeButton() {
        return this._ShowCurrentTimeButton;
    }
    getTimeText() {
        return this._TimeText;
    }
    getHoursText() {
        return this._HoursText;
    }
    getMinutesText() {
        return this._MinutesText;
    }
    getSecondsText() {
        return this._SecondsText;
    }
    getShowFooter() {
        return this._ShowFooter;
    }
}
class GridTextboxFilter extends GridColumnFilter {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.TEXTBOX;
    }
}
class GridSelectFilter extends GridColumnFilter {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.SELECT;
        this._ServerDataSource = false;
        this._ServerMethod = 'GET';
    }
    DataSource(x) {
        this._DataSource = x;
        return this;
    }
    KeyExpression(x) {
        this._KeyExpression = x;
        return this;
    }
    DisplayExpression(x) {
        this._DisplayExpression = x;
        return this;
    }
    ServerDataSource(x) {
        this._ServerDataSource = x;
        return this;
    }
    ServerEndpoint(x) {
        this._ServerEndpoint = x;
        return this;
    }
    ServerMethod(x) {
        this._ServerMethod = x;
        return this;
    }
    ServerParams(x) {
        this._ServerParams = x;
        return this;
    }
    ClearText(x) {
        this._ClearText = x;
        return this;
    }
}
class GridNumberBoxFilter extends GridColumnFilter {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.NUMBERBOX;
    }
    Min(x) {
        this._Min = x;
        return this;
    }
    Max(x) {
        this._Max = x;
        return this;
    }
}
class GridDateboxFilter extends GridColumnFilter {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.DATE_PICKER;
    }
    PickerType(x) {
        this._DatePickerType = x;
        return this;
    }
    Format(x) {
        this._Format = x;
        return this;
    }
    FilterDates(x) {
        this._FilterDates = x;
        return this;
    }
    ShowNavigation(x) {
        this._ShowNavigation = x;
        return this;
    }
    ShowWeekNumbers(x) {
        this._ShowWeekNumbers = x;
        return this;
    }
    SingleColumn(x) {
        this._SingleColumn = x;
        return this;
    }
    ShowSeconds(x) {
        this._ShowSeconds = x;
        return this;
    }
    TwelveHoursFormat(x) {
        this._TwelveHoursFormat = x;
        return this;
    }
    TimeStep(x) {
        this._TimeStep = x;
        return this;
    }
    ApplyButtonText(x) {
        this._ApplyButtonText = x;
        return this;
    }
    CurrentTimeButtonText(x) {
        this._CurrentTimeButtonText = x;
        return this;
    }
    ShowCurrentTimeButton(x) {
        this._ShowCurrentTimeButton = x;
        return this;
    }
    TimeText(x) {
        this._TimeText = x;
        return this;
    }
    HoursText(x) {
        this._HoursText = x;
        return this;
    }
    MinutesText(x) {
        this._MinutesText = x;
        return this;
    }
    SecondsText(x) {
        this._SecondsText = x;
        return this;
    }
    ShowFooter(x) {
        this._ShowFooter = x;
        return this;
    }
}
class GridCheckboxFilter extends GridColumnFilter {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.CHECKBOX;
    }
}
class GridToggleFilter extends GridColumnFilter {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.TOGGLE;
    }
}

class GridColumnType {
    constructor() {
        this._Type = GRID_DATA_TYPE.TEXT;
        this._Format = 'dd.MM.yyyy.';
        this._LookupColumn = '';
        this._ColorColumn = '';
        this._Appearance = 'outline';
        this._Shape = 'rectangle';
        this._DisplayValue = true;
        this._Editable = true;
        this._Removable = true;
        this._ButtonsFromDataField = false;
        this._Buttons = [];
        this._IconColumn = '';
        this._IsEvaIcon = false;
    }
    getTableSpecialType() {
        return this._Type;
    }
    getFormat() {
        return this._Format;
    }
    getLookupColumn() {
        return this._LookupColumn;
    }
    getColorColumn() {
        return this._ColorColumn;
    }
    getAppearance() {
        return this._Appearance;
    }
    getShape() {
        return this._Shape;
    }
    getDisplayValue() {
        return this._DisplayValue;
    }
    getEditable() {
        return this._Editable;
    }
    getRemovable() {
        return this._Removable;
    }
    getButtonsFromDataField() {
        return this._ButtonsFromDataField;
    }
    getButtons() {
        return this._Buttons;
    }
    getIconColumn() {
        return this._IconColumn;
    }
    getIsEvaIcon() {
        return this._IsEvaIcon;
    }
}
class GridNumberColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.NUMBER;
    }
}
class GridTextColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.TEXT;
    }
}
class GridDateColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.DATE;
    }
    Format(x) {
        this._Format = x;
        return this;
    }
}
class GridToggleColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.TOGGLE;
    }
}
class GridCheckboxColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.CHECKBOX;
    }
}
class GridTagColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.TAG;
        this._Appearance = 'outline';
        this._Shape = 'rectangle';
    }
    LookupColumn(x) {
        this._LookupColumn = x;
        return this;
    }
    ColorColumn(x) {
        this._ColorColumn = x;
        return this;
    }
    IconColumn(x) {
        this._IconColumn = x;
        return this;
    }
    Appearance(x) {
        this._Appearance = x;
        return this;
    }
    Shape(x) {
        this._Shape = x;
        return this;
    }
    IsEvaIcon(x) {
        this._IsEvaIcon = x;
        return this;
    }
}
class GridProgressbarColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.PROGRESSBAR;
    }
    ColorColumn(x) {
        this._ColorColumn = x;
        return this;
    }
    DisplayValue(x) {
        this._DisplayValue = x;
        return this;
    }
}
class GridDateRangeColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.DATERANGE;
    }
    Format(x) {
        this._Format = x;
        return this;
    }
}
class GridLookupColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.LOOKUP;
    }
    LookupColumn(x) {
        this._LookupColumn = x;
        return this;
    }
}
class GridButtonsColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.BUTTONS;
    }
    Editable(x) {
        this._Editable = x;
        return this;
    }
    Removable(x) {
        this._Removable = x;
        return this;
    }
    ButtonsFromDataField(x) {
        this._ButtonsFromDataField = x;
        return this;
    }
    Buttons(x) {
        this._Buttons = x;
        return this;
    }
}
class GridColorpickerColumn extends GridColumnType {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.COLOR;
    }
}

class GridColumnEditor {
    constructor() {
        this._Show = true;
        this._Type = GRID_DATA_TYPE.TEXTBOX;
        this._DataSource = [];
        this._KeyExpression = '';
        this._DisplayExpression = '';
        this._ServerDataSource = false;
        this._ServerEndpoint = '';
        this._ServerMethod = '';
        this._ServerParams = {};
        this._ClearText = '';
        this._Min = undefined;
        this._Max = undefined;
        this._DatePickerType = GRID_DATE_PICKER.DATE;
        this._Format = 'dd.MM.yyyy';
        this._FilterDates = undefined;
        this._ShowNavigation = true;
        this._ShowWeekNumbers = false;
        this._SingleColumn = true;
        this._ShowSeconds = false;
        this._TwelveHoursFormat = true;
        this._TimeStep = EDITORS_CONF.timepickerStep;
        this._ApplyButtonText = '';
        this._CurrentTimeButtonText = '';
        this._ShowCurrentTimeButton = true;
        this._TimeText = '';
        this._HoursText = '';
        this._MinutesText = '';
        this._SecondsText = '';
        this._ShowFooter = true;
        this._Disabled = false;
        this._Buttons = [];
        this._WidthClass = 'col-md-12';
        this._Label = '';
        this._Required = false;
        this._Rows = 0;
        this._TextboxType = 'text';
        this._Pattern = '';
        this._LettersDisabled = false;
        this._DisplayArrow = false;
        this._AttributesToFilter = [];
        this._AttributesToShow = [];
        this._AttributesToShowInTag = [];
        this._Multiple = false;
    }
    getTableSpecialEditor() {
        return this._Type;
    }
    getRows() {
        return this._Rows;
    }
    getTextboxType() {
        return this._TextboxType;
    }
    getShow() {
        return this._Show;
    }
    Show(x) {
        this._Show = x;
        return this;
    }
    getDataSource() {
        return this._DataSource;
    }
    getKeyExpression() {
        return this._KeyExpression;
    }
    getDisplayExpression() {
        return this._DisplayExpression;
    }
    getServerDataSource() {
        return this._ServerDataSource;
    }
    getServerEndpoint() {
        return this._ServerEndpoint;
    }
    getServerMethod() {
        return this._ServerMethod;
    }
    getServerParams() {
        return this._ServerParams;
    }
    getClearText() {
        return this._ClearText;
    }
    getMin() {
        return this._Min;
    }
    getMax() {
        return this._Max;
    }
    getDatePickerType() {
        return this._DatePickerType;
    }
    getFormat() {
        return this._Format;
    }
    getFilterDates() {
        return this._FilterDates;
    }
    getShowNavigation() {
        return this._ShowNavigation;
    }
    getShowWeekNumbers() {
        return this._ShowWeekNumbers;
    }
    getSingleColumn() {
        return this._SingleColumn;
    }
    getShowSeconds() {
        return this._ShowSeconds;
    }
    getTwelveHoursFormat() {
        return this._TwelveHoursFormat;
    }
    getTimeStep() {
        return this._TimeStep;
    }
    getApplyButtonText() {
        return this._ApplyButtonText;
    }
    getCurrentTimeButtonText() {
        return this._CurrentTimeButtonText;
    }
    getShowCurrentTimeButton() {
        return this._ShowCurrentTimeButton;
    }
    getTimeText() {
        return this._TimeText;
    }
    getHoursText() {
        return this._HoursText;
    }
    getMinutesText() {
        return this._MinutesText;
    }
    getSecondsText() {
        return this._SecondsText;
    }
    getShowFooter() {
        return this._ShowFooter;
    }
    getDisabled() {
        return this._Disabled;
    }
    Disabled(x) {
        this._Disabled = x;
        return this;
    }
    getButtons() {
        return this._Buttons;
    }
    WidthClass(x) {
        this._WidthClass = x;
        return this;
    }
    getWidthClass() {
        return this._WidthClass;
    }
    Label(x) {
        this._Label = x;
        return this;
    }
    getLabel() {
        return this._Label;
    }
    Required(x) {
        this._Required = x;
        return this;
    }
    getRequired() {
        return this._Required;
    }
    getPattern() {
        return this._Pattern;
    }
    getLettersDisabled() {
        return this._LettersDisabled;
    }
    getDisplayArrow() {
        return this._DisplayArrow;
    }
    getAttributesToFilter() {
        return this._AttributesToFilter;
    }
    getAttributesToShow() {
        return this._AttributesToShow;
    }
    getAttributesToShowInTag() {
        return this._AttributesToShowInTag;
    }
    getMultiple() {
        return this._Multiple;
    }
}
class GridTextboxEditor extends GridColumnEditor {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.TEXTBOX;
    }
    Pattern(x) {
        this._Pattern = x;
        return this;
    }
    LettersDisabled(x) {
        this._LettersDisabled = x;
        return this;
    }
}
class GridSelectEditor extends GridColumnEditor {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.SELECT;
        this._ServerDataSource = false;
        this._ServerMethod = 'GET';
    }
    DataSource(x) {
        this._DataSource = x;
        return this;
    }
    KeyExpression(x) {
        this._KeyExpression = x;
        return this;
    }
    DisplayExpression(x) {
        this._DisplayExpression = x;
        return this;
    }
    ServerDataSource(x) {
        this._ServerDataSource = x;
        return this;
    }
    ServerEndpoint(x) {
        this._ServerEndpoint = x;
        return this;
    }
    ServerMethod(x) {
        this._ServerMethod = x;
        return this;
    }
    ServerParams(x) {
        this._ServerParams = x;
        return this;
    }
    ClearText(x) {
        this._ClearText = x;
        return this;
    }
}
class GridNumberBoxEditor extends GridColumnEditor {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.NUMBERBOX;
    }
    Min(x) {
        this._Min = x;
        return this;
    }
    Max(x) {
        this._Max = x;
        return this;
    }
}
class GridDateboxEditor extends GridColumnEditor {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.DATE_PICKER;
    }
    PickerType(x) {
        this._DatePickerType = x;
        return this;
    }
    Format(x) {
        this._Format = x;
        return this;
    }
    FilterDates(x) {
        this._FilterDates = x;
        return this;
    }
    ShowNavigation(x) {
        this._ShowNavigation = x;
        return this;
    }
    ShowWeekNumbers(x) {
        this._ShowWeekNumbers = x;
        return this;
    }
    SingleColumn(x) {
        this._SingleColumn = x;
        return this;
    }
    ShowSeconds(x) {
        this._ShowSeconds = x;
        return this;
    }
    TwelveHoursFormat(x) {
        this._TwelveHoursFormat = x;
        return this;
    }
    TimeStep(x) {
        this._TimeStep = x;
        return this;
    }
    ApplyButtonText(x) {
        this._ApplyButtonText = x;
        return this;
    }
    CurrentTimeButtonText(x) {
        this._CurrentTimeButtonText = x;
        return this;
    }
    ShowCurrentTimeButton(x) {
        this._ShowCurrentTimeButton = x;
        return this;
    }
    TimeText(x) {
        this._TimeText = x;
        return this;
    }
    HoursText(x) {
        this._HoursText = x;
        return this;
    }
    MinutesText(x) {
        this._MinutesText = x;
        return this;
    }
    SecondsText(x) {
        this._SecondsText = x;
        return this;
    }
    ShowFooter(x) {
        this._ShowFooter = x;
        return this;
    }
}
class GridCheckboxEditor extends GridColumnEditor {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.CHECKBOX;
    }
}
class GridToggleEditor extends GridColumnEditor {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.TOGGLE;
    }
}
class GridActionsEditor extends GridColumnEditor {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.ACTION;
    }
    Buttons(x) {
        this._Buttons = x;
        return this;
    }
}
class GridColorpickerEditor extends GridColumnEditor {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.COLORPICKER;
    }
}
class GridTextAreaEditor extends GridColumnEditor {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.TEXTAREA;
    }
    Rows(x) {
        this._Rows = x;
        return this;
    }
    Max(x) {
        this._Max = x;
        return this;
    }
}
class GridAutocompleteEditor extends GridColumnEditor {
    constructor() {
        super();
        this._Type = GRID_DATA_TYPE.AUTOCOMPLETE;
    }
    DataSource(x) {
        this._DataSource = x;
        return this;
    }
    KeyExpression(x) {
        this._KeyExpression = x;
        return this;
    }
    DisplayExpression(x) {
        this._DisplayExpression = x;
        return this;
    }
    ServerDataSource(x) {
        this._ServerDataSource = x;
        return this;
    }
    ServerEndpoint(x) {
        this._ServerEndpoint = x;
        return this;
    }
    ServerMethod(x) {
        this._ServerMethod = x;
        return this;
    }
    ServerParams(x) {
        this._ServerParams = x;
        return this;
    }
    DisplayArrow(x) {
        this._DisplayArrow = x;
        return this;
    }
    AttributesToFilter(x) {
        this._AttributesToFilter = x;
        return this;
    }
    AttributesToShow(x) {
        this._AttributesToShow = x;
        return this;
    }
    AttributesToShowInTag(x) {
        this._AttributesToShowInTag = x;
        return this;
    }
    Multiple(x) {
        this._Multiple = x;
        return this;
    }
}

class GridColumn {
    constructor() {
        this._Id = makeId(50);
        this._Title = '';
        this._DataField = '';
        this._Type = new GridTextColumn();
        this._Filter = new GridTextboxFilter();
        this._Docked = false;
        this._Sortable = true;
        this._GroupingEnabled = true;
        this._SortState = GRID_SORT.NONE;
        this._ContextMenuId = makeId(20);
        this._ContextMenuItems = [];
        this._Editor = new GridTextboxEditor();
        this._Export = true;
        this._Addable = true;
        this._Editable = true;
        this._Width = '';
        this._Visible = true;
        this._Index = 0;
        this._Grouped = false;
        this._ShowGroupCount = true;
        this.setUpMenuItems();
    }
    Title(title) {
        this._Title = title;
        return this;
    }
    getIndex() {
        return this._Index;
    }
    Index(index) {
        this._Index = index;
        return this;
    }
    Addable(addable) {
        this._Addable = addable;
        return this;
    }
    Editable(editable) {
        this._Editable = editable;
        return this;
    }
    getAddable() {
        return this._Addable;
    }
    getEditable() {
        return this._Editable;
    }
    getTitle() {
        return this._Title;
    }
    DataField(x) {
        this._DataField = x;
        return this;
    }
    getDataField() {
        return this._DataField;
    }
    Type(x) {
        this._Type = x;
        if (x.getTableSpecialType() == GRID_DATA_TYPE.BUTTONS ||
            x.getTableSpecialType() == GRID_DATA_TYPE.ACTIONS)
            this.GroupingEnabled(false);
        return this;
    }
    getType() {
        return this._Type.getTableSpecialType();
    }
    getTypeSettings() {
        return this._Type;
    }
    getFilter() {
        return this._Filter.getTableSpecialFilter();
    }
    getFilterSettings() {
        return this._Filter;
    }
    Editor(x) {
        if (typeof x === 'boolean')
            this._Editor = new GridTextboxEditor().Show(x);
        else {
            if (stringIsEmpty(x.getLabel()))
                x.Label(this.getTitle()); // if no special label for editor provided then use column title as label
            this._Editor = x;
        }
        return this;
    }
    getEditor() {
        return this._Editor.getTableSpecialEditor();
    }
    getEditorSettings() {
        return this._Editor;
    }
    Filter(x) {
        if (typeof x === 'boolean')
            this._Filter = new GridTextboxFilter().Show(x);
        else
            this._Filter = x;
        return this;
    }
    Docked(x) {
        this._Docked = x;
        // reset menu items
        this.setUpMenuItems();
        return this;
    }
    getDocked() {
        return this._Docked;
    }
    Sortable(x) {
        this._Sortable = x;
        this.setUpMenuItems();
        return this;
    }
    getSortable() {
        return this._Sortable;
    }
    Width(x) {
        this._Width = x;
        return this;
    }
    getWidth() {
        return this._Width;
    }
    Visible(x) {
        this._Visible = x;
        return this;
    }
    getVisible() {
        return this._Visible;
    }
    Grouped(x) {
        this._Grouped = x;
        // reset menu items
        this.setUpMenuItems();
        return this;
    }
    getGrouped() {
        return this._Grouped;
    }
    GroupingEnabled(enabled) {
        this._GroupingEnabled = enabled;
        this.setUpMenuItems();
        return this;
    }
    getGroupingEnabled() {
        return this._GroupingEnabled;
    }
    ShowGroupCount(x) {
        this._ShowGroupCount = x;
        // reset menu items
        this.setUpMenuItems();
        return this;
    }
    getShowGroupCount() {
        return this._ShowGroupCount;
    }
    setUpMenuItems() {
        var items = [];
        if (this._Sortable) {
            items.push({
                title: 'gridSort',
                group: true,
            }, {
                title: 'gridSortAsc',
                icon: 'arrow-upward-outline',
                badge: this._SortState == GRID_SORT.ASC
                    ? { status: 'primary', dotMode: true }
                    : undefined,
                data: {
                    action: GRID_MENU_ACTION.SORT_ASC,
                    column: this,
                },
            }, {
                title: 'gridSortDesc',
                icon: 'arrow-downward-outline',
                badge: this._SortState == GRID_SORT.DESC
                    ? { status: 'primary', dotMode: true }
                    : undefined,
                data: {
                    action: GRID_MENU_ACTION.SORT_DESC,
                    column: this,
                },
            });
        }
        if (this._GroupingEnabled) {
            items.push({
                title: 'gridGrouping',
                group: true,
            });
            if (this._Grouped) {
                items.push({
                    title: 'gridUngroup',
                    icon: 'square-outline',
                    data: {
                        action: GRID_MENU_ACTION.UNGROUP,
                        column: this,
                    },
                });
            }
            else {
                items.push({
                    title: 'gridGroup',
                    icon: 'layers-outline',
                    data: {
                        action: GRID_MENU_ACTION.GROUP,
                        column: this,
                    },
                });
            }
            if (this._ShowGroupCount) {
                items.push({
                    title: 'gridGroupCount',
                    icon: 'eye-outline',
                    badge: this._Grouped
                        ? { status: 'primary', dotMode: true }
                        : undefined,
                    data: {
                        action: GRID_MENU_ACTION.HIDE_GROUP_COUNT,
                        column: this,
                    },
                });
            }
            else {
                items.push({
                    title: 'gridGroupCount',
                    icon: 'eye-off-outline',
                    data: {
                        action: GRID_MENU_ACTION.SHOW_GROUP_COUNT,
                        column: this,
                    },
                });
            }
        }
        items.push({
            title: 'gridOther',
            group: true,
        });
        if (this._Docked) {
            items.push({
                title: 'gridUndock',
                icon: 'unlock-outline',
                data: {
                    action: GRID_MENU_ACTION.UNDOCK,
                    column: this,
                },
            });
        }
        else {
            items.push({
                title: 'gridDock',
                icon: 'lock-outline',
                data: {
                    action: GRID_MENU_ACTION.DOCK,
                    column: this,
                },
            });
        }
        this._ContextMenuItems = items;
    }
    setSortState(state) {
        if (state == this._SortState)
            this._SortState = GRID_SORT.NONE;
        else
            this._SortState = state;
        this.setUpMenuItems();
    }
    getContextMenuId() {
        return this._ContextMenuId;
    }
    getContextMenuItems() {
        return this._ContextMenuItems;
    }
    getSortState() {
        return this._SortState;
    }
    getId() {
        return this._Id;
    }
    getExport() {
        return this._Export;
    }
    Export(x) {
        this._Export = x;
        return this;
    }
}

class ColumnFilterComponent {
    constructor(http, translationService) {
        this.http = http;
        this.translationService = translationService;
        this.column = new GridColumn();
        this.filterChanged = new EventEmitter();
        this._subs = [];
        this.types = GRID_DATA_TYPE;
        this.selectFilterDataSource = [];
        this.datePickerTypes = GRID_DATE_PICKER;
    }
    ngOnInit() {
        if (this.column.getFilter() == GRID_DATA_TYPE.SELECT) {
            var settings = this.column.getFilterSettings();
            if (settings.getServerDataSource()) {
                // get data from server
                this.getDataSourceFromServer(settings);
            }
            else
                this.selectFilterDataSource = settings.getDataSource();
        }
        this.translateEditorDefaultOptions();
    }
    ngOnDestroy() {
        this._subs.forEach((element) => {
            element.unsubscribe();
        });
    }
    getDataSourceFromServer(settings) {
        this._subs.push(this.http
            .get(settings.getServerEndpoint(), {
            params: settings.getServerParams(),
        })
            .subscribe((data) => {
            if (data)
                this.selectFilterDataSource = data;
            else
                console.error(getError(205));
        }));
    }
    onFilterChanged() {
        this.filterChanged.emit({ column: this.column, filterValue: this.value });
    }
    resetFilter() {
        this.value = null;
    }
    onRangeChange(ev) {
        if (ev.start && ev.end) {
            this.value = ev;
            this.onFilterChanged();
        }
    }
    rangePickerModelChange(ev) {
        if (ev == null) {
            this.value = null;
            this.onFilterChanged();
        }
    }
    translateEditorDefaultOptions() {
        var filter = this.column.getFilterSettings();
        if (!filter._ClearText)
            filter._ClearText =
                this.translationService.translate('gridFilterShowAll');
        if (!filter._ApplyButtonText)
            filter._ApplyButtonText = this.translationService.translate('gridDatepickerApplyBtn');
        if (!filter._CurrentTimeButtonText)
            filter._CurrentTimeButtonText =
                this.translationService.translate('gridDatepickerNow');
        if (!filter._TimeText)
            filter._TimeText =
                this.translationService.translate('gridDatepickerAmPm');
        if (!filter._HoursText)
            filter._HoursText = this.translationService.translate('gridDatepickerHours');
        if (!filter._MinutesText)
            filter._MinutesText = this.translationService.translate('gridDatepickerMinutes');
        if (!filter._SecondsText)
            filter._SecondsText = this.translationService.translate('gridDatepickerSeconds');
    }
}
ColumnFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ColumnFilterComponent, deps: [{ token: i1$1.HttpClient }, { token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ColumnFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ColumnFilterComponent, selector: "ngx-column-filter", inputs: { column: "column" }, outputs: { filterChanged: "filterChanged" }, ngImport: i0, template: "<div *ngIf=\"column.getFilterSettings().getShow()\">\n  <ng-container [ngSwitch]=\"column.getFilter()\">\n    <div *ngSwitchCase=\"types.TEXTBOX\">\n      <input\n        [(ngModel)]=\"value\"\n        name=\"inputFilter\"\n        nbInput\n        fullWidth\n        [placeholder]=\"column.getTitle()\"\n        autocomplete=\"off\"\n        (ngModelChange)=\"onFilterChanged()\"\n      />\n    </div>\n\n    <div *ngSwitchCase=\"types.SELECT\">\n      <nb-select\n        [placeholder]=\"column.getTitle()\"\n        fullWidth\n        [(selected)]=\"value\"\n        name=\"selectFilter\"\n        (selectedChange)=\"onFilterChanged()\"\n      >\n        <nb-option [value]=\"null\">{{\n          column.getFilterSettings().getClearText()\n        }}</nb-option>\n        <nb-option\n          *ngFor=\"let o of selectFilterDataSource\"\n          [value]=\"o[column.getFilterSettings().getKeyExpression()]\"\n        >\n          {{ o[column.getFilterSettings().getDisplayExpression()] }}\n        </nb-option>\n      </nb-select>\n    </div>\n\n    <div *ngSwitchCase=\"types.NUMBERBOX\">\n      <input\n        nbInput\n        type=\"number\"\n        fullWidth\n        [placeholder]=\"column.getTitle()\"\n        [(ngModel)]=\"value\"\n        name=\"numberboxFilter\"\n        (ngModelChange)=\"onFilterChanged()\"\n      />\n    </div>\n\n    <div *ngSwitchCase=\"types.DATE_PICKER\">\n      <ng-container [ngSwitch]=\"column.getFilterSettings().getDatePickerType()\">\n        <div *ngSwitchCase=\"datePickerTypes.DATE\">\n          <nb-form-field>\n            <input\n              nbInput\n              [placeholder]=\"column.getTitle()\"\n              [nbDatepicker]=\"datePicker\"\n              fullWidth\n              #datepickerInput\n              [(ngModel)]=\"value\"\n              (ngModelChange)=\"onFilterChanged()\"\n              name=\"datePickerFilter\"\n            />\n            <button\n              nbButton\n              nbSuffix\n              ghost\n              status=\"primary\"\n              (click)=\"datepickerInput.focus()\"\n            >\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\n            </button>\n            <nb-datepicker\n              #datePicker\n              format=\"{{ column.getFilterSettings().getFormat() }}\"\n              [filter]=\"column.getFilterSettings().getFilterDates()\"\n              [showNavigation]=\"column.getFilterSettings().getShowNavigation()\"\n              [showWeekNumber]=\"column.getFilterSettings().getShowWeekNumbers()\"\n              [max]=\"column.getFilterSettings().getMax()\"\n              [min]=\"column.getFilterSettings().getMin()\"\n            >\n            </nb-datepicker>\n          </nb-form-field>\n        </div>\n\n        <div *ngSwitchCase=\"datePickerTypes.DATE_TIME\">\n          <nb-form-field>\n            <input\n              nbInput\n              [placeholder]=\"column.getTitle()\"\n              [nbDatepicker]=\"dateTimePicker\"\n              fullWidth\n              #dateTimepickerInput\n              [(ngModel)]=\"value\"\n              name=\"dateTimePickerFilter\"\n            />\n            <button\n              nbButton\n              nbSuffix\n              ghost\n              status=\"primary\"\n              (click)=\"dateTimepickerInput.focus()\"\n            >\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\n            </button>\n            <nb-date-timepicker\n              #dateTimePicker\n              format=\"{{ column.getFilterSettings().getFormat() }}\"\n              [filter]=\"column.getFilterSettings().getFilterDates()\"\n              [showNavigation]=\"column.getFilterSettings().getShowNavigation()\"\n              [showWeekNumber]=\"column.getFilterSettings().getShowWeekNumbers()\"\n              [max]=\"column.getFilterSettings().getMax()\"\n              [min]=\"column.getFilterSettings().getMin()\"\n              [singleColumn]=\"column.getFilterSettings().getSingleColumn()\"\n              [step]=\"column.getFilterSettings().getTimeStep()\"\n              [withSeconds]=\"column.getFilterSettings().getShowSeconds()\"\n              [twelweHoursFormat]=\"\n                column.getFilterSettings().getTwelveHoursFormat()\n              \"\n              [applyButtonText]=\"\n                column.getFilterSettings().getApplyButtonText()\n              \"\n              [currentTimeButtonText]=\"\n                column.getFilterSettings().getCurrentTimeButtonText()\n              \"\n              [showCurrentTimeButton]=\"\n                column.getFilterSettings().getShowCurrentTimeButton()\n              \"\n              (dateChange)=\"onFilterChanged()\"\n            >\n            </nb-date-timepicker>\n          </nb-form-field>\n        </div>\n\n        <div *ngSwitchCase=\"datePickerTypes.TIME\">\n          <nb-form-field>\n            <input\n              nbInput\n              [placeholder]=\"column.getTitle()\"\n              [nbTimepicker]=\"timePicker\"\n              fullWidth\n              #timepickerInput\n              [(ngModel)]=\"value\"\n              name=\"timepickerFilter\"\n            />\n            <button\n              nbButton\n              nbSuffix\n              ghost\n              status=\"primary\"\n              (click)=\"timepickerInput.focus()\"\n            >\n              <nb-icon pack=\"eva\" icon=\"clock-outline\"></nb-icon>\n            </button>\n            <nb-timepicker\n              #timePicker\n              timeFormat=\"{{ column.getFilterSettings().getFormat() }}\"\n              [ampmText]=\"column.getFilterSettings().getTimeText()\"\n              [applyButtonText]=\"\n                column.getFilterSettings().getApplyButtonText()\n              \"\n              [currentTimeButtonText]=\"\n                column.getFilterSettings().getCurrentTimeButtonText()\n              \"\n              [hoursText]=\"column.getFilterSettings().getHoursText()\"\n              [minutesText]=\"column.getFilterSettings().getMinutesText()\"\n              [secondsText]=\"column.getFilterSettings().getSecondsText()\"\n              [singleColumn]=\"column.getFilterSettings().getSingleColumn()\"\n              [step]=\"column.getFilterSettings().getTimeStep()\"\n              [twelveHoursFormat]=\"\n                column.getFilterSettings().getTwelveHoursFormat()\n              \"\n              [withSeconds]=\"column.getFilterSettings().getShowSeconds()\"\n              (onSelectTime)=\"onFilterChanged()\"\n            >\n            </nb-timepicker>\n          </nb-form-field>\n        </div>\n\n        <div *ngSwitchCase=\"datePickerTypes.DATE_RANGE\">\n          <nb-form-field>\n            <input\n              nbInput\n              [placeholder]=\"column.getTitle()\"\n              [nbDatepicker]=\"dateTimeRangePicker\"\n              fullWidth\n              #dateRangepickerInput\n              [(ngModel)]=\"value\"\n              name=\"daterangePickerFilter\"\n              (ngModelChange)=\"rangePickerModelChange($event)\"\n            />\n            <button\n              nbButton\n              nbSuffix\n              ghost\n              status=\"primary\"\n              (click)=\"dateRangepickerInput.focus()\"\n            >\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\n            </button>\n            <nb-rangepicker\n              #dateTimeRangePicker\n              format=\"{{ column.getFilterSettings().getFormat() }}\"\n              [filter]=\"column.getFilterSettings().getFilterDates()\"\n              [showNavigation]=\"column.getFilterSettings().getShowNavigation()\"\n              [showWeekNumber]=\"column.getFilterSettings().getShowWeekNumbers()\"\n              [max]=\"column.getFilterSettings().getMax()\"\n              [min]=\"column.getFilterSettings().getMin()\"\n              (rangeChange)=\"onRangeChange($event)\"\n            >\n            </nb-rangepicker>\n          </nb-form-field>\n        </div>\n      </ng-container>\n    </div>\n\n    <div\n      *ngSwitchCase=\"types.CHECKBOX\"\n      class=\"d-flex justify-content-center align-items-center\"\n    >\n      <nb-checkbox\n        name=\"checkboxFilter\"\n        [(checked)]=\"value\"\n        (checkedChange)=\"onFilterChanged()\"\n      >\n      </nb-checkbox>\n    </div>\n\n    <div *ngSwitchCase=\"types.TOGGLE\">\n      <nb-toggle\n        name=\"toggleFilter\"\n        [(checked)]=\"value\"\n        (checkedChange)=\"onFilterChanged()\"\n      ></nb-toggle>\n    </div>\n  </ng-container>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i1.NbCheckboxComponent, selector: "nb-checkbox", inputs: ["checked", "disabled", "status", "indeterminate"], outputs: ["checkedChange"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i1.NbSelectComponent, selector: "nb-select", inputs: ["size", "status", "shape", "appearance", "optionsListClass", "optionsPanelClass", "optionsWidth", "outline", "filled", "hero", "disabled", "fullWidth", "placeholder", "compareWith", "selected", "multiple", "optionsOverlayOffset", "scrollStrategy"], outputs: ["selectedChange"] }, { kind: "component", type: i1.NbOptionComponent, selector: "nb-option", inputs: ["value", "disabled"], outputs: ["selectionChange"] }, { kind: "component", type: i1.NbToggleComponent, selector: "nb-toggle", inputs: ["checked", "disabled", "status", "labelPosition"], outputs: ["checkedChange"] }, { kind: "directive", type: i1.NbDatepickerDirective, selector: "input[nbDatepicker]", inputs: ["nbDatepicker"] }, { kind: "component", type: i1.NbDatepickerComponent, selector: "nb-datepicker", inputs: ["date"], outputs: ["dateChange"] }, { kind: "component", type: i1.NbRangepickerComponent, selector: "nb-rangepicker", inputs: ["range"], outputs: ["rangeChange"] }, { kind: "component", type: i1.NbDateTimePickerComponent, selector: "nb-date-timepicker", inputs: ["step", "title", "applyButtonText", "currentTimeButtonText", "showCurrentTimeButton", "twelveHoursFormat", "showAmPmLabel", "withSeconds", "singleColumn"], outputs: ["dateTimeChange"] }, { kind: "directive", type: i1.NbInputDirective, selector: "input[nbInput],textarea[nbInput]", inputs: ["fieldSize", "status", "shape", "fullWidth"] }, { kind: "component", type: i1.NbFormFieldComponent, selector: "nb-form-field" }, { kind: "directive", type: i1.NbSuffixDirective, selector: "[nbSuffix]" }, { kind: "component", type: i1.NbTimePickerComponent, selector: "nb-timepicker", inputs: ["timeFormat", "twelveHoursFormat", "showAmPmLabel", "withSeconds", "singleColumn", "step", "date", "showFooter", "applyButtonText", "hoursText", "minutesText", "secondsText", "ampmText", "currentTimeButtonText"], outputs: ["onSelectTime"], exportAs: ["nbTimepicker"] }, { kind: "directive", type: i1.NbTimePickerDirective, selector: "input[nbTimepicker]", inputs: ["nbTimepicker", "overlayOffset"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ColumnFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-column-filter', template: "<div *ngIf=\"column.getFilterSettings().getShow()\">\n  <ng-container [ngSwitch]=\"column.getFilter()\">\n    <div *ngSwitchCase=\"types.TEXTBOX\">\n      <input\n        [(ngModel)]=\"value\"\n        name=\"inputFilter\"\n        nbInput\n        fullWidth\n        [placeholder]=\"column.getTitle()\"\n        autocomplete=\"off\"\n        (ngModelChange)=\"onFilterChanged()\"\n      />\n    </div>\n\n    <div *ngSwitchCase=\"types.SELECT\">\n      <nb-select\n        [placeholder]=\"column.getTitle()\"\n        fullWidth\n        [(selected)]=\"value\"\n        name=\"selectFilter\"\n        (selectedChange)=\"onFilterChanged()\"\n      >\n        <nb-option [value]=\"null\">{{\n          column.getFilterSettings().getClearText()\n        }}</nb-option>\n        <nb-option\n          *ngFor=\"let o of selectFilterDataSource\"\n          [value]=\"o[column.getFilterSettings().getKeyExpression()]\"\n        >\n          {{ o[column.getFilterSettings().getDisplayExpression()] }}\n        </nb-option>\n      </nb-select>\n    </div>\n\n    <div *ngSwitchCase=\"types.NUMBERBOX\">\n      <input\n        nbInput\n        type=\"number\"\n        fullWidth\n        [placeholder]=\"column.getTitle()\"\n        [(ngModel)]=\"value\"\n        name=\"numberboxFilter\"\n        (ngModelChange)=\"onFilterChanged()\"\n      />\n    </div>\n\n    <div *ngSwitchCase=\"types.DATE_PICKER\">\n      <ng-container [ngSwitch]=\"column.getFilterSettings().getDatePickerType()\">\n        <div *ngSwitchCase=\"datePickerTypes.DATE\">\n          <nb-form-field>\n            <input\n              nbInput\n              [placeholder]=\"column.getTitle()\"\n              [nbDatepicker]=\"datePicker\"\n              fullWidth\n              #datepickerInput\n              [(ngModel)]=\"value\"\n              (ngModelChange)=\"onFilterChanged()\"\n              name=\"datePickerFilter\"\n            />\n            <button\n              nbButton\n              nbSuffix\n              ghost\n              status=\"primary\"\n              (click)=\"datepickerInput.focus()\"\n            >\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\n            </button>\n            <nb-datepicker\n              #datePicker\n              format=\"{{ column.getFilterSettings().getFormat() }}\"\n              [filter]=\"column.getFilterSettings().getFilterDates()\"\n              [showNavigation]=\"column.getFilterSettings().getShowNavigation()\"\n              [showWeekNumber]=\"column.getFilterSettings().getShowWeekNumbers()\"\n              [max]=\"column.getFilterSettings().getMax()\"\n              [min]=\"column.getFilterSettings().getMin()\"\n            >\n            </nb-datepicker>\n          </nb-form-field>\n        </div>\n\n        <div *ngSwitchCase=\"datePickerTypes.DATE_TIME\">\n          <nb-form-field>\n            <input\n              nbInput\n              [placeholder]=\"column.getTitle()\"\n              [nbDatepicker]=\"dateTimePicker\"\n              fullWidth\n              #dateTimepickerInput\n              [(ngModel)]=\"value\"\n              name=\"dateTimePickerFilter\"\n            />\n            <button\n              nbButton\n              nbSuffix\n              ghost\n              status=\"primary\"\n              (click)=\"dateTimepickerInput.focus()\"\n            >\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\n            </button>\n            <nb-date-timepicker\n              #dateTimePicker\n              format=\"{{ column.getFilterSettings().getFormat() }}\"\n              [filter]=\"column.getFilterSettings().getFilterDates()\"\n              [showNavigation]=\"column.getFilterSettings().getShowNavigation()\"\n              [showWeekNumber]=\"column.getFilterSettings().getShowWeekNumbers()\"\n              [max]=\"column.getFilterSettings().getMax()\"\n              [min]=\"column.getFilterSettings().getMin()\"\n              [singleColumn]=\"column.getFilterSettings().getSingleColumn()\"\n              [step]=\"column.getFilterSettings().getTimeStep()\"\n              [withSeconds]=\"column.getFilterSettings().getShowSeconds()\"\n              [twelweHoursFormat]=\"\n                column.getFilterSettings().getTwelveHoursFormat()\n              \"\n              [applyButtonText]=\"\n                column.getFilterSettings().getApplyButtonText()\n              \"\n              [currentTimeButtonText]=\"\n                column.getFilterSettings().getCurrentTimeButtonText()\n              \"\n              [showCurrentTimeButton]=\"\n                column.getFilterSettings().getShowCurrentTimeButton()\n              \"\n              (dateChange)=\"onFilterChanged()\"\n            >\n            </nb-date-timepicker>\n          </nb-form-field>\n        </div>\n\n        <div *ngSwitchCase=\"datePickerTypes.TIME\">\n          <nb-form-field>\n            <input\n              nbInput\n              [placeholder]=\"column.getTitle()\"\n              [nbTimepicker]=\"timePicker\"\n              fullWidth\n              #timepickerInput\n              [(ngModel)]=\"value\"\n              name=\"timepickerFilter\"\n            />\n            <button\n              nbButton\n              nbSuffix\n              ghost\n              status=\"primary\"\n              (click)=\"timepickerInput.focus()\"\n            >\n              <nb-icon pack=\"eva\" icon=\"clock-outline\"></nb-icon>\n            </button>\n            <nb-timepicker\n              #timePicker\n              timeFormat=\"{{ column.getFilterSettings().getFormat() }}\"\n              [ampmText]=\"column.getFilterSettings().getTimeText()\"\n              [applyButtonText]=\"\n                column.getFilterSettings().getApplyButtonText()\n              \"\n              [currentTimeButtonText]=\"\n                column.getFilterSettings().getCurrentTimeButtonText()\n              \"\n              [hoursText]=\"column.getFilterSettings().getHoursText()\"\n              [minutesText]=\"column.getFilterSettings().getMinutesText()\"\n              [secondsText]=\"column.getFilterSettings().getSecondsText()\"\n              [singleColumn]=\"column.getFilterSettings().getSingleColumn()\"\n              [step]=\"column.getFilterSettings().getTimeStep()\"\n              [twelveHoursFormat]=\"\n                column.getFilterSettings().getTwelveHoursFormat()\n              \"\n              [withSeconds]=\"column.getFilterSettings().getShowSeconds()\"\n              (onSelectTime)=\"onFilterChanged()\"\n            >\n            </nb-timepicker>\n          </nb-form-field>\n        </div>\n\n        <div *ngSwitchCase=\"datePickerTypes.DATE_RANGE\">\n          <nb-form-field>\n            <input\n              nbInput\n              [placeholder]=\"column.getTitle()\"\n              [nbDatepicker]=\"dateTimeRangePicker\"\n              fullWidth\n              #dateRangepickerInput\n              [(ngModel)]=\"value\"\n              name=\"daterangePickerFilter\"\n              (ngModelChange)=\"rangePickerModelChange($event)\"\n            />\n            <button\n              nbButton\n              nbSuffix\n              ghost\n              status=\"primary\"\n              (click)=\"dateRangepickerInput.focus()\"\n            >\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\n            </button>\n            <nb-rangepicker\n              #dateTimeRangePicker\n              format=\"{{ column.getFilterSettings().getFormat() }}\"\n              [filter]=\"column.getFilterSettings().getFilterDates()\"\n              [showNavigation]=\"column.getFilterSettings().getShowNavigation()\"\n              [showWeekNumber]=\"column.getFilterSettings().getShowWeekNumbers()\"\n              [max]=\"column.getFilterSettings().getMax()\"\n              [min]=\"column.getFilterSettings().getMin()\"\n              (rangeChange)=\"onRangeChange($event)\"\n            >\n            </nb-rangepicker>\n          </nb-form-field>\n        </div>\n      </ng-container>\n    </div>\n\n    <div\n      *ngSwitchCase=\"types.CHECKBOX\"\n      class=\"d-flex justify-content-center align-items-center\"\n    >\n      <nb-checkbox\n        name=\"checkboxFilter\"\n        [(checked)]=\"value\"\n        (checkedChange)=\"onFilterChanged()\"\n      >\n      </nb-checkbox>\n    </div>\n\n    <div *ngSwitchCase=\"types.TOGGLE\">\n      <nb-toggle\n        name=\"toggleFilter\"\n        [(checked)]=\"value\"\n        (checkedChange)=\"onFilterChanged()\"\n      ></nb-toggle>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.HttpClient }, { type: TranslationService }]; }, propDecorators: { column: [{
                type: Input
            }], filterChanged: [{
                type: Output
            }] } });

class GridFilterService {
    static filterData(_filters, data) {
        // if filters set --> filter data, otherwise return original data source
        if (_filters.length > 0) {
            var filtered = data;
            _filters.forEach((element) => {
                switch (element.column.getFilter()) {
                    case GRID_DATA_TYPE.DATE_PICKER:
                        switch (element.column.getFilterSettings().getDatePickerType()) {
                            case GRID_DATE_PICKER.DATE:
                                filtered = filterDate(filtered, element);
                                break;
                            case GRID_DATE_PICKER.TIME:
                                filtered = filterTime(filtered, element);
                                break;
                            case GRID_DATE_PICKER.DATE_RANGE:
                                filtered = filterRange(filtered, element);
                                break;
                        }
                        break;
                    case GRID_DATA_TYPE.TEXTBOX:
                        filtered = filterIncludes(filtered, element);
                        break;
                    case GRID_DATA_TYPE.NUMBERBOX:
                        filtered = filterEqual(filtered, element);
                        break;
                    case GRID_DATA_TYPE.SELECT:
                        filtered = filterEqual(filtered, element);
                        break;
                    case GRID_DATA_TYPE.CHECKBOX:
                        filtered = filterBoolean(filtered, element);
                        break;
                    case GRID_DATA_TYPE.TOGGLE:
                        filtered = filterBoolean(filtered, element);
                        break;
                }
            });
            return filtered;
        }
        else
            return data;
    }
}
GridFilterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridFilterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GridFilterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridFilterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridFilterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
function filterDate(arrToFilter, element) {
    return arrToFilter.filter((item) => {
        var itemDate = new Date(item[element.column.getDataField()]).toLocaleDateString();
        var filterDate = new Date(element.filterValue).toLocaleDateString();
        return itemDate == filterDate;
    });
}
function filterTime(arrToFilter, element) {
    return arrToFilter.filter((item) => {
        var itemDate = new Date(item[element.column.getDataField()]);
        var itemTime = new Date(1, 1, 1999, itemDate.getHours(), itemDate.getMinutes(), 0);
        var filterDate = new Date(element.filterValue);
        var filterTime = new Date(1, 1, 1999, filterDate.getHours(), filterDate.getMinutes(), 0);
        return itemTime.toTimeString() == filterTime.toTimeString();
    });
}
function filterRange(arrToFilter, element) {
    var startDate = new Date(element.filterValue.start);
    startDate.setHours(0, 0, 0, 0);
    var endDate = new Date(element.filterValue.end);
    endDate.setHours(0, 0, 0, 0);
    return arrToFilter.filter((item) => {
        var itemStart = new Date(item[element.column.getDataField()].start);
        itemStart.setHours(0, 0, 0, 0);
        var itemEnd = new Date(item[element.column.getDataField()].end);
        itemEnd.setHours(0, 0, 0, 0);
        if (itemStart >= startDate &&
            itemStart <= endDate &&
            itemEnd >= startDate &&
            itemEnd <= endDate)
            return item;
    });
}
function filterIncludes(arrToFilter, element) {
    // if column is lookup then filter lookup column not specified column itself
    return arrToFilter.filter((x) => {
        var _a, _b, _c, _d;
        if (element.column.getType() == GRID_DATA_TYPE.LOOKUP)
            return (_a = x[element.column.getTypeSettings().getLookupColumn()]
                .toString()) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes((_b = element.filterValue) === null || _b === void 0 ? void 0 : _b.toLowerCase());
        else
            return (_c = x[element.column.getDataField()]
                .toString()) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes((_d = element.filterValue) === null || _d === void 0 ? void 0 : _d.toLowerCase());
    });
}
function filterEqual(arrToFilter, element) {
    return arrToFilter.filter((x) => x[element.column.getDataField()] == element.filterValue);
}
function filterBoolean(arrToFilter, element) {
    return arrToFilter.filter((x) => x[element.column.getDataField()].toString() ==
        element.filterValue.toString());
}

class GridSortService {
    static sortData(data, sort) {
        var sorted = data;
        sort.forEach((element) => {
            switch (element.column.getType()) {
                case GRID_DATA_TYPE.DATE:
                    sorted = sortDate(sorted, element);
                    break;
                case GRID_DATA_TYPE.DATERANGE:
                    sorted = sortDateRange(sorted, element);
                    break;
                default:
                    sorted = simpleSort(sorted, element);
                    break;
            }
        });
        return sorted;
    }
    static resetSort(data) {
        return data.sort(function (a, b) {
            if (a._RowIndex < b._RowIndex)
                return -1;
            if (a._RowIndex > b._RowIndex)
                return 1;
            return 0;
        });
    }
}
GridSortService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridSortService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GridSortService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridSortService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridSortService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
function simpleSort(arrToSort, element) {
    arrToSort = arrToSort.sort(function (a, b) {
        if (a[element.column.getDataField()] < b[element.column.getDataField()])
            return -1;
        if (a[element.column.getDataField()] > b[element.column.getDataField()])
            return 1;
        return 0;
    });
    if (element.sortState === GRID_SORT.ASC)
        return arrToSort;
    else
        return arrToSort.reverse();
}
function sortDate(arrToSort, element) {
    arrToSort = arrToSort.sort(function (a, b) {
        let first = Number(new DatePipe('en-US').transform(a[element.column.getDataField()], 'yyyyMMdd'));
        let second = Number(new DatePipe('en-US').transform(b[element.column.getDataField()], 'yyyyMMdd'));
        if (first < second)
            return -1;
        if (first > second)
            return 1;
        return 0;
    });
    if (element.sortState === GRID_SORT.ASC)
        return arrToSort;
    else
        return arrToSort.reverse();
}
function sortDateRange(arrToSort, element) {
    arrToSort = arrToSort.sort(function (a, b) {
        let first = Number(new DatePipe('en-US').transform(a[element.column.getDataField()].start, 'yyyyMMdd'));
        let second = Number(new DatePipe('en-US').transform(b[element.column.getDataField()].start, 'yyyyMMdd'));
        if (first < second)
            return -1;
        if (first > second)
            return 1;
        return 0;
    });
    if (element.sortState === GRID_SORT.ASC)
        return arrToSort;
    else
        return arrToSort.reverse();
}

class GridExport {
    /*
          Configures export headers as IGridExportHeader[] from table column settings.
      */
    static configureIGridExportHeaders(columns) {
        var headers = [];
        columns.forEach((column) => {
            let format = DATE_FORMATS.date;
            switch (column.getType()) {
                case GRID_DATA_TYPE.DATE:
                    format = column.getTypeSettings().getFormat();
                    break;
                case GRID_DATA_TYPE.DATERANGE:
                    format = column.getTypeSettings().getFormat();
                    break;
                case GRID_DATA_TYPE.LOOKUP:
                    format = column.getTypeSettings().getLookupColumn();
                    break;
                case GRID_DATA_TYPE.TAG:
                    format = column.getTypeSettings().getLookupColumn();
                    break;
            }
            if (column.getExport()) {
                headers.push({
                    property: column.getDataField(),
                    headerToShow: column.getTitle(),
                    export: column.getExport(),
                    columnType: column.getType(),
                    specialType: column.getType(),
                    format: format,
                });
            }
        });
        return headers;
    }
    /*
          Gets filenames from item and header.
      */
    static getFilename(item, header) {
        var text = '';
        if (item[header.property]) {
            if (Array.isArray(item[header.property])) {
                item[header.property].forEach((element) => {
                    text = text + element.filename + '; ';
                });
            }
            else {
                text = item[header.property].filename;
            }
        }
        return text;
    }
}

try {
    const pfAny = pdfFonts;
    const pmAny = pdfMake;
    const __vfs = (pfAny && pfAny.pdfMake && pfAny.pdfMake.vfs) || (pfAny && pfAny.vfs) || pfAny;
    if (pmAny && __vfs) {
        pmAny.vfs = __vfs;
    }
}
catch (e) {
    // ignore - vfs may be attached at runtime by the app
}
class GridPdfExportComponent {
    // ----------------------------------------------------- OUTPUTS -----------------------------------------------------------------
    // ----------------------------------------------------- COMPONENT CONSTRUCTION --------------------------------------------------
    constructor() {
        // ----------------------------------------------------- PRIVATE FIELDS ----------------------------------------------------------
        // ----------------------------------------------------- PUBLIC FIELDS -----------------------------------------------------------
        this.headers = []; // headers for export table
        this.data = []; // data to be exported
        this.specialTypes = GRID_DATA_TYPE; // specialTypes enum
    }
    ngOnInit() { }
    // ----------------------------------------------------- PRIVATE METHODS ---------------------------------------------------------
    // ----------------------------------------------------- PUBLIC METHODS ----------------------------------------------------------
    /*
      Exports and downloads provided data in pdf format.
    */
    exportPdf(data, headers) {
        this.headers = headers;
        this.data = data;
        // await for HTML elements to render
        setTimeout(() => {
            const pdfTable = this.content.nativeElement;
            var html = htmlToPdfmake(pdfTable.innerHTML);
            let orientation = 'portrait';
            if (this.headers.length > PDF_PAGE_CONF.columnsToPortrait)
                orientation = 'landscape';
            const documentDefinition = {
                content: html,
                styles: {
                    table: {
                        fontSize: PDF_PAGE_CONF.fontSize,
                    },
                },
                pageSize: PDF_PAGE_CONF.pageSize,
                pageOrientation: orientation,
                pageMargins: PDF_PAGE_CONF.pageMargins,
            };
            pdfMake.createPdf(documentDefinition).download(this.settings.docName);
        }, 100);
    }
    getFilename(item, header) {
        return GridExport.getFilename(item, header);
    }
}
GridPdfExportComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridPdfExportComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GridPdfExportComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: GridPdfExportComponent, selector: "ngx-grid-pdf-export", inputs: { settings: "settings" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }], ngImport: i0, template: "<div id=\"content\" #content hidden>\n  <h5 *ngIf=\"settings.title\">{{ settings.title }}</h5>\n  <br />\n  <p *ngIf=\"settings.subtitle != undefined\">{{ settings.subtitle }}</p>\n  <br />\n  <div>\n    <table id=\"exportTable\">\n      <thead>\n        <th *ngIf=\"settings.showOrdinalNumbers\">\n          {{ settings.ordNumColumnName }}\n        </th>\n        <th *ngFor=\"let h of headers\">{{ h.headerToShow }}</th>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let item of data; let i = index\">\n          <td *ngIf=\"settings.showOrdinalNumbers\">{{ i + 1 }}</td>\n          <td *ngFor=\"let l of headers; let i = index\">\n            <div *ngIf=\"l.specialType; then specialType; else normal\"></div>\n            <ng-template #specialType>\n              <div *ngIf=\"l.specialType == specialTypes.TAG && l.format\">\n                {{ item[l.format!] }}\n              </div>\n              <div *ngIf=\"l.specialType == specialTypes.PROGRESSBAR\">\n                {{ item[l.property].value }}\n              </div>\n              <div *ngIf=\"l.specialType == specialTypes.DATE\">\n                {{ item[l.property] | date : l.format }}\n              </div>\n              <div *ngIf=\"l.specialType == specialTypes.DATERANGE\">\n                {{ item[l.property].start | date : l.format }} -\n                {{ item[l.property].end | date : l.format }}\n              </div>\n              <div\n                *ngIf=\"\n                  l.specialType == specialTypes.CHECKBOX ||\n                  l.specialType == specialTypes.TOGGLE\n                \"\n              >\n                <div *ngIf=\"item[l.property]\">{{ settings.yesValueText }}</div>\n                <div *ngIf=\"!item[l.property]\">{{ settings.noValueText }}</div>\n              </div>\n              <div *ngIf=\"l.specialType == specialTypes.FILE\">\n                {{ getFilename(item, l) }}\n              </div>\n              <div *ngIf=\"l.specialType == specialTypes.LOOKUP && l.format\">\n                {{ item[l.format!] }}\n              </div>\n              <div\n                *ngIf=\"\n                  l.specialType == specialTypes.NUMBER ||\n                  l.specialType == specialTypes.TEXT ||\n                  l.specialType == specialTypes.COLOR\n                \"\n              >\n                {{ item[l.property] }}\n              </div>\n            </ng-template>\n            <ng-template #normal>\n              {{ item[l.property] }}\n            </ng-template>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4.DatePipe, name: "date" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridPdfExportComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-grid-pdf-export', template: "<div id=\"content\" #content hidden>\n  <h5 *ngIf=\"settings.title\">{{ settings.title }}</h5>\n  <br />\n  <p *ngIf=\"settings.subtitle != undefined\">{{ settings.subtitle }}</p>\n  <br />\n  <div>\n    <table id=\"exportTable\">\n      <thead>\n        <th *ngIf=\"settings.showOrdinalNumbers\">\n          {{ settings.ordNumColumnName }}\n        </th>\n        <th *ngFor=\"let h of headers\">{{ h.headerToShow }}</th>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let item of data; let i = index\">\n          <td *ngIf=\"settings.showOrdinalNumbers\">{{ i + 1 }}</td>\n          <td *ngFor=\"let l of headers; let i = index\">\n            <div *ngIf=\"l.specialType; then specialType; else normal\"></div>\n            <ng-template #specialType>\n              <div *ngIf=\"l.specialType == specialTypes.TAG && l.format\">\n                {{ item[l.format!] }}\n              </div>\n              <div *ngIf=\"l.specialType == specialTypes.PROGRESSBAR\">\n                {{ item[l.property].value }}\n              </div>\n              <div *ngIf=\"l.specialType == specialTypes.DATE\">\n                {{ item[l.property] | date : l.format }}\n              </div>\n              <div *ngIf=\"l.specialType == specialTypes.DATERANGE\">\n                {{ item[l.property].start | date : l.format }} -\n                {{ item[l.property].end | date : l.format }}\n              </div>\n              <div\n                *ngIf=\"\n                  l.specialType == specialTypes.CHECKBOX ||\n                  l.specialType == specialTypes.TOGGLE\n                \"\n              >\n                <div *ngIf=\"item[l.property]\">{{ settings.yesValueText }}</div>\n                <div *ngIf=\"!item[l.property]\">{{ settings.noValueText }}</div>\n              </div>\n              <div *ngIf=\"l.specialType == specialTypes.FILE\">\n                {{ getFilename(item, l) }}\n              </div>\n              <div *ngIf=\"l.specialType == specialTypes.LOOKUP && l.format\">\n                {{ item[l.format!] }}\n              </div>\n              <div\n                *ngIf=\"\n                  l.specialType == specialTypes.NUMBER ||\n                  l.specialType == specialTypes.TEXT ||\n                  l.specialType == specialTypes.COLOR\n                \"\n              >\n                {{ item[l.property] }}\n              </div>\n            </ng-template>\n            <ng-template #normal>\n              {{ item[l.property] }}\n            </ng-template>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['content']
            }], settings: [{
                type: Input
            }] } });

class GridExcelExportComponent {
    // ----------------------------------------------------- OUTPUTS -----------------------------------------------------------------
    // ----------------------------------------------------- COMPONENT CONSTRUCTION --------------------------------------------------
    constructor() {
        // ----------------------------------------------------- PRIVATE FIELDS ----------------------------------------------------------
        // ----------------------------------------------------- PUBLIC FIELDS -----------------------------------------------------------
        this.headers = []; // table headers
        this.data = []; // data to export
        this.specialTypes = GRID_DATA_TYPE; // specialTypes enum
    }
    ngOnInit() { }
    // ----------------------------------------------------- PRIVATE METHODS ---------------------------------------------------------
    // ----------------------------------------------------- PUBLIC METHODS ----------------------------------------------------------
    /*
      Exports and downloads provided data in xlsx format.
    */
    exportExcel(data, headers) {
        this.headers = headers;
        this.data = data;
        //await for HTML elements to render
        setTimeout(() => {
            let element = document.getElementById('excel-table');
            const ws = XLSX.utils.table_to_sheet(element);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, this.settings.docName + '.xlsx');
        }, 100);
    }
    getFilename(item, header) {
        return GridExport.getFilename(item, header);
    }
}
GridExcelExportComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridExcelExportComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GridExcelExportComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: GridExcelExportComponent, selector: "ngx-grid-excel-export", inputs: { settings: "settings" }, ngImport: i0, template: "<table id=\"excel-table\" class=\"d-none\">\n  <tr>\n    <th *ngIf=\"settings.showOrdinalNumbers\">{{ settings.ordNumColumnName }}</th>\n    <th *ngFor=\"let h of headers\">{{ h.headerToShow }}</th>\n  </tr>\n  <tr *ngFor=\"let item of data; let i = index\">\n    <td *ngIf=\"settings.showOrdinalNumbers\">{{ i + 1 }}</td>\n    <td *ngFor=\"let l of headers; let i = index\">\n      <div *ngIf=\"l.specialType; then specialType; else normal\"></div>\n      <ng-template #specialType>\n        <div *ngIf=\"l.specialType == specialTypes.TAG && l.format\">\n          {{ item[l.format!] }}\n        </div>\n        <div *ngIf=\"l.specialType == specialTypes.PROGRESSBAR\">\n          {{ item[l.property].value }}\n        </div>\n        <div *ngIf=\"l.specialType == specialTypes.DATE\">\n          {{ item[l.property] | date : l.format }}\n        </div>\n        <div *ngIf=\"l.specialType == specialTypes.DATERANGE\">\n          {{ item[l.property].start | date : l.format }} -\n          {{ item[l.property].end | date : l.format }}\n        </div>\n        <div\n          *ngIf=\"\n            l.specialType == specialTypes.CHECKBOX ||\n            l.specialType == specialTypes.TOGGLE\n          \"\n        >\n          <div *ngIf=\"item[l.property]\">{{ settings.yesValueText }}</div>\n          <div *ngIf=\"!item[l.property]\">{{ settings.noValueText }}</div>\n        </div>\n        <div *ngIf=\"l.specialType == specialTypes.LOOKUP && l.format\">\n          {{ item[l.format!] }}\n        </div>\n        <div *ngIf=\"l.specialType == specialTypes.FILE\">\n          {{ getFilename(item, l) }}\n        </div>\n        <div\n          *ngIf=\"\n            l.specialType == specialTypes.NUMBER ||\n            l.specialType == specialTypes.TEXT ||\n            l.specialType == specialTypes.COLOR\n          \"\n        >\n          {{ item[l.property] }}\n        </div>\n      </ng-template>\n      <ng-template #normal>\n        {{ item[l.property] }}\n      </ng-template>\n    </td>\n  </tr>\n</table>\n", styles: [""], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4.DatePipe, name: "date" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridExcelExportComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-grid-excel-export', template: "<table id=\"excel-table\" class=\"d-none\">\n  <tr>\n    <th *ngIf=\"settings.showOrdinalNumbers\">{{ settings.ordNumColumnName }}</th>\n    <th *ngFor=\"let h of headers\">{{ h.headerToShow }}</th>\n  </tr>\n  <tr *ngFor=\"let item of data; let i = index\">\n    <td *ngIf=\"settings.showOrdinalNumbers\">{{ i + 1 }}</td>\n    <td *ngFor=\"let l of headers; let i = index\">\n      <div *ngIf=\"l.specialType; then specialType; else normal\"></div>\n      <ng-template #specialType>\n        <div *ngIf=\"l.specialType == specialTypes.TAG && l.format\">\n          {{ item[l.format!] }}\n        </div>\n        <div *ngIf=\"l.specialType == specialTypes.PROGRESSBAR\">\n          {{ item[l.property].value }}\n        </div>\n        <div *ngIf=\"l.specialType == specialTypes.DATE\">\n          {{ item[l.property] | date : l.format }}\n        </div>\n        <div *ngIf=\"l.specialType == specialTypes.DATERANGE\">\n          {{ item[l.property].start | date : l.format }} -\n          {{ item[l.property].end | date : l.format }}\n        </div>\n        <div\n          *ngIf=\"\n            l.specialType == specialTypes.CHECKBOX ||\n            l.specialType == specialTypes.TOGGLE\n          \"\n        >\n          <div *ngIf=\"item[l.property]\">{{ settings.yesValueText }}</div>\n          <div *ngIf=\"!item[l.property]\">{{ settings.noValueText }}</div>\n        </div>\n        <div *ngIf=\"l.specialType == specialTypes.LOOKUP && l.format\">\n          {{ item[l.format!] }}\n        </div>\n        <div *ngIf=\"l.specialType == specialTypes.FILE\">\n          {{ getFilename(item, l) }}\n        </div>\n        <div\n          *ngIf=\"\n            l.specialType == specialTypes.NUMBER ||\n            l.specialType == specialTypes.TEXT ||\n            l.specialType == specialTypes.COLOR\n          \"\n        >\n          {{ item[l.property] }}\n        </div>\n      </ng-template>\n      <ng-template #normal>\n        {{ item[l.property] }}\n      </ng-template>\n    </td>\n  </tr>\n</table>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { settings: [{
                type: Input
            }] } });

class GridValidationService {
    static validate(columns, rowData) {
        var isValid = true;
        columns.forEach((element) => {
            var _a;
            if (element.getEditorSettings().getRequired() &&
                !rowData[element.getDataField()]) {
                if (element.getEditor() == GRID_DATA_TYPE.NUMBERBOX &&
                    rowData[element.getDataField()] == 0)
                    isValid = true;
                else {
                    isValid = false;
                    return;
                }
            }
            else if (element.getEditor() == GRID_DATA_TYPE.TEXTBOX &&
                element.getEditorSettings().getPattern().length > 0 &&
                ((_a = rowData[element.getDataField()]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                var re = new RegExp(element.getEditorSettings().getPattern());
                isValid = re.test(rowData[element.getDataField()]);
            }
        });
        return isValid;
    }
}
GridValidationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GridValidationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridValidationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridValidationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class GridPopup {
    static getFileMenuItemClickEvent() {
        return this.fileMenuItemClick;
    }
    static emitFileMenuItemClickEvent(model) {
        this.fileMenuItemClick.emit(model);
    }
    static getPopupConfiguration(isNew, editRecordTitle, columns, data, saveBtnTitle, cancelBtnTitle, showMinimizeBtn, showMaximizeBtn, showFullScreenBtn, hasBacktrop, closeOnBackdropClick, closeOnEscClick, requiredTooltip) {
        var conf = {
            title: editRecordTitle,
            context: {
                isNew: isNew,
                columns: columns,
                data: data,
                saveBtnText: saveBtnTitle,
                cancelBtnText: cancelBtnTitle,
                reqiredTooltip: requiredTooltip,
            },
            buttons: {
                minimize: showMinimizeBtn,
                maximize: showMaximizeBtn,
                fullScreen: showFullScreenBtn,
                close: true,
            },
            hasBackdrop: hasBacktrop,
            closeOnBackdropClick: closeOnBackdropClick,
            closeOnEsc: closeOnEscClick,
            windowClass: 'popup-window',
        };
        return conf;
    }
    static getDeletePopupConfiguration(deletePopupSettings) {
        var conf = {
            context: {
                settings: deletePopupSettings,
            },
            autoFocus: false,
            closeOnBackdropClick: deletePopupSettings.closeOnBackdropClick,
            closeOnEsc: deletePopupSettings.closeOnEsc,
        };
        return conf;
    }
}
GridPopup.fileMenuItemClick = new EventEmitter();

class PopupComponent {
    // ----------------------------------------------------- COMPONENT CONSTRUCTION --------------------------------------------------
    constructor(ref, http, translationService) {
        this.ref = ref;
        this.http = http;
        this.translationService = translationService;
        // ----------------------------------------------------- PRIVATE FIELDS ----------------------------------------------------------
        this.uploadedFiles = []; // current uploaded files in filepicker editor
        this.subscriptions = [];
        // ----------------------------------------------------- PUBLIC FIELDS -----------------------------------------------------------
        this.isNew = true; // indicates if new record option is active or edit record
        this.columns = []; // smart table columns settings
        this.data = null; // current data selected, if new record then null, if edit record then data from selected row
        this.newData = {}; // object for new data provided in popup form
        this.icon = ''; // popup window icon
        this.title = ''; // popup window title
        this.saveBtnText = this.translationService.translate('gridSaveBtnText'); // popup save button text
        this.cancelBtnText = this.translationService.translate('gridCancelBtnText'); // popup cancel button text
        this.requiredTooltip = this.translationService.translate('gridRequiredTooltip'); // tooltip for required field
        this.editorDefaults = GRID_EDITORS_CONF; // default editor values
        this.editorTypes = GRID_DATA_TYPE; // types of special editors supported
        this.datePickerTypes = GRID_DATE_PICKER;
        this.autocompleteValues = {};
    }
    ngOnInit() {
        if (!this.isNew)
            this.newData = JSON.parse(JSON.stringify(this.data));
        var selectEditors = this.columns.filter((x) => x.getEditor() == GRID_DATA_TYPE.SELECT ||
            x.getEditor() == GRID_DATA_TYPE.AUTOCOMPLETE);
        selectEditors.forEach((element) => {
            if (element.getEditorSettings().getServerDataSource() == true) {
                this.subscriptions.push(this.http
                    .get(element.getEditorSettings().getServerEndpoint())
                    .subscribe((data) => {
                    element._Editor._DataSource = data;
                }));
            }
        });
    }
    ngAfterViewInit() {
        var _a, _b, _c, _d, _e;
        // set up of popup window special styles
        var windows = document.getElementsByClassName('popup-window');
        for (let index = 0; index < windows.length; index++) {
            const window = windows[index];
            (_b = (_a = window.children[0]) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.add('popup-card');
            if (window.children[0].children.length >= 2)
                (_c = window.children[0].children[1].classList) === null || _c === void 0 ? void 0 : _c.add('popup-card-body');
            var element = window.children[0].children[0].children;
            for (var i = 0; i < element.length; i++) {
                if (element[i].className == 'buttons') {
                    for (let index = 0; index < element[i].children.length; index++) {
                        const child = element[i].children[index];
                        child.classList.remove('shape-rectangle');
                        child.classList.add('shape-round');
                    }
                    (_d = element[i].lastElementChild) === null || _d === void 0 ? void 0 : _d.classList.remove('appearance-ghost');
                    (_e = element[i].lastElementChild) === null || _e === void 0 ? void 0 : _e.classList.add('appearance-hero');
                }
            }
        }
        this.icon = this.isNew ? 'plus-circle-outline' : 'edit-outline';
        this.title = this.ref.config.title;
        this.ref.config.titleTemplate = this.titleTemplate;
        this.validatePopupForm();
    }
    ngOnDestroy() {
        this.subscriptions.forEach((element) => {
            element.unsubscribe();
        });
    }
    //------------------------------------------------------ PRIVATE METHODS ---------------------------------------------------------------
    //------------------------------------------------------ DOM LISTENERS -----------------------------------------------------------
    openDatepicker(ref) {
        ref.focus();
    }
    onClickCancel() {
        this.ref.close(false);
    }
    /*
      Configures newData object based on settings provided.
      Closes popup on save click and returns new data provided in popup form and old data if edit record mode.
    */
    onClickSave() {
        var result = {
            data: this.data,
            newData: this.newData,
        };
        this.ref.close(result);
    }
    onDateChange(col, value) { }
    onTimeChange(col, value) { }
    onRangeChange(col, value) { }
    /*
      Checks editor min and max values if editor type is number.
    */
    texboxOnInput(event, col) { }
    /*
      Emits fileMenuItemClickEvent with data about menu item click and row data.
      If delete item clicked then pop newData files array.
    */
    onFileMenuItemClick(editor, item) {
        GridPopup.emitFileMenuItemClickEvent({
            menuItem: item,
            rowData: this.data,
        });
        if (item.data.code == FILE_MENU_CODES.DELETE) {
            if (editor.multiple && editor.fileSettings.listOfFiles) {
                this.newData[editor.id].splice(this.newData[editor.id].indexOf(item.data.file), 1);
                editor.maxFiles =
                    editor.maxFilesInitial - this.newData[editor.id].length;
            }
            else
                this.newData[editor.id] = undefined;
        }
    }
    onFilepickerUpload(files) {
        this.uploadedFiles = files;
        this.validatePopupForm();
    }
    validatePopupForm() {
        var isValid = GridValidationService.validate(this.columns, this.newData);
        this.saveButton.disabled = !isValid;
    }
    onKeyPress(column, event) {
        if (column.getEditorSettings().getLettersDisabled())
            return event.charCode == 8 || event.charCode == 0
                ? null
                : event.charCode >= 48 && event.charCode <= 57;
        else
            return null;
    }
}
PopupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: PopupComponent, deps: [{ token: i1.NbWindowRef }, { token: i1$1.HttpClient }, { token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
PopupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: PopupComponent, selector: "ngx-popup", viewQueries: [{ propertyName: "titleTemplate", first: true, predicate: ["titleTemplate"], descendants: true }, { propertyName: "saveButton", first: true, predicate: ["formSaveButton"], descendants: true }], ngImport: i0, template: "<div class=\"popup-content\">\r\n  <form #form=\"ngForm\">\r\n    <div class=\"row\">\r\n      <div\r\n        *ngFor=\"let column of columns\"\r\n        [ngClass]=\"column.getEditorSettings().getWidthClass()\"\r\n        [hidden]=\"\r\n          column.getEditor() == editorTypes.ACTION\r\n            ? true\r\n            : !column.getEditorSettings().getShow()\r\n        \"\r\n        class=\"form-group\"\r\n      >\r\n        <div class=\"label\">\r\n          {{ column.getEditorSettings().getLabel()\r\n          }}<nb-icon\r\n            pack=\"eva\"\r\n            icon=\"alert-circle-outline\"\r\n            status=\"danger\"\r\n            *ngIf=\"column.getEditorSettings().getRequired()\"\r\n            size=\"small\"\r\n            class=\"ms-1 required-mark\"\r\n            [nbTooltip]=\"requiredTooltip\"\r\n          ></nb-icon>\r\n        </div>\r\n        <div class=\"value\" [ngSwitch]=\"column.getEditor()\">\r\n          <nb-select\r\n            *ngSwitchCase=\"editorTypes.SELECT\"\r\n            fullWidth\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [name]=\"column.getDataField()\"\r\n            [(selected)]=\"newData[column.getDataField()]\"\r\n            (selectedChange)=\"validatePopupForm()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n          >\r\n            <nb-option\r\n              *ngFor=\"let option of column.getEditorSettings().getDataSource()\"\r\n              [value]=\"option[column.getEditorSettings().getKeyExpression()]\"\r\n            >\r\n              {{\r\n                option[column.getEditorSettings().getDisplayExpression()]\r\n              }}</nb-option\r\n            >\r\n          </nb-select>\r\n          <nb-checkbox\r\n            *ngSwitchCase=\"editorTypes.CHECKBOX\"\r\n            status=\"primary\"\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [(ngModel)]=\"newData[column.getDataField()]\"\r\n            (checkedChange)=\"validatePopupForm()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            [name]=\"column.getDataField()\"\r\n          >\r\n          </nb-checkbox>\r\n          <nb-toggle\r\n            *ngSwitchCase=\"editorTypes.TOGGLE\"\r\n            status=\"primary\"\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [name]=\"column.getDataField()\"\r\n            [(ngModel)]=\"newData[column.getDataField()]\"\r\n            (checkedChange)=\"validatePopupForm()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n          >\r\n          </nb-toggle>\r\n          <ng-container *ngSwitchCase=\"editorTypes.DATE_PICKER\">\r\n            <nb-form-field *ngIf=\"datePickerTypes.DATE\">\r\n              <input\r\n                nbInput\r\n                [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n                [nbDatepicker]=\"datepicker\"\r\n                fullWidth\r\n                #datepickerInput\r\n                [(ngModel)]=\"newData[column.getDataField()]\"\r\n                [name]=\"column.getDataField()\"\r\n                [disabled]=\"\r\n                  isNew ? !column.getAddable() : !column.getEditable()\r\n                \"\r\n              />\r\n              <button\r\n                nbButton\r\n                nbSuffix\r\n                ghost\r\n                status=\"primary\"\r\n                (click)=\"openDatepicker(datepickerInput)\"\r\n              >\r\n                <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n              </button>\r\n              <nb-datepicker\r\n                #datepicker\r\n                format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n                [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n                (dateChange)=\"onDateChange(column, $event)\"\r\n                [showNavigation]=\"\r\n                  column.getEditorSettings().getShowNavigation()\r\n                \"\r\n                [showWeekNumber]=\"\r\n                  column.getEditorSettings().getShowWeekNumbers()\r\n                \"\r\n              >\r\n              </nb-datepicker>\r\n            </nb-form-field>\r\n\r\n            <nb-form-field *ngIf=\"datePickerTypes.DATE_TIME\">\r\n              <input\r\n                nbInput\r\n                [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n                [name]=\"column.getDataField()\"\r\n                [nbDatepicker]=\"dateTimePicker\"\r\n                [(ngModel)]=\"newData[column.getDataField()]\"\r\n                fullWidth\r\n                #datetimepickerInput\r\n                [disabled]=\"\r\n                  isNew ? !column.getAddable() : !column.getEditable()\r\n                \"\r\n              />\r\n              <button\r\n                nbButton\r\n                nbSuffix\r\n                ghost\r\n                status=\"primary\"\r\n                (click)=\"openDatepicker(datetimepickerInput)\"\r\n              >\r\n                <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n              </button>\r\n              <nb-date-timepicker\r\n                #dateTimePicker\r\n                format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n                [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n                (dateTimeChange)=\"onDateChange(column, $event)\"\r\n                [showNavigation]=\"\r\n                  column.getEditorSettings().getShowNavigation()\r\n                \"\r\n                [showWeekNumber]=\"\r\n                  column.getEditorSettings().getShowWeekNumbers()\r\n                \"\r\n                [singleColumn]=\"column.getEditorSettings().getSingleColumn()\"\r\n                [withSeconds]=\"column.getEditorSettings().getShowSeconds()\"\r\n                [twelveHoursFormat]=\"\r\n                  column.getEditorSettings().getTwelveHoursFormat()\r\n                \"\r\n                [step]=\"column.getEditorSettings().getTimeStep()\"\r\n              >\r\n              </nb-date-timepicker>\r\n            </nb-form-field>\r\n            <nb-form-field *ngIf=\"datePickerTypes.TIME\">\r\n              <input\r\n                nbInput\r\n                [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n                [nbTimepicker]=\"timePicker\"\r\n                fullWidth\r\n                #timepickerInput\r\n                [(ngModel)]=\"newData[column.getDataField()]\"\r\n                [name]=\"column.getDataField()\"\r\n                [disabled]=\"\r\n                  isNew ? !column.getAddable() : !column.getEditable()\r\n                \"\r\n              />\r\n              <button\r\n                nbButton\r\n                nbSuffix\r\n                ghost\r\n                status=\"primary\"\r\n                (click)=\"openDatepicker(timepickerInput)\"\r\n              >\r\n                <nb-icon pack=\"eva\" icon=\"clock-outline\"></nb-icon>\r\n              </button>\r\n              <nb-timepicker\r\n                #timePicker\r\n                timeFormat=\"{{ column.getEditorSettings().getFormat() }}\"\r\n                [ampmText]=\"column.getEditorSettings().getTimeText()\"\r\n                [applyButtonText]=\"\r\n                  column.getEditorSettings().getApplyButtonText()\r\n                \"\r\n                [currentTimeButtonText]=\"\r\n                  column.getEditorSettings().getCurrentTimeButtonText()\r\n                \"\r\n                [hoursText]=\"column.getEditorSettings().getHoursText()\"\r\n                [minutesText]=\"column.getEditorSettings().getMinutesText()\"\r\n                [secondsText]=\"column.getEditorSettings().getSecondsText()\"\r\n                [showFooter]=\"column.getEditorSettings().getShowFooter()\"\r\n                [singleColumn]=\"column.getEditorSettings().getSingleColumn()\"\r\n                [step]=\"column.getEditorSettings().getTimeStep()\"\r\n                [twelveHoursFormat]=\"\r\n                  column.getEditorSettings().getTwelveHoursFormat()\r\n                \"\r\n                [withSeconds]=\"column.getEditorSettings().getShowSeconds()\"\r\n                [title]=\"column.getEditorSettings().getTimeText()\"\r\n                (onSelectTime)=\"onTimeChange(column, $event)\"\r\n              >\r\n              </nb-timepicker>\r\n            </nb-form-field>\r\n\r\n            <nb-form-field *ngIf=\"datePickerTypes.DATE_RANGE\">\r\n              <input\r\n                nbInput\r\n                [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n                [name]=\"column.getDataField()\"\r\n                [nbDatepicker]=\"dateTimeRangePicker\"\r\n                fullWidth\r\n                #daterangepickerInput\r\n                [(ngModel)]=\"newData[column.getDataField()]\"\r\n                [disabled]=\"\r\n                  isNew ? !column.getAddable() : !column.getEditable()\r\n                \"\r\n              />\r\n              <button\r\n                nbButton\r\n                nbSuffix\r\n                ghost\r\n                status=\"primary\"\r\n                (click)=\"openDatepicker(daterangepickerInput)\"\r\n              >\r\n                <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n              </button>\r\n              <nb-rangepicker\r\n                #dateTimeRangePicker\r\n                format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n                [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n                (rangeChange)=\"onRangeChange(column, $event)\"\r\n                [showNavigation]=\"\r\n                  column.getEditorSettings().getShowNavigation()\r\n                \"\r\n                [showWeekNumber]=\"\r\n                  column.getEditorSettings().getShowWeekNumbers()\r\n                \"\r\n              >\r\n              </nb-rangepicker>\r\n            </nb-form-field>\r\n          </ng-container>\r\n\r\n          <nb-form-field\r\n            *ngSwitchCase=\"editorTypes.TEXTAREA\"\r\n            class=\"textarea-container\"\r\n          >\r\n            <textarea\r\n              [name]=\"column.getDataField()\"\r\n              nbInput\r\n              fullWidth\r\n              [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n              [(ngModel)]=\"newData[column.getDataField()]\"\r\n              [rows]=\"column.getEditorSettings().getRows()\"\r\n              [maxLength]=\"column.getEditorSettings().getMax()\"\r\n              (ngModelChange)=\"validatePopupForm()\"\r\n              [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            ></textarea>\r\n            <div class=\"counter text-hint\">\r\n              {{\r\n                newData[column.getDataField()]\r\n                  ? newData[column.getDataField()].length\r\n                  : 0\r\n              }}/{{ column.getEditorSettings().getMax() }}\r\n            </div>\r\n          </nb-form-field>\r\n\r\n          <input\r\n            *ngSwitchCase=\"editorTypes.TEXTBOX\"\r\n            [type]=\"column.getEditorSettings().getTextboxType()\"\r\n            nbInput\r\n            fullWidth\r\n            [name]=\"column.getDataField()\"\r\n            [(ngModel)]=\"newData[column.getDataField()]\"\r\n            [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [step]=\"column.getEditorSettings().getTimeStep()\"\r\n            [min]=\"column.getEditorSettings().getMin()\"\r\n            [max]=\"column.getEditorSettings().getMax()\"\r\n            (ngModelChange)=\"validatePopupForm()\"\r\n            (keypress)=\"onKeyPress(column, $event)\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n          />\r\n\r\n          <input\r\n            *ngSwitchCase=\"editorTypes.NUMBERBOX\"\r\n            [type]=\"'number'\"\r\n            nbInput\r\n            fullWidth\r\n            [name]=\"column.getDataField()\"\r\n            [(ngModel)]=\"newData[column.getDataField()]\"\r\n            [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [step]=\"column.getEditorSettings().getTimeStep()\"\r\n            [min]=\"column.getEditorSettings().getMin()\"\r\n            [max]=\"column.getEditorSettings().getMax()\"\r\n            (ngModelChange)=\"validatePopupForm()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n          />\r\n          <div\r\n            *ngSwitchCase=\"editorTypes.PROGRESSBAR\"\r\n            class=\"progressbar-container\"\r\n          >\r\n            <nb-actions size=\"small\">\r\n              <nb-action icon=\"minus-outline\"> </nb-action>\r\n            </nb-actions>\r\n            <nb-progress-bar\r\n              [value]=\"newData[column.getDataField()]\"\r\n              [nbTooltip]=\"newData[column.getDataField()] + '%'\"\r\n            >\r\n            </nb-progress-bar>\r\n            <nb-actions size=\"small\">\r\n              <nb-action icon=\"plus-outline\"> </nb-action>\r\n            </nb-actions>\r\n          </div>\r\n\r\n          <ngx-colors\r\n            *ngSwitchCase=\"editorTypes.COLORPICKER\"\r\n            [name]=\"column.getDataField()\"\r\n            ngx-colors-trigger\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [(ngModel)]=\"newData[column.getDataField()]\"\r\n            (ngModelChange)=\"validatePopupForm()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n          ></ngx-colors>\r\n\r\n          <ngx-tags-autocomplete\r\n            *ngSwitchCase=\"editorTypes.AUTOCOMPLETE\"\r\n            [emptyPlaceholder]=\"column.getEditorSettings().getLabel()\"\r\n            [(selectedKeys)]=\"newData[column.getDataField()]\"\r\n            (onSelectionChanged)=\"validatePopupForm()\"\r\n            [keyAttribute]=\"column.getEditorSettings().getKeyExpression()\"\r\n            [displayArrow]=\"column.getEditorSettings().getDisplayArrow()\"\r\n            [attributesToFilter]=\"\r\n              column.getEditorSettings().getAttributesToFilter()\r\n            \"\r\n            [attributesToShow]=\"\r\n              column.getEditorSettings().getAttributesToShow()\r\n            \"\r\n            [attributesToShowInTag]=\"\r\n              column.getEditorSettings().getAttributesToShowInTag()\r\n            \"\r\n            [multiple]=\"column.getEditorSettings().getMultiple()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            [source]=\"column.getEditorSettings().getDataSource()\"\r\n          >\r\n          </ngx-tags-autocomplete>\r\n          <!--\r\n          <div *ngSwitchCase=\"editorTypes.FILE\">\r\n            <ng-container\r\n              *ngIf=\"\r\n                column.getEditorSettings().fileSettings.listOfFiles;\r\n                then multipleFiles;\r\n                else singleFile\r\n              \"\r\n            >\r\n            </ng-container>\r\n            <ng-template #singleFile>\r\n              <div class=\"row m-0 mt-2\" *ngIf=\"newData[column.getDataField()]\">\r\n                <div\r\n                  class=\"p-0\"\r\n                  [ngClass]=\"\r\n                    column.getEditorSettings().fileSettings.widthClass\r\n                      ? column.getEditorSettings().fileSettings.widthClass\r\n                      : column.getEditorSettings()Defaults.widthClass\r\n                  \"\r\n                >\r\n                  <ngx-file-card\r\n                    [fileData]=\"newData[column.getDataField()]\"\r\n                    [authorTitle]=\"\r\n                      column.getEditorSettings().fileSettings.authorTitle\r\n                    \"\r\n                    [canDelete]=\"\r\n                      column.getEditorSettings().fileSettings.canDelete\r\n                    \"\r\n                    [canDownload]=\"\r\n                      column.getEditorSettings().fileSettings.canDownload\r\n                    \"\r\n                    [canPreview]=\"\r\n                      column.getEditorSettings().fileSettings.canPreview\r\n                    \"\r\n                    [custumFileActions]=\"\r\n                      column.getEditorSettings().fileSettings.customFileActions\r\n                    \"\r\n                    [dateTitle]=\"\r\n                      column.getEditorSettings().fileSettings.dateTitle\r\n                    \"\r\n                    [deleteTitle]=\"\r\n                      column.getEditorSettings().fileSettings.deleteTitle\r\n                    \"\r\n                    [detailsEnabled]=\"\r\n                      column.getEditorSettings().fileSettings.detailsEnabled\r\n                    \"\r\n                    [downloadTitle]=\"\r\n                      column.getEditorSettings().fileSettings.downloadTitle\r\n                    \"\r\n                    [extensionTitle]=\"\r\n                      column.getEditorSettings().fileSettings.extensionTitle\r\n                    \"\r\n                    [filenameTitle]=\"\r\n                      column.getEditorSettings().fileSettings.filenameTitle\r\n                    \"\r\n                    [mode]=\"column.getEditorSettings().fileSettings.mode\"\r\n                    [previewTitle]=\"\r\n                      column.getEditorSettings().fileSettings.previewTitle\r\n                    \"\r\n                    [sizeTitle]=\"\r\n                      column.getEditorSettings().fileSettings.sizeTitle\r\n                    \"\r\n                    [useCustomPreview]=\"\r\n                      column.getEditorSettings().fileSettings.useCustomPreview\r\n                    \"\r\n                    [fileFromServer]=\"\r\n                      column.getEditorSettings().fileSettings.fileFromServer\r\n                    \"\r\n                    [serverEndpoint]=\"\r\n                      column.getEditorSettings().fileSettings.serverEndpoint\r\n                    \"\r\n                    [bytesAttribute]=\"\r\n                      column.getEditorSettings().fileSettings.bytesAttribute\r\n                    \"\r\n                    [keyAttribute]=\"\r\n                      column.getEditorSettings().fileSettings.keyAttribute\r\n                    \"\r\n                    [useCustomDownload]=\"\r\n                      column.getEditorSettings().fileSettings.useCustomDownload\r\n                    \"\r\n                    (fileMenuItemClick)=\"\r\n                      onFileMenuItemClick(column.getEditorSettings(), $event)\r\n                    \"\r\n                  ></ngx-file-card>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n            <ng-template #multipleFiles>\r\n              <div class=\"row m-0 mt-2\" *ngIf=\"newData[column.getDataField()]\">\r\n                <div\r\n                  class=\"ps-0\"\r\n                  [ngClass]=\"\r\n                    column.getEditorSettings().fileSettings.widthClass\r\n                      ? column.getEditorSettings().fileSettings.widthClass\r\n                      : column.getEditorSettings()Defaults.widthClass\r\n                  \"\r\n                  *ngFor=\"let file of newData[column.getDataField()]\"\r\n                >\r\n                  <ngx-file-card\r\n                    [fileData]=\"file\"\r\n                    [authorTitle]=\"\r\n                      column.getEditorSettings().fileSettings.authorTitle\r\n                    \"\r\n                    [canDelete]=\"\r\n                      column.getEditorSettings().fileSettings.canDelete\r\n                    \"\r\n                    [canDownload]=\"\r\n                      column.getEditorSettings().fileSettings.canDownload\r\n                    \"\r\n                    [canPreview]=\"\r\n                      column.getEditorSettings().fileSettings.canPreview\r\n                    \"\r\n                    [custumFileActions]=\"\r\n                      column.getEditorSettings().fileSettings.customFileActions\r\n                    \"\r\n                    [dateTitle]=\"\r\n                      column.getEditorSettings().fileSettings.dateTitle\r\n                    \"\r\n                    [deleteTitle]=\"\r\n                      column.getEditorSettings().fileSettings.deleteTitle\r\n                    \"\r\n                    [detailsEnabled]=\"\r\n                      column.getEditorSettings().fileSettings.detailsEnabled\r\n                    \"\r\n                    [downloadTitle]=\"\r\n                      column.getEditorSettings().fileSettings.downloadTitle\r\n                    \"\r\n                    [extensionTitle]=\"\r\n                      column.getEditorSettings().fileSettings.extensionTitle\r\n                    \"\r\n                    [filenameTitle]=\"\r\n                      column.getEditorSettings().fileSettings.filenameTitle\r\n                    \"\r\n                    [mode]=\"column.getEditorSettings().fileSettings.mode\"\r\n                    [previewTitle]=\"\r\n                      column.getEditorSettings().fileSettings.previewTitle\r\n                    \"\r\n                    [sizeTitle]=\"\r\n                      column.getEditorSettings().fileSettings.sizeTitle\r\n                    \"\r\n                    [useCustomPreview]=\"\r\n                      column.getEditorSettings().fileSettings.useCustomPreview\r\n                    \"\r\n                    [fileFromServer]=\"\r\n                      column.getEditorSettings().fileSettings.fileFromServer\r\n                    \"\r\n                    [serverEndpoint]=\"\r\n                      column.getEditorSettings().fileSettings.serverEndpoint\r\n                    \"\r\n                    [bytesAttribute]=\"\r\n                      column.getEditorSettings().fileSettings.bytesAttribute\r\n                    \"\r\n                    [keyAttribute]=\"\r\n                      column.getEditorSettings().fileSettings.keyAttribute\r\n                    \"\r\n                    [useCustomDownload]=\"\r\n                      column.getEditorSettings().fileSettings.useCustomDownload\r\n                    \"\r\n                    (fileMenuItemClick)=\"\r\n                      onFileMenuItemClick(column.getEditorSettings(), $event)\r\n                    \"\r\n                  >\r\n                  </ngx-file-card>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n            <ng-container\r\n              *ngIf=\"\r\n                column.getEditorSettings().multiple;\r\n                then multiplePicker;\r\n                else singlePicker\r\n              \"\r\n            ></ng-container>\r\n            <ng-template #singlePicker>\r\n              <ngx-filepicker\r\n                *ngIf=\"!newData[column.getDataField()]\"\r\n                [accept]=\"column.getEditorSettings().accept\"\r\n                [allowedFilesPlaceholder]=\"\r\n                  column.getEditorSettings().allowedFilesPlaceholder\r\n                \"\r\n                [buttonPlaceholder]=\"\r\n                  column.getEditorSettings().buttonPlaceholder\r\n                \"\r\n                [disabled]=\"\r\n                  column.getcolumn.getEditorSettings()Settings().getDisabled()\r\n                \"\r\n                [displayFileSize]=\"column.getEditorSettings().displayFileSize\"\r\n                [emptyPlaceholder]=\"column.getEditorSettings().emptyPlaceholder\"\r\n                [maxFiles]=\"column.getEditorSettings().maxFiles\"\r\n                [maxFilesPlaceholder]=\"\r\n                  column.getEditorSettings().maxFilesPlaceholder\r\n                \"\r\n                [maxFilesWarningMessage]=\"\r\n                  column.getEditorSettings().maxFilesWarningMessage\r\n                \"\r\n                [multiple]=\"column.getEditorSettings().multiple\"\r\n                [showAcceptedFormats]=\"\r\n                  column.getEditorSettings().showAcceptedFormats\r\n                \"\r\n                [showMaxFilesNumber]=\"\r\n                  column.getEditorSettings().showMaxFilesNumber\r\n                \"\r\n                (valueChanged)=\"onFilepickerUpload($event)\"\r\n              >\r\n              </ngx-filepicker>\r\n            </ng-template>\r\n            <ng-template #multiplePicker>\r\n              <ngx-filepicker\r\n                *ngIf=\"column.getEditorSettings().maxFiles != 0\"\r\n                [accept]=\"column.getEditorSettings().accept\"\r\n                [allowedFilesPlaceholder]=\"\r\n                  column.getEditorSettings().allowedFilesPlaceholder\r\n                \"\r\n                [buttonPlaceholder]=\"\r\n                  column.getEditorSettings().buttonPlaceholder\r\n                \"\r\n                [disabled]=\"\r\n                  column.getcolumn.getEditorSettings()Settings().getDisabled()\r\n                \"\r\n                [displayFileSize]=\"column.getEditorSettings().displayFileSize\"\r\n                [emptyPlaceholder]=\"column.getEditorSettings().emptyPlaceholder\"\r\n                [maxFiles]=\"column.getEditorSettings().maxFiles\"\r\n                [maxFilesPlaceholder]=\"\r\n                  column.getEditorSettings().maxFilesPlaceholder\r\n                \"\r\n                [maxFilesWarningMessage]=\"\r\n                  column.getEditorSettings().maxFilesWarningMessage\r\n                \"\r\n                [multiple]=\"column.getEditorSettings().multiple\"\r\n                [showAcceptedFormats]=\"\r\n                  column.getEditorSettings().showAcceptedFormats\r\n                \"\r\n                [showMaxFilesNumber]=\"\r\n                  column.getEditorSettings().showMaxFilesNumber\r\n                \"\r\n                (valueChanged)=\"onFilepickerUpload($event)\"\r\n              >\r\n              </ngx-filepicker>\r\n                </ng-template>\r\n                  </div>\r\n            -->\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n\r\n<div class=\"popup-footer\">\r\n  <div class=\"row line\"></div>\r\n  <div class=\"row\">\r\n    <div class=\"d-flex justify-content-end p-3\">\r\n      <button\r\n        nbButton\r\n        ghost\r\n        shape=\"round\"\r\n        class=\"me-2\"\r\n        (click)=\"onClickCancel()\"\r\n      >\r\n        {{ cancelBtnText }}\r\n      </button>\r\n      <button\r\n        nbButton\r\n        #formSaveButton\r\n        status=\"primary\"\r\n        shape=\"round\"\r\n        (click)=\"onClickSave()\"\r\n      >\r\n        {{ saveBtnText }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<ng-template #titleTemplate>\r\n  <div class=\"d-flex title-template\">\r\n    <nb-icon pack=\"eva\" [icon]=\"icon\" status=\"basic\"></nb-icon>\r\n    <div class=\"title\">{{ title }}</div>\r\n  </div>\r\n</ng-template>\r\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */.form-group{padding:.5rem}.form-group .label{margin-bottom:.5rem}::ng-deep .popup-window nb-card-header .buttons button:last-child{position:absolute;top:-15px;right:-20px}::ng-deep .popup-window.minimized nb-card-header .buttons button:last-child{position:initial}::ng-deep .popup-window.maximized nb-card-header .buttons button:last-child{position:initial}::ng-deep .popup-window .popup-card{border-top-left-radius:1.5rem;border-bottom-left-radius:1.5rem;border-bottom-right-radius:1.5rem}::ng-deep .popup-window .popup-card .popup-card-body{padding-left:0;padding-right:0;overflow:hidden}::ng-deep .popup-window .popup-card .popup-content{max-height:60vh;overflow-y:auto;overflow-x:hidden;padding:0rem 2em 1rem}::ng-deep .popup-window .popup-card .popup-footer{padding:0rem 2rem}.title{font-size:17px;font-weight:700}.title-template{align-items:center}.title-template nb-icon{font-size:1.7rem;margin-right:.5rem}:host .line{border-bottom:2px solid var(--input-basic-border-color)}:host .textarea-container .counter{display:flex;justify-content:flex-end;font-weight:600}:host ::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width)}:host ::-webkit-scrollbar-thumb{background:var(--scrollbar-color);border-radius:10px}:host ::-webkit-scrollbar-thumb:hover{background:var(--color-basic-500)}.progressbar-container{display:flex;align-items:center}.progressbar-container nb-progress-bar{flex:1}.required-mark{font-size:16px}\n"], dependencies: [{ kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i1.NbTooltipDirective, selector: "[nbTooltip]", inputs: ["nbTooltip", "nbTooltipPlacement", "nbTooltipAdjustment", "nbTooltipClass", "nbTooltipIcon", "nbTooltipStatus", "nbTooltipTrigger", "nbTooltipOffset", "nbTooltipDisabled"], outputs: ["nbTooltipShowStateChange"], exportAs: ["nbTooltip"] }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i1.NbCheckboxComponent, selector: "nb-checkbox", inputs: ["checked", "disabled", "status", "indeterminate"], outputs: ["checkedChange"] }, { kind: "directive", type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i5.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i1.NbSelectComponent, selector: "nb-select", inputs: ["size", "status", "shape", "appearance", "optionsListClass", "optionsPanelClass", "optionsWidth", "outline", "filled", "hero", "disabled", "fullWidth", "placeholder", "compareWith", "selected", "multiple", "optionsOverlayOffset", "scrollStrategy"], outputs: ["selectedChange"] }, { kind: "component", type: i1.NbOptionComponent, selector: "nb-option", inputs: ["value", "disabled"], outputs: ["selectionChange"] }, { kind: "component", type: i1.NbProgressBarComponent, selector: "nb-progress-bar", inputs: ["value", "status", "size", "displayValue"] }, { kind: "component", type: i1.NbActionComponent, selector: "nb-action", inputs: ["link", "href", "title", "icon", "disabled", "badgeDot", "badgeText", "badgeStatus", "badgePosition"] }, { kind: "component", type: i1.NbActionsComponent, selector: "nb-actions", inputs: ["size", "fullWidth"] }, { kind: "component", type: i1.NbToggleComponent, selector: "nb-toggle", inputs: ["checked", "disabled", "status", "labelPosition"], outputs: ["checkedChange"] }, { kind: "directive", type: i1.NbDatepickerDirective, selector: "input[nbDatepicker]", inputs: ["nbDatepicker"] }, { kind: "component", type: i1.NbDatepickerComponent, selector: "nb-datepicker", inputs: ["date"], outputs: ["dateChange"] }, { kind: "component", type: i1.NbRangepickerComponent, selector: "nb-rangepicker", inputs: ["range"], outputs: ["rangeChange"] }, { kind: "component", type: i1.NbDateTimePickerComponent, selector: "nb-date-timepicker", inputs: ["step", "title", "applyButtonText", "currentTimeButtonText", "showCurrentTimeButton", "twelveHoursFormat", "showAmPmLabel", "withSeconds", "singleColumn"], outputs: ["dateTimeChange"] }, { kind: "directive", type: i1.NbInputDirective, selector: "input[nbInput],textarea[nbInput]", inputs: ["fieldSize", "status", "shape", "fullWidth"] }, { kind: "component", type: i1.NbFormFieldComponent, selector: "nb-form-field" }, { kind: "directive", type: i1.NbSuffixDirective, selector: "[nbSuffix]" }, { kind: "component", type: i1.NbTimePickerComponent, selector: "nb-timepicker", inputs: ["timeFormat", "twelveHoursFormat", "showAmPmLabel", "withSeconds", "singleColumn", "step", "date", "showFooter", "applyButtonText", "hoursText", "minutesText", "secondsText", "ampmText", "currentTimeButtonText"], outputs: ["onSelectTime"], exportAs: ["nbTimepicker"] }, { kind: "directive", type: i1.NbTimePickerDirective, selector: "input[nbTimepicker]", inputs: ["nbTimepicker", "overlayOffset"] }, { kind: "component", type: i6.NgxColorsComponent, selector: "ngx-colors" }, { kind: "directive", type: i6.NgxColorsTriggerDirective, selector: "[ngx-colors-trigger]", inputs: ["colorsAnimation", "palette", "format", "formats", "position", "hideTextInput", "hideColorPicker", "attachTo", "overlayClassName", "colorPickerControls", "acceptLabel", "cancelLabel"], outputs: ["change", "input", "slider", "close", "open"] }, { kind: "component", type: TagsAutocompleteComponent, selector: "ngx-tags-autocomplete", inputs: ["source", "selectedKeys", "selectedItems", "keyAttribute", "attributesToShow", "attributesToShowInTag", "attributesToFilter", "emptyPlaceholder", "tagStatus", "tagAppereance", "inputWidthClass", "inputPlaceholder", "clearEnabled", "clearBtnTooltip", "expanded", "displayArrow", "displayNumSelected", "displayDots", "multiple", "floatingDroopDown", "disabled"], outputs: ["selectedKeysChange", "onSelectionChanged", "onOptionRemoved", "onSelectionCleared"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: PopupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-popup', template: "<div class=\"popup-content\">\r\n  <form #form=\"ngForm\">\r\n    <div class=\"row\">\r\n      <div\r\n        *ngFor=\"let column of columns\"\r\n        [ngClass]=\"column.getEditorSettings().getWidthClass()\"\r\n        [hidden]=\"\r\n          column.getEditor() == editorTypes.ACTION\r\n            ? true\r\n            : !column.getEditorSettings().getShow()\r\n        \"\r\n        class=\"form-group\"\r\n      >\r\n        <div class=\"label\">\r\n          {{ column.getEditorSettings().getLabel()\r\n          }}<nb-icon\r\n            pack=\"eva\"\r\n            icon=\"alert-circle-outline\"\r\n            status=\"danger\"\r\n            *ngIf=\"column.getEditorSettings().getRequired()\"\r\n            size=\"small\"\r\n            class=\"ms-1 required-mark\"\r\n            [nbTooltip]=\"requiredTooltip\"\r\n          ></nb-icon>\r\n        </div>\r\n        <div class=\"value\" [ngSwitch]=\"column.getEditor()\">\r\n          <nb-select\r\n            *ngSwitchCase=\"editorTypes.SELECT\"\r\n            fullWidth\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [name]=\"column.getDataField()\"\r\n            [(selected)]=\"newData[column.getDataField()]\"\r\n            (selectedChange)=\"validatePopupForm()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n          >\r\n            <nb-option\r\n              *ngFor=\"let option of column.getEditorSettings().getDataSource()\"\r\n              [value]=\"option[column.getEditorSettings().getKeyExpression()]\"\r\n            >\r\n              {{\r\n                option[column.getEditorSettings().getDisplayExpression()]\r\n              }}</nb-option\r\n            >\r\n          </nb-select>\r\n          <nb-checkbox\r\n            *ngSwitchCase=\"editorTypes.CHECKBOX\"\r\n            status=\"primary\"\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [(ngModel)]=\"newData[column.getDataField()]\"\r\n            (checkedChange)=\"validatePopupForm()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            [name]=\"column.getDataField()\"\r\n          >\r\n          </nb-checkbox>\r\n          <nb-toggle\r\n            *ngSwitchCase=\"editorTypes.TOGGLE\"\r\n            status=\"primary\"\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [name]=\"column.getDataField()\"\r\n            [(ngModel)]=\"newData[column.getDataField()]\"\r\n            (checkedChange)=\"validatePopupForm()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n          >\r\n          </nb-toggle>\r\n          <ng-container *ngSwitchCase=\"editorTypes.DATE_PICKER\">\r\n            <nb-form-field *ngIf=\"datePickerTypes.DATE\">\r\n              <input\r\n                nbInput\r\n                [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n                [nbDatepicker]=\"datepicker\"\r\n                fullWidth\r\n                #datepickerInput\r\n                [(ngModel)]=\"newData[column.getDataField()]\"\r\n                [name]=\"column.getDataField()\"\r\n                [disabled]=\"\r\n                  isNew ? !column.getAddable() : !column.getEditable()\r\n                \"\r\n              />\r\n              <button\r\n                nbButton\r\n                nbSuffix\r\n                ghost\r\n                status=\"primary\"\r\n                (click)=\"openDatepicker(datepickerInput)\"\r\n              >\r\n                <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n              </button>\r\n              <nb-datepicker\r\n                #datepicker\r\n                format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n                [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n                (dateChange)=\"onDateChange(column, $event)\"\r\n                [showNavigation]=\"\r\n                  column.getEditorSettings().getShowNavigation()\r\n                \"\r\n                [showWeekNumber]=\"\r\n                  column.getEditorSettings().getShowWeekNumbers()\r\n                \"\r\n              >\r\n              </nb-datepicker>\r\n            </nb-form-field>\r\n\r\n            <nb-form-field *ngIf=\"datePickerTypes.DATE_TIME\">\r\n              <input\r\n                nbInput\r\n                [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n                [name]=\"column.getDataField()\"\r\n                [nbDatepicker]=\"dateTimePicker\"\r\n                [(ngModel)]=\"newData[column.getDataField()]\"\r\n                fullWidth\r\n                #datetimepickerInput\r\n                [disabled]=\"\r\n                  isNew ? !column.getAddable() : !column.getEditable()\r\n                \"\r\n              />\r\n              <button\r\n                nbButton\r\n                nbSuffix\r\n                ghost\r\n                status=\"primary\"\r\n                (click)=\"openDatepicker(datetimepickerInput)\"\r\n              >\r\n                <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n              </button>\r\n              <nb-date-timepicker\r\n                #dateTimePicker\r\n                format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n                [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n                (dateTimeChange)=\"onDateChange(column, $event)\"\r\n                [showNavigation]=\"\r\n                  column.getEditorSettings().getShowNavigation()\r\n                \"\r\n                [showWeekNumber]=\"\r\n                  column.getEditorSettings().getShowWeekNumbers()\r\n                \"\r\n                [singleColumn]=\"column.getEditorSettings().getSingleColumn()\"\r\n                [withSeconds]=\"column.getEditorSettings().getShowSeconds()\"\r\n                [twelveHoursFormat]=\"\r\n                  column.getEditorSettings().getTwelveHoursFormat()\r\n                \"\r\n                [step]=\"column.getEditorSettings().getTimeStep()\"\r\n              >\r\n              </nb-date-timepicker>\r\n            </nb-form-field>\r\n            <nb-form-field *ngIf=\"datePickerTypes.TIME\">\r\n              <input\r\n                nbInput\r\n                [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n                [nbTimepicker]=\"timePicker\"\r\n                fullWidth\r\n                #timepickerInput\r\n                [(ngModel)]=\"newData[column.getDataField()]\"\r\n                [name]=\"column.getDataField()\"\r\n                [disabled]=\"\r\n                  isNew ? !column.getAddable() : !column.getEditable()\r\n                \"\r\n              />\r\n              <button\r\n                nbButton\r\n                nbSuffix\r\n                ghost\r\n                status=\"primary\"\r\n                (click)=\"openDatepicker(timepickerInput)\"\r\n              >\r\n                <nb-icon pack=\"eva\" icon=\"clock-outline\"></nb-icon>\r\n              </button>\r\n              <nb-timepicker\r\n                #timePicker\r\n                timeFormat=\"{{ column.getEditorSettings().getFormat() }}\"\r\n                [ampmText]=\"column.getEditorSettings().getTimeText()\"\r\n                [applyButtonText]=\"\r\n                  column.getEditorSettings().getApplyButtonText()\r\n                \"\r\n                [currentTimeButtonText]=\"\r\n                  column.getEditorSettings().getCurrentTimeButtonText()\r\n                \"\r\n                [hoursText]=\"column.getEditorSettings().getHoursText()\"\r\n                [minutesText]=\"column.getEditorSettings().getMinutesText()\"\r\n                [secondsText]=\"column.getEditorSettings().getSecondsText()\"\r\n                [showFooter]=\"column.getEditorSettings().getShowFooter()\"\r\n                [singleColumn]=\"column.getEditorSettings().getSingleColumn()\"\r\n                [step]=\"column.getEditorSettings().getTimeStep()\"\r\n                [twelveHoursFormat]=\"\r\n                  column.getEditorSettings().getTwelveHoursFormat()\r\n                \"\r\n                [withSeconds]=\"column.getEditorSettings().getShowSeconds()\"\r\n                [title]=\"column.getEditorSettings().getTimeText()\"\r\n                (onSelectTime)=\"onTimeChange(column, $event)\"\r\n              >\r\n              </nb-timepicker>\r\n            </nb-form-field>\r\n\r\n            <nb-form-field *ngIf=\"datePickerTypes.DATE_RANGE\">\r\n              <input\r\n                nbInput\r\n                [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n                [name]=\"column.getDataField()\"\r\n                [nbDatepicker]=\"dateTimeRangePicker\"\r\n                fullWidth\r\n                #daterangepickerInput\r\n                [(ngModel)]=\"newData[column.getDataField()]\"\r\n                [disabled]=\"\r\n                  isNew ? !column.getAddable() : !column.getEditable()\r\n                \"\r\n              />\r\n              <button\r\n                nbButton\r\n                nbSuffix\r\n                ghost\r\n                status=\"primary\"\r\n                (click)=\"openDatepicker(daterangepickerInput)\"\r\n              >\r\n                <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n              </button>\r\n              <nb-rangepicker\r\n                #dateTimeRangePicker\r\n                format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n                [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n                (rangeChange)=\"onRangeChange(column, $event)\"\r\n                [showNavigation]=\"\r\n                  column.getEditorSettings().getShowNavigation()\r\n                \"\r\n                [showWeekNumber]=\"\r\n                  column.getEditorSettings().getShowWeekNumbers()\r\n                \"\r\n              >\r\n              </nb-rangepicker>\r\n            </nb-form-field>\r\n          </ng-container>\r\n\r\n          <nb-form-field\r\n            *ngSwitchCase=\"editorTypes.TEXTAREA\"\r\n            class=\"textarea-container\"\r\n          >\r\n            <textarea\r\n              [name]=\"column.getDataField()\"\r\n              nbInput\r\n              fullWidth\r\n              [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n              [(ngModel)]=\"newData[column.getDataField()]\"\r\n              [rows]=\"column.getEditorSettings().getRows()\"\r\n              [maxLength]=\"column.getEditorSettings().getMax()\"\r\n              (ngModelChange)=\"validatePopupForm()\"\r\n              [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            ></textarea>\r\n            <div class=\"counter text-hint\">\r\n              {{\r\n                newData[column.getDataField()]\r\n                  ? newData[column.getDataField()].length\r\n                  : 0\r\n              }}/{{ column.getEditorSettings().getMax() }}\r\n            </div>\r\n          </nb-form-field>\r\n\r\n          <input\r\n            *ngSwitchCase=\"editorTypes.TEXTBOX\"\r\n            [type]=\"column.getEditorSettings().getTextboxType()\"\r\n            nbInput\r\n            fullWidth\r\n            [name]=\"column.getDataField()\"\r\n            [(ngModel)]=\"newData[column.getDataField()]\"\r\n            [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [step]=\"column.getEditorSettings().getTimeStep()\"\r\n            [min]=\"column.getEditorSettings().getMin()\"\r\n            [max]=\"column.getEditorSettings().getMax()\"\r\n            (ngModelChange)=\"validatePopupForm()\"\r\n            (keypress)=\"onKeyPress(column, $event)\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n          />\r\n\r\n          <input\r\n            *ngSwitchCase=\"editorTypes.NUMBERBOX\"\r\n            [type]=\"'number'\"\r\n            nbInput\r\n            fullWidth\r\n            [name]=\"column.getDataField()\"\r\n            [(ngModel)]=\"newData[column.getDataField()]\"\r\n            [placeholder]=\"column.getEditorSettings().getLabel()\"\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [step]=\"column.getEditorSettings().getTimeStep()\"\r\n            [min]=\"column.getEditorSettings().getMin()\"\r\n            [max]=\"column.getEditorSettings().getMax()\"\r\n            (ngModelChange)=\"validatePopupForm()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n          />\r\n          <div\r\n            *ngSwitchCase=\"editorTypes.PROGRESSBAR\"\r\n            class=\"progressbar-container\"\r\n          >\r\n            <nb-actions size=\"small\">\r\n              <nb-action icon=\"minus-outline\"> </nb-action>\r\n            </nb-actions>\r\n            <nb-progress-bar\r\n              [value]=\"newData[column.getDataField()]\"\r\n              [nbTooltip]=\"newData[column.getDataField()] + '%'\"\r\n            >\r\n            </nb-progress-bar>\r\n            <nb-actions size=\"small\">\r\n              <nb-action icon=\"plus-outline\"> </nb-action>\r\n            </nb-actions>\r\n          </div>\r\n\r\n          <ngx-colors\r\n            *ngSwitchCase=\"editorTypes.COLORPICKER\"\r\n            [name]=\"column.getDataField()\"\r\n            ngx-colors-trigger\r\n            [required]=\"column.getEditorSettings().getRequired()\"\r\n            [(ngModel)]=\"newData[column.getDataField()]\"\r\n            (ngModelChange)=\"validatePopupForm()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n          ></ngx-colors>\r\n\r\n          <ngx-tags-autocomplete\r\n            *ngSwitchCase=\"editorTypes.AUTOCOMPLETE\"\r\n            [emptyPlaceholder]=\"column.getEditorSettings().getLabel()\"\r\n            [(selectedKeys)]=\"newData[column.getDataField()]\"\r\n            (onSelectionChanged)=\"validatePopupForm()\"\r\n            [keyAttribute]=\"column.getEditorSettings().getKeyExpression()\"\r\n            [displayArrow]=\"column.getEditorSettings().getDisplayArrow()\"\r\n            [attributesToFilter]=\"\r\n              column.getEditorSettings().getAttributesToFilter()\r\n            \"\r\n            [attributesToShow]=\"\r\n              column.getEditorSettings().getAttributesToShow()\r\n            \"\r\n            [attributesToShowInTag]=\"\r\n              column.getEditorSettings().getAttributesToShowInTag()\r\n            \"\r\n            [multiple]=\"column.getEditorSettings().getMultiple()\"\r\n            [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            [source]=\"column.getEditorSettings().getDataSource()\"\r\n          >\r\n          </ngx-tags-autocomplete>\r\n          <!--\r\n          <div *ngSwitchCase=\"editorTypes.FILE\">\r\n            <ng-container\r\n              *ngIf=\"\r\n                column.getEditorSettings().fileSettings.listOfFiles;\r\n                then multipleFiles;\r\n                else singleFile\r\n              \"\r\n            >\r\n            </ng-container>\r\n            <ng-template #singleFile>\r\n              <div class=\"row m-0 mt-2\" *ngIf=\"newData[column.getDataField()]\">\r\n                <div\r\n                  class=\"p-0\"\r\n                  [ngClass]=\"\r\n                    column.getEditorSettings().fileSettings.widthClass\r\n                      ? column.getEditorSettings().fileSettings.widthClass\r\n                      : column.getEditorSettings()Defaults.widthClass\r\n                  \"\r\n                >\r\n                  <ngx-file-card\r\n                    [fileData]=\"newData[column.getDataField()]\"\r\n                    [authorTitle]=\"\r\n                      column.getEditorSettings().fileSettings.authorTitle\r\n                    \"\r\n                    [canDelete]=\"\r\n                      column.getEditorSettings().fileSettings.canDelete\r\n                    \"\r\n                    [canDownload]=\"\r\n                      column.getEditorSettings().fileSettings.canDownload\r\n                    \"\r\n                    [canPreview]=\"\r\n                      column.getEditorSettings().fileSettings.canPreview\r\n                    \"\r\n                    [custumFileActions]=\"\r\n                      column.getEditorSettings().fileSettings.customFileActions\r\n                    \"\r\n                    [dateTitle]=\"\r\n                      column.getEditorSettings().fileSettings.dateTitle\r\n                    \"\r\n                    [deleteTitle]=\"\r\n                      column.getEditorSettings().fileSettings.deleteTitle\r\n                    \"\r\n                    [detailsEnabled]=\"\r\n                      column.getEditorSettings().fileSettings.detailsEnabled\r\n                    \"\r\n                    [downloadTitle]=\"\r\n                      column.getEditorSettings().fileSettings.downloadTitle\r\n                    \"\r\n                    [extensionTitle]=\"\r\n                      column.getEditorSettings().fileSettings.extensionTitle\r\n                    \"\r\n                    [filenameTitle]=\"\r\n                      column.getEditorSettings().fileSettings.filenameTitle\r\n                    \"\r\n                    [mode]=\"column.getEditorSettings().fileSettings.mode\"\r\n                    [previewTitle]=\"\r\n                      column.getEditorSettings().fileSettings.previewTitle\r\n                    \"\r\n                    [sizeTitle]=\"\r\n                      column.getEditorSettings().fileSettings.sizeTitle\r\n                    \"\r\n                    [useCustomPreview]=\"\r\n                      column.getEditorSettings().fileSettings.useCustomPreview\r\n                    \"\r\n                    [fileFromServer]=\"\r\n                      column.getEditorSettings().fileSettings.fileFromServer\r\n                    \"\r\n                    [serverEndpoint]=\"\r\n                      column.getEditorSettings().fileSettings.serverEndpoint\r\n                    \"\r\n                    [bytesAttribute]=\"\r\n                      column.getEditorSettings().fileSettings.bytesAttribute\r\n                    \"\r\n                    [keyAttribute]=\"\r\n                      column.getEditorSettings().fileSettings.keyAttribute\r\n                    \"\r\n                    [useCustomDownload]=\"\r\n                      column.getEditorSettings().fileSettings.useCustomDownload\r\n                    \"\r\n                    (fileMenuItemClick)=\"\r\n                      onFileMenuItemClick(column.getEditorSettings(), $event)\r\n                    \"\r\n                  ></ngx-file-card>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n            <ng-template #multipleFiles>\r\n              <div class=\"row m-0 mt-2\" *ngIf=\"newData[column.getDataField()]\">\r\n                <div\r\n                  class=\"ps-0\"\r\n                  [ngClass]=\"\r\n                    column.getEditorSettings().fileSettings.widthClass\r\n                      ? column.getEditorSettings().fileSettings.widthClass\r\n                      : column.getEditorSettings()Defaults.widthClass\r\n                  \"\r\n                  *ngFor=\"let file of newData[column.getDataField()]\"\r\n                >\r\n                  <ngx-file-card\r\n                    [fileData]=\"file\"\r\n                    [authorTitle]=\"\r\n                      column.getEditorSettings().fileSettings.authorTitle\r\n                    \"\r\n                    [canDelete]=\"\r\n                      column.getEditorSettings().fileSettings.canDelete\r\n                    \"\r\n                    [canDownload]=\"\r\n                      column.getEditorSettings().fileSettings.canDownload\r\n                    \"\r\n                    [canPreview]=\"\r\n                      column.getEditorSettings().fileSettings.canPreview\r\n                    \"\r\n                    [custumFileActions]=\"\r\n                      column.getEditorSettings().fileSettings.customFileActions\r\n                    \"\r\n                    [dateTitle]=\"\r\n                      column.getEditorSettings().fileSettings.dateTitle\r\n                    \"\r\n                    [deleteTitle]=\"\r\n                      column.getEditorSettings().fileSettings.deleteTitle\r\n                    \"\r\n                    [detailsEnabled]=\"\r\n                      column.getEditorSettings().fileSettings.detailsEnabled\r\n                    \"\r\n                    [downloadTitle]=\"\r\n                      column.getEditorSettings().fileSettings.downloadTitle\r\n                    \"\r\n                    [extensionTitle]=\"\r\n                      column.getEditorSettings().fileSettings.extensionTitle\r\n                    \"\r\n                    [filenameTitle]=\"\r\n                      column.getEditorSettings().fileSettings.filenameTitle\r\n                    \"\r\n                    [mode]=\"column.getEditorSettings().fileSettings.mode\"\r\n                    [previewTitle]=\"\r\n                      column.getEditorSettings().fileSettings.previewTitle\r\n                    \"\r\n                    [sizeTitle]=\"\r\n                      column.getEditorSettings().fileSettings.sizeTitle\r\n                    \"\r\n                    [useCustomPreview]=\"\r\n                      column.getEditorSettings().fileSettings.useCustomPreview\r\n                    \"\r\n                    [fileFromServer]=\"\r\n                      column.getEditorSettings().fileSettings.fileFromServer\r\n                    \"\r\n                    [serverEndpoint]=\"\r\n                      column.getEditorSettings().fileSettings.serverEndpoint\r\n                    \"\r\n                    [bytesAttribute]=\"\r\n                      column.getEditorSettings().fileSettings.bytesAttribute\r\n                    \"\r\n                    [keyAttribute]=\"\r\n                      column.getEditorSettings().fileSettings.keyAttribute\r\n                    \"\r\n                    [useCustomDownload]=\"\r\n                      column.getEditorSettings().fileSettings.useCustomDownload\r\n                    \"\r\n                    (fileMenuItemClick)=\"\r\n                      onFileMenuItemClick(column.getEditorSettings(), $event)\r\n                    \"\r\n                  >\r\n                  </ngx-file-card>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n            <ng-container\r\n              *ngIf=\"\r\n                column.getEditorSettings().multiple;\r\n                then multiplePicker;\r\n                else singlePicker\r\n              \"\r\n            ></ng-container>\r\n            <ng-template #singlePicker>\r\n              <ngx-filepicker\r\n                *ngIf=\"!newData[column.getDataField()]\"\r\n                [accept]=\"column.getEditorSettings().accept\"\r\n                [allowedFilesPlaceholder]=\"\r\n                  column.getEditorSettings().allowedFilesPlaceholder\r\n                \"\r\n                [buttonPlaceholder]=\"\r\n                  column.getEditorSettings().buttonPlaceholder\r\n                \"\r\n                [disabled]=\"\r\n                  column.getcolumn.getEditorSettings()Settings().getDisabled()\r\n                \"\r\n                [displayFileSize]=\"column.getEditorSettings().displayFileSize\"\r\n                [emptyPlaceholder]=\"column.getEditorSettings().emptyPlaceholder\"\r\n                [maxFiles]=\"column.getEditorSettings().maxFiles\"\r\n                [maxFilesPlaceholder]=\"\r\n                  column.getEditorSettings().maxFilesPlaceholder\r\n                \"\r\n                [maxFilesWarningMessage]=\"\r\n                  column.getEditorSettings().maxFilesWarningMessage\r\n                \"\r\n                [multiple]=\"column.getEditorSettings().multiple\"\r\n                [showAcceptedFormats]=\"\r\n                  column.getEditorSettings().showAcceptedFormats\r\n                \"\r\n                [showMaxFilesNumber]=\"\r\n                  column.getEditorSettings().showMaxFilesNumber\r\n                \"\r\n                (valueChanged)=\"onFilepickerUpload($event)\"\r\n              >\r\n              </ngx-filepicker>\r\n            </ng-template>\r\n            <ng-template #multiplePicker>\r\n              <ngx-filepicker\r\n                *ngIf=\"column.getEditorSettings().maxFiles != 0\"\r\n                [accept]=\"column.getEditorSettings().accept\"\r\n                [allowedFilesPlaceholder]=\"\r\n                  column.getEditorSettings().allowedFilesPlaceholder\r\n                \"\r\n                [buttonPlaceholder]=\"\r\n                  column.getEditorSettings().buttonPlaceholder\r\n                \"\r\n                [disabled]=\"\r\n                  column.getcolumn.getEditorSettings()Settings().getDisabled()\r\n                \"\r\n                [displayFileSize]=\"column.getEditorSettings().displayFileSize\"\r\n                [emptyPlaceholder]=\"column.getEditorSettings().emptyPlaceholder\"\r\n                [maxFiles]=\"column.getEditorSettings().maxFiles\"\r\n                [maxFilesPlaceholder]=\"\r\n                  column.getEditorSettings().maxFilesPlaceholder\r\n                \"\r\n                [maxFilesWarningMessage]=\"\r\n                  column.getEditorSettings().maxFilesWarningMessage\r\n                \"\r\n                [multiple]=\"column.getEditorSettings().multiple\"\r\n                [showAcceptedFormats]=\"\r\n                  column.getEditorSettings().showAcceptedFormats\r\n                \"\r\n                [showMaxFilesNumber]=\"\r\n                  column.getEditorSettings().showMaxFilesNumber\r\n                \"\r\n                (valueChanged)=\"onFilepickerUpload($event)\"\r\n              >\r\n              </ngx-filepicker>\r\n                </ng-template>\r\n                  </div>\r\n            -->\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n\r\n<div class=\"popup-footer\">\r\n  <div class=\"row line\"></div>\r\n  <div class=\"row\">\r\n    <div class=\"d-flex justify-content-end p-3\">\r\n      <button\r\n        nbButton\r\n        ghost\r\n        shape=\"round\"\r\n        class=\"me-2\"\r\n        (click)=\"onClickCancel()\"\r\n      >\r\n        {{ cancelBtnText }}\r\n      </button>\r\n      <button\r\n        nbButton\r\n        #formSaveButton\r\n        status=\"primary\"\r\n        shape=\"round\"\r\n        (click)=\"onClickSave()\"\r\n      >\r\n        {{ saveBtnText }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<ng-template #titleTemplate>\r\n  <div class=\"d-flex title-template\">\r\n    <nb-icon pack=\"eva\" [icon]=\"icon\" status=\"basic\"></nb-icon>\r\n    <div class=\"title\">{{ title }}</div>\r\n  </div>\r\n</ng-template>\r\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */.form-group{padding:.5rem}.form-group .label{margin-bottom:.5rem}::ng-deep .popup-window nb-card-header .buttons button:last-child{position:absolute;top:-15px;right:-20px}::ng-deep .popup-window.minimized nb-card-header .buttons button:last-child{position:initial}::ng-deep .popup-window.maximized nb-card-header .buttons button:last-child{position:initial}::ng-deep .popup-window .popup-card{border-top-left-radius:1.5rem;border-bottom-left-radius:1.5rem;border-bottom-right-radius:1.5rem}::ng-deep .popup-window .popup-card .popup-card-body{padding-left:0;padding-right:0;overflow:hidden}::ng-deep .popup-window .popup-card .popup-content{max-height:60vh;overflow-y:auto;overflow-x:hidden;padding:0rem 2em 1rem}::ng-deep .popup-window .popup-card .popup-footer{padding:0rem 2rem}.title{font-size:17px;font-weight:700}.title-template{align-items:center}.title-template nb-icon{font-size:1.7rem;margin-right:.5rem}:host .line{border-bottom:2px solid var(--input-basic-border-color)}:host .textarea-container .counter{display:flex;justify-content:flex-end;font-weight:600}:host ::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width)}:host ::-webkit-scrollbar-thumb{background:var(--scrollbar-color);border-radius:10px}:host ::-webkit-scrollbar-thumb:hover{background:var(--color-basic-500)}.progressbar-container{display:flex;align-items:center}.progressbar-container nb-progress-bar{flex:1}.required-mark{font-size:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NbWindowRef }, { type: i1$1.HttpClient }, { type: TranslationService }]; }, propDecorators: { titleTemplate: [{
                type: ViewChild,
                args: ['titleTemplate']
            }], saveButton: [{
                type: ViewChild,
                args: ['formSaveButton']
            }] } });

class DeletePopupComponent {
    // ----------------------------------------------------- INPUTS ------------------------------------------------------------------
    // ----------------------------------------------------- OUTPUTS -----------------------------------------------------------------
    // ----------------------------------------------------- COMPONENT CONSTRUCTION --------------------------------------------------
    constructor(ref) {
        this.ref = ref;
        // ----------------------------------------------------- PRIVATE FIELDS ----------------------------------------------------------
        // ----------------------------------------------------- PUBLIC FIELDS -----------------------------------------------------------
        this.settings = {
            // delete popup settings
            useDefaultDialog: true,
            title: '',
            text: '',
            closeOnBackdropClick: true,
            closeOnEsc: true,
        };
    }
    ngOnInit() { }
    // ----------------------------------------------------- PRIVATE METHODS ---------------------------------------------------------
    // ----------------------------------------------------- PUBLIC METHODS ----------------------------------------------------------
    // ----------------------------------------------------- DOM LISTENERS -----------------------------------------------------------
    onNoClick() {
        this.ref.close(false);
    }
    onYesClick() {
        this.ref.close(true);
    }
}
DeletePopupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DeletePopupComponent, deps: [{ token: i1.NbDialogRef }], target: i0.ɵɵFactoryTarget.Component });
DeletePopupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: DeletePopupComponent, selector: "ngx-delete-popup", ngImport: i0, template: "<nb-card class=\"delete-dialog-card\">\n  <nb-card-header>\n    <div class=\"title-template d-flex\">\n      <nb-icon\n        pack=\"eva\"\n        icon=\"alert-triangle-outline\"\n        status=\"danger\"\n      ></nb-icon>\n      <div class=\"title\">\n        {{ settings.title }}\n      </div>\n    </div>\n  </nb-card-header>\n  <nb-card-body>\n    {{ settings.text }}\n    <div class=\"line\"></div>\n    <div class=\"row\">\n      <div class=\"d-flex justify-content-end p-2\">\n        <button\n          nbButton\n          ghost\n          shape=\"round\"\n          class=\"me-2\"\n          size=\"small\"\n          (click)=\"onNoClick()\"\n        >\n          {{ settings.noBtnText }}\n        </button>\n        <button\n          nbButton\n          status=\"primary\"\n          shape=\"round\"\n          size=\"small\"\n          (click)=\"onYesClick()\"\n        >\n          {{ settings.yesBtnText }}\n        </button>\n      </div>\n    </div>\n  </nb-card-body>\n</nb-card>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */.title{font-size:17px;font-weight:700}.title-template{align-items:center}.title-template nb-icon{font-size:1.7rem;margin-right:1rem}:host .line{padding:.5rem;border-bottom:2px solid var(--input-basic-border-color)}nb-card.delete-dialog-card{border-top-left-radius:1.5rem;border-bottom-left-radius:1.5rem;border-bottom-right-radius:1.5rem}\n"], dependencies: [{ kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "component", type: i1.NbCardComponent, selector: "nb-card", inputs: ["size", "status", "accent"] }, { kind: "component", type: i1.NbCardBodyComponent, selector: "nb-card-body" }, { kind: "component", type: i1.NbCardHeaderComponent, selector: "nb-card-header" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DeletePopupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-delete-popup', template: "<nb-card class=\"delete-dialog-card\">\n  <nb-card-header>\n    <div class=\"title-template d-flex\">\n      <nb-icon\n        pack=\"eva\"\n        icon=\"alert-triangle-outline\"\n        status=\"danger\"\n      ></nb-icon>\n      <div class=\"title\">\n        {{ settings.title }}\n      </div>\n    </div>\n  </nb-card-header>\n  <nb-card-body>\n    {{ settings.text }}\n    <div class=\"line\"></div>\n    <div class=\"row\">\n      <div class=\"d-flex justify-content-end p-2\">\n        <button\n          nbButton\n          ghost\n          shape=\"round\"\n          class=\"me-2\"\n          size=\"small\"\n          (click)=\"onNoClick()\"\n        >\n          {{ settings.noBtnText }}\n        </button>\n        <button\n          nbButton\n          status=\"primary\"\n          shape=\"round\"\n          size=\"small\"\n          (click)=\"onYesClick()\"\n        >\n          {{ settings.yesBtnText }}\n        </button>\n      </div>\n    </div>\n  </nb-card-body>\n</nb-card>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */.title{font-size:17px;font-weight:700}.title-template{align-items:center}.title-template nb-icon{font-size:1.7rem;margin-right:1rem}:host .line{padding:.5rem;border-bottom:2px solid var(--input-basic-border-color)}nb-card.delete-dialog-card{border-top-left-radius:1.5rem;border-bottom-left-radius:1.5rem;border-bottom-right-radius:1.5rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NbDialogRef }]; } });

class GridGroupService {
    static groupData(column, data) {
        var result = data.reduce(function (r, a) {
            var key = formatKeyByColumnType(column, a);
            r[key] = r[key] || [];
            r[key].push(a);
            return r;
        }, Object.create(null));
        var data = [];
        Object.keys(result).forEach((key, index) => {
            var elements = result[key];
            var groupName = generateGroupName(column, key);
            data.push({
                _GroupName: groupName,
                _GroupRow: true,
                _GroupCount: elements.length,
                _GroupExpanded: true,
                _GroupFirstElement: elements[0],
                _GroupId: index + 1,
            });
            data.push(...elements);
        });
        return data;
    }
    static ungroupData(data) {
        var ungrouped = [];
        ungrouped = data.filter((x) => !Object.keys(x).includes('_GroupRow'));
        return ungrouped;
    }
}
GridGroupService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridGroupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GridGroupService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridGroupService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridGroupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
function formatKeyByColumnType(column, value) {
    switch (column.getType()) {
        case GRID_DATA_TYPE.DATE:
            var key = formatDate(new Date(value[column.getDataField()]), column.getTypeSettings().getFormat(), 'en-US');
            return key;
        case GRID_DATA_TYPE.DATERANGE:
            var key = formatDate(new Date(value[column.getDataField()].start), column.getTypeSettings().getFormat(), 'en-US') +
                ' - ' +
                formatDate(new Date(value[column.getDataField()].end), column.getTypeSettings().getFormat(), 'en-US');
            return key;
        case GRID_DATA_TYPE.LOOKUP:
            return value[column.getTypeSettings().getLookupColumn()];
        case GRID_DATA_TYPE.TAG:
            return value[column.getTypeSettings().getLookupColumn()];
        default:
            return value[column.getDataField()];
    }
}
function generateGroupName(column, key) {
    var groupName = column.getTitle() + ': ';
    return groupName + key;
}

class GridButtonType {
    constructor() {
        this._Type = GRID_BUTTON_TYPE.OTHER;
        this._Id = makeId(20);
        this._Status = 'basic';
        this._Hero = false;
        this._Ghost = true;
        this._Filled = false;
        this._Outlined = false;
        this._Disabled = false;
        this._Text = '';
        this._Icon = '';
        this._Tooltip = '';
        this._Shape = 'round';
        this._Size = 'medium';
        this._Class = '';
        this._TooltipDisabled = false;
    }
    Type(x) {
        this._Type = x;
        return this;
    }
    getType() {
        return this._Type;
    }
    Id(x) {
        this._Id = x;
        return this;
    }
    getId() {
        return this._Id;
    }
    Status(x) {
        this._Status = x;
        return this;
    }
    getStatus() {
        return this._Status;
    }
    Hero(x) {
        this._Hero = x;
        return this;
    }
    getHero() {
        return this._Hero;
    }
    Ghost(x) {
        this._Ghost = x;
        return this;
    }
    getGhost() {
        return this._Ghost;
    }
    Filled(x) {
        this._Filled = x;
        return this;
    }
    getFilled() {
        return this._Filled;
    }
    Outlined(x) {
        this._Outlined = x;
        return this;
    }
    getOutlined() {
        return this._Outlined;
    }
    Disabled(x) {
        this._Disabled = x;
        return this;
    }
    getDisabled() {
        return this._Disabled;
    }
    Text(x) {
        this._Text = x;
        return this;
    }
    getText() {
        return this._Text;
    }
    Icon(x) {
        this._Icon = x;
        return this;
    }
    getIcon() {
        return this._Icon;
    }
    Tooltip(x) {
        this._Tooltip = x;
        return this;
    }
    getTooltip() {
        return this._Tooltip;
    }
    Shape(x) {
        this._Shape = x;
        return this;
    }
    getShape() {
        return this._Shape;
    }
    Size(x) {
        this._Size = x;
        return this;
    }
    getSize() {
        return this._Size;
    }
    Class(x) {
        this._Class = x;
        return this;
    }
    getClass() {
        return this._Class;
    }
    TooltipDisabled(x) {
        this._TooltipDisabled = x;
        return this;
    }
    getTooltipDisabled() {
        return this._TooltipDisabled;
    }
}

class TagComponent {
    constructor() {
        this.icon = ''; // font-awesome or eva
        this.text = '';
        this.color = 'primary'; // hex or status
        this.shape = 'rectangle';
        this.appearance = 'outline';
        this.isEvaIcon = false;
    }
    ngOnInit() { }
    ngOnDestroy() { }
    hexToRgbA(hex) {
        var c;
        if (hex) {
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length == 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return ('rgba(' +
                    [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
                    ',0.08)');
            }
            return '';
        }
        return '';
    }
}
TagComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TagComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TagComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TagComponent, selector: "ngx-tag", inputs: { icon: "icon", text: "text", color: "color", shape: "shape", appearance: "appearance", isEvaIcon: "isEvaIcon" }, ngImport: i0, template: "<div\n  class=\"ngx-tag\"\n  [ngClass]=\"shape + ' status-' + color + ' appearance-' + appearance + ' '\"\n  [style.background-color]=\"appearance == 'outline' ? hexToRgbA(color) : color\"\n  [style.color]=\"appearance == 'outline' ? color : ''\"\n  [style.border-color]=\"color\"\n>\n  <i [class]=\"icon\" *ngIf=\"!isEvaIcon && icon\"></i>\n  <nb-icon *ngIf=\"isEvaIcon && icon\" pack=\"eva\" [icon]=\"icon\"></nb-icon>\n  {{ text }}\n</div>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .ngx-tag{border-style:var(--tag-border-style);border-width:var(--tag-border-width);display:inline-flex;align-items:center;font-family:var(--tag-text-font-family);font-size:var(--tag-medium-text-font-size);font-weight:var(--tag-medium-text-font-weight);line-height:var(--tag-medium-text-line-height);padding:var(--tag-medium-padding);width:max-content;text-transform:none;cursor:default}:host .ngx-tag i{margin-right:.5rem;color:inherit;font-size:var(--tag-medium-text-font-size)}:host .ngx-tag nb-icon{margin-right:.5rem;color:inherit;font-size:var(--tag-medium-text-font-size)}:host .ngx-tag.rectangle{border:none;border-radius:0}:host .ngx-tag.round{border-radius:var(--tag-border-radius)}:host .ngx-tag.appearance-outline{color:var(--tag-outline-primary-text-color)}:host .ngx-tag.appearance-filled{color:var(--tag-filled-primary-text-color)}:host .ngx-tag.status-primary.appearance-outline{background-color:var(--tag-outline-primary-background-color);border-color:var(--tag-outline-primary-border-color);color:var(--tag-outline-primary-text-color)}:host .ngx-tag.status-basic.appearance-outline{background-color:var(--tag-outline-basic-background-color);border-color:var(--tag-outline-basic-border-color);color:var(--tag-outline-basic-text-color)}:host .ngx-tag.status-warning.appearance-outline{background-color:var(--tag-outline-warning-background-color);border-color:var(--tag-outline-warning-border-color);color:var(--tag-outline-warning-text-color)}:host .ngx-tag.status-success.appearance-outline{background-color:var(--tag-outline-success-background-color);border-color:var(--tag-outline-success-border-color);color:var(--tag-outline-success-text-color)}:host .ngx-tag.status-info.appearance-outline{background-color:var(--tag-outline-info-background-color);border-color:var(--tag-outline-info-border-color);color:var(--tag-outline-info-text-color)}:host .ngx-tag.status-danger.appearance-outline{background-color:var(--tag-outline-danger-background-color);border-color:var(--tag-outline-danger-border-color);color:var(--tag-outline-danger-text-color)}:host .ngx-tag.status-warning.appearance-outline:hover{background-color:var(--tag-outline-warning-hover-background-color);border-color:var(--tag-outline-warning-hover-border-color)}:host .ngx-tag.status-basic.appearance-outline:hover{background-color:var(--tag-outline-basic-hover-background-color);border-color:var(--tag-outline-basic-hover-border-color)}:host .ngx-tag.status-success.appearance-outline:hover{background-color:var(--tag-outline-success-hover-background-color);border-color:var(--tag-outline-success-hover-border-color)}:host .ngx-tag.status-info.appearance-outline:hover{background-color:var(--tag-outline-info-hover-background-color);border-color:var(--tag-outline-info-hover-border-color)}:host .ngx-tag.status-danger.appearance-outline:hover{background-color:var(--tag-outline-info-danger-background-color);border-color:var(--tag-outline-info-danger-border-color)}:host .ngx-tag.status-primary.appearance-outline:hover{background-color:var(--tag-outline-primary-hover-background-color);border-color:var(--tag-outline-primary-hover-border-color)}:host .ngx-tag:hover{cursor:pointer}:host .ngx-tag.status-primary.appearance-filled{background-color:var(--tag-filled-primary-background-color);border-color:var(--tag-filled-primary-border-color);color:var(--tag-filled-primary-text-color)}:host .ngx-tag.status-basic.appearance-filled{background-color:var(--tag-filled-basic-background-color);border-color:var(--tag-filled-basic-border-color);color:var(--tag-filled-basic-text-color)}:host .ngx-tag.status-warning.appearance-filled{background-color:var(--tag-filled-warning-background-color);border-color:var(--tag-filled-warning-border-color);color:var(--tag-filled-warning-text-color)}:host .ngx-tag.status-success.appearance-filled{background-color:var(--tag-filled-success-background-color);border-color:var(--tag-filled-success-border-color);color:var(--tag-filled-success-text-color)}:host .ngx-tag.status-info.appearance-filled{background-color:var(--tag-filled-info-background-color);border-color:var(--tag-filled-info-border-color);color:var(--tag-filled-info-text-color)}:host .ngx-tag.status-danger.appearance-filled{background-color:var(--tag-filled-danger-background-color);border-color:var(--tag-filled-danger-border-color);color:var(--tag-filled-danger-text-color)}:host .ngx-tag.status-warning.appearance-filled:hover{background-color:var(--tag-filled-warning-hover-background-color);border-color:var(--tag-filled-warning-hover-border-color)}:host .ngx-tag.status-success.appearance-filled:hover{background-color:var(--tag-filled-success-hover-background-color);border-color:var(--tag-filled-success-hover-border-color)}:host .ngx-tag.status-info.appearance-filled:hover{background-color:var(--tag-filled-info-hover-background-color);border-color:var(--tag-filled-info-hover-border-color)}:host .ngx-tag.status-danger.appearance-filled:hover{background-color:var(--tag-filled-info-danger-background-color);border-color:var(--tag-filled-info-danger-border-color)}:host .ngx-tag.status-primary.appearance-filled:hover{background-color:var(--tag-filled-primary-hover-background-color);border-color:var(--tag-filled-primary-hover-border-color)}:host .ngx-tag.status-basic.appearance-filled:hover{background-color:var(--tag-filled-basic-hover-background-color);border-color:var(--tag-filled-basic-hover-border-color)}\n"], dependencies: [{ kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-tag', template: "<div\n  class=\"ngx-tag\"\n  [ngClass]=\"shape + ' status-' + color + ' appearance-' + appearance + ' '\"\n  [style.background-color]=\"appearance == 'outline' ? hexToRgbA(color) : color\"\n  [style.color]=\"appearance == 'outline' ? color : ''\"\n  [style.border-color]=\"color\"\n>\n  <i [class]=\"icon\" *ngIf=\"!isEvaIcon && icon\"></i>\n  <nb-icon *ngIf=\"isEvaIcon && icon\" pack=\"eva\" [icon]=\"icon\"></nb-icon>\n  {{ text }}\n</div>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .ngx-tag{border-style:var(--tag-border-style);border-width:var(--tag-border-width);display:inline-flex;align-items:center;font-family:var(--tag-text-font-family);font-size:var(--tag-medium-text-font-size);font-weight:var(--tag-medium-text-font-weight);line-height:var(--tag-medium-text-line-height);padding:var(--tag-medium-padding);width:max-content;text-transform:none;cursor:default}:host .ngx-tag i{margin-right:.5rem;color:inherit;font-size:var(--tag-medium-text-font-size)}:host .ngx-tag nb-icon{margin-right:.5rem;color:inherit;font-size:var(--tag-medium-text-font-size)}:host .ngx-tag.rectangle{border:none;border-radius:0}:host .ngx-tag.round{border-radius:var(--tag-border-radius)}:host .ngx-tag.appearance-outline{color:var(--tag-outline-primary-text-color)}:host .ngx-tag.appearance-filled{color:var(--tag-filled-primary-text-color)}:host .ngx-tag.status-primary.appearance-outline{background-color:var(--tag-outline-primary-background-color);border-color:var(--tag-outline-primary-border-color);color:var(--tag-outline-primary-text-color)}:host .ngx-tag.status-basic.appearance-outline{background-color:var(--tag-outline-basic-background-color);border-color:var(--tag-outline-basic-border-color);color:var(--tag-outline-basic-text-color)}:host .ngx-tag.status-warning.appearance-outline{background-color:var(--tag-outline-warning-background-color);border-color:var(--tag-outline-warning-border-color);color:var(--tag-outline-warning-text-color)}:host .ngx-tag.status-success.appearance-outline{background-color:var(--tag-outline-success-background-color);border-color:var(--tag-outline-success-border-color);color:var(--tag-outline-success-text-color)}:host .ngx-tag.status-info.appearance-outline{background-color:var(--tag-outline-info-background-color);border-color:var(--tag-outline-info-border-color);color:var(--tag-outline-info-text-color)}:host .ngx-tag.status-danger.appearance-outline{background-color:var(--tag-outline-danger-background-color);border-color:var(--tag-outline-danger-border-color);color:var(--tag-outline-danger-text-color)}:host .ngx-tag.status-warning.appearance-outline:hover{background-color:var(--tag-outline-warning-hover-background-color);border-color:var(--tag-outline-warning-hover-border-color)}:host .ngx-tag.status-basic.appearance-outline:hover{background-color:var(--tag-outline-basic-hover-background-color);border-color:var(--tag-outline-basic-hover-border-color)}:host .ngx-tag.status-success.appearance-outline:hover{background-color:var(--tag-outline-success-hover-background-color);border-color:var(--tag-outline-success-hover-border-color)}:host .ngx-tag.status-info.appearance-outline:hover{background-color:var(--tag-outline-info-hover-background-color);border-color:var(--tag-outline-info-hover-border-color)}:host .ngx-tag.status-danger.appearance-outline:hover{background-color:var(--tag-outline-info-danger-background-color);border-color:var(--tag-outline-info-danger-border-color)}:host .ngx-tag.status-primary.appearance-outline:hover{background-color:var(--tag-outline-primary-hover-background-color);border-color:var(--tag-outline-primary-hover-border-color)}:host .ngx-tag:hover{cursor:pointer}:host .ngx-tag.status-primary.appearance-filled{background-color:var(--tag-filled-primary-background-color);border-color:var(--tag-filled-primary-border-color);color:var(--tag-filled-primary-text-color)}:host .ngx-tag.status-basic.appearance-filled{background-color:var(--tag-filled-basic-background-color);border-color:var(--tag-filled-basic-border-color);color:var(--tag-filled-basic-text-color)}:host .ngx-tag.status-warning.appearance-filled{background-color:var(--tag-filled-warning-background-color);border-color:var(--tag-filled-warning-border-color);color:var(--tag-filled-warning-text-color)}:host .ngx-tag.status-success.appearance-filled{background-color:var(--tag-filled-success-background-color);border-color:var(--tag-filled-success-border-color);color:var(--tag-filled-success-text-color)}:host .ngx-tag.status-info.appearance-filled{background-color:var(--tag-filled-info-background-color);border-color:var(--tag-filled-info-border-color);color:var(--tag-filled-info-text-color)}:host .ngx-tag.status-danger.appearance-filled{background-color:var(--tag-filled-danger-background-color);border-color:var(--tag-filled-danger-border-color);color:var(--tag-filled-danger-text-color)}:host .ngx-tag.status-warning.appearance-filled:hover{background-color:var(--tag-filled-warning-hover-background-color);border-color:var(--tag-filled-warning-hover-border-color)}:host .ngx-tag.status-success.appearance-filled:hover{background-color:var(--tag-filled-success-hover-background-color);border-color:var(--tag-filled-success-hover-border-color)}:host .ngx-tag.status-info.appearance-filled:hover{background-color:var(--tag-filled-info-hover-background-color);border-color:var(--tag-filled-info-hover-border-color)}:host .ngx-tag.status-danger.appearance-filled:hover{background-color:var(--tag-filled-info-danger-background-color);border-color:var(--tag-filled-info-danger-border-color)}:host .ngx-tag.status-primary.appearance-filled:hover{background-color:var(--tag-filled-primary-hover-background-color);border-color:var(--tag-filled-primary-hover-border-color)}:host .ngx-tag.status-basic.appearance-filled:hover{background-color:var(--tag-filled-basic-hover-background-color);border-color:var(--tag-filled-basic-hover-border-color)}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { icon: [{
                type: Input
            }], text: [{
                type: Input
            }], color: [{
                type: Input
            }], shape: [{
                type: Input
            }], appearance: [{
                type: Input
            }], isEvaIcon: [{
                type: Input
            }] } });

class CellDisplayComponent {
    constructor() {
        this.column = new GridColumn();
        this.row = {};
        this.buttonClick = new EventEmitter();
        this.types = GRID_DATA_TYPE;
        this.btnTypes = GRID_BUTTON_TYPE;
        this.buttons = [];
    }
    ngOnInit() {
        if (this.column.getType() == GRID_DATA_TYPE.BUTTONS) {
            var dataField = this.column
                .getTypeSettings()
                .getButtonsFromDataField();
            this.buttons =
                dataField != false
                    ? this.row[dataField.toString()]
                    : this.column.getTypeSettings().getButtons();
        }
    }
    ngOnDestroy() { }
    hexToRgbA(hex) {
        var c;
        if (hex) {
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length == 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return ('rgba(' +
                    [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
                    ',0.08)');
            }
            return '';
        }
        return '';
    }
    onButtonClick(btn) {
        this.buttonClick.emit({
            button: btn,
            row: this.row,
        });
    }
}
CellDisplayComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CellDisplayComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CellDisplayComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CellDisplayComponent, selector: "ngx-cell-display", inputs: { column: "column", row: "row" }, outputs: { buttonClick: "buttonClick" }, ngImport: i0, template: "<ng-container [ngSwitch]=\"column.getType()\">\n  <div *ngSwitchCase=\"types.TEXT\">\n    {{ row[column.getDataField()] }}\n  </div>\n\n  <div *ngSwitchCase=\"types.NUMBER\" class=\"text-end\">\n    {{ row[column.getDataField()] }}\n  </div>\n\n  <div *ngSwitchCase=\"types.DATE\">\n    {{\n      row[column.getDataField()] | date : column.getTypeSettings().getFormat()\n    }}\n  </div>\n\n  <div\n    *ngSwitchCase=\"types.TOGGLE\"\n    class=\"d-flex justify-content-center align-items-center\"\n  >\n    <nb-toggle\n      [checked]=\"row[column.getDataField()]\"\n      disabled=\"true\"\n    ></nb-toggle>\n  </div>\n\n  <div\n    *ngSwitchCase=\"types.CHECKBOX\"\n    class=\"d-flex justify-content-center align-items-center\"\n  >\n    <nb-checkbox\n      [checked]=\"row[column.getDataField()]\"\n      disabled=\"true\"\n    ></nb-checkbox>\n  </div>\n\n  <div *ngSwitchCase=\"types.TAG\" class=\"d-flex align-items-center\">\n    <ngx-tag\n      [text]=\"row[column.getTypeSettings().getLookupColumn()]\"\n      [shape]=\"column.getTypeSettings().getShape()\"\n      [color]=\"row[column.getTypeSettings().getColorColumn()]\"\n      [appearance]=\"column.getTypeSettings().getAppearance()\"\n      [icon]=\"row[column.getTypeSettings().getIconColumn()]\"\n      [isEvaIcon]=\"column.getTypeSettings().getIsEvaIcon()\"\n    ></ngx-tag>\n  </div>\n\n  <div\n    *ngSwitchCase=\"types.PROGRESSBAR\"\n    class=\"d-flex justify-content-center align-items-center\"\n  >\n    <nb-progress-bar\n      [value]=\"row[column.getDataField()]\"\n      class=\"w-100\"\n      [status]=\"row[column.getTypeSettings().getColorColumn()] ?? 'basic'\"\n      [displayValue]=\"column.getTypeSettings().getDisplayValue()\"\n    ></nb-progress-bar>\n  </div>\n\n  <div *ngSwitchCase=\"types.DATERANGE\">\n    {{\n      row[column.getDataField()]?.start\n        | date : column.getTypeSettings().getFormat()\n    }}\n    -\n    {{\n      row[column.getDataField()]?.end\n        | date : column.getTypeSettings().getFormat()\n    }}\n  </div>\n\n  <div *ngSwitchCase=\"types.LOOKUP\">\n    {{ row[column.getTypeSettings().getLookupColumn()] }}\n  </div>\n\n  <div *ngSwitchCase=\"types.COLOR\" class=\"d-flex align-items-center\">\n    <ngx-colors\n      [name]=\"column.getDataField()\"\n      ngx-colors-trigger\n      [disabled]=\"true\"\n      [(ngModel)]=\"row[column.getDataField()]\"\n    ></ngx-colors>\n    <span class=\"ms-2\">\n      {{ row[column.getDataField()] }}\n    </span>\n  </div>\n\n  <div\n    *ngSwitchCase=\"types.BUTTONS\"\n    class=\"d-flex justify-content-center align-items-center\"\n  >\n    <div *ngFor=\"let btn of buttons\" style=\"width: max-content\">\n      <button\n        nbButton\n        *ngIf=\"\n          btn.getType() == btnTypes.EDIT &&\n          column.getTypeSettings().getEditable()\n        \"\n        [shape]=\"btn.getShape()\"\n        [ghost]=\"btn.getGhost()\"\n        [size]=\"btn.getSize()\"\n        [status]=\"btn.getStatus()\"\n        [outline]=\"btn.getOutlined()\"\n        [disabled]=\"btn.getDisabled()\"\n        [class]=\"btn.getClass()\"\n        [id]=\"btn.getId()\"\n        [hero]=\"btn.getHero()\"\n        [nbTooltip]=\"btn.getTooltip()\"\n        [nbTooltipDisabled]=\"btn.getTooltipDisabled()\"\n        [filled]=\"btn.getFilled()\"\n        (click)=\"onButtonClick(btn)\"\n      >\n        <span *ngIf=\"btn.getText() != ''\">{{ btn.getText() }}</span>\n        <nb-icon\n          *ngIf=\"btn.getIcon() != ''\"\n          pack=\"eva\"\n          [icon]=\"btn.getIcon()\"\n        ></nb-icon>\n      </button>\n\n      <button\n        nbButton\n        *ngIf=\"\n          btn.getType() == btnTypes.DELETE &&\n          column.getTypeSettings().getRemovable()\n        \"\n        [shape]=\"btn.getShape()\"\n        [ghost]=\"btn.getGhost()\"\n        [size]=\"btn.getSize()\"\n        [status]=\"btn.getStatus()\"\n        [outline]=\"btn.getOutlined()\"\n        [disabled]=\"btn.getDisabled()\"\n        [class]=\"btn.getClass()\"\n        [id]=\"btn.getId()\"\n        [hero]=\"btn.getHero()\"\n        [nbTooltip]=\"btn.getTooltip()\"\n        [nbTooltipDisabled]=\"btn.getTooltipDisabled()\"\n        [filled]=\"btn.getFilled()\"\n        (click)=\"onButtonClick(btn)\"\n      >\n        <span *ngIf=\"btn.getText() != ''\">{{ btn.getText() }}</span>\n        <nb-icon\n          *ngIf=\"btn.getIcon() != ''\"\n          pack=\"eva\"\n          [icon]=\"btn.getIcon()\"\n        ></nb-icon>\n      </button>\n\n      <button\n        nbButton\n        *ngIf=\"btn.getType() == btnTypes.OTHER\"\n        [shape]=\"btn.getShape()\"\n        [ghost]=\"btn.getGhost()\"\n        [size]=\"btn.getSize()\"\n        [status]=\"btn.getStatus()\"\n        [outline]=\"btn.getOutlined()\"\n        [disabled]=\"btn.getDisabled()\"\n        [class]=\"btn.getClass()\"\n        [id]=\"btn.getId()\"\n        [hero]=\"btn.getHero()\"\n        [nbTooltip]=\"btn.getTooltip()\"\n        [nbTooltipDisabled]=\"btn.getTooltipDisabled()\"\n        [filled]=\"btn.getFilled()\"\n        (click)=\"onButtonClick(btn)\"\n      >\n        <span *ngIf=\"btn.getText() != ''\">{{ btn.getText() }}</span>\n        <nb-icon\n          *ngIf=\"btn.getIcon() != ''\"\n          pack=\"eva\"\n          [icon]=\"btn.getIcon()\"\n        ></nb-icon>\n      </button>\n    </div>\n  </div>\n</ng-container>\n", styles: [""], dependencies: [{ kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i1.NbTooltipDirective, selector: "[nbTooltip]", inputs: ["nbTooltip", "nbTooltipPlacement", "nbTooltipAdjustment", "nbTooltipClass", "nbTooltipIcon", "nbTooltipStatus", "nbTooltipTrigger", "nbTooltipOffset", "nbTooltipDisabled"], outputs: ["nbTooltipShowStateChange"], exportAs: ["nbTooltip"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i1.NbCheckboxComponent, selector: "nb-checkbox", inputs: ["checked", "disabled", "status", "indeterminate"], outputs: ["checkedChange"] }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i1.NbProgressBarComponent, selector: "nb-progress-bar", inputs: ["value", "status", "size", "displayValue"] }, { kind: "component", type: i1.NbToggleComponent, selector: "nb-toggle", inputs: ["checked", "disabled", "status", "labelPosition"], outputs: ["checkedChange"] }, { kind: "component", type: i6.NgxColorsComponent, selector: "ngx-colors" }, { kind: "directive", type: i6.NgxColorsTriggerDirective, selector: "[ngx-colors-trigger]", inputs: ["colorsAnimation", "palette", "format", "formats", "position", "hideTextInput", "hideColorPicker", "attachTo", "overlayClassName", "colorPickerControls", "acceptLabel", "cancelLabel"], outputs: ["change", "input", "slider", "close", "open"] }, { kind: "component", type: TagComponent, selector: "ngx-tag", inputs: ["icon", "text", "color", "shape", "appearance", "isEvaIcon"] }, { kind: "pipe", type: i4.DatePipe, name: "date" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CellDisplayComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-cell-display', template: "<ng-container [ngSwitch]=\"column.getType()\">\n  <div *ngSwitchCase=\"types.TEXT\">\n    {{ row[column.getDataField()] }}\n  </div>\n\n  <div *ngSwitchCase=\"types.NUMBER\" class=\"text-end\">\n    {{ row[column.getDataField()] }}\n  </div>\n\n  <div *ngSwitchCase=\"types.DATE\">\n    {{\n      row[column.getDataField()] | date : column.getTypeSettings().getFormat()\n    }}\n  </div>\n\n  <div\n    *ngSwitchCase=\"types.TOGGLE\"\n    class=\"d-flex justify-content-center align-items-center\"\n  >\n    <nb-toggle\n      [checked]=\"row[column.getDataField()]\"\n      disabled=\"true\"\n    ></nb-toggle>\n  </div>\n\n  <div\n    *ngSwitchCase=\"types.CHECKBOX\"\n    class=\"d-flex justify-content-center align-items-center\"\n  >\n    <nb-checkbox\n      [checked]=\"row[column.getDataField()]\"\n      disabled=\"true\"\n    ></nb-checkbox>\n  </div>\n\n  <div *ngSwitchCase=\"types.TAG\" class=\"d-flex align-items-center\">\n    <ngx-tag\n      [text]=\"row[column.getTypeSettings().getLookupColumn()]\"\n      [shape]=\"column.getTypeSettings().getShape()\"\n      [color]=\"row[column.getTypeSettings().getColorColumn()]\"\n      [appearance]=\"column.getTypeSettings().getAppearance()\"\n      [icon]=\"row[column.getTypeSettings().getIconColumn()]\"\n      [isEvaIcon]=\"column.getTypeSettings().getIsEvaIcon()\"\n    ></ngx-tag>\n  </div>\n\n  <div\n    *ngSwitchCase=\"types.PROGRESSBAR\"\n    class=\"d-flex justify-content-center align-items-center\"\n  >\n    <nb-progress-bar\n      [value]=\"row[column.getDataField()]\"\n      class=\"w-100\"\n      [status]=\"row[column.getTypeSettings().getColorColumn()] ?? 'basic'\"\n      [displayValue]=\"column.getTypeSettings().getDisplayValue()\"\n    ></nb-progress-bar>\n  </div>\n\n  <div *ngSwitchCase=\"types.DATERANGE\">\n    {{\n      row[column.getDataField()]?.start\n        | date : column.getTypeSettings().getFormat()\n    }}\n    -\n    {{\n      row[column.getDataField()]?.end\n        | date : column.getTypeSettings().getFormat()\n    }}\n  </div>\n\n  <div *ngSwitchCase=\"types.LOOKUP\">\n    {{ row[column.getTypeSettings().getLookupColumn()] }}\n  </div>\n\n  <div *ngSwitchCase=\"types.COLOR\" class=\"d-flex align-items-center\">\n    <ngx-colors\n      [name]=\"column.getDataField()\"\n      ngx-colors-trigger\n      [disabled]=\"true\"\n      [(ngModel)]=\"row[column.getDataField()]\"\n    ></ngx-colors>\n    <span class=\"ms-2\">\n      {{ row[column.getDataField()] }}\n    </span>\n  </div>\n\n  <div\n    *ngSwitchCase=\"types.BUTTONS\"\n    class=\"d-flex justify-content-center align-items-center\"\n  >\n    <div *ngFor=\"let btn of buttons\" style=\"width: max-content\">\n      <button\n        nbButton\n        *ngIf=\"\n          btn.getType() == btnTypes.EDIT &&\n          column.getTypeSettings().getEditable()\n        \"\n        [shape]=\"btn.getShape()\"\n        [ghost]=\"btn.getGhost()\"\n        [size]=\"btn.getSize()\"\n        [status]=\"btn.getStatus()\"\n        [outline]=\"btn.getOutlined()\"\n        [disabled]=\"btn.getDisabled()\"\n        [class]=\"btn.getClass()\"\n        [id]=\"btn.getId()\"\n        [hero]=\"btn.getHero()\"\n        [nbTooltip]=\"btn.getTooltip()\"\n        [nbTooltipDisabled]=\"btn.getTooltipDisabled()\"\n        [filled]=\"btn.getFilled()\"\n        (click)=\"onButtonClick(btn)\"\n      >\n        <span *ngIf=\"btn.getText() != ''\">{{ btn.getText() }}</span>\n        <nb-icon\n          *ngIf=\"btn.getIcon() != ''\"\n          pack=\"eva\"\n          [icon]=\"btn.getIcon()\"\n        ></nb-icon>\n      </button>\n\n      <button\n        nbButton\n        *ngIf=\"\n          btn.getType() == btnTypes.DELETE &&\n          column.getTypeSettings().getRemovable()\n        \"\n        [shape]=\"btn.getShape()\"\n        [ghost]=\"btn.getGhost()\"\n        [size]=\"btn.getSize()\"\n        [status]=\"btn.getStatus()\"\n        [outline]=\"btn.getOutlined()\"\n        [disabled]=\"btn.getDisabled()\"\n        [class]=\"btn.getClass()\"\n        [id]=\"btn.getId()\"\n        [hero]=\"btn.getHero()\"\n        [nbTooltip]=\"btn.getTooltip()\"\n        [nbTooltipDisabled]=\"btn.getTooltipDisabled()\"\n        [filled]=\"btn.getFilled()\"\n        (click)=\"onButtonClick(btn)\"\n      >\n        <span *ngIf=\"btn.getText() != ''\">{{ btn.getText() }}</span>\n        <nb-icon\n          *ngIf=\"btn.getIcon() != ''\"\n          pack=\"eva\"\n          [icon]=\"btn.getIcon()\"\n        ></nb-icon>\n      </button>\n\n      <button\n        nbButton\n        *ngIf=\"btn.getType() == btnTypes.OTHER\"\n        [shape]=\"btn.getShape()\"\n        [ghost]=\"btn.getGhost()\"\n        [size]=\"btn.getSize()\"\n        [status]=\"btn.getStatus()\"\n        [outline]=\"btn.getOutlined()\"\n        [disabled]=\"btn.getDisabled()\"\n        [class]=\"btn.getClass()\"\n        [id]=\"btn.getId()\"\n        [hero]=\"btn.getHero()\"\n        [nbTooltip]=\"btn.getTooltip()\"\n        [nbTooltipDisabled]=\"btn.getTooltipDisabled()\"\n        [filled]=\"btn.getFilled()\"\n        (click)=\"onButtonClick(btn)\"\n      >\n        <span *ngIf=\"btn.getText() != ''\">{{ btn.getText() }}</span>\n        <nb-icon\n          *ngIf=\"btn.getIcon() != ''\"\n          pack=\"eva\"\n          [icon]=\"btn.getIcon()\"\n        ></nb-icon>\n      </button>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { column: [{
                type: Input
            }], row: [{
                type: Input
            }], buttonClick: [{
                type: Output
            }] } });

class CellEditComponent {
    constructor(http, translationService) {
        this.http = http;
        this.translationService = translationService;
        this.isNew = true;
        this.column = new GridColumn();
        this.cellValueChange = new EventEmitter();
        this.cellButtonClick = new EventEmitter();
        this._subs = [];
        this.types = GRID_DATA_TYPE;
        this.datePickerTypes = GRID_DATE_PICKER;
        this.selectFilterDataSource = [];
        this.btnTypes = GRID_BUTTON_TYPE;
    }
    ngOnInit() {
        // if data for select is from server perfom http get request
        if (this.column.getEditor() == GRID_DATA_TYPE.SELECT ||
            this.column.getEditor() == GRID_DATA_TYPE.AUTOCOMPLETE) {
            var settings = this.column.getEditorSettings();
            if (settings.getServerDataSource())
                this.getDataSourceFromServer(settings);
            else
                this.selectFilterDataSource = settings.getDataSource();
        }
        // if editor type is date and cellValue is set convert dates to proper format
        if (this.column.getEditor() == GRID_DATA_TYPE.DATE_PICKER &&
            this._cellValue)
            this.setUpDatePickerValues();
        this.translateEditorDefaultOptions();
    }
    ngOnDestroy() {
        this._subs.forEach((element) => {
            element.unsubscribe();
        });
    }
    set cellValue(value) {
        this._cellValue = value;
        this.cellValueChange.emit(this._cellValue);
    }
    get cellValue() {
        return this._cellValue;
    }
    getDataSourceFromServer(settings) {
        this._subs.push(this.http
            .get(settings.getServerEndpoint(), {
            params: settings.getServerParams(),
        })
            .subscribe((data) => {
            if (data)
                this.selectFilterDataSource = data;
            else
                console.error(getError(205));
        }));
    }
    setUpDatePickerValues() {
        if (this.column.getEditorSettings().getDatePickerType() ==
            GRID_DATE_PICKER.DATE_RANGE)
            this._cellValue = {
                start: new Date(this._cellValue.start),
                end: new Date(this._cellValue.end),
            };
        else
            this._cellValue = new Date(this._cellValue);
    }
    onButtonClick(btn) {
        this.cellButtonClick.emit(btn);
    }
    translateEditorDefaultOptions() {
        var editor = this.column.getEditorSettings();
        if (!editor._ClearText)
            editor._ClearText =
                this.translationService.translate('gridFilterShowAll');
        if (!editor._ApplyButtonText)
            editor._ApplyButtonText = this.translationService.translate('gridDatepickerApplyBtn');
        if (!editor._CurrentTimeButtonText)
            editor._CurrentTimeButtonText =
                this.translationService.translate('gridDatepickerNow');
        if (!editor._TimeText)
            editor._TimeText =
                this.translationService.translate('gridDatepickerAmPm');
        if (!editor._HoursText)
            editor._HoursText = this.translationService.translate('gridDatepickerHours');
        if (!editor._MinutesText)
            editor._MinutesText = this.translationService.translate('gridDatepickerMinutes');
        if (!editor._SecondsText)
            editor._SecondsText = this.translationService.translate('gridDatepickerSeconds');
    }
}
CellEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CellEditComponent, deps: [{ token: i1$1.HttpClient }, { token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
CellEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CellEditComponent, selector: "ngx-cell-edit", inputs: { isNew: "isNew", column: "column", cellValue: "cellValue" }, outputs: { cellValueChange: "cellValueChange", cellButtonClick: "cellButtonClick" }, ngImport: i0, template: "<div *ngIf=\"column.getEditorSettings().getShow()\">\r\n  <ng-container [ngSwitch]=\"column.getEditor()\">\r\n    <div *ngSwitchCase=\"types.TEXTBOX\">\r\n      <input\r\n        [(ngModel)]=\"cellValue\"\r\n        name=\"inputFilter\"\r\n        nbInput\r\n        fullWidth\r\n        [placeholder]=\"column.getTitle()\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n      />\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.SELECT\">\r\n      <nb-select\r\n        [placeholder]=\"column.getTitle()\"\r\n        fullWidth\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n        [(selected)]=\"cellValue\"\r\n        name=\"selectFilter\"\r\n      >\r\n        <nb-option [value]=\"null\">{{\r\n          column.getEditorSettings().getClearText()\r\n        }}</nb-option>\r\n        <nb-option\r\n          *ngFor=\"let o of selectFilterDataSource\"\r\n          [value]=\"o[column.getEditorSettings().getKeyExpression()]\"\r\n        >\r\n          {{ o[column.getEditorSettings().getDisplayExpression()] }}\r\n        </nb-option>\r\n      </nb-select>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.NUMBERBOX\">\r\n      <input\r\n        nbInput\r\n        type=\"number\"\r\n        fullWidth\r\n        [placeholder]=\"column.getTitle()\"\r\n        [(ngModel)]=\"cellValue\"\r\n        name=\"numberboxFilter\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n      />\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.DATE_PICKER\">\r\n      <ng-container [ngSwitch]=\"column.getEditorSettings().getDatePickerType()\">\r\n        <div *ngSwitchCase=\"datePickerTypes.DATE\">\r\n          <nb-form-field>\r\n            <input\r\n              nbInput\r\n              [placeholder]=\"column.getTitle()\"\r\n              [nbDatepicker]=\"datePicker\"\r\n              fullWidth\r\n              #datepickerInput\r\n              [(ngModel)]=\"cellValue\"\r\n              name=\"datePickerFilter\"\r\n              [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            />\r\n            <button\r\n              nbButton\r\n              nbSuffix\r\n              ghost\r\n              status=\"primary\"\r\n              (click)=\"datepickerInput.focus()\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n            </button>\r\n            <nb-datepicker\r\n              #datePicker\r\n              format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n              [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n              [showNavigation]=\"column.getEditorSettings().getShowNavigation()\"\r\n              [showWeekNumber]=\"column.getEditorSettings().getShowWeekNumbers()\"\r\n              [max]=\"column.getEditorSettings().getMax()\"\r\n              [min]=\"column.getEditorSettings().getMin()\"\r\n            >\r\n            </nb-datepicker>\r\n          </nb-form-field>\r\n        </div>\r\n\r\n        <div *ngSwitchCase=\"datePickerTypes.DATE_TIME\">\r\n          <nb-form-field>\r\n            <input\r\n              nbInput\r\n              [placeholder]=\"column.getTitle()\"\r\n              [nbDatepicker]=\"dateTimePicker\"\r\n              fullWidth\r\n              #dateTimepickerInput\r\n              [(ngModel)]=\"cellValue\"\r\n              name=\"dateTimePickerFilter\"\r\n              [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            />\r\n            <button\r\n              nbButton\r\n              nbSuffix\r\n              ghost\r\n              status=\"primary\"\r\n              (click)=\"dateTimepickerInput.focus()\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n            </button>\r\n            <nb-date-timepicker\r\n              #dateTimePicker\r\n              format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n              [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n              [showNavigation]=\"column.getEditorSettings().getShowNavigation()\"\r\n              [showWeekNumber]=\"column.getEditorSettings().getShowWeekNumbers()\"\r\n              [max]=\"column.getEditorSettings().getMax()\"\r\n              [min]=\"column.getEditorSettings().getMin()\"\r\n              [singleColumn]=\"column.getEditorSettings().getSingleColumn()\"\r\n              [step]=\"column.getEditorSettings().getTimeStep()\"\r\n              [withSeconds]=\"column.getEditorSettings().getShowSeconds()\"\r\n              [twelweHoursFormat]=\"\r\n                column.getEditorSettings().getTwelveHoursFormat()\r\n              \"\r\n              [applyButtonText]=\"\r\n                column.getEditorSettings().getApplyButtonText()\r\n              \"\r\n              [currentTimeButtonText]=\"\r\n                column.getEditorSettings().getCurrentTimeButtonText()\r\n              \"\r\n              [showCurrentTimeButton]=\"\r\n                column.getEditorSettings().getShowCurrentTimeButton()\r\n              \"\r\n            >\r\n            </nb-date-timepicker>\r\n          </nb-form-field>\r\n        </div>\r\n\r\n        <div *ngSwitchCase=\"datePickerTypes.TIME\">\r\n          <nb-form-field>\r\n            <input\r\n              nbInput\r\n              [placeholder]=\"column.getTitle()\"\r\n              [nbTimepicker]=\"timePicker\"\r\n              fullWidth\r\n              #timepickerInput\r\n              [(ngModel)]=\"cellValue\"\r\n              name=\"timepickerFilter\"\r\n              [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            />\r\n            <button\r\n              nbButton\r\n              nbSuffix\r\n              ghost\r\n              status=\"primary\"\r\n              (click)=\"timepickerInput.focus()\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"clock-outline\"></nb-icon>\r\n            </button>\r\n            <nb-timepicker\r\n              #timePicker\r\n              timeFormat=\"{{ column.getEditorSettings().getFormat() }}\"\r\n              [ampmText]=\"column.getEditorSettings().getTimeText()\"\r\n              [applyButtonText]=\"\r\n                column.getEditorSettings().getApplyButtonText()\r\n              \"\r\n              [currentTimeButtonText]=\"\r\n                column.getEditorSettings().getCurrentTimeButtonText()\r\n              \"\r\n              [hoursText]=\"column.getEditorSettings().getHoursText()\"\r\n              [minutesText]=\"column.getEditorSettings().getMinutesText()\"\r\n              [secondsText]=\"column.getEditorSettings().getSecondsText()\"\r\n              [singleColumn]=\"column.getEditorSettings().getSingleColumn()\"\r\n              [step]=\"column.getEditorSettings().getTimeStep()\"\r\n              [twelveHoursFormat]=\"\r\n                column.getEditorSettings().getTwelveHoursFormat()\r\n              \"\r\n              [withSeconds]=\"column.getEditorSettings().getShowSeconds()\"\r\n            >\r\n            </nb-timepicker>\r\n          </nb-form-field>\r\n        </div>\r\n\r\n        <div *ngSwitchCase=\"datePickerTypes.DATE_RANGE\">\r\n          <nb-form-field>\r\n            <input\r\n              nbInput\r\n              [placeholder]=\"column.getTitle()\"\r\n              [nbDatepicker]=\"dateTimeRangePicker\"\r\n              fullWidth\r\n              #dateRangepickerInput\r\n              [(ngModel)]=\"cellValue\"\r\n              name=\"daterangePickerFilter\"\r\n              [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            />\r\n            <button\r\n              nbButton\r\n              nbSuffix\r\n              ghost\r\n              status=\"primary\"\r\n              (click)=\"dateRangepickerInput.focus()\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n            </button>\r\n            <nb-rangepicker\r\n              #dateTimeRangePicker\r\n              format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n              [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n              [showNavigation]=\"column.getEditorSettings().getShowNavigation()\"\r\n              [showWeekNumber]=\"column.getEditorSettings().getShowWeekNumbers()\"\r\n              [max]=\"column.getEditorSettings().getMax()\"\r\n              [min]=\"column.getEditorSettings().getMin()\"\r\n            >\r\n            </nb-rangepicker>\r\n          </nb-form-field>\r\n        </div>\r\n      </ng-container>\r\n    </div>\r\n\r\n    <div\r\n      *ngSwitchCase=\"types.CHECKBOX\"\r\n      class=\"d-flex justify-content-center align-items-center\"\r\n    >\r\n      <nb-checkbox\r\n        name=\"checkboxFilter\"\r\n        [(checked)]=\"cellValue\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n      >\r\n      </nb-checkbox>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.TOGGLE\">\r\n      <nb-toggle\r\n        name=\"toggleFilter\"\r\n        [(checked)]=\"cellValue\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n      ></nb-toggle>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.COLORPICKER\">\r\n      <ngx-colors\r\n        [name]=\"column.getDataField()\"\r\n        ngx-colors-trigger\r\n        [required]=\"column.getEditorSettings().getRequired()\"\r\n        [(ngModel)]=\"cellValue\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n      ></ngx-colors>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.AUTOCOMPLETE\">\r\n      <ngx-tags-autocomplete\r\n        [emptyPlaceholder]=\"column.getEditorSettings().getLabel()\"\r\n        [(selectedKeys)]=\"cellValue\"\r\n        [keyAttribute]=\"column.getEditorSettings().getKeyExpression()\"\r\n        [displayArrow]=\"column.getEditorSettings().getDisplayArrow()\"\r\n        [attributesToFilter]=\"\r\n          column.getEditorSettings().getAttributesToFilter()\r\n        \"\r\n        [attributesToShow]=\"column.getEditorSettings().getAttributesToShow()\"\r\n        [attributesToShowInTag]=\"\r\n          column.getEditorSettings().getAttributesToShowInTag()\r\n        \"\r\n        [multiple]=\"column.getEditorSettings().getMultiple()\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n        [source]=\"column.getEditorSettings().getDataSource()\"\r\n      >\r\n      </ngx-tags-autocomplete>\r\n    </div>\r\n\r\n    <div\r\n      *ngSwitchCase=\"types.ACTION\"\r\n      class=\"d-flex justify-content-center align-items-center\"\r\n    >\r\n      <div\r\n        *ngFor=\"let btn of column.getEditorSettings().getButtons()\"\r\n        style=\"width: max-content\"\r\n      >\r\n        <button\r\n          nbButton\r\n          [shape]=\"btn.getShape()\"\r\n          [ghost]=\"btn.getGhost()\"\r\n          [size]=\"btn.getSize()\"\r\n          [status]=\"btn.getStatus()\"\r\n          [outline]=\"btn.getOutlined()\"\r\n          [disabled]=\"btn.getDisabled()\"\r\n          [class]=\"btn.getClass()\"\r\n          [id]=\"btn.getId()\"\r\n          [hero]=\"btn.getHero()\"\r\n          [nbTooltip]=\"btn.getTooltip()\"\r\n          [nbTooltipDisabled]=\"btn.getTooltipDisabled()\"\r\n          [filled]=\"btn.getFilled()\"\r\n          (click)=\"onButtonClick(btn)\"\r\n        >\r\n          <span *ngIf=\"btn.getText() != ''\">{{ btn.getText() }}</span>\r\n          <nb-icon\r\n            *ngIf=\"btn.getIcon() != ''\"\r\n            pack=\"eva\"\r\n            [icon]=\"btn.getIcon()\"\r\n          ></nb-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n</div>\r\n", styles: [""], dependencies: [{ kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i1.NbTooltipDirective, selector: "[nbTooltip]", inputs: ["nbTooltip", "nbTooltipPlacement", "nbTooltipAdjustment", "nbTooltipClass", "nbTooltipIcon", "nbTooltipStatus", "nbTooltipTrigger", "nbTooltipOffset", "nbTooltipDisabled"], outputs: ["nbTooltipShowStateChange"], exportAs: ["nbTooltip"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i1.NbCheckboxComponent, selector: "nb-checkbox", inputs: ["checked", "disabled", "status", "indeterminate"], outputs: ["checkedChange"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i1.NbSelectComponent, selector: "nb-select", inputs: ["size", "status", "shape", "appearance", "optionsListClass", "optionsPanelClass", "optionsWidth", "outline", "filled", "hero", "disabled", "fullWidth", "placeholder", "compareWith", "selected", "multiple", "optionsOverlayOffset", "scrollStrategy"], outputs: ["selectedChange"] }, { kind: "component", type: i1.NbOptionComponent, selector: "nb-option", inputs: ["value", "disabled"], outputs: ["selectionChange"] }, { kind: "component", type: i1.NbToggleComponent, selector: "nb-toggle", inputs: ["checked", "disabled", "status", "labelPosition"], outputs: ["checkedChange"] }, { kind: "directive", type: i1.NbDatepickerDirective, selector: "input[nbDatepicker]", inputs: ["nbDatepicker"] }, { kind: "component", type: i1.NbDatepickerComponent, selector: "nb-datepicker", inputs: ["date"], outputs: ["dateChange"] }, { kind: "component", type: i1.NbRangepickerComponent, selector: "nb-rangepicker", inputs: ["range"], outputs: ["rangeChange"] }, { kind: "component", type: i1.NbDateTimePickerComponent, selector: "nb-date-timepicker", inputs: ["step", "title", "applyButtonText", "currentTimeButtonText", "showCurrentTimeButton", "twelveHoursFormat", "showAmPmLabel", "withSeconds", "singleColumn"], outputs: ["dateTimeChange"] }, { kind: "directive", type: i1.NbInputDirective, selector: "input[nbInput],textarea[nbInput]", inputs: ["fieldSize", "status", "shape", "fullWidth"] }, { kind: "component", type: i1.NbFormFieldComponent, selector: "nb-form-field" }, { kind: "directive", type: i1.NbSuffixDirective, selector: "[nbSuffix]" }, { kind: "component", type: i1.NbTimePickerComponent, selector: "nb-timepicker", inputs: ["timeFormat", "twelveHoursFormat", "showAmPmLabel", "withSeconds", "singleColumn", "step", "date", "showFooter", "applyButtonText", "hoursText", "minutesText", "secondsText", "ampmText", "currentTimeButtonText"], outputs: ["onSelectTime"], exportAs: ["nbTimepicker"] }, { kind: "directive", type: i1.NbTimePickerDirective, selector: "input[nbTimepicker]", inputs: ["nbTimepicker", "overlayOffset"] }, { kind: "component", type: i6.NgxColorsComponent, selector: "ngx-colors" }, { kind: "directive", type: i6.NgxColorsTriggerDirective, selector: "[ngx-colors-trigger]", inputs: ["colorsAnimation", "palette", "format", "formats", "position", "hideTextInput", "hideColorPicker", "attachTo", "overlayClassName", "colorPickerControls", "acceptLabel", "cancelLabel"], outputs: ["change", "input", "slider", "close", "open"] }, { kind: "component", type: TagsAutocompleteComponent, selector: "ngx-tags-autocomplete", inputs: ["source", "selectedKeys", "selectedItems", "keyAttribute", "attributesToShow", "attributesToShowInTag", "attributesToFilter", "emptyPlaceholder", "tagStatus", "tagAppereance", "inputWidthClass", "inputPlaceholder", "clearEnabled", "clearBtnTooltip", "expanded", "displayArrow", "displayNumSelected", "displayDots", "multiple", "floatingDroopDown", "disabled"], outputs: ["selectedKeysChange", "onSelectionChanged", "onOptionRemoved", "onSelectionCleared"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CellEditComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-cell-edit', template: "<div *ngIf=\"column.getEditorSettings().getShow()\">\r\n  <ng-container [ngSwitch]=\"column.getEditor()\">\r\n    <div *ngSwitchCase=\"types.TEXTBOX\">\r\n      <input\r\n        [(ngModel)]=\"cellValue\"\r\n        name=\"inputFilter\"\r\n        nbInput\r\n        fullWidth\r\n        [placeholder]=\"column.getTitle()\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n      />\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.SELECT\">\r\n      <nb-select\r\n        [placeholder]=\"column.getTitle()\"\r\n        fullWidth\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n        [(selected)]=\"cellValue\"\r\n        name=\"selectFilter\"\r\n      >\r\n        <nb-option [value]=\"null\">{{\r\n          column.getEditorSettings().getClearText()\r\n        }}</nb-option>\r\n        <nb-option\r\n          *ngFor=\"let o of selectFilterDataSource\"\r\n          [value]=\"o[column.getEditorSettings().getKeyExpression()]\"\r\n        >\r\n          {{ o[column.getEditorSettings().getDisplayExpression()] }}\r\n        </nb-option>\r\n      </nb-select>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.NUMBERBOX\">\r\n      <input\r\n        nbInput\r\n        type=\"number\"\r\n        fullWidth\r\n        [placeholder]=\"column.getTitle()\"\r\n        [(ngModel)]=\"cellValue\"\r\n        name=\"numberboxFilter\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n      />\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.DATE_PICKER\">\r\n      <ng-container [ngSwitch]=\"column.getEditorSettings().getDatePickerType()\">\r\n        <div *ngSwitchCase=\"datePickerTypes.DATE\">\r\n          <nb-form-field>\r\n            <input\r\n              nbInput\r\n              [placeholder]=\"column.getTitle()\"\r\n              [nbDatepicker]=\"datePicker\"\r\n              fullWidth\r\n              #datepickerInput\r\n              [(ngModel)]=\"cellValue\"\r\n              name=\"datePickerFilter\"\r\n              [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            />\r\n            <button\r\n              nbButton\r\n              nbSuffix\r\n              ghost\r\n              status=\"primary\"\r\n              (click)=\"datepickerInput.focus()\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n            </button>\r\n            <nb-datepicker\r\n              #datePicker\r\n              format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n              [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n              [showNavigation]=\"column.getEditorSettings().getShowNavigation()\"\r\n              [showWeekNumber]=\"column.getEditorSettings().getShowWeekNumbers()\"\r\n              [max]=\"column.getEditorSettings().getMax()\"\r\n              [min]=\"column.getEditorSettings().getMin()\"\r\n            >\r\n            </nb-datepicker>\r\n          </nb-form-field>\r\n        </div>\r\n\r\n        <div *ngSwitchCase=\"datePickerTypes.DATE_TIME\">\r\n          <nb-form-field>\r\n            <input\r\n              nbInput\r\n              [placeholder]=\"column.getTitle()\"\r\n              [nbDatepicker]=\"dateTimePicker\"\r\n              fullWidth\r\n              #dateTimepickerInput\r\n              [(ngModel)]=\"cellValue\"\r\n              name=\"dateTimePickerFilter\"\r\n              [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            />\r\n            <button\r\n              nbButton\r\n              nbSuffix\r\n              ghost\r\n              status=\"primary\"\r\n              (click)=\"dateTimepickerInput.focus()\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n            </button>\r\n            <nb-date-timepicker\r\n              #dateTimePicker\r\n              format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n              [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n              [showNavigation]=\"column.getEditorSettings().getShowNavigation()\"\r\n              [showWeekNumber]=\"column.getEditorSettings().getShowWeekNumbers()\"\r\n              [max]=\"column.getEditorSettings().getMax()\"\r\n              [min]=\"column.getEditorSettings().getMin()\"\r\n              [singleColumn]=\"column.getEditorSettings().getSingleColumn()\"\r\n              [step]=\"column.getEditorSettings().getTimeStep()\"\r\n              [withSeconds]=\"column.getEditorSettings().getShowSeconds()\"\r\n              [twelweHoursFormat]=\"\r\n                column.getEditorSettings().getTwelveHoursFormat()\r\n              \"\r\n              [applyButtonText]=\"\r\n                column.getEditorSettings().getApplyButtonText()\r\n              \"\r\n              [currentTimeButtonText]=\"\r\n                column.getEditorSettings().getCurrentTimeButtonText()\r\n              \"\r\n              [showCurrentTimeButton]=\"\r\n                column.getEditorSettings().getShowCurrentTimeButton()\r\n              \"\r\n            >\r\n            </nb-date-timepicker>\r\n          </nb-form-field>\r\n        </div>\r\n\r\n        <div *ngSwitchCase=\"datePickerTypes.TIME\">\r\n          <nb-form-field>\r\n            <input\r\n              nbInput\r\n              [placeholder]=\"column.getTitle()\"\r\n              [nbTimepicker]=\"timePicker\"\r\n              fullWidth\r\n              #timepickerInput\r\n              [(ngModel)]=\"cellValue\"\r\n              name=\"timepickerFilter\"\r\n              [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            />\r\n            <button\r\n              nbButton\r\n              nbSuffix\r\n              ghost\r\n              status=\"primary\"\r\n              (click)=\"timepickerInput.focus()\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"clock-outline\"></nb-icon>\r\n            </button>\r\n            <nb-timepicker\r\n              #timePicker\r\n              timeFormat=\"{{ column.getEditorSettings().getFormat() }}\"\r\n              [ampmText]=\"column.getEditorSettings().getTimeText()\"\r\n              [applyButtonText]=\"\r\n                column.getEditorSettings().getApplyButtonText()\r\n              \"\r\n              [currentTimeButtonText]=\"\r\n                column.getEditorSettings().getCurrentTimeButtonText()\r\n              \"\r\n              [hoursText]=\"column.getEditorSettings().getHoursText()\"\r\n              [minutesText]=\"column.getEditorSettings().getMinutesText()\"\r\n              [secondsText]=\"column.getEditorSettings().getSecondsText()\"\r\n              [singleColumn]=\"column.getEditorSettings().getSingleColumn()\"\r\n              [step]=\"column.getEditorSettings().getTimeStep()\"\r\n              [twelveHoursFormat]=\"\r\n                column.getEditorSettings().getTwelveHoursFormat()\r\n              \"\r\n              [withSeconds]=\"column.getEditorSettings().getShowSeconds()\"\r\n            >\r\n            </nb-timepicker>\r\n          </nb-form-field>\r\n        </div>\r\n\r\n        <div *ngSwitchCase=\"datePickerTypes.DATE_RANGE\">\r\n          <nb-form-field>\r\n            <input\r\n              nbInput\r\n              [placeholder]=\"column.getTitle()\"\r\n              [nbDatepicker]=\"dateTimeRangePicker\"\r\n              fullWidth\r\n              #dateRangepickerInput\r\n              [(ngModel)]=\"cellValue\"\r\n              name=\"daterangePickerFilter\"\r\n              [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n            />\r\n            <button\r\n              nbButton\r\n              nbSuffix\r\n              ghost\r\n              status=\"primary\"\r\n              (click)=\"dateRangepickerInput.focus()\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"calendar-outline\"></nb-icon>\r\n            </button>\r\n            <nb-rangepicker\r\n              #dateTimeRangePicker\r\n              format=\"{{ column.getEditorSettings().getFormat() }}\"\r\n              [filter]=\"column.getEditorSettings().getFilterDates()\"\r\n              [showNavigation]=\"column.getEditorSettings().getShowNavigation()\"\r\n              [showWeekNumber]=\"column.getEditorSettings().getShowWeekNumbers()\"\r\n              [max]=\"column.getEditorSettings().getMax()\"\r\n              [min]=\"column.getEditorSettings().getMin()\"\r\n            >\r\n            </nb-rangepicker>\r\n          </nb-form-field>\r\n        </div>\r\n      </ng-container>\r\n    </div>\r\n\r\n    <div\r\n      *ngSwitchCase=\"types.CHECKBOX\"\r\n      class=\"d-flex justify-content-center align-items-center\"\r\n    >\r\n      <nb-checkbox\r\n        name=\"checkboxFilter\"\r\n        [(checked)]=\"cellValue\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n      >\r\n      </nb-checkbox>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.TOGGLE\">\r\n      <nb-toggle\r\n        name=\"toggleFilter\"\r\n        [(checked)]=\"cellValue\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n      ></nb-toggle>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.COLORPICKER\">\r\n      <ngx-colors\r\n        [name]=\"column.getDataField()\"\r\n        ngx-colors-trigger\r\n        [required]=\"column.getEditorSettings().getRequired()\"\r\n        [(ngModel)]=\"cellValue\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n      ></ngx-colors>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"types.AUTOCOMPLETE\">\r\n      <ngx-tags-autocomplete\r\n        [emptyPlaceholder]=\"column.getEditorSettings().getLabel()\"\r\n        [(selectedKeys)]=\"cellValue\"\r\n        [keyAttribute]=\"column.getEditorSettings().getKeyExpression()\"\r\n        [displayArrow]=\"column.getEditorSettings().getDisplayArrow()\"\r\n        [attributesToFilter]=\"\r\n          column.getEditorSettings().getAttributesToFilter()\r\n        \"\r\n        [attributesToShow]=\"column.getEditorSettings().getAttributesToShow()\"\r\n        [attributesToShowInTag]=\"\r\n          column.getEditorSettings().getAttributesToShowInTag()\r\n        \"\r\n        [multiple]=\"column.getEditorSettings().getMultiple()\"\r\n        [disabled]=\"isNew ? !column.getAddable() : !column.getEditable()\"\r\n        [source]=\"column.getEditorSettings().getDataSource()\"\r\n      >\r\n      </ngx-tags-autocomplete>\r\n    </div>\r\n\r\n    <div\r\n      *ngSwitchCase=\"types.ACTION\"\r\n      class=\"d-flex justify-content-center align-items-center\"\r\n    >\r\n      <div\r\n        *ngFor=\"let btn of column.getEditorSettings().getButtons()\"\r\n        style=\"width: max-content\"\r\n      >\r\n        <button\r\n          nbButton\r\n          [shape]=\"btn.getShape()\"\r\n          [ghost]=\"btn.getGhost()\"\r\n          [size]=\"btn.getSize()\"\r\n          [status]=\"btn.getStatus()\"\r\n          [outline]=\"btn.getOutlined()\"\r\n          [disabled]=\"btn.getDisabled()\"\r\n          [class]=\"btn.getClass()\"\r\n          [id]=\"btn.getId()\"\r\n          [hero]=\"btn.getHero()\"\r\n          [nbTooltip]=\"btn.getTooltip()\"\r\n          [nbTooltipDisabled]=\"btn.getTooltipDisabled()\"\r\n          [filled]=\"btn.getFilled()\"\r\n          (click)=\"onButtonClick(btn)\"\r\n        >\r\n          <span *ngIf=\"btn.getText() != ''\">{{ btn.getText() }}</span>\r\n          <nb-icon\r\n            *ngIf=\"btn.getIcon() != ''\"\r\n            pack=\"eva\"\r\n            [icon]=\"btn.getIcon()\"\r\n          ></nb-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.HttpClient }, { type: TranslationService }]; }, propDecorators: { isNew: [{
                type: Input
            }], column: [{
                type: Input
            }], cellValue: [{
                type: Input
            }], cellValueChange: [{
                type: Output
            }], cellButtonClick: [{
                type: Output
            }] } });

class GridFooterComponent {
    constructor() {
        var _a;
        this.entriesPerPageOptions = GRID_CONF.entriesPerPageOptions;
        this.visible = true;
        this.refreshEnabled = true;
        this.refreshTooltip = ''; // tooltip to be shown on Refresh button hover -> empty string disables tooltip
        this.exportPdfEnabled = true;
        this.exportPdfTooltip = ''; // tooltip to be shown on PDF export button hover -> empty string disables tooltip
        this.exportExcelEnabled = true;
        this.exportExcelTooltip = ''; // tooltip to be shown on Excel export button hover -> empty string disables tooltip
        this.entriesPerPageEnabled = true;
        this.entriesPerPageTooltip = ''; // tooltip to be shown on entries per page hover -> empty string disables tooltip
        this._page = 1;
        this._defaultPerPageOption = ((_a = this.entriesPerPageOptions) === null || _a === void 0 ? void 0 : _a.length) > 0
            ? this.entriesPerPageOptions[0]
            : GRID_CONF.defaultEntriesPerPage;
        this.defaultPerPageOptionChange = new EventEmitter();
        this.pageChanged = new EventEmitter();
        this.resetFiltersClicked = new EventEmitter();
        this.exportPdfClicked = new EventEmitter();
        this.exportExcelClicked = new EventEmitter();
        this.selectionPerPageChanged = new EventEmitter();
        this.pageChange = new EventEmitter();
    }
    ngOnInit() { }
    set page(value) {
        this._page = value;
        this.pageChange.emit(this._page);
    }
    get page() {
        return this._page;
    }
    set defaultPerPageOption(value) {
        this._defaultPerPageOption = value;
        this.defaultPerPageOptionChange.emit(this._defaultPerPageOption);
    }
    get defaultPerPageOption() {
        return this._defaultPerPageOption;
    }
    onPageChanged() {
        this.pageChanged.emit();
    }
    onClickResetFilters() {
        this.resetFiltersClicked.emit();
    }
    exportPdfBtnClick() {
        this.exportPdfClicked.emit();
    }
    exportExcelBtnClick() {
        this.exportExcelClicked.emit();
    }
    onSelectedChangePagerPerPage(page) {
        this.selectionPerPageChanged.emit(page);
    }
}
GridFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GridFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: GridFooterComponent, selector: "ngx-grid-footer", inputs: { entriesPerPageOptions: "entriesPerPageOptions", visible: "visible", page: "page", refreshEnabled: "refreshEnabled", refreshTooltip: "refreshTooltip", exportPdfEnabled: "exportPdfEnabled", exportPdfTooltip: "exportPdfTooltip", exportExcelEnabled: "exportExcelEnabled", exportExcelTooltip: "exportExcelTooltip", entriesPerPageEnabled: "entriesPerPageEnabled", entriesPerPageTooltip: "entriesPerPageTooltip", defaultPerPageOption: "defaultPerPageOption" }, outputs: { defaultPerPageOptionChange: "defaultPerPageOptionChange", pageChanged: "pageChanged", resetFiltersClicked: "resetFiltersClicked", exportPdfClicked: "exportPdfClicked", exportExcelClicked: "exportExcelClicked", selectionPerPageChanged: "selectionPerPageChanged", pageChange: "pageChange" }, ngImport: i0, template: "<div class=\"ngx-grid-footer row m-0\" *ngIf=\"visible\">\n  <div class=\"col p-0\">\n    <pagination-template #pT=\"paginationApi\" (pageChange)=\"page = $event\">\n      <button\n        nbButton\n        size=\"small\"\n        status=\"primary\"\n        shape=\"round\"\n        ghost\n        class=\"pagination-previous\"\n        [disabled]=\"pT.isFirstPage()\"\n        *ngIf=\"!pT.isFirstPage()\"\n        (click)=\"pT.previous(); onPageChanged()\"\n      >\n        <nb-icon pack=\"eva\" icon=\"chevron-left-outline\"></nb-icon>\n      </button>\n\n      <button\n        nbButton\n        size=\"small\"\n        [ghost]=\"pT.getCurrent() != page.value\"\n        *ngFor=\"let page of pT.pages\"\n        [status]=\"pT.getCurrent() === page.value ? 'primary' : 'basic'\"\n        (click)=\"pT.setCurrent(page.value); onPageChanged()\"\n      >\n        {{ page.label }}\n      </button>\n\n      <button\n        ghost\n        size=\"small\"\n        status=\"primary\"\n        nbButton\n        shape=\"round\"\n        class=\"pagination-next\"\n        [disabled]=\"pT.isLastPage()\"\n        *ngIf=\"!pT.isLastPage()\"\n        (click)=\"pT.next(); onPageChanged()\"\n      >\n        <nb-icon pack=\"eva\" icon=\"chevron-right-outline\"></nb-icon>\n      </button>\n    </pagination-template>\n  </div>\n\n  <div\n    class=\"col p-0 d-flex justify-content-end align-items-center actions-container\"\n  >\n    <div *ngIf=\"refreshEnabled\">\n      <button\n        nbButton\n        status=\"primary\"\n        ghost\n        shape=\"round\"\n        [nbTooltip]=\"refreshTooltip\"\n        [nbTooltipDisabled]=\"refreshTooltip.length == 0\"\n        (click)=\"onClickResetFilters()\"\n      >\n        <nb-icon pack=\"eva\" icon=\"refresh-outline\"></nb-icon>\n      </button>\n    </div>\n    <div *ngIf=\"exportPdfEnabled\">\n      <button\n        nbButton\n        status=\"primary\"\n        ghost\n        shape=\"round\"\n        [nbTooltip]=\"exportPdfTooltip\"\n        [nbTooltipDisabled]=\"exportPdfTooltip.length == 0\"\n        (click)=\"exportPdfBtnClick()\"\n      >\n        <i class=\"far fa-file-pdf\"></i>\n      </button>\n    </div>\n    <div *ngIf=\"exportExcelEnabled\">\n      <button\n        nbButton\n        status=\"primary\"\n        ghost\n        shape=\"round\"\n        [nbTooltip]=\"exportExcelTooltip\"\n        [nbTooltipDisabled]=\"exportExcelTooltip.length == 0\"\n        (click)=\"exportExcelBtnClick()\"\n      >\n        <i class=\"far fa-file-excel\"></i>\n      </button>\n    </div>\n    <div id=\"entries-per-page\" *ngIf=\"entriesPerPageEnabled\">\n      <nb-select\n        [nbTooltip]=\"entriesPerPageTooltip\"\n        [nbTooltipDisabled]=\"entriesPerPageTooltip.length == 0\"\n        [(ngModel)]=\"defaultPerPageOption\"\n        (selectedChange)=\"onSelectedChangePagerPerPage($event)\"\n      >\n        <nb-option\n          *ngFor=\"let option of entriesPerPageOptions\"\n          [value]=\"option\"\n          >{{ option }}</nb-option\n        >\n      </nb-select>\n    </div>\n  </div>\n</div>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .ngx-grid-footer{width:100%;background-color:var(--card-background-color);padding:.7rem .5rem}:host .ngx-grid-footer .actions-container button{padding:var(--icon-button-ghost-medium-padding);margin-right:.5rem}:host .ngx-grid-footer .actions-container button i{font-size:16px;color:var(--color-primary-500)}\n"], dependencies: [{ kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i1.NbTooltipDirective, selector: "[nbTooltip]", inputs: ["nbTooltip", "nbTooltipPlacement", "nbTooltipAdjustment", "nbTooltipClass", "nbTooltipIcon", "nbTooltipStatus", "nbTooltipTrigger", "nbTooltipOffset", "nbTooltipDisabled"], outputs: ["nbTooltipShowStateChange"], exportAs: ["nbTooltip"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i1.NbSelectComponent, selector: "nb-select", inputs: ["size", "status", "shape", "appearance", "optionsListClass", "optionsPanelClass", "optionsWidth", "outline", "filled", "hero", "disabled", "fullWidth", "placeholder", "compareWith", "selected", "multiple", "optionsOverlayOffset", "scrollStrategy"], outputs: ["selectedChange"] }, { kind: "component", type: i1.NbOptionComponent, selector: "nb-option", inputs: ["value", "disabled"], outputs: ["selectionChange"] }, { kind: "directive", type: i4$1.PaginationControlsDirective, selector: "pagination-template,[pagination-template]", inputs: ["id", "maxSize"], outputs: ["pageChange", "pageBoundsCorrection"], exportAs: ["paginationApi"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-grid-footer', template: "<div class=\"ngx-grid-footer row m-0\" *ngIf=\"visible\">\n  <div class=\"col p-0\">\n    <pagination-template #pT=\"paginationApi\" (pageChange)=\"page = $event\">\n      <button\n        nbButton\n        size=\"small\"\n        status=\"primary\"\n        shape=\"round\"\n        ghost\n        class=\"pagination-previous\"\n        [disabled]=\"pT.isFirstPage()\"\n        *ngIf=\"!pT.isFirstPage()\"\n        (click)=\"pT.previous(); onPageChanged()\"\n      >\n        <nb-icon pack=\"eva\" icon=\"chevron-left-outline\"></nb-icon>\n      </button>\n\n      <button\n        nbButton\n        size=\"small\"\n        [ghost]=\"pT.getCurrent() != page.value\"\n        *ngFor=\"let page of pT.pages\"\n        [status]=\"pT.getCurrent() === page.value ? 'primary' : 'basic'\"\n        (click)=\"pT.setCurrent(page.value); onPageChanged()\"\n      >\n        {{ page.label }}\n      </button>\n\n      <button\n        ghost\n        size=\"small\"\n        status=\"primary\"\n        nbButton\n        shape=\"round\"\n        class=\"pagination-next\"\n        [disabled]=\"pT.isLastPage()\"\n        *ngIf=\"!pT.isLastPage()\"\n        (click)=\"pT.next(); onPageChanged()\"\n      >\n        <nb-icon pack=\"eva\" icon=\"chevron-right-outline\"></nb-icon>\n      </button>\n    </pagination-template>\n  </div>\n\n  <div\n    class=\"col p-0 d-flex justify-content-end align-items-center actions-container\"\n  >\n    <div *ngIf=\"refreshEnabled\">\n      <button\n        nbButton\n        status=\"primary\"\n        ghost\n        shape=\"round\"\n        [nbTooltip]=\"refreshTooltip\"\n        [nbTooltipDisabled]=\"refreshTooltip.length == 0\"\n        (click)=\"onClickResetFilters()\"\n      >\n        <nb-icon pack=\"eva\" icon=\"refresh-outline\"></nb-icon>\n      </button>\n    </div>\n    <div *ngIf=\"exportPdfEnabled\">\n      <button\n        nbButton\n        status=\"primary\"\n        ghost\n        shape=\"round\"\n        [nbTooltip]=\"exportPdfTooltip\"\n        [nbTooltipDisabled]=\"exportPdfTooltip.length == 0\"\n        (click)=\"exportPdfBtnClick()\"\n      >\n        <i class=\"far fa-file-pdf\"></i>\n      </button>\n    </div>\n    <div *ngIf=\"exportExcelEnabled\">\n      <button\n        nbButton\n        status=\"primary\"\n        ghost\n        shape=\"round\"\n        [nbTooltip]=\"exportExcelTooltip\"\n        [nbTooltipDisabled]=\"exportExcelTooltip.length == 0\"\n        (click)=\"exportExcelBtnClick()\"\n      >\n        <i class=\"far fa-file-excel\"></i>\n      </button>\n    </div>\n    <div id=\"entries-per-page\" *ngIf=\"entriesPerPageEnabled\">\n      <nb-select\n        [nbTooltip]=\"entriesPerPageTooltip\"\n        [nbTooltipDisabled]=\"entriesPerPageTooltip.length == 0\"\n        [(ngModel)]=\"defaultPerPageOption\"\n        (selectedChange)=\"onSelectedChangePagerPerPage($event)\"\n      >\n        <nb-option\n          *ngFor=\"let option of entriesPerPageOptions\"\n          [value]=\"option\"\n          >{{ option }}</nb-option\n        >\n      </nb-select>\n    </div>\n  </div>\n</div>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .ngx-grid-footer{width:100%;background-color:var(--card-background-color);padding:.7rem .5rem}:host .ngx-grid-footer .actions-container button{padding:var(--icon-button-ghost-medium-padding);margin-right:.5rem}:host .ngx-grid-footer .actions-container button i{font-size:16px;color:var(--color-primary-500)}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { entriesPerPageOptions: [{
                type: Input
            }], visible: [{
                type: Input
            }], page: [{
                type: Input
            }], refreshEnabled: [{
                type: Input
            }], refreshTooltip: [{
                type: Input
            }], exportPdfEnabled: [{
                type: Input
            }], exportPdfTooltip: [{
                type: Input
            }], exportExcelEnabled: [{
                type: Input
            }], exportExcelTooltip: [{
                type: Input
            }], entriesPerPageEnabled: [{
                type: Input
            }], entriesPerPageTooltip: [{
                type: Input
            }], defaultPerPageOption: [{
                type: Input
            }], defaultPerPageOptionChange: [{
                type: Output
            }], pageChanged: [{
                type: Output
            }], resetFiltersClicked: [{
                type: Output
            }], exportPdfClicked: [{
                type: Output
            }], exportExcelClicked: [{
                type: Output
            }], selectionPerPageChanged: [{
                type: Output
            }], pageChange: [{
                type: Output
            }] } });

class GridToolbarComponent {
    constructor() {
        this.visible = true;
        this.selectedRowsTitleEnabled = true;
        this.selectionMultiple = false;
        this.selectedRows = 0;
        this.selectedRowsTitle = '';
        this.addEnabled = true;
        this.addTooltip = ''; // add button tooltip
        this.addNewClicked = new EventEmitter();
    }
    ngOnInit() { }
    addNewClick() {
        this.addNewClicked.emit();
    }
}
GridToolbarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GridToolbarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: GridToolbarComponent, selector: "ngx-grid-toolbar", inputs: { visible: "visible", selectedRowsTitleEnabled: "selectedRowsTitleEnabled", selectionMultiple: "selectionMultiple", selectedRows: "selectedRows", selectedRowsTitle: "selectedRowsTitle", addEnabled: "addEnabled", addTooltip: "addTooltip" }, outputs: { addNewClicked: "addNewClicked" }, ngImport: i0, template: "<div class=\"grid-toolbar d-flex\" *ngIf=\"visible\">\n  <!--------------------------------------------------- SELECTED ROWS TITLE -------------------------------------------------------------->\n  <div\n    *ngIf=\"selectedRowsTitleEnabled\"\n    class=\"selected-rows\"\n    [ngClass]=\"selectionMultiple && selectedRows > 0 ? 'd-flex' : 'd-none'\"\n  >\n    <span class=\"label m-0 p-0\">{{ selectedRowsTitle }}</span\n    ><span class=\"ms-1 me-0 mt-0 mb-0 p-0\">{{ selectedRows }}</span>\n  </div>\n\n  <!--------------------------------------------------- ADD BUTTON ------------------------------------------------------------------------>\n  <div\n    *ngIf=\"addEnabled\"\n    class=\"col d-flex justify-content-end align-items-center\"\n  >\n    <button\n      nbButton\n      ghost\n      status=\"primary\"\n      shape=\"round\"\n      [nbTooltip]=\"addTooltip\"\n      [nbTooltipDisabled]=\"addTooltip.length == 0\"\n      (click)=\"addNewClick()\"\n    >\n      <nb-icon pack=\"eva\" icon=\"plus-outline\"></nb-icon>\n    </button>\n  </div>\n</div>\n", styles: [".grid-toolbar{padding:.5rem 0}.grid-toolbar .col{padding-right:.5rem}\n"], dependencies: [{ kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i1.NbTooltipDirective, selector: "[nbTooltip]", inputs: ["nbTooltip", "nbTooltipPlacement", "nbTooltipAdjustment", "nbTooltipClass", "nbTooltipIcon", "nbTooltipStatus", "nbTooltipTrigger", "nbTooltipOffset", "nbTooltipDisabled"], outputs: ["nbTooltipShowStateChange"], exportAs: ["nbTooltip"] }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-grid-toolbar', template: "<div class=\"grid-toolbar d-flex\" *ngIf=\"visible\">\n  <!--------------------------------------------------- SELECTED ROWS TITLE -------------------------------------------------------------->\n  <div\n    *ngIf=\"selectedRowsTitleEnabled\"\n    class=\"selected-rows\"\n    [ngClass]=\"selectionMultiple && selectedRows > 0 ? 'd-flex' : 'd-none'\"\n  >\n    <span class=\"label m-0 p-0\">{{ selectedRowsTitle }}</span\n    ><span class=\"ms-1 me-0 mt-0 mb-0 p-0\">{{ selectedRows }}</span>\n  </div>\n\n  <!--------------------------------------------------- ADD BUTTON ------------------------------------------------------------------------>\n  <div\n    *ngIf=\"addEnabled\"\n    class=\"col d-flex justify-content-end align-items-center\"\n  >\n    <button\n      nbButton\n      ghost\n      status=\"primary\"\n      shape=\"round\"\n      [nbTooltip]=\"addTooltip\"\n      [nbTooltipDisabled]=\"addTooltip.length == 0\"\n      (click)=\"addNewClick()\"\n    >\n      <nb-icon pack=\"eva\" icon=\"plus-outline\"></nb-icon>\n    </button>\n  </div>\n</div>\n", styles: [".grid-toolbar{padding:.5rem 0}.grid-toolbar .col{padding-right:.5rem}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { visible: [{
                type: Input
            }], selectedRowsTitleEnabled: [{
                type: Input
            }], selectionMultiple: [{
                type: Input
            }], selectedRows: [{
                type: Input
            }], selectedRowsTitle: [{
                type: Input
            }], addEnabled: [{
                type: Input
            }], addTooltip: [{
                type: Input
            }], addNewClicked: [{
                type: Output
            }] } });

class GridComponent {
    constructor(_menuService, _windowService, _dialogService, _translationService) {
        var _a;
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
        this.defaultPerPageOption = ((_a = this.entriesPerPageOptions) === null || _a === void 0 ? void 0 : _a.length) > 0
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
            return tag === null || tag === void 0 ? void 0 : tag.startsWith('column-context-menu-' + this.id + '-');
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
        var formIsValid = GridValidationService.validate(this.columns, row !== null && row !== void 0 ? row : this.newRowData);
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
        var _a;
        var list = (_a = document
            .getElementById(this.id)) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('ngx-grid-table');
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
        var _a;
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
        (_a = this.groupedColumn) === null || _a === void 0 ? void 0 : _a.Grouped(false);
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
            if ((dataToExport === null || dataToExport === void 0 ? void 0 : dataToExport.length) > 0) {
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
            if ((dataToExport === null || dataToExport === void 0 ? void 0 : dataToExport.length) > 0) {
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
            var _a;
            var elements = document.getElementsByClassName('ngx-grid-column-context-menu');
            if (elements.length > 0) {
                var element = elements[0];
                (_a = element
                    .closest('.cdk-overlay-container')) === null || _a === void 0 ? void 0 : _a.classList.add('ngx-grid-context-menu-cdk-overlay-container');
                // translate menu items title
                items.forEach((item) => {
                    item.title = this._translationService.translate(item.title);
                });
            }
        }, 100);
    }
}
GridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridComponent, deps: [{ token: i1.NbMenuService }, { token: i1.NbWindowService }, { token: i1.NbDialogService }, { token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
GridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: GridComponent, selector: "ngx-grid", inputs: { data: "data", columns: "columns", columnOptionsEnabled: "columnOptionsEnabled", entriesPerPageEnabled: "entriesPerPageEnabled", entriesPerPageOptions: "entriesPerPageOptions", pagerEnabled: "pagerEnabled", defaultPerPageOption: "defaultPerPageOption", exportPdfEnabled: "exportPdfEnabled", exportExcelEnabled: "exportExcelEnabled", customExportFunction: "customExportFunction", exportSettings: "exportSettings", selectionMultiple: "selectionMultiple", selectRowByClick: "selectRowByClick", selectAllEnabled: "selectAllEnabled", selectedRowsTitleEnabled: "selectedRowsTitleEnabled", selectionEnabled: "selectionEnabled", loadingEnabled: "loadingEnabled", loading: "loading", filtersEnabled: "filtersEnabled", actionsPosition: "actionsPosition", addEnabled: "addEnabled", editEnabled: "editEnabled", deleteEnabled: "deleteEnabled", addEditPopupSettings: "addEditPopupSettings", deletePopupSettings: "deletePopupSettings", refreshEnabled: "refreshEnabled", noDataMessage: "noDataMessage", gridMode: "gridMode", rowHeight: "rowHeight" }, outputs: { entriesPerPageSelectionChanged: "entriesPerPageSelectionChanged", selectionChanged: "selectionChanged", pageChanged: "pageChanged", sourceFiltersReseted: "sourceFiltersReseted", sortChanged: "sortChanged", filterChanged: "filterChanged", pdfExport: "pdfExport", excelExport: "excelExport", createConfirm: "createConfirm", editConfirm: "editConfirm", deleteConfirm: "deleteConfirm", actionBtnClick: "actionBtnClick", createStarted: "createStarted", editStarted: "editStarted", deleteStarted: "deleteStarted", groupingChanged: "groupingChanged" }, viewQueries: [{ propertyName: "_exportPDFComponent", first: true, predicate: GridPdfExportComponent, descendants: true }, { propertyName: "_exportExcelComponent", first: true, predicate: GridExcelExportComponent, descendants: true }, { propertyName: "_filtersChildren", predicate: ColumnFilterComponent, descendants: true }], ngImport: i0, template: "<div\r\n  class=\"ngx-grid\"\r\n  [id]=\"id\"\r\n  [nbSpinner]=\"loading\"\r\n  nbSpinnerSize=\"large\"\r\n  nbSpinnerStatus=\"primary\"\r\n  [nbSpinnerMessage]=\"loadingMessage\"\r\n>\r\n  <ngx-grid-toolbar\r\n    [visible]=\"getGridToolbarVisibility()\"\r\n    [selectedRowsTitleEnabled]=\"selectedRowsTitleEnabled\"\r\n    [selectionMultiple]=\"selectionMultiple\"\r\n    [selectedRows]=\"getSelectedRows().length\"\r\n    [selectedRowsTitle]=\"selectedRowsTitle\"\r\n    [addEnabled]=\"addEnabled\"\r\n    [addTooltip]=\"addTooltip\"\r\n    (addNewClicked)=\"addNewClick()\"\r\n  >\r\n  </ngx-grid-toolbar>\r\n\r\n  <!--------------------------------------------------- TABLE START ---------------------------------------------------------------------->\r\n  <div\r\n    class=\"ngx-grid-table\"\r\n    [ngClass]=\"getGridFooterVisibility() ? '' : 'no-footer'\"\r\n    [class]=\"getGridToolbarVisibility() ? '' : 'no-header'\"\r\n  >\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <!--------------------------------------------------- SELECT ALL -------------------------------------------------------------->\r\n          <th *ngIf=\"selectionEnabled\" class=\"text-center sticky-th select-all\">\r\n            <nb-checkbox\r\n              *ngIf=\"selectionMultiple && selectAllEnabled\"\r\n              indeterminate\r\n              (checkedChange)=\"onSelectAllCheckedChange($event)\"\r\n            ></nb-checkbox>\r\n          </th>\r\n\r\n          <!--------------------------------------------------- TABLE HEADERS -------------------------------------------------------------->\r\n          <th\r\n            *ngFor=\"let column of columns\"\r\n            [hidden]=\"!column.getVisible()\"\r\n            [ngClass]=\"getColumnHeaderClassList(column)\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n            [style.min-width]=\"column.getWidth()\"\r\n            [style.max-width]=\"column.getWidth()\"\r\n            [id]=\"column.getId()\"\r\n          >\r\n            {{ column.getTitle() }}\r\n            <button\r\n              class=\"column-sort-btn\"\r\n              nbButton\r\n              ghost\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              *ngIf=\"column?.getSortState() != sortStates.NONE\"\r\n              (click)=\"onSortButtonClick(column)\"\r\n            >\r\n              <nb-icon\r\n                pack=\"eva\"\r\n                [icon]=\"\r\n                  column?.getSortState() == sortStates.ASC\r\n                    ? 'arrow-upward-outline'\r\n                    : 'arrow-downward-outline'\r\n                \"\r\n              ></nb-icon>\r\n            </button>\r\n            <button\r\n              class=\"column-group-btn\"\r\n              nbButton\r\n              ghost\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              *ngIf=\"column?.getGrouped()\"\r\n              (click)=\"onUngroupButtonClick(column)\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"layers-outline\"></nb-icon>\r\n            </button>\r\n            <button\r\n              *ngIf=\"columnOptionsEnabled\"\r\n              class=\"column-context-menu-btn\"\r\n              nbButton\r\n              ghost\r\n              size=\"small\"\r\n              shape=\"round\"\r\n              [nbContextMenu]=\"column.getContextMenuItems()\"\r\n              [nbContextMenuClass]=\"'ngx-grid-column-context-menu'\"\r\n              [nbContextMenuTag]=\"\r\n                'column-context-menu-' + id + '-' + column.getContextMenuId()\r\n              \"\r\n              [nbContextMenuPlacement]=\"position.BOTTOM_END\"\r\n              (click)=\"\r\n                onColumnContextMenuButtonClick(column.getContextMenuItems())\r\n              \"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"more-horizontal-outline\"></nb-icon>\r\n            </button>\r\n          </th>\r\n        </tr>\r\n\r\n        <!--------------------------------------------------- TABLE FILTERS -------------------------------------------------------------->\r\n        <tr *ngIf=\"filtersEnabled\" class=\"filter-panel\">\r\n          <th *ngIf=\"selectionEnabled\"></th>\r\n          <th\r\n            *ngFor=\"let column of columns\"\r\n            [hidden]=\"!column.getVisible()\"\r\n            [ngClass]=\"column.getDocked() ? 'docked' : ''\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n          >\r\n            <ngx-column-filter\r\n              [column]=\"column\"\r\n              (filterChanged)=\"onGridFilterChange($event)\"\r\n            ></ngx-column-filter>\r\n          </th>\r\n        </tr>\r\n      </thead>\r\n\r\n      <!--------------------------------------------------- TABLE DATA -------------------------------------------------------------->\r\n      <tbody>\r\n        <tr\r\n          [style.height.px]=\"rowHeight > 0 ? rowHeight : null\"\r\n          *ngIf=\"dataToRender.length == 0 && gridState == gridStates.NONE\"\r\n        >\r\n          <td [colSpan]=\"columns.length\">{{ noDataMessage }}</td>\r\n        </tr>\r\n\r\n        <!--------------------------------------------------- INLINE INSERT -------------------------------------------------------------->\r\n        <tr\r\n          *ngIf=\"gridState == gridStates.INSERT && gridMode == gridModes.INLINE\"\r\n        >\r\n          <td *ngIf=\"selectionEnabled\"></td>\r\n          <td *ngFor=\"let column of columns\">\r\n            <ngx-cell-edit\r\n              [column]=\"column\"\r\n              [(cellValue)]=\"newRowData[column.getDataField()]\"\r\n              (cellButtonClick)=\"inlineEditCellBtnClick($event)\"\r\n              [isNew]=\"true\"\r\n            ></ngx-cell-edit>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr\r\n          [style.height.px]=\"rowHeight > 0 ? rowHeight : null\"\r\n          [ngClass]=\"row.selected ? 'selected' : ''\"\r\n          [class]=\"selectRowByClick && selectionEnabled ? 'clicable' : ''\"\r\n          *ngFor=\"\r\n            let row of dataToRender\r\n              | paginate\r\n                : {\r\n                    itemsPerPage: pagerEnabled ? defaultPerPageOption : 10000,\r\n                    currentPage: page,\r\n                    totalItems: dataToRender.length\r\n                  }\r\n          \"\r\n        >\r\n          <td *ngIf=\"selectionEnabled && !row._GroupRow\">\r\n            <div class=\"d-flex justify-content-center align-items-center\">\r\n              <nb-checkbox\r\n                [(ngModel)]=\"row.selected\"\r\n                (checkedChange)=\"onSelectionCheckboxClick(row, $event)\"\r\n              ></nb-checkbox>\r\n            </div>\r\n          </td>\r\n\r\n          <!--------------------------------------------------- RENDER TABLE DATA -------------------------------------------------------------->\r\n\r\n          <td\r\n            (click)=\"onGroupRowClick(row)\"\r\n            [attr.colspan]=\"groupColspan\"\r\n            *ngIf=\"row._GroupRow\"\r\n            class=\"group-row\"\r\n          >\r\n            <div class=\"d-flex w-100\">\r\n              <div class=\"group-row-name\">\r\n                {{ row._GroupName }}\r\n                <span *ngIf=\"groupedColumn?.getShowGroupCount()\"\r\n                  >({{ row._GroupCount }})</span\r\n                >\r\n              </div>\r\n              <div class=\"col m-0 p-0 d-flex justify-content-end\">\r\n                <nb-icon\r\n                  class=\"me-3\"\r\n                  pack=\"eva\"\r\n                  status=\"basic\"\r\n                  [icon]=\"\r\n                    row._GroupExpanded\r\n                      ? 'chevron-up-outline'\r\n                      : 'chevron-down-outline'\r\n                  \"\r\n                ></nb-icon>\r\n              </div>\r\n            </div>\r\n          </td>\r\n\r\n          <td\r\n            *ngFor=\"let column of columns; index as i\"\r\n            [hidden]=\"row._GroupRow ? true : !column.getVisible()\"\r\n            (click)=\"onRowDataClick(row, column)\"\r\n            [ngClass]=\"column.getDocked() ? 'docked' : ''\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n          >\r\n            <ngx-cell-display\r\n              *ngIf=\"row.mode != 'edit'\"\r\n              [column]=\"column\"\r\n              [row]=\"row\"\r\n              (buttonClick)=\"onActionButtonClick($event)\"\r\n            ></ngx-cell-display>\r\n\r\n            <ngx-cell-edit\r\n              *ngIf=\"\r\n                row.mode == 'edit' &&\r\n                gridState == gridStates.EDIT &&\r\n                gridMode == gridModes.INLINE\r\n              \"\r\n              [column]=\"column\"\r\n              [isNew]=\"false\"\r\n              [(cellValue)]=\"row[column.getDataField()]\"\r\n              (cellButtonClick)=\"inlineEditCellBtnClick($event, row)\"\r\n            ></ngx-cell-edit>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <ngx-grid-footer\r\n    [visible]=\"getGridFooterVisibility()\"\r\n    [(page)]=\"page\"\r\n    (pageChanged)=\"onPageChanged()\"\r\n    [refreshEnabled]=\"refreshEnabled\"\r\n    [refreshTooltip]=\"refreshTooltip\"\r\n    [exportPdfEnabled]=\"exportPdfEnabled\"\r\n    [exportExcelEnabled]=\"exportExcelEnabled\"\r\n    [exportPdfTooltip]=\"exportPdfTooltip\"\r\n    [exportExcelTooltip]=\"exportExcelTooltip\"\r\n    [entriesPerPageEnabled]=\"entriesPerPageEnabled\"\r\n    [entriesPerPageTooltip]=\"entriesPerPageTooltip\"\r\n    [(defaultPerPageOption)]=\"defaultPerPageOption\"\r\n    [entriesPerPageOptions]=\"entriesPerPageOptions\"\r\n    (resetFiltersClicked)=\"onClickResetFilters()\"\r\n    (exportPdfClicked)=\"exportPdfBtnClick()\"\r\n    (exportExcelClicked)=\"exportExcelBtnClick()\"\r\n    (selectionPerPageChanged)=\"onSelectedChangePagerPerPage($event)\"\r\n  ></ngx-grid-footer>\r\n</div>\r\n<ngx-grid-excel-export [settings]=\"exportSettings\"></ngx-grid-excel-export>\r\n<ngx-grid-pdf-export [settings]=\"exportSettings\"></ngx-grid-pdf-export>\r\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep .menu-item a .menu-title{margin-right:.5rem}:host .ngx-grid{height:100%;display:flex;flex-flow:column}:host .ngx-grid .group-row-name{font-weight:600;color:var(--color-basic-600);padding-left:1rem;width:max-content}:host .ngx-grid .group-row{background-color:var(--background-basic-color-3);border-color:var(--background-basic-color-3)}:host .ngx-grid .ngx-grid-table.no-header{height:calc(100% - 4rem)}:host .ngx-grid .ngx-grid-table.no-footer{height:100%}:host .ngx-grid .ngx-grid-table.no-header.no-footer{height:100%}:host .ngx-grid .ngx-grid-table{overflow:auto;height:calc(100% - 7rem)}:host .ngx-grid .ngx-grid-table table{width:100%;border-collapse:separate}:host .ngx-grid .ngx-grid-table table .docked{position:sticky;z-index:3;background-color:var(--background-basic-color-3)}:host .ngx-grid .ngx-grid-table thead th.sticky-th{position:sticky;top:-1px;z-index:2;background-color:var(--background-basic-color-3);padding:.7rem;font-size:14px;font-weight:800;color:var(--color-basic-600);text-transform:uppercase;white-space:break-spaces}:host .ngx-grid .ngx-grid-table thead th.sticky-th .column-context-menu-btn{position:absolute;right:.5rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th:has(.column-context-menu-btn){padding:.7rem 3rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted{padding:.7rem 5.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted .column-sort-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.grouped{padding:.7rem 5.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.grouped .column-group-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped{padding:.7rem 7.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped .column-sort-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped .column-group-btn{position:absolute;right:5rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.select-all{padding:.7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.docked{z-index:4}:host .ngx-grid .ngx-grid-table thead tr.filter-panel th{background-color:var(--background-basic-color-3);padding:0 0 .5rem}:host .ngx-grid .ngx-grid-table tbody td{padding:.5rem .25rem}:host .ngx-grid .ngx-grid-table tbody tr:nth-child(2n){background-color:var(--smart-table-bg-even)}:host .ngx-grid .ngx-grid-table tbody tr.selected{background-color:var(--scrollbar-color)}:host .ngx-grid .ngx-grid-table tbody tr.selected .docked{background-color:var(--scrollbar-color)}:host .ngx-grid .ngx-grid-table tbody tr.clicable:hover{cursor:pointer}:host .ngx-grid table th:first-child,:host .ngx-grid table td:first-child{border-left:1px solid var(--smart-table-separator)}:host .ngx-grid table th:last-child,:host .ngx-grid table td:last-child{border-right:1px solid var(--smart-table-separator)}:host ::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width)}:host ::-webkit-scrollbar-thumb{background:var(--scrollbar-color);border-radius:10px}:host ::-webkit-scrollbar-thumb:hover{background:var(--color-basic-500)}:host .selected-rows{width:max-content;align-items:end}:host .selected-rows span:first-child{font-size:smaller;font-weight:500}:host .selected-rows span:last-child{font-weight:600}::ng-deep nb-select.appearance-outline.status-basic .select-button.placeholder{opacity:unset}::ng-deep .cdk-overlay-container.ngx-grid-context-menu-cdk-overlay-container{z-index:1050!important}\n"], dependencies: [{ kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.NbCheckboxComponent, selector: "nb-checkbox", inputs: ["checked", "disabled", "status", "indeterminate"], outputs: ["checkedChange"] }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i1.NbSpinnerDirective, selector: "[nbSpinner]", inputs: ["nbSpinnerMessage", "nbSpinnerStatus", "nbSpinnerSize", "nbSpinner"] }, { kind: "directive", type: i1.NbContextMenuDirective, selector: "[nbContextMenu]", inputs: ["nbContextMenuPlacement", "nbContextMenuAdjustment", "nbContextMenuTag", "nbContextMenu", "nbContextMenuTrigger", "nbContextMenuClass"] }, { kind: "component", type: CellDisplayComponent, selector: "ngx-cell-display", inputs: ["column", "row"], outputs: ["buttonClick"] }, { kind: "component", type: ColumnFilterComponent, selector: "ngx-column-filter", inputs: ["column"], outputs: ["filterChanged"] }, { kind: "component", type: CellEditComponent, selector: "ngx-cell-edit", inputs: ["isNew", "column", "cellValue"], outputs: ["cellValueChange", "cellButtonClick"] }, { kind: "component", type: GridPdfExportComponent, selector: "ngx-grid-pdf-export", inputs: ["settings"] }, { kind: "component", type: GridExcelExportComponent, selector: "ngx-grid-excel-export", inputs: ["settings"] }, { kind: "component", type: GridFooterComponent, selector: "ngx-grid-footer", inputs: ["entriesPerPageOptions", "visible", "page", "refreshEnabled", "refreshTooltip", "exportPdfEnabled", "exportPdfTooltip", "exportExcelEnabled", "exportExcelTooltip", "entriesPerPageEnabled", "entriesPerPageTooltip", "defaultPerPageOption"], outputs: ["defaultPerPageOptionChange", "pageChanged", "resetFiltersClicked", "exportPdfClicked", "exportExcelClicked", "selectionPerPageChanged", "pageChange"] }, { kind: "component", type: GridToolbarComponent, selector: "ngx-grid-toolbar", inputs: ["visible", "selectedRowsTitleEnabled", "selectionMultiple", "selectedRows", "selectedRowsTitle", "addEnabled", "addTooltip"], outputs: ["addNewClicked"] }, { kind: "pipe", type: i4$1.PaginatePipe, name: "paginate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-grid', template: "<div\r\n  class=\"ngx-grid\"\r\n  [id]=\"id\"\r\n  [nbSpinner]=\"loading\"\r\n  nbSpinnerSize=\"large\"\r\n  nbSpinnerStatus=\"primary\"\r\n  [nbSpinnerMessage]=\"loadingMessage\"\r\n>\r\n  <ngx-grid-toolbar\r\n    [visible]=\"getGridToolbarVisibility()\"\r\n    [selectedRowsTitleEnabled]=\"selectedRowsTitleEnabled\"\r\n    [selectionMultiple]=\"selectionMultiple\"\r\n    [selectedRows]=\"getSelectedRows().length\"\r\n    [selectedRowsTitle]=\"selectedRowsTitle\"\r\n    [addEnabled]=\"addEnabled\"\r\n    [addTooltip]=\"addTooltip\"\r\n    (addNewClicked)=\"addNewClick()\"\r\n  >\r\n  </ngx-grid-toolbar>\r\n\r\n  <!--------------------------------------------------- TABLE START ---------------------------------------------------------------------->\r\n  <div\r\n    class=\"ngx-grid-table\"\r\n    [ngClass]=\"getGridFooterVisibility() ? '' : 'no-footer'\"\r\n    [class]=\"getGridToolbarVisibility() ? '' : 'no-header'\"\r\n  >\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <!--------------------------------------------------- SELECT ALL -------------------------------------------------------------->\r\n          <th *ngIf=\"selectionEnabled\" class=\"text-center sticky-th select-all\">\r\n            <nb-checkbox\r\n              *ngIf=\"selectionMultiple && selectAllEnabled\"\r\n              indeterminate\r\n              (checkedChange)=\"onSelectAllCheckedChange($event)\"\r\n            ></nb-checkbox>\r\n          </th>\r\n\r\n          <!--------------------------------------------------- TABLE HEADERS -------------------------------------------------------------->\r\n          <th\r\n            *ngFor=\"let column of columns\"\r\n            [hidden]=\"!column.getVisible()\"\r\n            [ngClass]=\"getColumnHeaderClassList(column)\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n            [style.min-width]=\"column.getWidth()\"\r\n            [style.max-width]=\"column.getWidth()\"\r\n            [id]=\"column.getId()\"\r\n          >\r\n            {{ column.getTitle() }}\r\n            <button\r\n              class=\"column-sort-btn\"\r\n              nbButton\r\n              ghost\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              *ngIf=\"column?.getSortState() != sortStates.NONE\"\r\n              (click)=\"onSortButtonClick(column)\"\r\n            >\r\n              <nb-icon\r\n                pack=\"eva\"\r\n                [icon]=\"\r\n                  column?.getSortState() == sortStates.ASC\r\n                    ? 'arrow-upward-outline'\r\n                    : 'arrow-downward-outline'\r\n                \"\r\n              ></nb-icon>\r\n            </button>\r\n            <button\r\n              class=\"column-group-btn\"\r\n              nbButton\r\n              ghost\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              *ngIf=\"column?.getGrouped()\"\r\n              (click)=\"onUngroupButtonClick(column)\"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"layers-outline\"></nb-icon>\r\n            </button>\r\n            <button\r\n              *ngIf=\"columnOptionsEnabled\"\r\n              class=\"column-context-menu-btn\"\r\n              nbButton\r\n              ghost\r\n              size=\"small\"\r\n              shape=\"round\"\r\n              [nbContextMenu]=\"column.getContextMenuItems()\"\r\n              [nbContextMenuClass]=\"'ngx-grid-column-context-menu'\"\r\n              [nbContextMenuTag]=\"\r\n                'column-context-menu-' + id + '-' + column.getContextMenuId()\r\n              \"\r\n              [nbContextMenuPlacement]=\"position.BOTTOM_END\"\r\n              (click)=\"\r\n                onColumnContextMenuButtonClick(column.getContextMenuItems())\r\n              \"\r\n            >\r\n              <nb-icon pack=\"eva\" icon=\"more-horizontal-outline\"></nb-icon>\r\n            </button>\r\n          </th>\r\n        </tr>\r\n\r\n        <!--------------------------------------------------- TABLE FILTERS -------------------------------------------------------------->\r\n        <tr *ngIf=\"filtersEnabled\" class=\"filter-panel\">\r\n          <th *ngIf=\"selectionEnabled\"></th>\r\n          <th\r\n            *ngFor=\"let column of columns\"\r\n            [hidden]=\"!column.getVisible()\"\r\n            [ngClass]=\"column.getDocked() ? 'docked' : ''\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n          >\r\n            <ngx-column-filter\r\n              [column]=\"column\"\r\n              (filterChanged)=\"onGridFilterChange($event)\"\r\n            ></ngx-column-filter>\r\n          </th>\r\n        </tr>\r\n      </thead>\r\n\r\n      <!--------------------------------------------------- TABLE DATA -------------------------------------------------------------->\r\n      <tbody>\r\n        <tr\r\n          [style.height.px]=\"rowHeight > 0 ? rowHeight : null\"\r\n          *ngIf=\"dataToRender.length == 0 && gridState == gridStates.NONE\"\r\n        >\r\n          <td [colSpan]=\"columns.length\">{{ noDataMessage }}</td>\r\n        </tr>\r\n\r\n        <!--------------------------------------------------- INLINE INSERT -------------------------------------------------------------->\r\n        <tr\r\n          *ngIf=\"gridState == gridStates.INSERT && gridMode == gridModes.INLINE\"\r\n        >\r\n          <td *ngIf=\"selectionEnabled\"></td>\r\n          <td *ngFor=\"let column of columns\">\r\n            <ngx-cell-edit\r\n              [column]=\"column\"\r\n              [(cellValue)]=\"newRowData[column.getDataField()]\"\r\n              (cellButtonClick)=\"inlineEditCellBtnClick($event)\"\r\n              [isNew]=\"true\"\r\n            ></ngx-cell-edit>\r\n          </td>\r\n        </tr>\r\n\r\n        <tr\r\n          [style.height.px]=\"rowHeight > 0 ? rowHeight : null\"\r\n          [ngClass]=\"row.selected ? 'selected' : ''\"\r\n          [class]=\"selectRowByClick && selectionEnabled ? 'clicable' : ''\"\r\n          *ngFor=\"\r\n            let row of dataToRender\r\n              | paginate\r\n                : {\r\n                    itemsPerPage: pagerEnabled ? defaultPerPageOption : 10000,\r\n                    currentPage: page,\r\n                    totalItems: dataToRender.length\r\n                  }\r\n          \"\r\n        >\r\n          <td *ngIf=\"selectionEnabled && !row._GroupRow\">\r\n            <div class=\"d-flex justify-content-center align-items-center\">\r\n              <nb-checkbox\r\n                [(ngModel)]=\"row.selected\"\r\n                (checkedChange)=\"onSelectionCheckboxClick(row, $event)\"\r\n              ></nb-checkbox>\r\n            </div>\r\n          </td>\r\n\r\n          <!--------------------------------------------------- RENDER TABLE DATA -------------------------------------------------------------->\r\n\r\n          <td\r\n            (click)=\"onGroupRowClick(row)\"\r\n            [attr.colspan]=\"groupColspan\"\r\n            *ngIf=\"row._GroupRow\"\r\n            class=\"group-row\"\r\n          >\r\n            <div class=\"d-flex w-100\">\r\n              <div class=\"group-row-name\">\r\n                {{ row._GroupName }}\r\n                <span *ngIf=\"groupedColumn?.getShowGroupCount()\"\r\n                  >({{ row._GroupCount }})</span\r\n                >\r\n              </div>\r\n              <div class=\"col m-0 p-0 d-flex justify-content-end\">\r\n                <nb-icon\r\n                  class=\"me-3\"\r\n                  pack=\"eva\"\r\n                  status=\"basic\"\r\n                  [icon]=\"\r\n                    row._GroupExpanded\r\n                      ? 'chevron-up-outline'\r\n                      : 'chevron-down-outline'\r\n                  \"\r\n                ></nb-icon>\r\n              </div>\r\n            </div>\r\n          </td>\r\n\r\n          <td\r\n            *ngFor=\"let column of columns; index as i\"\r\n            [hidden]=\"row._GroupRow ? true : !column.getVisible()\"\r\n            (click)=\"onRowDataClick(row, column)\"\r\n            [ngClass]=\"column.getDocked() ? 'docked' : ''\"\r\n            [style.left.px]=\"calculateLeftPosition(column)\"\r\n          >\r\n            <ngx-cell-display\r\n              *ngIf=\"row.mode != 'edit'\"\r\n              [column]=\"column\"\r\n              [row]=\"row\"\r\n              (buttonClick)=\"onActionButtonClick($event)\"\r\n            ></ngx-cell-display>\r\n\r\n            <ngx-cell-edit\r\n              *ngIf=\"\r\n                row.mode == 'edit' &&\r\n                gridState == gridStates.EDIT &&\r\n                gridMode == gridModes.INLINE\r\n              \"\r\n              [column]=\"column\"\r\n              [isNew]=\"false\"\r\n              [(cellValue)]=\"row[column.getDataField()]\"\r\n              (cellButtonClick)=\"inlineEditCellBtnClick($event, row)\"\r\n            ></ngx-cell-edit>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <ngx-grid-footer\r\n    [visible]=\"getGridFooterVisibility()\"\r\n    [(page)]=\"page\"\r\n    (pageChanged)=\"onPageChanged()\"\r\n    [refreshEnabled]=\"refreshEnabled\"\r\n    [refreshTooltip]=\"refreshTooltip\"\r\n    [exportPdfEnabled]=\"exportPdfEnabled\"\r\n    [exportExcelEnabled]=\"exportExcelEnabled\"\r\n    [exportPdfTooltip]=\"exportPdfTooltip\"\r\n    [exportExcelTooltip]=\"exportExcelTooltip\"\r\n    [entriesPerPageEnabled]=\"entriesPerPageEnabled\"\r\n    [entriesPerPageTooltip]=\"entriesPerPageTooltip\"\r\n    [(defaultPerPageOption)]=\"defaultPerPageOption\"\r\n    [entriesPerPageOptions]=\"entriesPerPageOptions\"\r\n    (resetFiltersClicked)=\"onClickResetFilters()\"\r\n    (exportPdfClicked)=\"exportPdfBtnClick()\"\r\n    (exportExcelClicked)=\"exportExcelBtnClick()\"\r\n    (selectionPerPageChanged)=\"onSelectedChangePagerPerPage($event)\"\r\n  ></ngx-grid-footer>\r\n</div>\r\n<ngx-grid-excel-export [settings]=\"exportSettings\"></ngx-grid-excel-export>\r\n<ngx-grid-pdf-export [settings]=\"exportSettings\"></ngx-grid-pdf-export>\r\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep .menu-item a .menu-title{margin-right:.5rem}:host .ngx-grid{height:100%;display:flex;flex-flow:column}:host .ngx-grid .group-row-name{font-weight:600;color:var(--color-basic-600);padding-left:1rem;width:max-content}:host .ngx-grid .group-row{background-color:var(--background-basic-color-3);border-color:var(--background-basic-color-3)}:host .ngx-grid .ngx-grid-table.no-header{height:calc(100% - 4rem)}:host .ngx-grid .ngx-grid-table.no-footer{height:100%}:host .ngx-grid .ngx-grid-table.no-header.no-footer{height:100%}:host .ngx-grid .ngx-grid-table{overflow:auto;height:calc(100% - 7rem)}:host .ngx-grid .ngx-grid-table table{width:100%;border-collapse:separate}:host .ngx-grid .ngx-grid-table table .docked{position:sticky;z-index:3;background-color:var(--background-basic-color-3)}:host .ngx-grid .ngx-grid-table thead th.sticky-th{position:sticky;top:-1px;z-index:2;background-color:var(--background-basic-color-3);padding:.7rem;font-size:14px;font-weight:800;color:var(--color-basic-600);text-transform:uppercase;white-space:break-spaces}:host .ngx-grid .ngx-grid-table thead th.sticky-th .column-context-menu-btn{position:absolute;right:.5rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th:has(.column-context-menu-btn){padding:.7rem 3rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted{padding:.7rem 5.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted .column-sort-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.grouped{padding:.7rem 5.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.grouped .column-group-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped{padding:.7rem 7.5rem .7rem .7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped .column-sort-btn{position:absolute;right:3rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.sorted.grouped .column-group-btn{position:absolute;right:5rem;top:.5rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.select-all{padding:.7rem}:host .ngx-grid .ngx-grid-table thead th.sticky-th.docked{z-index:4}:host .ngx-grid .ngx-grid-table thead tr.filter-panel th{background-color:var(--background-basic-color-3);padding:0 0 .5rem}:host .ngx-grid .ngx-grid-table tbody td{padding:.5rem .25rem}:host .ngx-grid .ngx-grid-table tbody tr:nth-child(2n){background-color:var(--smart-table-bg-even)}:host .ngx-grid .ngx-grid-table tbody tr.selected{background-color:var(--scrollbar-color)}:host .ngx-grid .ngx-grid-table tbody tr.selected .docked{background-color:var(--scrollbar-color)}:host .ngx-grid .ngx-grid-table tbody tr.clicable:hover{cursor:pointer}:host .ngx-grid table th:first-child,:host .ngx-grid table td:first-child{border-left:1px solid var(--smart-table-separator)}:host .ngx-grid table th:last-child,:host .ngx-grid table td:last-child{border-right:1px solid var(--smart-table-separator)}:host ::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width)}:host ::-webkit-scrollbar-thumb{background:var(--scrollbar-color);border-radius:10px}:host ::-webkit-scrollbar-thumb:hover{background:var(--color-basic-500)}:host .selected-rows{width:max-content;align-items:end}:host .selected-rows span:first-child{font-size:smaller;font-weight:500}:host .selected-rows span:last-child{font-weight:600}::ng-deep nb-select.appearance-outline.status-basic .select-button.placeholder{opacity:unset}::ng-deep .cdk-overlay-container.ngx-grid-context-menu-cdk-overlay-container{z-index:1050!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NbMenuService }, { type: i1.NbWindowService }, { type: i1.NbDialogService }, { type: TranslationService }]; }, propDecorators: { _filtersChildren: [{
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

class SelectGridPopoverComponent {
    constructor(ref) {
        this.ref = ref;
        this.width = 0;
        this.selectGridId = '';
        this.columns = [];
        this.multiple = false;
        this.source = [];
        this.searchEnabled = false;
        this.valueAttr = '';
        this.gridSelectionChanged = new EventEmitter();
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.ref.nativeElement
            .closest('nb-popover')
            .classList.add('select-grid-nb-popover');
        if (this.selected && this.grid) {
            this.grid.unselectAll();
            this.grid.selectRows(this.selected, this.valueAttr);
        }
    }
    selectionChanged(event) {
        this.gridSelectionChanged.emit(event);
    }
}
SelectGridPopoverComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SelectGridPopoverComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
SelectGridPopoverComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SelectGridPopoverComponent, selector: "ngx-select-grid-popover", inputs: { width: "width", selectGridId: "selectGridId", columns: "columns", multiple: "multiple", source: "source", searchEnabled: "searchEnabled", selected: "selected", valueAttr: "valueAttr" }, outputs: { gridSelectionChanged: "gridSelectionChanged" }, viewQueries: [{ propertyName: "grid", first: true, predicate: GridComponent, descendants: true }], ngImport: i0, template: "<div\n  class=\"grid-popover-content\"\n  [id]=\"'grid-popover-content-' + selectGridId\"\n  [style.width]=\"width + 'px'\"\n>\n  <ngx-grid\n    [columns]=\"columns\"\n    [data]=\"source\"\n    [addEnabled]=\"false\"\n    [entriesPerPageEnabled]=\"false\"\n    [pagerEnabled]=\"false\"\n    [refreshEnabled]=\"false\"\n    [exportPdfEnabled]=\"false\"\n    [exportExcelEnabled]=\"false\"\n    [selectionMultiple]=\"multiple\"\n    [selectAllEnabled]=\"false\"\n    [filtersEnabled]=\"searchEnabled\"\n    [editEnabled]=\"false\"\n    [deleteEnabled]=\"false\"\n    [selectedRowsTitleEnabled]=\"false\"\n    (selectionChanged)=\"selectionChanged($event)\"\n    [columnOptionsEnabled]=\"false\"\n  ></ngx-grid>\n</div>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .grid-popover-content{max-height:var(--option-list-max-height);height:var(--option-list-max-height);overflow:auto;background-color:var(--option-list-background-color);border-color:var(--option-list-border-color);border-style:var(--option-list-border-style);border-width:var(--option-list-border-width);border-radius:var(--option-list-border-radius);box-shadow:var(--option-list-shadow)}:host ::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width)}:host ::-webkit-scrollbar-thumb{background:var(--scrollbar-color);border-radius:10px}:host ::-webkit-scrollbar-thumb:hover{background:var(--color-basic-500)}\n"], dependencies: [{ kind: "component", type: GridComponent, selector: "ngx-grid", inputs: ["data", "columns", "columnOptionsEnabled", "entriesPerPageEnabled", "entriesPerPageOptions", "pagerEnabled", "defaultPerPageOption", "exportPdfEnabled", "exportExcelEnabled", "customExportFunction", "exportSettings", "selectionMultiple", "selectRowByClick", "selectAllEnabled", "selectedRowsTitleEnabled", "selectionEnabled", "loadingEnabled", "loading", "filtersEnabled", "actionsPosition", "addEnabled", "editEnabled", "deleteEnabled", "addEditPopupSettings", "deletePopupSettings", "refreshEnabled", "noDataMessage", "gridMode", "rowHeight"], outputs: ["entriesPerPageSelectionChanged", "selectionChanged", "pageChanged", "sourceFiltersReseted", "sortChanged", "filterChanged", "pdfExport", "excelExport", "createConfirm", "editConfirm", "deleteConfirm", "actionBtnClick", "createStarted", "editStarted", "deleteStarted", "groupingChanged"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SelectGridPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-select-grid-popover', template: "<div\n  class=\"grid-popover-content\"\n  [id]=\"'grid-popover-content-' + selectGridId\"\n  [style.width]=\"width + 'px'\"\n>\n  <ngx-grid\n    [columns]=\"columns\"\n    [data]=\"source\"\n    [addEnabled]=\"false\"\n    [entriesPerPageEnabled]=\"false\"\n    [pagerEnabled]=\"false\"\n    [refreshEnabled]=\"false\"\n    [exportPdfEnabled]=\"false\"\n    [exportExcelEnabled]=\"false\"\n    [selectionMultiple]=\"multiple\"\n    [selectAllEnabled]=\"false\"\n    [filtersEnabled]=\"searchEnabled\"\n    [editEnabled]=\"false\"\n    [deleteEnabled]=\"false\"\n    [selectedRowsTitleEnabled]=\"false\"\n    (selectionChanged)=\"selectionChanged($event)\"\n    [columnOptionsEnabled]=\"false\"\n  ></ngx-grid>\n</div>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .grid-popover-content{max-height:var(--option-list-max-height);height:var(--option-list-max-height);overflow:auto;background-color:var(--option-list-background-color);border-color:var(--option-list-border-color);border-style:var(--option-list-border-style);border-width:var(--option-list-border-width);border-radius:var(--option-list-border-radius);box-shadow:var(--option-list-shadow)}:host ::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width)}:host ::-webkit-scrollbar-thumb{background:var(--scrollbar-color);border-radius:10px}:host ::-webkit-scrollbar-thumb:hover{background:var(--color-basic-500)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { width: [{
                type: Input
            }], selectGridId: [{
                type: Input
            }], columns: [{
                type: Input
            }], multiple: [{
                type: Input
            }], source: [{
                type: Input
            }], searchEnabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], valueAttr: [{
                type: Input
            }], grid: [{
                type: ViewChild,
                args: [GridComponent]
            }], gridSelectionChanged: [{
                type: Output
            }] } });

class ResizedEvent {
    constructor(newRect, oldRect) {
        this.newRect = newRect;
        this.oldRect = oldRect;
        this.isFirst = oldRect == null;
    }
}

class ResizedDirective {
    constructor(element, zone) {
        this.element = element;
        this.zone = zone;
        this.resized = new EventEmitter();
        this.observer = new ResizeObserver(entries => this.zone.run(() => this.observe(entries)));
    }
    ngOnInit() {
        this.observer.observe(this.element.nativeElement);
    }
    ngOnDestroy() {
        this.observer.disconnect();
    }
    observe(entries) {
        const domSize = entries[0];
        const resizedEvent = new ResizedEvent(domSize.contentRect, this.oldRect);
        this.oldRect = domSize.contentRect;
        this.resized.emit(resizedEvent);
    }
}
ResizedDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ResizedDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
ResizedDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: ResizedDirective, selector: "[resized]", outputs: { resized: "resized" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ResizedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[resized]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { resized: [{
                type: Output
            }] } });

class SelectGridComponent {
    // ------------------------------------------------------ COMPONENT CONSTRUCTION ---------------------------------------------
    constructor(_translationService) {
        this._translationService = _translationService;
        this.clickInsideComponent = false;
        // ------------------------------------------------------ PRIVATE FIELDS -----------------------------------------------------
        this.selectedItems = []; // array of selected items/objects
        this.error = false; // indicator of errors in config
        this._source = [];
        this._selected = [];
        // ------------------------------------------------------ PUBLIC FIELDS ------------------------------------------------------
        this.selectLabel = ''; // label to show in input field
        this.id = 'select-grid-' + makeId(15); // unique component id
        this.gridSelectOpen = false;
        this.position = NbPosition.BOTTOM;
        this.component = SelectGridPopoverComponent;
        this.popoverContext = { selectGridId: this.id };
        this.inputValue = '';
        // ------------------------------------------------------ INPUTS -------------------------------------------------------------
        this.columns = []; // definition of columns for grid table
        this.valueAttr = ''; // name of key attribute in data source
        this.multiple = false; // enables/disables multiple selection mode
        this.attributesForLabel = []; // names of attributes to show in input label for selected items
        this.selectedChange = new EventEmitter();
        this.disabled = false;
        this.placeholder = this._translationService.translate('sgPlaceholder'); // input placeholder
        this.searchEnabled = false; // enables/disables search option
        this.customWidth = 0; // custom popover width
        // ------------------------------------------------------ OUTPUTS ------------------------------------------------------------
        this.onSelectionChanged = new EventEmitter(); // fires when selected items changed
    }
    clickInside() {
        this.clickInsideComponent = true;
    }
    clickout(event) {
        var popoverContent = document.getElementById('grid-popover-content-' + this.id);
        if (!this.clickInsideComponent &&
            event.target.id != 'grid-popover-content-' + this.id &&
            !(popoverContent === null || popoverContent === void 0 ? void 0 : popoverContent.contains(event.target))) {
            this.popover.hide();
            this.gridSelectOpen = false;
        }
        this.clickInsideComponent = false;
    }
    set source(value) {
        this._source = value;
    }
    get source() {
        return this._source;
    }
    set selected(value) {
        this._selected = value;
        this.selectedChange.emit(this._selected);
        this.setInputValue();
    } // current selected keys
    get selected() {
        return this._selected;
    }
    ngOnInit() {
        // check if translations are already loaded (from external app)
        if (!this._translationService.isTranslationsLoaded()) {
            this._translationService.setTranslations(strings);
        }
        if (this.valueAttr.length == 0) {
            console.error(getError(301));
            this.error = true;
        }
        if (!Array.isArray(this.selected)) {
            console.error(getError(303));
            this.error = true;
        }
        // if attributes for label are not set take all attributes from object and show
        if (this.attributesForLabel.length == 0 && this.source.length > 0) {
            this.attributesForLabel = Object.keys(this.source[0]);
        }
        this.setInputValue();
    }
    // ------------------------------------------------------ PRIVATE METHODS ----------------------------------------------------
    setInputValue() {
        var rowKeys = [];
        this.inputValue = '';
        if (!Array.isArray(this.selected))
            rowKeys = [this.selected];
        else
            rowKeys = [...this.selected];
        rowKeys.forEach((element) => {
            var row = this.source.find((x) => x[this.valueAttr] == element);
            if (row) {
                var text = '';
                this.attributesForLabel.forEach((attr) => {
                    text += row[attr] + ' ';
                });
                text = text.trim();
                if (this.multiple)
                    this.inputValue += text + '; ';
                else
                    this.inputValue += text;
            }
        });
    }
    // ------------------------------------------------------ PUBLIC METHODS -----------------------------------------------------
    getSelectedItems() {
        return this.selectedItems;
    }
    // ------------------------------------------------------ DOM LISTENERS ------------------------------------------------------
    toggleGridSelect() {
        if (!this.disabled) {
            this.popover.toggle();
            this.gridSelectOpen = this.popover.isShown;
        }
    }
    getSelectGridWidth() {
        if (this.customWidth > 0)
            return this.customWidth;
        else {
            let width = 100;
            const element = document.getElementById(this.id);
            if (element)
                width = element.offsetWidth;
            return width;
        }
    }
    onGridResized() {
        if (this.customWidth == 0)
            this.popoverContext.width = this.getSelectGridWidth();
    }
    gridSelectionChanged(ev) {
        this.selected = ev.selectedRows.map((x) => x[this.valueAttr]);
        this.setInputValue();
        this.onSelectionChanged.emit({
            selectedKeys: this.selected,
            selectedItems: ev.selectedRows,
        });
    }
}
SelectGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SelectGridComponent, deps: [{ token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
SelectGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SelectGridComponent, selector: "ngx-select-grid", inputs: { columns: "columns", valueAttr: "valueAttr", multiple: "multiple", attributesForLabel: "attributesForLabel", source: "source", selected: "selected", disabled: "disabled", placeholder: "placeholder", searchEnabled: "searchEnabled", customWidth: "customWidth" }, outputs: { selectedChange: "selectedChange", onSelectionChanged: "onSelectionChanged" }, host: { listeners: { "click": "clickInside()", "document:click": "clickout($event)" } }, viewQueries: [{ propertyName: "popover", first: true, predicate: NbPopoverDirective, descendants: true }], ngImport: i0, template: "<div class=\"select-grid\" [id]=\"id\" (resized)=\"onGridResized()\">\r\n  <nb-form-field\r\n    [nbPopover]=\"popover\"\r\n    nbPopoverTrigger=\"noop\"\r\n    [nbPopoverPlacement]=\"position\"\r\n    (click)=\"toggleGridSelect()\"\r\n  >\r\n    <input\r\n      class=\"grid-select-input\"\r\n      nbInput\r\n      [placeholder]=\"placeholder\"\r\n      [disabled]=\"disabled\"\r\n      fullWidth\r\n      readonly\r\n      [(ngModel)]=\"inputValue\"\r\n      [name]=\"id\"\r\n    />\r\n    <nb-icon\r\n      class=\"grid-select-input\"\r\n      pack=\"eva\"\r\n      [icon]=\"gridSelectOpen ? 'chevron-up-outline' : 'chevron-down-outline'\"\r\n      nbSuffix\r\n    ></nb-icon>\r\n  </nb-form-field>\r\n</div>\r\n\r\n<ng-template #popover>\r\n  <ngx-select-grid-popover\r\n    [selectGridId]=\"id\"\r\n    [width]=\"getSelectGridWidth()\"\r\n    [columns]=\"columns\"\r\n    [multiple]=\"multiple\"\r\n    [source]=\"source\"\r\n    [searchEnabled]=\"searchEnabled\"\r\n    [selected]=\"selected\"\r\n    [valueAttr]=\"valueAttr\"\r\n    (gridSelectionChanged)=\"gridSelectionChanged($event)\"\r\n  ></ngx-select-grid-popover>\r\n</ng-template>\r\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .grid-select-input:hover{cursor:pointer}::ng-deep .select-grid-nb-popover{border:none;border-radius:0;background:unset;box-shadow:none;color:unset}::ng-deep .select-grid-nb-popover .arrow{display:none!important}\n"], dependencies: [{ kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i1.NbInputDirective, selector: "input[nbInput],textarea[nbInput]", inputs: ["fieldSize", "status", "shape", "fullWidth"] }, { kind: "component", type: i1.NbFormFieldComponent, selector: "nb-form-field" }, { kind: "directive", type: i1.NbSuffixDirective, selector: "[nbSuffix]" }, { kind: "directive", type: i1.NbPopoverDirective, selector: "[nbPopover]", inputs: ["nbPopover", "nbPopoverContext", "nbPopoverPlacement", "nbPopoverAdjustment", "nbPopoverTrigger", "nbPopoverOffset", "nbTooltipDisabled", "nbPopoverClass"], outputs: ["nbPopoverShowStateChange"], exportAs: ["nbPopover"] }, { kind: "directive", type: ResizedDirective, selector: "[resized]", outputs: ["resized"] }, { kind: "component", type: SelectGridPopoverComponent, selector: "ngx-select-grid-popover", inputs: ["width", "selectGridId", "columns", "multiple", "source", "searchEnabled", "selected", "valueAttr"], outputs: ["gridSelectionChanged"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SelectGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-select-grid', template: "<div class=\"select-grid\" [id]=\"id\" (resized)=\"onGridResized()\">\r\n  <nb-form-field\r\n    [nbPopover]=\"popover\"\r\n    nbPopoverTrigger=\"noop\"\r\n    [nbPopoverPlacement]=\"position\"\r\n    (click)=\"toggleGridSelect()\"\r\n  >\r\n    <input\r\n      class=\"grid-select-input\"\r\n      nbInput\r\n      [placeholder]=\"placeholder\"\r\n      [disabled]=\"disabled\"\r\n      fullWidth\r\n      readonly\r\n      [(ngModel)]=\"inputValue\"\r\n      [name]=\"id\"\r\n    />\r\n    <nb-icon\r\n      class=\"grid-select-input\"\r\n      pack=\"eva\"\r\n      [icon]=\"gridSelectOpen ? 'chevron-up-outline' : 'chevron-down-outline'\"\r\n      nbSuffix\r\n    ></nb-icon>\r\n  </nb-form-field>\r\n</div>\r\n\r\n<ng-template #popover>\r\n  <ngx-select-grid-popover\r\n    [selectGridId]=\"id\"\r\n    [width]=\"getSelectGridWidth()\"\r\n    [columns]=\"columns\"\r\n    [multiple]=\"multiple\"\r\n    [source]=\"source\"\r\n    [searchEnabled]=\"searchEnabled\"\r\n    [selected]=\"selected\"\r\n    [valueAttr]=\"valueAttr\"\r\n    (gridSelectionChanged)=\"gridSelectionChanged($event)\"\r\n  ></ngx-select-grid-popover>\r\n</ng-template>\r\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .grid-select-input:hover{cursor:pointer}::ng-deep .select-grid-nb-popover{border:none;border-radius:0;background:unset;box-shadow:none;color:unset}::ng-deep .select-grid-nb-popover .arrow{display:none!important}\n"] }]
        }], ctorParameters: function () { return [{ type: TranslationService }]; }, propDecorators: { clickInside: [{
                type: HostListener,
                args: ['click']
            }], clickout: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }], popover: [{
                type: ViewChild,
                args: [NbPopoverDirective]
            }], columns: [{
                type: Input
            }], valueAttr: [{
                type: Input
            }], multiple: [{
                type: Input
            }], attributesForLabel: [{
                type: Input
            }], source: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], disabled: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], searchEnabled: [{
                type: Input
            }], customWidth: [{
                type: Input
            }], onSelectionChanged: [{
                type: Output
            }] } });

class ScheduleComponent {
    // -------------------------------------------------------------- COMPONENT CONSTRUCTION --------------------------------------------------------
    constructor(locale, iterableDiffers, translationService) {
        this.locale = locale;
        this.iterableDiffers = iterableDiffers;
        this.translationService = translationService;
        // -------------------------------------------------------------- PRIVATE FIELDS -----------------------------------------------------------------
        this.eventsExended = []; // list of current month events
        this.numOfChecks = 0; // number of checks for source array, used to skip first 2 checks on component init --> to avoid schedule reload 3 times on start
        // -------------------------------------------------------------- PUBLIC FIELDS ------------------------------------------------------------------
        this.currentYear = new Date().getFullYear(); // current displayed year
        this.currentMonth = new Date().getMonth(); // current displayed month
        this.currentDay = new Date().getDate(); // current selected date
        this.currentScheduleDay = {
            date: new Date(this.currentYear, this.currentMonth, this.currentDay),
            events: [],
            isFromCurrentMonth: false,
            today: false,
        }; // current selected day
        this.weeks = []; // weeks with days and events to render
        this.days = []; // day names for calendar
        this.months = []; // months array for month gear
        this.years = []; // year array for year select box
        this.views = SCHEDULE_VIEW; // avaliable schedule views enum
        this.avaliableViews = SCHEDULE_CONF.views; // avaliable views toggle component array
        this.currentWeekIndex = 0; // current selected week index (index in weeks array, not index in Date type context)
        this.currentMonthDays = []; // array with dates for current selected month, used for displaying as select list for DAY view
        // -------------------------------------------------------------- INPUTS ------------------------------------------------------------------------
        this.startYear = SCHEDULE_CONF.startYear; // starting year in year select box
        this.endYear = SCHEDULE_CONF.endYear; // end year in year select box
        this.eventTagAppereance = SCHEDULE_CONF.tagAppereance; // event tag appereance, can be filled or outline
        this.events = []; // array of events
        this.startingMonth = undefined; // month for start view 1-12
        this.startingYear = undefined; // year for start view (as number)
        this.showYearPicker = true; // shows/hides years select box
        this.markToday = true; // marks/unmarks today on calendar with primary color
        this.nextMonthTooltip = this.translationService.translate('scheduleNextMonth'); // tooltip text to show on next month button hover (only on MONTH view), empty string hides tooltip
        this.previousMonthTooltip = this.translationService.translate('schedulePreviousMonth'); // tooltip text to show on previous month button hover (only on MONTH view). empty string hides tooltip
        this.todayBtnTitle = this.translationService.translate('scheduleTodayBtn'); // text for TODAY button
        this.addNewBtnTitle = this.translationService.translate('scheduleAddNewBtn'); // text for add new button
        this.showTodayBtn = true; // shows/hides today button
        this.showAddNewBtn = false; // shows/hides add new button
        this.addNewBtnTooltip = this.translationService.translate('scheduleAddNewBtnTooltip'); // tooltip text to show on today button hover (only if button enabled), empty string hides tooltip
        this.todayBtnTooltip = this.translationService.translate('scheduleTodayBtnTooltip'); // tooltip text to show on today button hover (only if button enabled), empty string hides tooltip
        this.activeView = SCHEDULE_VIEW.MONTH; // current active view
        this.eventStart = this.translationService.translate('scheduleStart'); // text for start label
        this.eventEnd = this.translationService.translate('scheduleEnd'); // text for end label
        this.eventTitle = this.translationService.translate('scheduleTitle'); // text for event title label
        this.eventDescription = this.translationService.translate('scheduleDesc'); // text for event description label
        // -------------------------------------------------------------- OUTPUTS -----------------------------------------------------------------------
        /**
         * @returns current selected calendar year as number
         * @emits on selection change in years select box
         */
        this.yearSelectionChanged = new EventEmitter();
        /**
         * @returns current selected calendar month as number 1-12
         * @emits on month toggle buttons press
         */
        this.monthSelectionChanged = new EventEmitter();
        /**
         * @returns current selected calendar day as number 1-30/31
         * @emits on day button press when active view is day
         */
        this.daySelectionChanged = new EventEmitter();
        /**
         * @returns clicked event
         * @emits on event tag click
         */
        this.eventClicked = new EventEmitter();
        /**
         *
         * @returns nothing
         * @emits on add new click
         */
        this.addNewClicked = new EventEmitter();
        /**
         *
         * @returns nothing
         * @emits on today new click
         */
        this.todayClicked = new EventEmitter();
        this.iterableDiffer = iterableDiffers.find([]).create(undefined);
    }
    ngOnInit() {
        // check if translations are already loaded (from external app)
        if (!this.translationService.isTranslationsLoaded()) {
            this.translationService.setTranslations(strings);
        }
        if (this.startingMonth)
            this.currentMonth = this.startingMonth - 1;
        if (this.startingYear)
            this.currentYear = this.startingYear;
        this.avaliableViews.forEach((element) => {
            element.title = this.translationService.translate(element.title);
        });
        this.avaliableViews.find((x) => x.view == this.activeView).isActive = true;
        this.days = this.getWeekDaysNames(this.locale);
        this.months = this.getMonthNames(this.locale);
        this.years = this.getYearsInRange();
        this.refresh(true);
    }
    ngDoCheck() {
        let changes = this.iterableDiffer.diff(this.events);
        if (changes && this.numOfChecks >= 1)
            this.refresh();
    }
    ngAfterViewInit() {
        // to skip starting 2 checks and refreshes on component init
        this.numOfChecks++;
    }
    // -------------------------------------------------------------- PRIVATE METHODS ---------------------------------------------------------------
    /**
     * @returns array of dates between two dates (including start and end date)
     * @param start starting date for range
     * @param end ending date for range
     */
    getDatesInRange(start, end) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    }
    /**
     * @returns array of ScheduleEvent objects with current month events
     */
    getCurrentMonthEvents() {
        return this.events.filter((x) => (x.start.getFullYear() == this.currentYear &&
            x.start.getMonth() == this.currentMonth) ||
            (x.end.getFullYear() == this.currentYear &&
                x.end.getMonth() == this.currentMonth));
    }
    /**
     * @description builds eventExtended array of ScheduleEventExtended from ScheduleEvent type for current month events. Sorts events from earliest to latest.
     */
    setUpEventExtended() {
        var ev = this.getCurrentMonthEvents();
        this.eventsExended = [];
        ev.forEach((element) => {
            var range = this.getDatesInRange(element.start, element.end);
            var rangeString = range.map((x) => this.stringfyDate(x));
            var eventExt = {
                id: element.id,
                start: element.start,
                end: element.end,
                title: element.title,
                description: element.description,
                firstDayOfEvent: false,
                eventDates: range,
                eventDatesStringfy: rangeString,
                width: SCHEDULE_CONF.tagWidth,
                top: SCHEDULE_CONF.firstTagTopSpaceing,
                color: element.color,
                hasBreak: false,
                breakingDates: [],
                breakinfDatesStringfy: [],
                startsThisWeek: false,
                endsThisWeek: false,
                lastsWholeWeek: false,
            };
            this.eventsExended.push(eventExt);
        });
        this.eventsExended.sort((a, b) => (a.start > b.start ? 1 : -1));
    }
    /**
     *
     * @param date date to be stringfied
     * @returns string with date in format yyyy-m-d, month in number format 0-11, date in number format 1-30/31
     */
    stringfyDate(date) {
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    }
    /**
     *
     * @param d date in desired week (any date in desired week)
     * @returns first day of week as Date
     */
    getFirstDayOfWeek(d) {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }
    /**
     *
     * @param year current year as number
     * @param month_number current month as number
     * @returns number of weeks in month according to given month and year
     */
    weekCount(year, month_number) {
        var firstOfMonth = new Date(year, month_number - 1, 1);
        var day = firstOfMonth.getDay() || 6;
        day = day === 1 ? 0 : day;
        if (day) {
            day--;
        }
        var diff = 7 - day;
        var lastOfMonth = new Date(year, month_number, 0);
        var lastDate = lastOfMonth.getDate();
        if (lastOfMonth.getDay() === 1) {
            diff--;
        }
        var result = Math.ceil((lastDate - diff) / 7);
        return result + 1;
    }
    /**
     *
     * @param year current year as number
     * @param month current month as number
     * @returns array of ScheduleWeek objects with formated weeks for current year and month
     */
    getWeeksSource(year, month) {
        var weeks = [];
        var numOfWeeks = this.weekCount(year, month);
        var firstDay = new Date(year, month - 1, 1);
        var lastDay = new Date(year, month, 0);
        for (let index = 0; index < numOfWeeks; index++) {
            if (index == 0) {
                weeks.push(this.formatWeekFromDay(firstDay));
            }
            else if (index == numOfWeeks - 1) {
                weeks.push(this.formatWeekFromDay(lastDay));
            }
            else {
                var daysToAdd = index * 7;
                var day = new Date(year, month - 1, 1 + daysToAdd);
                weeks.push(this.formatWeekFromDay(day));
            }
        }
        weeks = this.fillWeeksWithDays(this.breakMultiWeekEvents(weeks));
        return weeks;
    }
    /**
     *
     * @param weeks ScheduleWeek array with weeks to be filled with day objects
     * @returns ScheduleWeek array of objects with weeks, days and events for current year and month
     */
    fillWeeksWithDays(weeks) {
        weeks.forEach((week) => {
            var current = new Date(week.firstDay);
            for (var i = 0; i < 7; i++) {
                var now = new Date();
                var curr = new Date(current);
                var isToday = now.getFullYear() == curr.getFullYear() &&
                    now.getMonth() == curr.getMonth() &&
                    now.getDate() == curr.getDate()
                    ? true
                    : false;
                var events = [];
                week.events.forEach((ext) => {
                    if (ext.eventDatesStringfy.includes(this.stringfyDate(curr))) {
                        var newExt = Object.assign({}, ext);
                        if (this.stringfyDate(ext.start) == this.stringfyDate(curr))
                            newExt.firstDayOfEvent = true;
                        else if (ext.breakinfDatesStringfy.includes(this.stringfyDate(curr)))
                            newExt.firstDayOfEvent = true;
                        events.push(newExt);
                    }
                });
                var day = {
                    date: curr,
                    isFromCurrentMonth: current.getMonth() == this.currentMonth,
                    today: isToday,
                    events: events,
                };
                week.days.push(day);
                current.setDate(current.getDate() + 1);
            }
        });
        return weeks;
    }
    /**
     *
     * @param current current day as Date
     * @returns ScheduleWeek from given day with 0 events and 0 days
     */
    formatWeekFromDay(current) {
        const firstDay = this.getFirstDayOfWeek(current);
        const lastDay = new Date(firstDay);
        lastDay.setDate(lastDay.getDate() + 6);
        var dates = this.getDatesInRange(firstDay, lastDay).map((x) => this.stringfyDate(x));
        var week = {
            days: [],
            firstDay: firstDay,
            lastDay: lastDay,
            events: [],
            datesStringfy: dates,
        };
        return week;
    }
    /**
     *
     * @param weeks ScheduleWeek array to be modified
     * @returns ScheduleWeek array of objects with set up events
     * @description breks multi week events into parts, if event starts and ends this week adds ordinary event to week events,
     * if event only starts this week -> adds week last day to event breaking dates and sets up startsThisWeek flag, if event only ends this week -> adds week first day
     * to event breaking dates and sets up endsThisWeek flag, if event lasts whole week -> adds week first and last day to event breaking dates and sets up
     * lastsWholeWeek flag. Important function for tag width and spaceing rendering.
     */
    breakMultiWeekEvents(weeks) {
        weeks.forEach((week) => {
            this.eventsExended.forEach((ev) => {
                var event = Object.assign({}, ev);
                event.start.setHours(0, 0, 0, 0);
                event.end.setHours(0, 0, 0, 0);
                week.firstDay.setHours(0, 0, 0, 0);
                week.lastDay.setHours(0, 0, 0, 0);
                // event starts and ends this week
                if (event.start >= week.firstDay && event.end <= week.lastDay) {
                    event.hasBreak = false;
                    event.startsThisWeek = true;
                    event.endsThisWeek = true;
                    event.lastsWholeWeek = false;
                    week.events.push(event);
                }
                // event only starts this week
                else if (event.start >= week.firstDay && event.start <= week.lastDay) {
                    var lst = new Date(week.lastDay);
                    event.hasBreak = true;
                    var date = new Date(lst.setDate(lst.getDate() + 1));
                    date.setHours(0, 0, 0, 0);
                    if (!event.breakinfDatesStringfy.includes(this.stringfyDate(date))) {
                        event.breakinfDatesStringfy.push(this.stringfyDate(date));
                        event.breakingDates.push(date);
                    }
                    event.startsThisWeek = true;
                    event.endsThisWeek = false;
                    event.lastsWholeWeek = false;
                    week.events.push(event);
                }
                // event only ends this week
                else if (event.end <= week.lastDay && event.end >= week.firstDay) {
                    var fst = new Date(week.firstDay);
                    event.hasBreak = true;
                    var date = new Date(fst.setDate(fst.getDate()));
                    date.setHours(0, 0, 0, 0);
                    if (!event.breakinfDatesStringfy.includes(this.stringfyDate(date))) {
                        event.breakinfDatesStringfy.push(this.stringfyDate(date));
                        event.breakingDates.push(date);
                    }
                    event.endsThisWeek = true;
                    event.lastsWholeWeek = false;
                    event.startsThisWeek = false;
                    week.events.push(event);
                }
                // event lasts whole week
                else {
                    let allFounded = week.datesStringfy.every((ai) => event.eventDatesStringfy.includes(ai));
                    if (allFounded) {
                        var fst = new Date(week.firstDay);
                        event.hasBreak = true;
                        var date = new Date(fst.setDate(fst.getDate()));
                        date.setHours(0, 0, 0, 0);
                        if (!event.breakinfDatesStringfy.includes(this.stringfyDate(date))) {
                            event.breakinfDatesStringfy.push(this.stringfyDate(date));
                            event.breakingDates.push(date);
                        }
                        var lst = new Date(week.lastDay);
                        event.hasBreak = true;
                        date = new Date(lst.setDate(lst.getDate() + 1));
                        date.setHours(0, 0, 0, 0);
                        if (!event.breakinfDatesStringfy.includes(this.stringfyDate(date))) {
                            event.breakinfDatesStringfy.push(this.stringfyDate(date));
                            event.breakingDates.push(date);
                        }
                        event.startsThisWeek = false;
                        event.endsThisWeek = false;
                        event.lastsWholeWeek = true;
                        week.events.push(event);
                    }
                }
            });
        });
        return weeks;
    }
    /**
     *
     * @param locale current locale for date pipe
     * @returns array of strings with week days names
     */
    getWeekDaysNames(locale) {
        var baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
        var weekDays = [];
        for (var i = 0; i < 7; i++) {
            weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }).toUpperCase());
            baseDate.setDate(baseDate.getDate() + 1);
        }
        return weekDays;
    }
    /**
     *
     * @param locale current locale for date pipe
     * @returns ScheduleMonth array with current year months
     */
    getMonthNames(locale) {
        var baseDate = new Date(Date.UTC(this.currentYear, 0, 1));
        var months = [];
        for (var i = 0; i < 12; i++) {
            months.push({
                name: baseDate
                    .toLocaleDateString(locale, { month: 'long' })
                    .toUpperCase(),
                key: baseDate.getMonth(),
                shortName: baseDate.toLocaleDateString(locale, { month: 'short' }),
            });
            baseDate.setMonth(baseDate.getMonth() + 1);
        }
        return months;
    }
    /**
     *
     * @returns array of years in given range as numbers
     */
    getYearsInRange() {
        var arr = [];
        for (let index = this.startYear; index <= this.endYear; index++) {
            arr.push(index);
        }
        return arr;
    }
    /**
     *
     * @param event current ScheduleEventExtended to be rendered
     * @returns width of event tag as string
     * @description calculates event tag width for current event based on event breaking dates. If event lasts whole week sets up tag width to 7 days,
     * if event only starts this week takes first breaking date and counts number of days before first break --> sets up tag width to number of days before first break,
     * if event only ends this week takes last breaking date and counts number of days after last break --> sets up tag width to number of days after last break.
     */
    calculateEventTagWidth(event) {
        var _a;
        var elementWdt = (_a = document.querySelector('.schedule-day')) === null || _a === void 0 ? void 0 : _a.clientWidth;
        var width = SCHEDULE_CONF.tagWidth;
        var elements = 0;
        if (event.lastsWholeWeek)
            elements = 7;
        else if (event.breakingDates.length > 0 &&
            event.startsThisWeek &&
            event.hasBreak) {
            var breakDate = event.breakingDates[0]; // it's starting week so first break is applied
            var indexForSplit = event.eventDatesStringfy.indexOf(this.stringfyDate(breakDate));
            if (indexForSplit > -1)
                elements = event.eventDatesStringfy.slice(0, indexForSplit).length;
        }
        else if (event.breakingDates.length > 0 &&
            event.hasBreak &&
            event.endsThisWeek) {
            var breakDate = event.breakingDates[event.breakingDates.length - 1]; // it's ending week so last break is applied
            var indexForSplit = event.eventDatesStringfy.indexOf(this.stringfyDate(breakDate));
            if (indexForSplit > -1)
                elements = event.eventDatesStringfy.slice(indexForSplit).length;
        }
        else {
            elements = event.eventDates.length;
        }
        if (elementWdt)
            width = (elements * elementWdt).toString() + 'px';
        return width;
    }
    /**
     *
     * @param event current ScheduleEventExteded
     * @param week current ScheduleWeek
     * @returns top position of current event tag as string based on number of events this week
     * @description calculates tag top position based on events position in week events
     */
    calculateEventTagTop(event, week) {
        var index = week.events.findIndex((x) => x.id == event.id) + 1;
        var calc = '';
        var top = SCHEDULE_CONF.tagHeight + SCHEDULE_CONF.betweenTagSpaceing;
        if (index > 0) {
            // calculate number of tags above current tag, sum all above tags heights and speceings and get current tag top position
            top =
                index * SCHEDULE_CONF.tagHeight +
                    index * SCHEDULE_CONF.betweenTagSpaceing;
            calc = top + 'px';
        }
        return calc;
    }
    // -------------------------------------------------------------- PUBLIC METHODS ---------------------------------------------------------------
    /**
     *
     * @param key key of month as number
     * @returns month name as string based on provided key
     */
    getMonthNameByKey(key) {
        var item = this.months.find((x) => x.key == key);
        return item ? item.name : '';
    }
    /**
     * @description repaints and refreshes calendar
     * @param restartOnToday boolean flag to restart calendar on today date
     * @default restartOnToday false
     */
    refresh(restartOnToday = false) {
        this.setUpEventExtended();
        this.weeks = this.getWeeksSource(this.currentYear, this.currentMonth + 1);
        var todayWeek = this.weeks.find((x) => x.days.find((y) => y.today));
        if (todayWeek && restartOnToday)
            this.currentWeekIndex = this.weeks.indexOf(todayWeek);
        else
            this.currentWeekIndex = 0;
        this.currentMonthDays = this.getCurrentMonthDays(this.currentYear, this.currentMonth + 1);
        if (restartOnToday)
            this.currentDay = new Date().getDate();
        var currD = this.findCurrentScheduleDay();
        if (currD)
            this.currentScheduleDay = currD;
    }
    /**
     *
     * @returns ScheduleDay if day exists in weeks array or undefined if not found
     */
    findCurrentScheduleDay() {
        var dayR = undefined;
        this.weeks.forEach((week) => {
            week.days.forEach((day) => {
                if (this.stringfyDate(day.date) ==
                    this.stringfyDate(new Date(this.currentYear, this.currentMonth, this.currentDay)))
                    dayR = day;
            });
        });
        return dayR;
    }
    /**
     *
     * @param year current year as number
     * @param month current month as number
     * @returns array of numbers with given month days
     */
    getCurrentMonthDays(year, month) {
        var firstDay = new Date(year, month - 1, 1);
        var lastDay = new Date(year, month, 0);
        return this.getDatesInRange(firstDay, lastDay).map((x) => x.getDate());
    }
    /**
     *
     * @param week current week as ScheduleWeek
     * @returns row height as string
     * @description calculates row height based on number of week events, applied only if calculated height greater then default row height
     */
    calculateWeekRowHeight(week) {
        var calc = SCHEDULE_CONF.minWeekRowHeight + 'px';
        var sum = week.events.length *
            (SCHEDULE_CONF.tagHeight + SCHEDULE_CONF.betweenTagSpaceing);
        var headerHeight = SCHEDULE_CONF.tagHeight + SCHEDULE_CONF.betweenTagSpaceing;
        sum = sum + headerHeight;
        // apply calculated height only if result is greater then minimum week row height
        if (sum > SCHEDULE_CONF.minWeekRowHeight)
            calc = sum + 'px';
        return calc;
    }
    /**
     *
     * @param hex hex value of color as string
     * @returns color RGBA as string
     * @description converts color hex to RGBA for event tag
     */
    hexToRgbA(hex) {
        var c;
        if (hex) {
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length == 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return ('rgba(' +
                    [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
                    ',0.08)');
            }
            return '';
        }
        return '';
    }
    /**
     *
     * @returns current visible calendar month in number format 1-12
     */
    getCurrentVisibleMonth() {
        return this.currentMonth + 1;
    }
    /**
     *
     * @returns current visible calendar year in number format
     */
    getCurrentVisibleYear() {
        return this.currentYear;
    }
    /**
     *
     * @param date date to be formated
     * @param format format for date
     * @returns formated date as string based on current locale and given format
     */
    formatDate(date, format) {
        var datePipe = new DatePipe(this.locale);
        var str = datePipe.transform(date, format);
        return str ? str : '';
    }
    // -------------------------------------------------------------- DOM LISTENERS ----------------------------------------------------------------
    /**
     *
     * @param next flag that marks if next or previous moth is clicked
     * @description sets currentMonth value according to button pressed, if month is 11 resets months to 0. If month is 0 resets months to 11.
     */
    toggleMonth(next) {
        if (next) {
            if (this.currentMonth == 11)
                this.currentMonth = 0;
            else
                this.currentMonth++;
        }
        else {
            if (this.currentMonth == 0)
                this.currentMonth = 11;
            else
                this.currentMonth--;
        }
        this.refresh();
        this.monthFlipCard.toggle();
        this.monthSelectionChanged.emit(this.currentMonth + 1);
    }
    /**
     * @description listens to year select box selection change and refreshes view.
     */
    onYearSelectedChange() {
        this.refresh();
        this.yearSelectionChanged.emit(this.currentYear);
    }
    /**
     *
     * @param day current ScheduleDay thats resized
     * @param week current ScheduleWeek thats resized
     * @description recalculates event width and top position according to new resized mesures
     */
    onDayResized(day, week) {
        day.events.forEach((element) => {
            element.width = this.calculateEventTagWidth(element);
            element.top = this.calculateEventTagTop(element, week);
        });
    }
    /**
     * @description resets currentMonth and currentYear on today date and refreshes view with today date.
     */
    goOnToday() {
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.refresh(true);
        this.todayClicked.emit(true);
    }
    /**
     *
     * @param btn ViewToggleButton thats clicked
     * @description toggles selected view and refresh current view
     */
    toggleView(btn) {
        this.avaliableViews.find((x) => x.isActive).isActive =
            false;
        btn.isActive = true;
        this.activeView = btn.view;
        this.refresh();
    }
    /**
     *
     * @param next flag that indicates if next or previous week button is clicked
     * @description toggles week view and refreshes calendar view according to new selected week. If current week is last in current month then toggles next month.
     * If current week is first in month then toggles previous month. If last week is already on screen skips one week in previous month.
     */
    toggleWeek(next) {
        this.weekFlipCard.toggle();
        var currentWeek = this.weeks[this.currentWeekIndex];
        if (next) {
            var nextIndex = this.currentWeekIndex + 1;
            //reached last week of current month, go to next month if month not 11 else go back to first month
            if (nextIndex > this.weeks.length - 1) {
                if (this.currentMonth < 11) {
                    this.currentMonth++;
                }
                else {
                    this.currentMonth = 0;
                }
                this.refresh();
            }
            else {
                this.currentWeekIndex++;
            }
        }
        else {
            var previousIndex = this.currentWeekIndex - 1;
            //reached first week of current month, go to previous month if month not 0 else go back to last month
            if (previousIndex < 0) {
                if (this.currentMonth > 0)
                    this.currentMonth--;
                else
                    this.currentMonth = 11;
                this.refresh();
                this.currentWeekIndex = this.weeks.length - 1; // reset index to last week in weeks
                //check if last week already on screen
                if (this.stringfyDate(this.weeks[this.currentWeekIndex].days[0].date) ==
                    this.stringfyDate(currentWeek.days[0].date))
                    this.currentWeekIndex--;
            }
            else
                this.currentWeekIndex--;
        }
    }
    /**
     *
     * @param stat string with status text
     * @returns NbComponentStatus type
     * @description converts string to NbComponentStatus, if hex color is given then returns default basic status
     */
    convertToStatus(stat) {
        if (stat.startsWith('#'))
            return 'basic';
        else
            return stat;
    }
    /**
     *
     * @param month current ScheduleMonth
     * @description refreshes view according to new month selected
     */
    toggleMonthDay(month) {
        this.currentMonth = month.key;
        this.monthSelectionChanged.emit(month.key);
        this.refresh();
    }
    /**
     *
     * @param day current day as number
     * @description toggles current day and refreshes view according to new day selected (only if DAY view is active)
     */
    toggleDay(day) {
        this.currentDay = day;
        this.refresh();
    }
    /**
     *
     * @param event schedule event thats clicked
     * @description fires eventClicked event
     */
    onEventClick(event) {
        this.eventClicked.emit(event);
    }
    /***
     * @description emits add new click event
     */
    onAddNewClick() {
        this.addNewClicked.emit(true);
    }
}
ScheduleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ScheduleComponent, deps: [{ token: LOCALE_ID }, { token: i0.IterableDiffers }, { token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ScheduleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ScheduleComponent, selector: "ngx-schedule", inputs: { startYear: "startYear", endYear: "endYear", eventTagAppereance: "eventTagAppereance", events: "events", startingMonth: "startingMonth", startingYear: "startingYear", showYearPicker: "showYearPicker", markToday: "markToday", nextMonthTooltip: "nextMonthTooltip", previousMonthTooltip: "previousMonthTooltip", todayBtnTitle: "todayBtnTitle", addNewBtnTitle: "addNewBtnTitle", showTodayBtn: "showTodayBtn", showAddNewBtn: "showAddNewBtn", addNewBtnTooltip: "addNewBtnTooltip", todayBtnTooltip: "todayBtnTooltip", activeView: "activeView", eventStart: "eventStart", eventEnd: "eventEnd", eventTitle: "eventTitle", eventDescription: "eventDescription" }, outputs: { yearSelectionChanged: "yearSelectionChanged", monthSelectionChanged: "monthSelectionChanged", daySelectionChanged: "daySelectionChanged", eventClicked: "eventClicked", addNewClicked: "addNewClicked", todayClicked: "todayClicked" }, viewQueries: [{ propertyName: "monthFlipCard", first: true, predicate: ["monthFlipCard"], descendants: true }, { propertyName: "weekFlipCard", first: true, predicate: ["weekFlipCard"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-schedule w-100\">\r\n    <nb-card class=\"schedule-card\">\r\n        <nb-card-body>\r\n            <div class=\"row schedule-header\">\r\n                <div class=\"w-max-content schedule-view p-0\">\r\n                    <div class=\"button-container\">\r\n                        <div class=\"d-flex\" *ngFor=\"let btn of avaliableViews\">\r\n                            <button nbButton ghost shape=\"round\" size=\"small\" *ngIf=\"!btn.isActive\"\r\n                                (click)=\"toggleView(btn)\">\r\n                                {{btn.title}}\r\n                            </button>\r\n                            <button *ngIf=\"btn.isActive\" nbButton hero status=\"basic\" class=\"active-view\" shape=\"round\"\r\n                                (click)=\"toggleView(btn)\" size=\"small\">\r\n                                {{btn.title}}\r\n                            </button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"w-max-content d-flex p-0\" *ngIf=\"activeView==views.MONTH\">\r\n                    <button nbButton ghost size=\"medium\" shape=\"round\" style=\"height: max-content;\" status=\"primary\"\r\n                        [nbTooltip]=\"previousMonthTooltip\" [nbTooltipDisabled]=\"previousMonthTooltip.length==0\"\r\n                        (click)=\"toggleMonth(false)\">\r\n                        <nb-icon pack=\"eva\" icon=\"chevron-left-outline\"></nb-icon>\r\n                    </button>\r\n                    <nb-flip-card [showToggleButton]=\"false\" #monthFlipCard class=\"month-card\">\r\n                        <nb-card-front>\r\n                            <nb-card>\r\n                                <nb-card-body>\r\n                                    {{getMonthNameByKey(currentMonth)}}\r\n                                </nb-card-body>\r\n                            </nb-card>\r\n                        </nb-card-front>\r\n                        <nb-card-back>\r\n                            <nb-card>\r\n                                <nb-card-body>\r\n                                    {{getMonthNameByKey(currentMonth)}}\r\n                                </nb-card-body>\r\n                            </nb-card>\r\n                        </nb-card-back>\r\n                    </nb-flip-card>\r\n                    <button nbButton ghost size=\"medium\" shape=\"round\" style=\"height: max-content;\" status=\"primary\"\r\n                        (click)=\"toggleMonth(true)\" [nbTooltip]=\"nextMonthTooltip\"\r\n                        [nbTooltipDisabled]=\"nextMonthTooltip.length==0\">\r\n                        <nb-icon pack=\"eva\" icon=\"chevron-right-outline\"></nb-icon>\r\n                    </button>\r\n                </div>\r\n                <div class=\"w-max-content schedule-today-btn p-0\" [style.right]=\"showYearPicker ? '195px' : '90px'\"\r\n                    *ngIf=\"showAddNewBtn\">\r\n                    <button nbButton ghost status=\"primary\" shape=\"round\" class=\"new-event-btn\"\r\n                        [nbTooltip]=\"addNewBtnTooltip\" (click)=\"onAddNewClick()\"\r\n                        [nbTooltipDisabled]=\"addNewBtnTooltip.length==0\">\r\n                        {{addNewBtnTitle}}\r\n                        <nb-icon pack=\"eva\" icon=\"plus-outline\"></nb-icon>\r\n                    </button>\r\n                </div>\r\n                <div class=\"w-max-content schedule-today-btn p-0\" [style.right]=\"showYearPicker ? '105px' : '0'\"\r\n                    *ngIf=\"showTodayBtn\">\r\n                    <button nbButton ghost status=\"primary\" shape=\"round\" (click)=\"goOnToday()\"\r\n                        [nbTooltip]=\"todayBtnTooltip\"\r\n                        [nbTooltipDisabled]=\"todayBtnTooltip.length==0\">{{todayBtnTitle}}</button>\r\n                </div>\r\n                <div class=\"w-max-content schedule-year p-0\" *ngIf=\"showYearPicker\">\r\n                    <nb-select [(selected)]=\"currentYear\" (selectedChange)=\"onYearSelectedChange()\">\r\n                        <nb-option *ngFor=\"let year of years\" [value]=\"year\">{{year}}</nb-option>\r\n                    </nb-select>\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"activeView==views.MONTH\">\r\n                <div class=\"w-100\">\r\n                    <div class=\"row m-0 schedule-week-day-names\">\r\n                        <div class=\"col d-flex justify-content-center h-100 day-names schedule-day\"\r\n                            *ngFor=\"let name of days\">\r\n                            {{name}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row m-0 schedule-week\" *ngFor=\"let week of weeks\"\r\n                        [style]=\"'height: '+ calculateWeekRowHeight(week)\">\r\n                        <div class=\"col p-0 h-100 schedule-day\" #container *ngFor=\"let day of week.days\"\r\n                            [ngClass]=\"day.today && markToday ? 'day-today':''\">\r\n                            <div class=\"day-content p-0 w-100 h-100\" (resized)=\"onDayResized(day, week)\"\r\n                                [ngClass]=\"day.isFromCurrentMonth ? '':'semi-transparent'\">\r\n                                <div class=\"schedule-day-date\">{{day.date | date:'dd'}}</div>\r\n                                <ng-container *ngFor=\"let event of day.events\">\r\n                                    <nb-tag class=\"schedule-event\" *ngIf=\"event.firstDayOfEvent\" [text]=\"event.title\"\r\n                                        (click)=\"onEventClick(event)\" [nbTooltip]=\"event.description ?? event.title\"\r\n                                        [nbTooltipDisabled]=\"event.description?.length==0\"\r\n                                        [status]=\"event.color ? event.color : 'basic'\"\r\n                                        [style.background-color]=\"eventTagAppereance=='outline'?hexToRgbA(event.color):event.color\"\r\n                                        [style.color]=\"eventTagAppereance=='outline' ? event.color:'inherit'\"\r\n                                        [style.border-color]=\"event.color\" [appearance]=\"eventTagAppereance\"\r\n                                        [style.min-width]=\"event.width\" [style.top]=\"event.top\">\r\n                                    </nb-tag>\r\n                                </ng-container>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"activeView==views.WEEK\" class=\"schedule-week-view\">\r\n                <div class=\"row m-0 w-100 week-header\">\r\n                    <div class=\"col-1 p-0 d-flex justify-content-center align-items-center\">\r\n                        <button nbButton ghost size=\"large\" shape=\"round\" style=\"height: max-content;\" class=\"mb-3\"\r\n                            (click)=\"toggleWeek(false)\" status=\"primary\">\r\n                            <nb-icon pack=\"eva\" icon=\"chevron-left-outline\"></nb-icon>\r\n                        </button>\r\n                    </div>\r\n                    <div class=\"col p-0\">\r\n                        <nb-flip-card [showToggleButton]=\"false\" class=\"week-card\" #weekFlipCard>\r\n                            <nb-card-front>\r\n                                <nb-card>\r\n                                    <nb-card-body>\r\n                                        <div class=\"row m-0 w-100\">\r\n                                            <div class=\"col p-0 d-flex justify-content-center align-items-center\"\r\n                                                *ngFor=\"let day of weeks[currentWeekIndex].days\">\r\n                                                <div>\r\n                                                    <div class=\"week-month-name\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-300':''\">\r\n                                                        {{formatDate(day.date, 'MMM')}}\r\n                                                    </div>\r\n                                                    <div class=\"week-date\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-500': !day.isFromCurrentMonth ? 'text-status-basic-600':''\">\r\n                                                        {{formatDate(day.date, 'dd')}}\r\n                                                    </div>\r\n                                                    <div class=\"week-day-name\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-300':''\">\r\n                                                        {{formatDate(day.date, 'EEE')}}\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </nb-card-body>\r\n                                </nb-card>\r\n                            </nb-card-front>\r\n                            <nb-card-back>\r\n                                <nb-card>\r\n                                    <nb-card-body>\r\n                                        <div class=\"row m-0 w-100\">\r\n                                            <div class=\"col p-0 d-flex justify-content-center align-items-center\"\r\n                                                *ngFor=\"let day of weeks[currentWeekIndex].days\">\r\n                                                <div>\r\n                                                    <div class=\"week-month-name\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-300':''\">\r\n                                                        {{formatDate(day.date, 'MMM')}}\r\n                                                    </div>\r\n                                                    <div class=\"week-date\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-500': !day.isFromCurrentMonth ? 'text-status-basic-600':''\">\r\n                                                        {{formatDate(day.date, 'dd')}}\r\n                                                    </div>\r\n                                                    <div class=\"week-day-name\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-300':''\">\r\n                                                        {{formatDate(day.date, 'EEE')}}\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </nb-card-body>\r\n                                </nb-card>\r\n                            </nb-card-back>\r\n                        </nb-flip-card>\r\n                    </div>\r\n                    <div class=\"col-1 p-0 d-flex justify-content-center align-items-center\">\r\n                        <button nbButton ghost size=\"large\" shape=\"round\" style=\"height: max-content;\" class=\"mb-3\"\r\n                            (click)=\"toggleWeek(true)\" status=\"primary\">\r\n                            <nb-icon pack=\"eva\" icon=\"chevron-right-outline\"></nb-icon>\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row m-0 schedule-week\"\r\n                    [style]=\"'height: '+ calculateWeekRowHeight(weeks[currentWeekIndex])\">\r\n                    <div class=\"col-1\"></div>\r\n                    <div class=\"col p-0 h-100 schedule-day\" style=\"border-top: none; border-bottom: none;\" #container\r\n                        *ngFor=\"let day of weeks[currentWeekIndex].days\"\r\n                        [ngClass]=\"day.today && markToday ? 'day-today':''\">\r\n                        <div class=\"day-content p-0 w-100 h-100\" (resized)=\"onDayResized(day, weeks[currentWeekIndex])\"\r\n                            [ngClass]=\"day.isFromCurrentMonth ? '':'semi-transparent'\">\r\n                            <ng-container *ngFor=\"let event of day.events\">\r\n                                <nb-tag class=\"schedule-event\" *ngIf=\"event.firstDayOfEvent\" [text]=\"event.title\"\r\n                                    (click)=\"onEventClick(event)\" [nbTooltip]=\"event.description ?? event.title\"\r\n                                    [nbTooltipDisabled]=\"event.description?.length==0\"\r\n                                    [status]=\"event.color ? event.color : 'basic'\"\r\n                                    [style.background-color]=\"eventTagAppereance=='outline'?hexToRgbA(event.color):event.color\"\r\n                                    [style.color]=\"eventTagAppereance=='outline' ? event.color:'inherit'\"\r\n                                    [style.border-color]=\"event.color\" [appearance]=\"eventTagAppereance\"\r\n                                    [style.min-width]=\"event.width\" [style.top]=\"event.top\">\r\n                                </nb-tag>\r\n                            </ng-container>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-1\"></div>\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"activeView==views.DAY\" class=\"schedule-day-view\">\r\n                <div class=\"row m-0 months-row\">\r\n                    <div class=\"col p-0 month-name\" *ngFor=\"let month of months\">\r\n                        <button *ngIf=\"month.key!=currentMonth\" nbButton ghost status=\"basic\" shape=\"round\"\r\n                            (click)=\"toggleMonthDay(month)\">{{month.shortName}}</button>\r\n                        <button *ngIf=\"month.key==currentMonth\" nbButton status=\"primary\"\r\n                            shape=\"round\">{{month.shortName}}</button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row ms-0 me-0 mb-0 mt-3 days-row\">\r\n                    <div class=\"col p-0 d-flex justify-content-center align-items-center\"\r\n                        *ngFor=\"let day of currentMonthDays\">\r\n                        <button *ngIf=\"day!=currentDay\" (click)=\"toggleDay(day)\" nbButton ghost size=\"small\"\r\n                            status=\"basic\" shape=\"round\">{{day}}</button>\r\n                        <button *ngIf=\"day==currentDay\" nbButton status=\"primary\" size=\"small\"\r\n                            shape=\"round\">{{day}}</button>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row ms-0 me-0 mb-0 mt-4 day-content w-100\">\r\n                    <div class=\"row m-0 w-100 d-flex\">\r\n                        <div class=\"day-name\">\r\n                            {{formatDate(currentScheduleDay.date, 'EEEE')}}\r\n                        </div>\r\n                        <div class=\"day-date\">\r\n                            {{formatDate(currentScheduleDay.date, 'dd')}}\r\n                        </div>\r\n                        <div class=\"day-month\">\r\n                            {{formatDate(currentScheduleDay.date, 'MMM')}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row ms-0 me-0 mb-0 mt-2 w-100\">\r\n                        <div *ngFor=\"let event of currentScheduleDay.events\" class=\"p-0\">\r\n                            <nb-alert class=\"mb-0 mt-2 day-event-alert\"\r\n                                [outline]=\"event.color ? convertToStatus(event.color):'basic'\"\r\n                                (click)=\"onEventClick(event)\" [ngClass]=\"'alert-status-'+event.color\"\r\n                                [style.border-color]=\"event.color\"\r\n                                [style.background-color]=\"event.color?convertToStatus(event.color)=='basic' ? hexToRgbA(event.color):'':'transparent'\">\r\n                                <div class=\"row m-0 w-100\">\r\n                                    <div style=\"width: 35px;\">\r\n                                        <nb-tag [status]=\"event.color ? event.color : 'basic'\" filled text=\"\"\r\n                                            class=\"p-0\" [style.min-height]=\"'100%'\" [style.width]=\"'5px'\"\r\n                                            [style.border-color]=\"event.color\"\r\n                                            [style.background-color]=\"event.color\"></nb-tag>\r\n                                    </div>\r\n                                    <div class=\"col p-0\">\r\n                                        <div class=\"row m-0 w-100\">\r\n                                            <div class=\"col-1 alert-label\" [style.color]=\"event.color\">\r\n                                                {{eventTitle}}\r\n                                            </div>\r\n                                            <div class=\"col\">\r\n                                                {{event.title}}\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row m-0 w-100\">\r\n                                            <div class=\"col-1 alert-label\" [style.color]=\"event.color\">\r\n                                                {{eventStart}}\r\n                                            </div>\r\n                                            <div class=\"col\">\r\n                                                {{formatDate(event.start, \"dd MMMM yyyy\")}}\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row m-0 w-100\">\r\n                                            <div class=\"col-1 alert-label\" [style.color]=\"event.color\">\r\n                                                {{eventEnd}}\r\n                                            </div>\r\n                                            <div class=\"col\">\r\n                                                {{formatDate(event.end, \"dd MMMM yyyy\")}}\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row m-0 w-100\" *ngIf=\"event.description\">\r\n                                            <div class=\"col-1 alert-label\" [style.color]=\"event.color\">\r\n                                                {{eventDescription}}\r\n                                            </div>\r\n                                            <div class=\"col\">\r\n                                                {{event.description}}\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </nb-alert>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </nb-card-body>\r\n    </nb-card>\r\n</div>", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .ngx-schedule{height:100%}:host .ngx-schedule nb-card{height:100%}:host .ngx-schedule nb-card-body{padding:1.5rem}:host .ngx-schedule .schedule-card{border-radius:1rem}:host .ngx-schedule .schedule-card .schedule-header{position:relative;display:flex;width:100%;justify-content:center;align-items:center;margin-bottom:1.5rem;margin-left:0;margin-right:0;margin-top:0;height:40px}:host .ngx-schedule .schedule-card .schedule-header .schedule-view{position:absolute;left:0}:host .ngx-schedule .schedule-card .schedule-header .schedule-view .button-container{padding:3px;background-color:var(--color-basic-transparent-200);border-radius:50px;display:flex}:host .ngx-schedule .schedule-card .schedule-header .schedule-view .button-container button.active-view{background-image:linear-gradient(to right,var(--color-basic-100),var(--color-basic-hover));color:var(--color-primary-500)}:host .ngx-schedule .schedule-card .schedule-header .schedule-year{position:absolute;right:0}:host .ngx-schedule .schedule-card .schedule-header .schedule-today-btn{position:absolute;top:0;right:0}:host .ngx-schedule .schedule-card .month-card{width:180px;margin-left:.5rem;margin-right:.5rem;height:40px}:host .ngx-schedule .schedule-card .month-card nb-card{border:none}:host .ngx-schedule .schedule-card .month-card nb-card nb-card-body{display:flex;justify-content:center;align-items:center;font-weight:600;padding:.5rem}:host .ngx-schedule .schedule-card .day-names{font-weight:600;padding-bottom:.5rem;padding-top:.5rem;padding-left:0;padding-right:0}:host .ngx-schedule .schedule-card .schedule-week .schedule-event{position:absolute;left:1px;z-index:300}:host .ngx-schedule .schedule-card .schedule-week .schedule-event:hover{cursor:pointer}:host .ngx-schedule .schedule-card .schedule-week .schedule-day{border:1px solid var(--color-basic-transparent-200);position:relative}:host .ngx-schedule .schedule-card .schedule-week .schedule-day .semi-transparent{opacity:.3}:host .ngx-schedule .schedule-card .schedule-week .schedule-day .day-content .schedule-day-date{width:max-content;padding-left:.5rem;padding-top:.5rem;font-weight:600}:host .ngx-schedule .schedule-card .schedule-week .schedule-day.day-today{border:1px solid var(--color-primary-500);position:relative}:host .ngx-schedule .schedule-card .schedule-week .schedule-day.day-today .schedule-day-date{color:var(--color-primary-500)}:host .ngx-schedule .schedule-card .schedule-week-day-names .schedule-day{border:1px solid var(--color-basic-transparent-200)}:host .ngx-schedule .schedule-card .schedule-week-view .week-header{height:max-content}:host .ngx-schedule .schedule-card .schedule-week-view .week-card nb-card-body{padding:0}:host .ngx-schedule .schedule-card .schedule-week-view .week-card nb-card{border:none;margin:0}:host .ngx-schedule .schedule-card .schedule-week-view .week-card .week-month-name{text-transform:capitalize;font-size:medium;color:var(--color-basic-600);width:100%;display:flex;justify-content:center}:host .ngx-schedule .schedule-card .schedule-week-view .week-card .week-date{font-size:xx-large;font-weight:600;width:100%;display:flex;justify-content:center;padding-top:1rem;padding-bottom:1rem}:host .ngx-schedule .schedule-card .schedule-week-view .week-card .week-day-name{padding-bottom:1rem;width:100%;display:flex;justify-content:center;text-transform:uppercase;font-size:medium;color:var(--color-basic-600)}:host .ngx-schedule .schedule-card .schedule-day-view .months-row .month-name{display:flex;align-items:center;justify-content:center}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .day-name{width:max-content;padding:0;font-size:xx-large;text-transform:capitalize;font-weight:600}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .day-date{width:max-content;padding:0;font-weight:600;padding-left:.5rem;padding-top:6px;height:100%;color:var(--color-basic-600)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .day-month{width:max-content;color:var(--color-basic-600);font-weight:600;padding:6px 0 0 2px}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-info{background-color:var(--tag-outline-info-background-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-info .alert-label{color:var(--tag-outline-info-text-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-danger{background-color:var(--tag-outline-danger-background-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-danger .alert-label{color:var(--tag-outline-danger-text-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-warning{background-color:var(--tag-outline-warning-background-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-warning .alert-label{color:var(--tag-outline-warning-text-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-success{background-color:var(--tag-outline-success-background-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-success .alert-label{color:var(--tag-outline-success-text-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-primary{background-color:var(--tag-outline-primary-background-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-primary .alert-label{color:var(--tag-outline-primary-text-color)}:host .w-max-content{width:max-content}:host .text-status-primary-300{color:var(--color-primary-300)!important}:host .text-status-primary-500{color:var(--color-primary-500)!important}:host .text-status-basic-600{color:var(--color-basic-600)!important}:host .day-event-alert:hover{cursor:pointer}\n"], dependencies: [{ kind: "component", type: i1.NbTagComponent, selector: "nb-tag", inputs: ["text", "selected", "removable", "appearance", "status", "size", "role"], outputs: ["remove", "selectedChange"], exportAs: ["nbTag"] }, { kind: "component", type: i1.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i1.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i1.NbTooltipDirective, selector: "[nbTooltip]", inputs: ["nbTooltip", "nbTooltipPlacement", "nbTooltipAdjustment", "nbTooltipClass", "nbTooltipIcon", "nbTooltipStatus", "nbTooltipTrigger", "nbTooltipOffset", "nbTooltipDisabled"], outputs: ["nbTooltipShowStateChange"], exportAs: ["nbTooltip"] }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.NbSelectComponent, selector: "nb-select", inputs: ["size", "status", "shape", "appearance", "optionsListClass", "optionsPanelClass", "optionsWidth", "outline", "filled", "hero", "disabled", "fullWidth", "placeholder", "compareWith", "selected", "multiple", "optionsOverlayOffset", "scrollStrategy"], outputs: ["selectedChange"] }, { kind: "component", type: i1.NbOptionComponent, selector: "nb-option", inputs: ["value", "disabled"], outputs: ["selectionChange"] }, { kind: "component", type: i1.NbCardComponent, selector: "nb-card", inputs: ["size", "status", "accent"] }, { kind: "component", type: i1.NbCardBodyComponent, selector: "nb-card-body" }, { kind: "component", type: i1.NbFlipCardComponent, selector: "nb-flip-card", inputs: ["flipped", "showToggleButton"] }, { kind: "component", type: i1.NbCardFrontComponent, selector: "nb-card-front" }, { kind: "component", type: i1.NbCardBackComponent, selector: "nb-card-back" }, { kind: "component", type: i1.NbAlertComponent, selector: "nb-alert", inputs: ["size", "status", "accent", "outline", "closable"], outputs: ["close"] }, { kind: "directive", type: ResizedDirective, selector: "[resized]", outputs: ["resized"] }, { kind: "pipe", type: i4.DatePipe, name: "date" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ScheduleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-schedule', template: "<div class=\"ngx-schedule w-100\">\r\n    <nb-card class=\"schedule-card\">\r\n        <nb-card-body>\r\n            <div class=\"row schedule-header\">\r\n                <div class=\"w-max-content schedule-view p-0\">\r\n                    <div class=\"button-container\">\r\n                        <div class=\"d-flex\" *ngFor=\"let btn of avaliableViews\">\r\n                            <button nbButton ghost shape=\"round\" size=\"small\" *ngIf=\"!btn.isActive\"\r\n                                (click)=\"toggleView(btn)\">\r\n                                {{btn.title}}\r\n                            </button>\r\n                            <button *ngIf=\"btn.isActive\" nbButton hero status=\"basic\" class=\"active-view\" shape=\"round\"\r\n                                (click)=\"toggleView(btn)\" size=\"small\">\r\n                                {{btn.title}}\r\n                            </button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"w-max-content d-flex p-0\" *ngIf=\"activeView==views.MONTH\">\r\n                    <button nbButton ghost size=\"medium\" shape=\"round\" style=\"height: max-content;\" status=\"primary\"\r\n                        [nbTooltip]=\"previousMonthTooltip\" [nbTooltipDisabled]=\"previousMonthTooltip.length==0\"\r\n                        (click)=\"toggleMonth(false)\">\r\n                        <nb-icon pack=\"eva\" icon=\"chevron-left-outline\"></nb-icon>\r\n                    </button>\r\n                    <nb-flip-card [showToggleButton]=\"false\" #monthFlipCard class=\"month-card\">\r\n                        <nb-card-front>\r\n                            <nb-card>\r\n                                <nb-card-body>\r\n                                    {{getMonthNameByKey(currentMonth)}}\r\n                                </nb-card-body>\r\n                            </nb-card>\r\n                        </nb-card-front>\r\n                        <nb-card-back>\r\n                            <nb-card>\r\n                                <nb-card-body>\r\n                                    {{getMonthNameByKey(currentMonth)}}\r\n                                </nb-card-body>\r\n                            </nb-card>\r\n                        </nb-card-back>\r\n                    </nb-flip-card>\r\n                    <button nbButton ghost size=\"medium\" shape=\"round\" style=\"height: max-content;\" status=\"primary\"\r\n                        (click)=\"toggleMonth(true)\" [nbTooltip]=\"nextMonthTooltip\"\r\n                        [nbTooltipDisabled]=\"nextMonthTooltip.length==0\">\r\n                        <nb-icon pack=\"eva\" icon=\"chevron-right-outline\"></nb-icon>\r\n                    </button>\r\n                </div>\r\n                <div class=\"w-max-content schedule-today-btn p-0\" [style.right]=\"showYearPicker ? '195px' : '90px'\"\r\n                    *ngIf=\"showAddNewBtn\">\r\n                    <button nbButton ghost status=\"primary\" shape=\"round\" class=\"new-event-btn\"\r\n                        [nbTooltip]=\"addNewBtnTooltip\" (click)=\"onAddNewClick()\"\r\n                        [nbTooltipDisabled]=\"addNewBtnTooltip.length==0\">\r\n                        {{addNewBtnTitle}}\r\n                        <nb-icon pack=\"eva\" icon=\"plus-outline\"></nb-icon>\r\n                    </button>\r\n                </div>\r\n                <div class=\"w-max-content schedule-today-btn p-0\" [style.right]=\"showYearPicker ? '105px' : '0'\"\r\n                    *ngIf=\"showTodayBtn\">\r\n                    <button nbButton ghost status=\"primary\" shape=\"round\" (click)=\"goOnToday()\"\r\n                        [nbTooltip]=\"todayBtnTooltip\"\r\n                        [nbTooltipDisabled]=\"todayBtnTooltip.length==0\">{{todayBtnTitle}}</button>\r\n                </div>\r\n                <div class=\"w-max-content schedule-year p-0\" *ngIf=\"showYearPicker\">\r\n                    <nb-select [(selected)]=\"currentYear\" (selectedChange)=\"onYearSelectedChange()\">\r\n                        <nb-option *ngFor=\"let year of years\" [value]=\"year\">{{year}}</nb-option>\r\n                    </nb-select>\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"activeView==views.MONTH\">\r\n                <div class=\"w-100\">\r\n                    <div class=\"row m-0 schedule-week-day-names\">\r\n                        <div class=\"col d-flex justify-content-center h-100 day-names schedule-day\"\r\n                            *ngFor=\"let name of days\">\r\n                            {{name}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row m-0 schedule-week\" *ngFor=\"let week of weeks\"\r\n                        [style]=\"'height: '+ calculateWeekRowHeight(week)\">\r\n                        <div class=\"col p-0 h-100 schedule-day\" #container *ngFor=\"let day of week.days\"\r\n                            [ngClass]=\"day.today && markToday ? 'day-today':''\">\r\n                            <div class=\"day-content p-0 w-100 h-100\" (resized)=\"onDayResized(day, week)\"\r\n                                [ngClass]=\"day.isFromCurrentMonth ? '':'semi-transparent'\">\r\n                                <div class=\"schedule-day-date\">{{day.date | date:'dd'}}</div>\r\n                                <ng-container *ngFor=\"let event of day.events\">\r\n                                    <nb-tag class=\"schedule-event\" *ngIf=\"event.firstDayOfEvent\" [text]=\"event.title\"\r\n                                        (click)=\"onEventClick(event)\" [nbTooltip]=\"event.description ?? event.title\"\r\n                                        [nbTooltipDisabled]=\"event.description?.length==0\"\r\n                                        [status]=\"event.color ? event.color : 'basic'\"\r\n                                        [style.background-color]=\"eventTagAppereance=='outline'?hexToRgbA(event.color):event.color\"\r\n                                        [style.color]=\"eventTagAppereance=='outline' ? event.color:'inherit'\"\r\n                                        [style.border-color]=\"event.color\" [appearance]=\"eventTagAppereance\"\r\n                                        [style.min-width]=\"event.width\" [style.top]=\"event.top\">\r\n                                    </nb-tag>\r\n                                </ng-container>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"activeView==views.WEEK\" class=\"schedule-week-view\">\r\n                <div class=\"row m-0 w-100 week-header\">\r\n                    <div class=\"col-1 p-0 d-flex justify-content-center align-items-center\">\r\n                        <button nbButton ghost size=\"large\" shape=\"round\" style=\"height: max-content;\" class=\"mb-3\"\r\n                            (click)=\"toggleWeek(false)\" status=\"primary\">\r\n                            <nb-icon pack=\"eva\" icon=\"chevron-left-outline\"></nb-icon>\r\n                        </button>\r\n                    </div>\r\n                    <div class=\"col p-0\">\r\n                        <nb-flip-card [showToggleButton]=\"false\" class=\"week-card\" #weekFlipCard>\r\n                            <nb-card-front>\r\n                                <nb-card>\r\n                                    <nb-card-body>\r\n                                        <div class=\"row m-0 w-100\">\r\n                                            <div class=\"col p-0 d-flex justify-content-center align-items-center\"\r\n                                                *ngFor=\"let day of weeks[currentWeekIndex].days\">\r\n                                                <div>\r\n                                                    <div class=\"week-month-name\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-300':''\">\r\n                                                        {{formatDate(day.date, 'MMM')}}\r\n                                                    </div>\r\n                                                    <div class=\"week-date\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-500': !day.isFromCurrentMonth ? 'text-status-basic-600':''\">\r\n                                                        {{formatDate(day.date, 'dd')}}\r\n                                                    </div>\r\n                                                    <div class=\"week-day-name\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-300':''\">\r\n                                                        {{formatDate(day.date, 'EEE')}}\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </nb-card-body>\r\n                                </nb-card>\r\n                            </nb-card-front>\r\n                            <nb-card-back>\r\n                                <nb-card>\r\n                                    <nb-card-body>\r\n                                        <div class=\"row m-0 w-100\">\r\n                                            <div class=\"col p-0 d-flex justify-content-center align-items-center\"\r\n                                                *ngFor=\"let day of weeks[currentWeekIndex].days\">\r\n                                                <div>\r\n                                                    <div class=\"week-month-name\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-300':''\">\r\n                                                        {{formatDate(day.date, 'MMM')}}\r\n                                                    </div>\r\n                                                    <div class=\"week-date\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-500': !day.isFromCurrentMonth ? 'text-status-basic-600':''\">\r\n                                                        {{formatDate(day.date, 'dd')}}\r\n                                                    </div>\r\n                                                    <div class=\"week-day-name\"\r\n                                                        [ngClass]=\"day.today && markToday ? 'text-status-primary-300':''\">\r\n                                                        {{formatDate(day.date, 'EEE')}}\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </nb-card-body>\r\n                                </nb-card>\r\n                            </nb-card-back>\r\n                        </nb-flip-card>\r\n                    </div>\r\n                    <div class=\"col-1 p-0 d-flex justify-content-center align-items-center\">\r\n                        <button nbButton ghost size=\"large\" shape=\"round\" style=\"height: max-content;\" class=\"mb-3\"\r\n                            (click)=\"toggleWeek(true)\" status=\"primary\">\r\n                            <nb-icon pack=\"eva\" icon=\"chevron-right-outline\"></nb-icon>\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row m-0 schedule-week\"\r\n                    [style]=\"'height: '+ calculateWeekRowHeight(weeks[currentWeekIndex])\">\r\n                    <div class=\"col-1\"></div>\r\n                    <div class=\"col p-0 h-100 schedule-day\" style=\"border-top: none; border-bottom: none;\" #container\r\n                        *ngFor=\"let day of weeks[currentWeekIndex].days\"\r\n                        [ngClass]=\"day.today && markToday ? 'day-today':''\">\r\n                        <div class=\"day-content p-0 w-100 h-100\" (resized)=\"onDayResized(day, weeks[currentWeekIndex])\"\r\n                            [ngClass]=\"day.isFromCurrentMonth ? '':'semi-transparent'\">\r\n                            <ng-container *ngFor=\"let event of day.events\">\r\n                                <nb-tag class=\"schedule-event\" *ngIf=\"event.firstDayOfEvent\" [text]=\"event.title\"\r\n                                    (click)=\"onEventClick(event)\" [nbTooltip]=\"event.description ?? event.title\"\r\n                                    [nbTooltipDisabled]=\"event.description?.length==0\"\r\n                                    [status]=\"event.color ? event.color : 'basic'\"\r\n                                    [style.background-color]=\"eventTagAppereance=='outline'?hexToRgbA(event.color):event.color\"\r\n                                    [style.color]=\"eventTagAppereance=='outline' ? event.color:'inherit'\"\r\n                                    [style.border-color]=\"event.color\" [appearance]=\"eventTagAppereance\"\r\n                                    [style.min-width]=\"event.width\" [style.top]=\"event.top\">\r\n                                </nb-tag>\r\n                            </ng-container>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-1\"></div>\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"activeView==views.DAY\" class=\"schedule-day-view\">\r\n                <div class=\"row m-0 months-row\">\r\n                    <div class=\"col p-0 month-name\" *ngFor=\"let month of months\">\r\n                        <button *ngIf=\"month.key!=currentMonth\" nbButton ghost status=\"basic\" shape=\"round\"\r\n                            (click)=\"toggleMonthDay(month)\">{{month.shortName}}</button>\r\n                        <button *ngIf=\"month.key==currentMonth\" nbButton status=\"primary\"\r\n                            shape=\"round\">{{month.shortName}}</button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row ms-0 me-0 mb-0 mt-3 days-row\">\r\n                    <div class=\"col p-0 d-flex justify-content-center align-items-center\"\r\n                        *ngFor=\"let day of currentMonthDays\">\r\n                        <button *ngIf=\"day!=currentDay\" (click)=\"toggleDay(day)\" nbButton ghost size=\"small\"\r\n                            status=\"basic\" shape=\"round\">{{day}}</button>\r\n                        <button *ngIf=\"day==currentDay\" nbButton status=\"primary\" size=\"small\"\r\n                            shape=\"round\">{{day}}</button>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row ms-0 me-0 mb-0 mt-4 day-content w-100\">\r\n                    <div class=\"row m-0 w-100 d-flex\">\r\n                        <div class=\"day-name\">\r\n                            {{formatDate(currentScheduleDay.date, 'EEEE')}}\r\n                        </div>\r\n                        <div class=\"day-date\">\r\n                            {{formatDate(currentScheduleDay.date, 'dd')}}\r\n                        </div>\r\n                        <div class=\"day-month\">\r\n                            {{formatDate(currentScheduleDay.date, 'MMM')}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row ms-0 me-0 mb-0 mt-2 w-100\">\r\n                        <div *ngFor=\"let event of currentScheduleDay.events\" class=\"p-0\">\r\n                            <nb-alert class=\"mb-0 mt-2 day-event-alert\"\r\n                                [outline]=\"event.color ? convertToStatus(event.color):'basic'\"\r\n                                (click)=\"onEventClick(event)\" [ngClass]=\"'alert-status-'+event.color\"\r\n                                [style.border-color]=\"event.color\"\r\n                                [style.background-color]=\"event.color?convertToStatus(event.color)=='basic' ? hexToRgbA(event.color):'':'transparent'\">\r\n                                <div class=\"row m-0 w-100\">\r\n                                    <div style=\"width: 35px;\">\r\n                                        <nb-tag [status]=\"event.color ? event.color : 'basic'\" filled text=\"\"\r\n                                            class=\"p-0\" [style.min-height]=\"'100%'\" [style.width]=\"'5px'\"\r\n                                            [style.border-color]=\"event.color\"\r\n                                            [style.background-color]=\"event.color\"></nb-tag>\r\n                                    </div>\r\n                                    <div class=\"col p-0\">\r\n                                        <div class=\"row m-0 w-100\">\r\n                                            <div class=\"col-1 alert-label\" [style.color]=\"event.color\">\r\n                                                {{eventTitle}}\r\n                                            </div>\r\n                                            <div class=\"col\">\r\n                                                {{event.title}}\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row m-0 w-100\">\r\n                                            <div class=\"col-1 alert-label\" [style.color]=\"event.color\">\r\n                                                {{eventStart}}\r\n                                            </div>\r\n                                            <div class=\"col\">\r\n                                                {{formatDate(event.start, \"dd MMMM yyyy\")}}\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row m-0 w-100\">\r\n                                            <div class=\"col-1 alert-label\" [style.color]=\"event.color\">\r\n                                                {{eventEnd}}\r\n                                            </div>\r\n                                            <div class=\"col\">\r\n                                                {{formatDate(event.end, \"dd MMMM yyyy\")}}\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row m-0 w-100\" *ngIf=\"event.description\">\r\n                                            <div class=\"col-1 alert-label\" [style.color]=\"event.color\">\r\n                                                {{eventDescription}}\r\n                                            </div>\r\n                                            <div class=\"col\">\r\n                                                {{event.description}}\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </nb-alert>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </nb-card-body>\r\n    </nb-card>\r\n</div>", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .ngx-schedule{height:100%}:host .ngx-schedule nb-card{height:100%}:host .ngx-schedule nb-card-body{padding:1.5rem}:host .ngx-schedule .schedule-card{border-radius:1rem}:host .ngx-schedule .schedule-card .schedule-header{position:relative;display:flex;width:100%;justify-content:center;align-items:center;margin-bottom:1.5rem;margin-left:0;margin-right:0;margin-top:0;height:40px}:host .ngx-schedule .schedule-card .schedule-header .schedule-view{position:absolute;left:0}:host .ngx-schedule .schedule-card .schedule-header .schedule-view .button-container{padding:3px;background-color:var(--color-basic-transparent-200);border-radius:50px;display:flex}:host .ngx-schedule .schedule-card .schedule-header .schedule-view .button-container button.active-view{background-image:linear-gradient(to right,var(--color-basic-100),var(--color-basic-hover));color:var(--color-primary-500)}:host .ngx-schedule .schedule-card .schedule-header .schedule-year{position:absolute;right:0}:host .ngx-schedule .schedule-card .schedule-header .schedule-today-btn{position:absolute;top:0;right:0}:host .ngx-schedule .schedule-card .month-card{width:180px;margin-left:.5rem;margin-right:.5rem;height:40px}:host .ngx-schedule .schedule-card .month-card nb-card{border:none}:host .ngx-schedule .schedule-card .month-card nb-card nb-card-body{display:flex;justify-content:center;align-items:center;font-weight:600;padding:.5rem}:host .ngx-schedule .schedule-card .day-names{font-weight:600;padding-bottom:.5rem;padding-top:.5rem;padding-left:0;padding-right:0}:host .ngx-schedule .schedule-card .schedule-week .schedule-event{position:absolute;left:1px;z-index:300}:host .ngx-schedule .schedule-card .schedule-week .schedule-event:hover{cursor:pointer}:host .ngx-schedule .schedule-card .schedule-week .schedule-day{border:1px solid var(--color-basic-transparent-200);position:relative}:host .ngx-schedule .schedule-card .schedule-week .schedule-day .semi-transparent{opacity:.3}:host .ngx-schedule .schedule-card .schedule-week .schedule-day .day-content .schedule-day-date{width:max-content;padding-left:.5rem;padding-top:.5rem;font-weight:600}:host .ngx-schedule .schedule-card .schedule-week .schedule-day.day-today{border:1px solid var(--color-primary-500);position:relative}:host .ngx-schedule .schedule-card .schedule-week .schedule-day.day-today .schedule-day-date{color:var(--color-primary-500)}:host .ngx-schedule .schedule-card .schedule-week-day-names .schedule-day{border:1px solid var(--color-basic-transparent-200)}:host .ngx-schedule .schedule-card .schedule-week-view .week-header{height:max-content}:host .ngx-schedule .schedule-card .schedule-week-view .week-card nb-card-body{padding:0}:host .ngx-schedule .schedule-card .schedule-week-view .week-card nb-card{border:none;margin:0}:host .ngx-schedule .schedule-card .schedule-week-view .week-card .week-month-name{text-transform:capitalize;font-size:medium;color:var(--color-basic-600);width:100%;display:flex;justify-content:center}:host .ngx-schedule .schedule-card .schedule-week-view .week-card .week-date{font-size:xx-large;font-weight:600;width:100%;display:flex;justify-content:center;padding-top:1rem;padding-bottom:1rem}:host .ngx-schedule .schedule-card .schedule-week-view .week-card .week-day-name{padding-bottom:1rem;width:100%;display:flex;justify-content:center;text-transform:uppercase;font-size:medium;color:var(--color-basic-600)}:host .ngx-schedule .schedule-card .schedule-day-view .months-row .month-name{display:flex;align-items:center;justify-content:center}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .day-name{width:max-content;padding:0;font-size:xx-large;text-transform:capitalize;font-weight:600}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .day-date{width:max-content;padding:0;font-weight:600;padding-left:.5rem;padding-top:6px;height:100%;color:var(--color-basic-600)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .day-month{width:max-content;color:var(--color-basic-600);font-weight:600;padding:6px 0 0 2px}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-info{background-color:var(--tag-outline-info-background-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-info .alert-label{color:var(--tag-outline-info-text-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-danger{background-color:var(--tag-outline-danger-background-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-danger .alert-label{color:var(--tag-outline-danger-text-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-warning{background-color:var(--tag-outline-warning-background-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-warning .alert-label{color:var(--tag-outline-warning-text-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-success{background-color:var(--tag-outline-success-background-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-success .alert-label{color:var(--tag-outline-success-text-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-primary{background-color:var(--tag-outline-primary-background-color)}:host .ngx-schedule .schedule-card .schedule-day-view .day-content .alert-status-primary .alert-label{color:var(--tag-outline-primary-text-color)}:host .w-max-content{width:max-content}:host .text-status-primary-300{color:var(--color-primary-300)!important}:host .text-status-primary-500{color:var(--color-primary-500)!important}:host .text-status-basic-600{color:var(--color-basic-600)!important}:host .day-event-alert:hover{cursor:pointer}\n"] }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }, { type: i0.IterableDiffers }, { type: TranslationService }];
    }, propDecorators: { monthFlipCard: [{
                type: ViewChild,
                args: ['monthFlipCard']
            }], weekFlipCard: [{
                type: ViewChild,
                args: ['weekFlipCard']
            }], startYear: [{
                type: Input
            }], endYear: [{
                type: Input
            }], eventTagAppereance: [{
                type: Input
            }], events: [{
                type: Input
            }], startingMonth: [{
                type: Input
            }], startingYear: [{
                type: Input
            }], showYearPicker: [{
                type: Input
            }], markToday: [{
                type: Input
            }], nextMonthTooltip: [{
                type: Input
            }], previousMonthTooltip: [{
                type: Input
            }], todayBtnTitle: [{
                type: Input
            }], addNewBtnTitle: [{
                type: Input
            }], showTodayBtn: [{
                type: Input
            }], showAddNewBtn: [{
                type: Input
            }], addNewBtnTooltip: [{
                type: Input
            }], todayBtnTooltip: [{
                type: Input
            }], activeView: [{
                type: Input
            }], eventStart: [{
                type: Input
            }], eventEnd: [{
                type: Input
            }], eventTitle: [{
                type: Input
            }], eventDescription: [{
                type: Input
            }], yearSelectionChanged: [{
                type: Output
            }], monthSelectionChanged: [{
                type: Output
            }], daySelectionChanged: [{
                type: Output
            }], eventClicked: [{
                type: Output
            }], addNewClicked: [{
                type: Output
            }], todayClicked: [{
                type: Output
            }] } });

class ColorPickerComponent {
    constructor() {
        this.color = '#2889e9';
    }
    ngOnInit() { }
    ngOnDestroy() { }
}
ColorPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ColorPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ColorPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ColorPickerComponent, selector: "ngx-color-picker", ngImport: i0, template: "<ngx-colors\r\n  class=\"ngx-color-picker\"\r\n  ngx-colors-trigger\r\n  [(ngModel)]=\"color\"\r\n></ngx-colors>\r\n", styles: [""], dependencies: [{ kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i6.NgxColorsComponent, selector: "ngx-colors" }, { kind: "directive", type: i6.NgxColorsTriggerDirective, selector: "[ngx-colors-trigger]", inputs: ["colorsAnimation", "palette", "format", "formats", "position", "hideTextInput", "hideColorPicker", "attachTo", "overlayClassName", "colorPickerControls", "acceptLabel", "cancelLabel"], outputs: ["change", "input", "slider", "close", "open"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ColorPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-color-picker', template: "<ngx-colors\r\n  class=\"ngx-color-picker\"\r\n  ngx-colors-trigger\r\n  [(ngModel)]=\"color\"\r\n></ngx-colors>\r\n" }]
        }], ctorParameters: function () { return []; } });

class TextEditorComponent {
    constructor(translationService) {
        this.translationService = translationService;
        this._text = '';
        this.placeholder = this.translationService.translate('editorTypeText');
        this.textChange = new EventEmitter();
        this.config = {
            placeholder: this.placeholder,
            toolbar: [
                ['misc', ['codeview', 'undo', 'redo']],
                [
                    'font',
                    [
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'superscript',
                        'subscript',
                        'clear',
                    ],
                ],
                ['fontsize', ['fontsize']],
                ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
                ['insert', ['table', 'hr']],
            ],
            fontNames: ['Open Sans'],
        };
    }
    ngOnInit() {
        // check if translations are already loaded (from external app)
        if (!this.translationService.isTranslationsLoaded()) {
            this.translationService.setTranslations(strings);
        }
    }
    set text(value) {
        this._text = value;
        this.textChange.emit(this._text);
    }
    get text() {
        return this._text;
    }
}
TextEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TextEditorComponent, deps: [{ token: TranslationService }], target: i0.ɵɵFactoryTarget.Component });
TextEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TextEditorComponent, selector: "ngx-text-editor", inputs: { placeholder: "placeholder", text: "text" }, outputs: { textChange: "textChange" }, ngImport: i0, template: "<div class=\"ngx-text-editor\" [ngxSummernote]=\"config\" [(ngModel)]=\"text\"></div>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep ngx-text-editor{height:100%;display:block}:host .ngx-text-editor{height:100%}:host ::ng-deep button.note-btn{cursor:pointer;font-family:var(--button-text-font-family);font-weight:var(--button-text-font-weight);font-size:var(--text-button-tiny-font-size)!important;background-color:var(--button-ghost-background-color);border-color:var(--button-ghost-border-color);color:var(--button-ghost-basic-text-color);padding:var(--button-ghost-tiny-padding);border-radius:var(--button-rectangle-border-radius);text-transform:var(--button-ghost-text-transform)}:host ::ng-deep button.note-btn i{font-size:var(--button-tiny-icon-size)!important;font-weight:600}:host ::ng-deep button.note-btn:hover{background-color:var(--button-ghost-basic-hover-background-color);border-color:var(--button-ghost-basic-hover-border-color);color:var(--button-ghost-basic-text-color)}:host ::ng-deep button.note-btn.active{background-color:var(--button-ghost-basic-active-background-color);border-color:var(--button-ghost-basic-active-border-color);color:var(--button-ghost-basic-active-text-color);box-shadow:none}:host ::ng-deep div.note-toolbar{background-color:var(--input-basic-background-color);padding:var(--input-medium-padding);border-bottom:var(--input-border-width) var(--input-border-style) var(--input-basic-border-color);border-top-left-radius:var(--input-rectangle-border-radius);border-top-right-radius:var(--input-rectangle-border-radius);flex:0 1 max-content;overflow:visible}:host ::ng-deep .note-frame{border-radius:var(--input-rectangle-border-radius)}:host ::ng-deep .note-editor{border:var(--input-border-width) var(--input-border-style) var(--input-basic-border-color)!important;height:100%;flex-flow:column;display:flex}:host ::ng-deep .note-statusbar{background-color:var(--input-basic-background-color)!important;border-bottom-left-radius:var(--input-rectangle-border-radius)!important;border-bottom-right-radius:var(--input-rectangle-border-radius)!important;border-top:var(--input-border-width) var(--input-border-style) var(--input-basic-border-color)!important}:host ::ng-deep .note-codable{background-color:var(--card-background-color)!important;color:var(--card-text-color)!important;font-family:var(--card-text-font-family)!important}:host ::ng-deep .note-editing-area{flex:1 1 auto;overflow:auto!important}:host ::ng-deep table{color:var(--card-text-color)!important;font-family:var(--card-text-font-family)!important}:host ::ng-deep .note-editable{height:100%!important;color:var(--card-text-color)!important;font-family:var(--card-text-font-family)!important}:host ::ng-deep .note-editable ::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width)}:host ::ng-deep .note-editable ::-webkit-scrollbar-thumb{background:var(--scrollbar-color);border-radius:10px}:host ::ng-deep .note-editable ::-webkit-scrollbar-thumb:hover{background:var(--color-basic-500)}:host ::ng-deep .note-placeholder{color:var(--input-basic-placeholder-text-color);font-family:var(--input-placeholder-text-font-family);text-overflow:ellipsis;font-size:var(--input-medium-placeholder-text-font-size);font-weight:var(--input-medium-placeholder-text-font-weight);line-height:var(--input-medium-placeholder-text-line-height)}:host ::ng-deep .note-tooltip{background-color:var(--tooltip-background-color);border:var(--tooltip-border-width) var(--tooltip-border-style) var(--tooltip-border-color);border-radius:var(--tooltip-border-radius);color:var(--tooltip-text-color);font-family:var(--tooltip-text-font-family);font-size:var(--tooltip-text-font-size);font-weight:var(--tooltip-text-font-weight);line-height:var(--tooltip-text-line-height);max-width:var(--tooltip-max-width);box-shadow:var(--tooltip-shadow);padding:var(--tooltip-padding)}:host ::ng-deep .note-tooltip-content{background-color:var(--tooltip-background-color);padding:0;color:var(--tooltip-text-color);font-family:var(--tooltip-text-font-family);font-size:var(--tooltip-text-font-size);font-weight:var(--tooltip-text-font-weight);line-height:var(--tooltip-text-line-height)}:host ::ng-deep .note-tooltip-arrow{border-bottom-color:var(--tooltip-background-color)!important;top:-5px!important}:host ::ng-deep .note-dropdown-menu{padding:0!important;background-color:var(--option-list-background-color);border-color:var(--option-list-border-color);border-style:var(--option-list-border-style);border-width:var(--option-list-border-width);border-radius:var(--option-list-border-radius);box-shadow:var(--option-list-shadow);border-top:var(--option-list-adjacent-border-width) var(--option-list-adjacent-border-style) var(--option-list-adjacent-border-color);min-width:180px!important;margin-top:.3rem}:host ::ng-deep .note-dropdown-menu .note-btn-group{padding:var(--option-medium-padding)}:host ::ng-deep .note-dropdown-item{font-size:var(--option-medium-text-font-size);font-weight:var(--option-medium-text-font-weight);line-height:var(--option-medium-text-line-height);padding:var(--option-medium-padding);color:var(--option-text-color)}:host ::ng-deep .note-dropdown-item .note-icon-menu-check{display:none}:host ::ng-deep .note-dropdown-item:hover{background-color:var(--option-hover-background-color);color:var(--option-hover-text-color)}:host ::ng-deep .note-dropdown-item.checked{background-color:var(--option-selected-background-color);color:var(--option-selected-text-color)}\n"], dependencies: [{ kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.NgxSummernoteDirective, selector: "[ngxSummernote]", inputs: ["ngxSummernote", "summernoteModel", "ngxSummernoteDisabled"], outputs: ["summernoteModelChange", "imageUpload", "mediaDelete", "blur"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TextEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-text-editor', template: "<div class=\"ngx-text-editor\" [ngxSummernote]=\"config\" [(ngModel)]=\"text\"></div>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep ngx-text-editor{height:100%;display:block}:host .ngx-text-editor{height:100%}:host ::ng-deep button.note-btn{cursor:pointer;font-family:var(--button-text-font-family);font-weight:var(--button-text-font-weight);font-size:var(--text-button-tiny-font-size)!important;background-color:var(--button-ghost-background-color);border-color:var(--button-ghost-border-color);color:var(--button-ghost-basic-text-color);padding:var(--button-ghost-tiny-padding);border-radius:var(--button-rectangle-border-radius);text-transform:var(--button-ghost-text-transform)}:host ::ng-deep button.note-btn i{font-size:var(--button-tiny-icon-size)!important;font-weight:600}:host ::ng-deep button.note-btn:hover{background-color:var(--button-ghost-basic-hover-background-color);border-color:var(--button-ghost-basic-hover-border-color);color:var(--button-ghost-basic-text-color)}:host ::ng-deep button.note-btn.active{background-color:var(--button-ghost-basic-active-background-color);border-color:var(--button-ghost-basic-active-border-color);color:var(--button-ghost-basic-active-text-color);box-shadow:none}:host ::ng-deep div.note-toolbar{background-color:var(--input-basic-background-color);padding:var(--input-medium-padding);border-bottom:var(--input-border-width) var(--input-border-style) var(--input-basic-border-color);border-top-left-radius:var(--input-rectangle-border-radius);border-top-right-radius:var(--input-rectangle-border-radius);flex:0 1 max-content;overflow:visible}:host ::ng-deep .note-frame{border-radius:var(--input-rectangle-border-radius)}:host ::ng-deep .note-editor{border:var(--input-border-width) var(--input-border-style) var(--input-basic-border-color)!important;height:100%;flex-flow:column;display:flex}:host ::ng-deep .note-statusbar{background-color:var(--input-basic-background-color)!important;border-bottom-left-radius:var(--input-rectangle-border-radius)!important;border-bottom-right-radius:var(--input-rectangle-border-radius)!important;border-top:var(--input-border-width) var(--input-border-style) var(--input-basic-border-color)!important}:host ::ng-deep .note-codable{background-color:var(--card-background-color)!important;color:var(--card-text-color)!important;font-family:var(--card-text-font-family)!important}:host ::ng-deep .note-editing-area{flex:1 1 auto;overflow:auto!important}:host ::ng-deep table{color:var(--card-text-color)!important;font-family:var(--card-text-font-family)!important}:host ::ng-deep .note-editable{height:100%!important;color:var(--card-text-color)!important;font-family:var(--card-text-font-family)!important}:host ::ng-deep .note-editable ::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width)}:host ::ng-deep .note-editable ::-webkit-scrollbar-thumb{background:var(--scrollbar-color);border-radius:10px}:host ::ng-deep .note-editable ::-webkit-scrollbar-thumb:hover{background:var(--color-basic-500)}:host ::ng-deep .note-placeholder{color:var(--input-basic-placeholder-text-color);font-family:var(--input-placeholder-text-font-family);text-overflow:ellipsis;font-size:var(--input-medium-placeholder-text-font-size);font-weight:var(--input-medium-placeholder-text-font-weight);line-height:var(--input-medium-placeholder-text-line-height)}:host ::ng-deep .note-tooltip{background-color:var(--tooltip-background-color);border:var(--tooltip-border-width) var(--tooltip-border-style) var(--tooltip-border-color);border-radius:var(--tooltip-border-radius);color:var(--tooltip-text-color);font-family:var(--tooltip-text-font-family);font-size:var(--tooltip-text-font-size);font-weight:var(--tooltip-text-font-weight);line-height:var(--tooltip-text-line-height);max-width:var(--tooltip-max-width);box-shadow:var(--tooltip-shadow);padding:var(--tooltip-padding)}:host ::ng-deep .note-tooltip-content{background-color:var(--tooltip-background-color);padding:0;color:var(--tooltip-text-color);font-family:var(--tooltip-text-font-family);font-size:var(--tooltip-text-font-size);font-weight:var(--tooltip-text-font-weight);line-height:var(--tooltip-text-line-height)}:host ::ng-deep .note-tooltip-arrow{border-bottom-color:var(--tooltip-background-color)!important;top:-5px!important}:host ::ng-deep .note-dropdown-menu{padding:0!important;background-color:var(--option-list-background-color);border-color:var(--option-list-border-color);border-style:var(--option-list-border-style);border-width:var(--option-list-border-width);border-radius:var(--option-list-border-radius);box-shadow:var(--option-list-shadow);border-top:var(--option-list-adjacent-border-width) var(--option-list-adjacent-border-style) var(--option-list-adjacent-border-color);min-width:180px!important;margin-top:.3rem}:host ::ng-deep .note-dropdown-menu .note-btn-group{padding:var(--option-medium-padding)}:host ::ng-deep .note-dropdown-item{font-size:var(--option-medium-text-font-size);font-weight:var(--option-medium-text-font-weight);line-height:var(--option-medium-text-line-height);padding:var(--option-medium-padding);color:var(--option-text-color)}:host ::ng-deep .note-dropdown-item .note-icon-menu-check{display:none}:host ::ng-deep .note-dropdown-item:hover{background-color:var(--option-hover-background-color);color:var(--option-hover-text-color)}:host ::ng-deep .note-dropdown-item.checked{background-color:var(--option-selected-background-color);color:var(--option-selected-text-color)}\n"] }]
        }], ctorParameters: function () { return [{ type: TranslationService }]; }, propDecorators: { placeholder: [{
                type: Input
            }], text: [{
                type: Input
            }], textChange: [{
                type: Output
            }] } });

class SharedComponentsModule {
}
SharedComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SharedComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsModule, declarations: [SharedComponentsComponent,
        TestViewComponent,
        FilepickerComponent,
        BytePipe,
        FileCardComponent,
        ProgressbarSpinnerComponent,
        TagsAutocompleteComponent,
        SelectGridComponent,
        ScheduleComponent,
        ResizedDirective,
        GridComponent,
        CellDisplayComponent,
        ColumnFilterComponent,
        CellEditComponent,
        PopupComponent,
        GridPdfExportComponent,
        GridExcelExportComponent,
        DeletePopupComponent,
        ColorPickerComponent,
        TagComponent,
        TextEditorComponent,
        SelectGridPopoverComponent,
        GridFooterComponent,
        GridToolbarComponent], imports: [NbTagModule,
        NbButtonModule,
        NbLayoutModule, i1.NbThemeModule, NbIconModule,
        NbTooltipModule,
        CommonModule,
        NbCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        NbSpinnerModule,
        NbSelectModule,
        NbProgressBarModule,
        NbActionsModule,
        NbToggleModule,
        NbDatepickerModule,
        NbInputModule,
        NbFormFieldModule, i2.NbDateFnsDateModule, i1.NbTimepickerModule, NbUserModule, i1.NbWindowModule, i1.NbDialogModule, NbCardModule,
        NbContextMenuModule,
        NbPopoverModule,
        NbAutocompleteModule,
        NbAccordionModule,
        NbAlertModule,
        NgxPaginationModule,
        NbButtonGroupModule,
        NgxColorsModule,
        NgxSummernoteModule], exports: [SharedComponentsComponent,
        TestViewComponent,
        FilepickerComponent,
        FileCardComponent,
        ProgressbarSpinnerComponent,
        TagsAutocompleteComponent,
        SelectGridComponent,
        ScheduleComponent,
        ResizedDirective,
        GridComponent,
        ColorPickerComponent,
        TagComponent,
        TextEditorComponent] });
SharedComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsModule, imports: [NbTagModule,
        NbButtonModule,
        NbLayoutModule,
        NbThemeModule.forRoot(),
        NbIconModule,
        NbTooltipModule,
        CommonModule,
        NbCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        NbSpinnerModule,
        NbSelectModule,
        NbProgressBarModule,
        NbActionsModule,
        NbToggleModule,
        NbDatepickerModule,
        NbInputModule,
        NbFormFieldModule,
        NbDateFnsDateModule.forRoot({
            format: 'dd.MM.yyyy.',
        }),
        NbTimepickerModule.forRoot({ format: 'HH:mm' }),
        NbUserModule,
        NbWindowModule.forChild(),
        NbDialogModule.forChild(),
        NbCardModule,
        NbContextMenuModule,
        NbPopoverModule,
        NbAutocompleteModule,
        NbAccordionModule,
        NbAlertModule,
        NgxPaginationModule,
        NbButtonGroupModule,
        NgxColorsModule,
        NgxSummernoteModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SharedComponentsComponent,
                        TestViewComponent,
                        FilepickerComponent,
                        BytePipe,
                        FileCardComponent,
                        ProgressbarSpinnerComponent,
                        TagsAutocompleteComponent,
                        SelectGridComponent,
                        ScheduleComponent,
                        ResizedDirective,
                        GridComponent,
                        CellDisplayComponent,
                        ColumnFilterComponent,
                        CellEditComponent,
                        PopupComponent,
                        GridPdfExportComponent,
                        GridExcelExportComponent,
                        DeletePopupComponent,
                        ColorPickerComponent,
                        TagComponent,
                        TextEditorComponent,
                        SelectGridPopoverComponent,
                        GridFooterComponent,
                        GridToolbarComponent,
                    ],
                    imports: [
                        NbTagModule,
                        NbButtonModule,
                        NbLayoutModule,
                        NbThemeModule.forRoot(),
                        NbIconModule,
                        NbTooltipModule,
                        CommonModule,
                        NbCheckboxModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NbSpinnerModule,
                        NbSelectModule,
                        NbProgressBarModule,
                        NbActionsModule,
                        NbToggleModule,
                        NbDatepickerModule,
                        NbInputModule,
                        NbFormFieldModule,
                        NbDateFnsDateModule.forRoot({
                            format: 'dd.MM.yyyy.',
                        }),
                        NbTimepickerModule.forRoot({ format: 'HH:mm' }),
                        NbUserModule,
                        NbWindowModule.forChild(),
                        NbDialogModule.forChild(),
                        NbCardModule,
                        NbContextMenuModule,
                        NbPopoverModule,
                        NbAutocompleteModule,
                        NbAccordionModule,
                        NbAlertModule,
                        NgxPaginationModule,
                        NbButtonGroupModule,
                        NgxColorsModule,
                        NgxSummernoteModule,
                    ],
                    exports: [
                        SharedComponentsComponent,
                        TestViewComponent,
                        FilepickerComponent,
                        FileCardComponent,
                        ProgressbarSpinnerComponent,
                        TagsAutocompleteComponent,
                        SelectGridComponent,
                        ScheduleComponent,
                        ResizedDirective,
                        GridComponent,
                        ColorPickerComponent,
                        TagComponent,
                        TextEditorComponent,
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BytePipe, ColorPickerComponent, FILE_CARD_MODE, FILE_MENU_CODES, FileCardComponent, FilepickerComponent, GRID_ACTIONS_POSITION, GRID_BUTTON_TYPE, GRID_DATA_TYPE, GRID_DATE_PICKER, GRID_MENU_ACTION, GRID_MODE, GRID_SORT, GRID_STATE, GridActionsEditor, GridAutocompleteEditor, GridButtonType, GridButtonsColumn, GridCheckboxColumn, GridCheckboxEditor, GridCheckboxFilter, GridColorpickerColumn, GridColorpickerEditor, GridColumn, GridColumnEditor, GridColumnFilter, GridColumnType, GridComponent, GridDateColumn, GridDateRangeColumn, GridDateboxEditor, GridDateboxFilter, GridLookupColumn, GridNumberBoxEditor, GridNumberBoxFilter, GridNumberColumn, GridProgressbarColumn, GridSelectEditor, GridSelectFilter, GridTagColumn, GridTextAreaEditor, GridTextColumn, GridTextboxEditor, GridTextboxFilter, GridToggleColumn, GridToggleEditor, GridToggleFilter, ProgressbarSpinnerComponent, ResizedDirective, ResizedEvent, SCHEDULE_VIEW, SPECIAL_EDITOR_TYPES, SPECIAL_FILTER_TYPES, ScheduleComponent, SelectGridComponent, SharedComponentsComponent, SharedComponentsModule, SharedComponentsService, TABLE_ACTIONS_POSITION, TABLE_MODE, TABLE_SOURCE_TYPES, TABLE_SPECIAL_TYPES, TagComponent, TagsAutocompleteComponent, TestViewComponent, TextEditorComponent, TranslationService, base64ToArrayBuffer, fileDownload, makeId, popupCenter, previewFile, pushToArrayAtIndexRange, stringIsEmpty, strings };
//# sourceMappingURL=shared-components.mjs.map
