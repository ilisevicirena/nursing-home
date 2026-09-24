import { Component, EventEmitter, HostBinding, HostListener, Input, Output, Pipe, ViewChild, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { getError } from '../resources/error-codes';
import { FILE_SIZES } from '../resources/defaults';
import * as i0 from "@angular/core";
import * as i1 from "../resources/translation.service";
import * as i2 from "@nebular/theme";
import * as i3 from "@angular/common";
export class FilepickerComponent {
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
        return !this.files?.length;
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
        if (fileList?.length) {
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
                if (files?.length) {
                    this.addFiles(files);
                }
                this._onTouched();
            });
        }
    }
    open() {
        if (!this.disabled) {
            this.fileInputEl?.nativeElement.click();
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
FilepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FilepickerComponent, deps: [{ token: i1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
FilepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: FilepickerComponent, selector: "ngx-filepicker", inputs: { disabled: "disabled", multiple: "multiple", displayFileSize: "displayFileSize", maxFiles: "maxFiles", showAcceptedFormats: "showAcceptedFormats", showMaxFilesNumber: "showMaxFilesNumber", accept: "accept", emptyPlaceholder: "emptyPlaceholder", buttonPlaceholder: "buttonPlaceholder", maxFilesPlaceholder: "maxFilesPlaceholder", allowedFilesPlaceholder: "allowedFilesPlaceholder", maxFilesWarningMessage: "maxFilesWarningMessage" }, outputs: { valueChanged: "valueChanged" }, host: { listeners: { "change": "change($event)", "dragenter": "activate($event)", "dragover": "activate($event)", "dragleave": "deactivate($event)", "drop": "handleDrop($event)", "click": "open()" }, properties: { "class.disabled": "this.disabled", "class.empty-input": "this.isEmpty" } }, viewQueries: [{ propertyName: "fileInputEl", first: true, predicate: ["fileInputEl"], descendants: true }], ngImport: i0, template: "<div class=\"placeholder-filepicker file-formats\" *ngIf=\"showAcceptedFormats || showMaxFilesNumber; else noFormat\">\n    <div *ngIf=\"showAcceptedFormats\">{{allowedFilesPlaceholder}} {{accept}}</div>\n    <div *ngIf=\"showMaxFilesNumber\">{{maxFilesPlaceholder}} {{maxFiles}}\n    </div>\n</div>\n<ng-template #noFormat>\n    <div class=\"placeholder-filepicker file-formats\">&nbsp;</div>\n</ng-template>\n<nb-tag-list *ngIf=\"files.length\">\n    <nb-tag nbTooltip={{file.size|byte}} nbTooltipPosition=\"top\" [nbTooltipDisabled]=\"displayFileSize\"\n        *ngFor=\"let file of files\" [removable]=\"!disabled\" [text]=\"getFileName(file)\" status=\"primary\"\n        appearance=\"filled\" (remove)=\"removeFile(file)\">\n    </nb-tag>\n</nb-tag-list>\n<div class=\"placeholder-filepicker text-center\" *ngIf=\"!files.length\">{{emptyPlaceholder}}<br><button type=\"button\"\n        [disabled]=\"disabled\" style=\"margin-top: 0.5rem; text-transform: none;\" nbButton size=\"small\" shape=\"round\"\n        status=\"primary\">{{buttonPlaceholder}}<nb-icon pack=\"eva\" icon=\"cloud-upload-outline\" nbSuffix>\n        </nb-icon>\n    </button>\n</div>\n<div class=\"placeholder-filepicker maxFiles\" *ngIf=\"files.length>=maxFiles!\">\n    <nb-icon status=\"danger\" pack=\"eva\" icon=\"alert-circle-outline\"></nb-icon>\n    {{maxFilesWarningMessage}} ({{maxFiles}}).\n</div>\n<input #fileInputEl class=\"hidden\" #fileInput name=\"filecontrol\" type=\"file\" [attr.multiple]=\"multiple? '' : null\"\n    [attr.accept]=\"accept\">", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */input{width:0px;height:0px;opacity:0;overflow:hidden;position:absolute;z-index:-1}:host{display:block;border:2px dashed;border-radius:1rem;min-height:9rem;max-width:100%;padding:.7rem;cursor:pointer}:host.disabled{opacity:.5;cursor:unset}:host .placeholder-filepicker{color:var(--color-primary-500);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .placeholder-filepicker.maxFiles{color:var(--color-basic-600);margin-top:.5rem;padding:.5rem;font-size:smaller}:host .placeholder-filepicker.file-formats{color:var(--color-basic-600);padding:.5rem;font-size:smaller}nb-tag{max-width:100%;text-transform:none}\n"], dependencies: [{ kind: "component", type: i0.forwardRef(function () { return i2.NbTagComponent; }), selector: "nb-tag", inputs: ["text", "selected", "removable", "appearance", "status", "size", "role"], outputs: ["remove", "selectedChange"], exportAs: ["nbTag"] }, { kind: "component", type: i0.forwardRef(function () { return i2.NbTagListComponent; }), selector: "nb-tag-list", inputs: ["size", "tabIndex", "role", "multiple"], outputs: ["tagRemove"], exportAs: ["nbTagList"] }, { kind: "component", type: i0.forwardRef(function () { return i2.NbButtonComponent; }), selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i0.forwardRef(function () { return i2.NbIconComponent; }), selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NbTooltipDirective; }), selector: "[nbTooltip]", inputs: ["nbTooltip", "nbTooltipPlacement", "nbTooltipAdjustment", "nbTooltipClass", "nbTooltipIcon", "nbTooltipStatus", "nbTooltipTrigger", "nbTooltipOffset", "nbTooltipDisabled"], outputs: ["nbTooltipShowStateChange"], exportAs: ["nbTooltip"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NbSuffixDirective; }), selector: "[nbSuffix]" }, { kind: "pipe", type: i0.forwardRef(function () { return BytePipe; }), name: "byte" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FilepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-filepicker', template: "<div class=\"placeholder-filepicker file-formats\" *ngIf=\"showAcceptedFormats || showMaxFilesNumber; else noFormat\">\n    <div *ngIf=\"showAcceptedFormats\">{{allowedFilesPlaceholder}} {{accept}}</div>\n    <div *ngIf=\"showMaxFilesNumber\">{{maxFilesPlaceholder}} {{maxFiles}}\n    </div>\n</div>\n<ng-template #noFormat>\n    <div class=\"placeholder-filepicker file-formats\">&nbsp;</div>\n</ng-template>\n<nb-tag-list *ngIf=\"files.length\">\n    <nb-tag nbTooltip={{file.size|byte}} nbTooltipPosition=\"top\" [nbTooltipDisabled]=\"displayFileSize\"\n        *ngFor=\"let file of files\" [removable]=\"!disabled\" [text]=\"getFileName(file)\" status=\"primary\"\n        appearance=\"filled\" (remove)=\"removeFile(file)\">\n    </nb-tag>\n</nb-tag-list>\n<div class=\"placeholder-filepicker text-center\" *ngIf=\"!files.length\">{{emptyPlaceholder}}<br><button type=\"button\"\n        [disabled]=\"disabled\" style=\"margin-top: 0.5rem; text-transform: none;\" nbButton size=\"small\" shape=\"round\"\n        status=\"primary\">{{buttonPlaceholder}}<nb-icon pack=\"eva\" icon=\"cloud-upload-outline\" nbSuffix>\n        </nb-icon>\n    </button>\n</div>\n<div class=\"placeholder-filepicker maxFiles\" *ngIf=\"files.length>=maxFiles!\">\n    <nb-icon status=\"danger\" pack=\"eva\" icon=\"alert-circle-outline\"></nb-icon>\n    {{maxFilesWarningMessage}} ({{maxFiles}}).\n</div>\n<input #fileInputEl class=\"hidden\" #fileInput name=\"filecontrol\" type=\"file\" [attr.multiple]=\"multiple? '' : null\"\n    [attr.accept]=\"accept\">", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */input{width:0px;height:0px;opacity:0;overflow:hidden;position:absolute;z-index:-1}:host{display:block;border:2px dashed;border-radius:1rem;min-height:9rem;max-width:100%;padding:.7rem;cursor:pointer}:host.disabled{opacity:.5;cursor:unset}:host .placeholder-filepicker{color:var(--color-primary-500);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .placeholder-filepicker.maxFiles{color:var(--color-basic-600);margin-top:.5rem;padding:.5rem;font-size:smaller}:host .placeholder-filepicker.file-formats{color:var(--color-basic-600);padding:.5rem;font-size:smaller}nb-tag{max-width:100%;text-transform:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }]; }, propDecorators: { disabled: [{
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
export class BytePipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zaGFyZWQtY29tcG9uZW50cy9zcmMvbGliL2ZpbGVwaWNrZXIvZmlsZXBpY2tlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zaGFyZWQtY29tcG9uZW50cy9zcmMvbGliL2ZpbGVwaWNrZXIvZmlsZXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sSUFBSSxFQUVKLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQVFuRCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQW9CLG1CQUF1QztRQUF2Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBZ0NwRCxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBb0NyQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFLekMsV0FBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVqRSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRTFCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFVCxxQkFBZ0IsR0FDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRS9DLHNCQUFpQixHQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGtCQUFrQixD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LEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUyxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYSxFQUFFLFFBQVEsR0FBRyxDQUFDO1FBQ3JDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNmLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQ0QsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2YsTUFBTSxFQUFFLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDdkMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEQsT0FBTyxVQUFVLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7O3NHQXBCVSxRQUFRO29HQUFSLFFBQVE7NEZBQVIsUUFBUTtrQkFIcEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsTUFBTTtpQkFDYiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgZ2V0RXJyb3IgfSBmcm9tICcuLi9yZXNvdXJjZXMvZXJyb3ItY29kZXMnO1xuaW1wb3J0IHsgRklMRV9TSVpFUyB9IGZyb20gJy4uL3Jlc291cmNlcy9kZWZhdWx0cyc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9yZXNvdXJjZXMvdHJhbnNsYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1maWxlcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWxlcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90cmFuc2xhdGlvblNlcnZpY2U6IFRyYW5zbGF0aW9uU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIGdldCBtdWx0aXBsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheUZpbGVTaXplKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzcGxheUZpbGVTaXplID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBnZXQgZGlzcGxheUZpbGVTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5RmlsZVNpemU7XG4gIH1cblxuICBnZXQgZmlsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVzO1xuICB9XG5cbiAgcHVibGljIGZpbGVDb3VudDogbnVtYmVyID0gMDtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgbWF4RmlsZXM/OiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgc2V0IHNob3dBY2NlcHRlZEZvcm1hdHModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93QWNjZXB0ZWRGb3JtYXRzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBnZXQgc2hvd0FjY2VwdGVkRm9ybWF0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0FjY2VwdGVkRm9ybWF0cztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBzaG93TWF4RmlsZXNOdW1iZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93TWF4RmlsZXNOdW1iZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIGdldCBzaG93TWF4RmlsZXNOdW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dNYXhGaWxlc051bWJlcjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZW1wdHktaW5wdXQnKVxuICBnZXQgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gIXRoaXMuZmlsZXM/Lmxlbmd0aDtcbiAgfVxuXG4gIGdldCBpc0RyYWdvdmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0RyYWdPdmVyO1xuICB9XG4gIHNldCBpc0RyYWdvdmVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9pc0RyYWdPdmVyID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgpXG4gIHByaXZhdGUgdmFsdWVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG5cbiAgQFZpZXdDaGlsZCgnZmlsZUlucHV0RWwnKVxuICBwcml2YXRlIGZpbGVJbnB1dEVsPzogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBhY2NlcHQgPSB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdmaWxlcGlja2VyQWNjZXB0Jyk7XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBfbXVsdGlwbGUgPSBmYWxzZTtcblxuICBASW5wdXQoKSBlbXB0eVBsYWNlaG9sZGVyID1cbiAgICB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdmaWxlcGlja2VyRW1wdHknKTtcblxuICBASW5wdXQoKSBidXR0b25QbGFjZWhvbGRlciA9XG4gICAgdGhpcy5fdHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZSgnZmlsZXBpY2tlckJ1dHRvbicpO1xuXG4gIEBJbnB1dCgpIG1heEZpbGVzUGxhY2Vob2xkZXIgPVxuICAgIHRoaXMuX3RyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2ZpbGVwaWNrZXJNYXhGaWxlcycpO1xuXG4gIEBJbnB1dCgpIGFsbG93ZWRGaWxlc1BsYWNlaG9sZGVyID0gdGhpcy5fdHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZShcbiAgICAnZmlsZXBpY2tlckFsbG93ZWRGaWxlcydcbiAgKTtcblxuICBASW5wdXQoKSBtYXhGaWxlc1dhcm5pbmdNZXNzYWdlID0gdGhpcy5fdHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZShcbiAgICAnZmlsZXBpY2tlck1heEZpbGVzV2FybmluZydcbiAgKTtcblxuICBwcml2YXRlIF9kaXNwbGF5RmlsZVNpemUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2hvd0FjY2VwdGVkRm9ybWF0cyA9IGZhbHNlO1xuICBwcml2YXRlIF9zaG93TWF4RmlsZXNOdW1iZXIgPSBmYWxzZTtcblxuICBwcml2YXRlIF9maWxlczogRmlsZVtdID0gW107XG4gIHByaXZhdGUgX2lzRHJhZ092ZXIgPSBmYWxzZTtcblxuICBwcml2YXRlIF9vbkNoYW5nZSA9ICh2YWw6IEZpbGVbXSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHdyaXRlVmFsdWUoZmlsZXM6IEZpbGVbXSk6IHZvaWQge1xuICAgIGNvbnN0IGZpbGVBcnJheSA9IHRoaXMuY29udmVydFRvQXJyYXkoZmlsZXMpO1xuICAgIGlmIChmaWxlQXJyYXkubGVuZ3RoIDwgMiB8fCB0aGlzLm11bHRpcGxlKSB7XG4gICAgICBpZiAodGhpcy5tYXhGaWxlcykge1xuICAgICAgICBpZiAoZmlsZUFycmF5Lmxlbmd0aCA8PSB0aGlzLm1heEZpbGVzKSB7XG4gICAgICAgICAgdGhpcy5fZmlsZXMgPSBmaWxlQXJyYXk7XG4gICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlcyh0aGlzLl9maWxlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZpbGVzID0gZmlsZUFycmF5O1xuICAgICAgICB0aGlzLmVtaXRDaGFuZ2VzKHRoaXMuX2ZpbGVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoZ2V0RXJyb3IoMTAyKSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdENoYW5nZXMoZmlsZXM6IEZpbGVbXSkge1xuICAgIHRoaXMudmFsdWVDaGFuZ2VkLmVtaXQoZmlsZXMpO1xuICAgIHRoaXMuX29uQ2hhbmdlKGZpbGVzKTtcbiAgfVxuXG4gIGFkZEZpbGVzKGZpbGVzOiBGaWxlW10gfCBGaWxlTGlzdCB8IEZpbGUpIHtcbiAgICBjb25zdCBmaWxlQXJyYXkgPSB0aGlzLmNvbnZlcnRUb0FycmF5KGZpbGVzKTtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgY29uc3QgbWVyZ2VkID0gdGhpcy5maWxlcy5jb25jYXQoZmlsZUFycmF5KTtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZShtZXJnZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndyaXRlVmFsdWUoZmlsZUFycmF5KTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGU6IEZpbGUpIHtcbiAgICBjb25zdCBmaWxlSW5kZXggPSB0aGlzLmZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgaWYgKGZpbGVJbmRleCA+PSAwKSB7XG4gICAgICBjb25zdCBjdXJyZW50RmlsZXMgPSB0aGlzLmZpbGVzLnNsaWNlKCk7XG4gICAgICBjdXJyZW50RmlsZXMuc3BsaWNlKGZpbGVJbmRleCwgMSk7XG4gICAgICB0aGlzLndyaXRlVmFsdWUoY3VycmVudEZpbGVzKTtcbiAgICB9XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLndyaXRlVmFsdWUoW10pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQnXSlcbiAgY2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIGNvbnN0IGZpbGVMaXN0OiBGaWxlTGlzdCB8IG51bGwgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmZpbGVzO1xuICAgIGlmIChmaWxlTGlzdD8ubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFkZEZpbGVzKGZpbGVMaXN0KTtcbiAgICB9XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9ICcnO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VudGVyJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBhY3RpdmF0ZShlOiBhbnkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5pc0RyYWdvdmVyID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gIGRlYWN0aXZhdGUoZTogYW55KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuaXNEcmFnb3ZlciA9IGZhbHNlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIGhhbmRsZURyb3AoZTogYW55KSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlKGUpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgY29uc3QgZmlsZUxpc3QgPSBlLmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICAgIHRoaXMucmVtb3ZlRGlyZWN0b3JpZXMoZmlsZUxpc3QpLnRoZW4oKGZpbGVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGZpbGVzPy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmFkZEZpbGVzKGZpbGVzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb3BlbigpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZmlsZUlucHV0RWw/Lm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZURpcmVjdG9yaWVzKGZpbGVzOiBGaWxlTGlzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBmaWxlQXJyYXkgPSB0aGlzLmNvbnZlcnRUb0FycmF5KGZpbGVzKTtcbiAgICAgIGNvbnN0IGRpcm5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgY29uc3QgcmVhZGVyTGlzdCA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgZGlybmFtZXMucHVzaChmaWxlQXJyYXlbaV0ubmFtZSk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiBhZGRUb1JlYWRlckxpc3QoaSk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlQXJyYXlbaV0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRUb1JlYWRlckxpc3QodmFsOiBudW1iZXIpIHtcbiAgICAgICAgcmVhZGVyTGlzdC5wdXNoKHZhbCk7XG4gICAgICAgIGlmIChyZWFkZXJMaXN0Lmxlbmd0aCA9PT0gZmlsZUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICBmaWxlQXJyYXkuZmlsdGVyKChmaWxlOiBGaWxlKSA9PiAhZGlybmFtZXMuaW5jbHVkZXMoZmlsZS5uYW1lKSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRUb0FycmF5KFxuICAgIGZpbGVzOiBGaWxlTGlzdCB8IEZpbGVbXSB8IEZpbGUgfCBudWxsIHwgdW5kZWZpbmVkXG4gICk6IEZpbGVbXSB7XG4gICAgaWYgKGZpbGVzKSB7XG4gICAgICBpZiAoZmlsZXMgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICAgIHJldHVybiBbZmlsZXNdO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGZpbGVzKSkge1xuICAgICAgICByZXR1cm4gZmlsZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZmlsZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRGaWxlTmFtZShmaWxlOiBGaWxlKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuX2Rpc3BsYXlGaWxlU2l6ZSkge1xuICAgICAgcmV0dXJuIGZpbGUubmFtZTtcbiAgICB9XG4gICAgY29uc3Qgc2l6ZSA9IG5ldyBCeXRlUGlwZSgpLnRyYW5zZm9ybShmaWxlLnNpemUpO1xuICAgIHJldHVybiBgJHtmaWxlLm5hbWV9ICgke3NpemV9KWA7XG4gIH1cbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnYnl0ZScsXG59KVxuZXhwb3J0IGNsYXNzIEJ5dGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHByaXZhdGUgdW5pdCA9ICdCeXRlcyc7XG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBkZWNpbWFscz86IG51bWJlciB8IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgIGlmIChwYXJzZUludCh2YWx1ZSwgMTApID49IDApIHtcbiAgICAgIHZhbHVlID0gdGhpcy5mb3JtYXRCeXRlcygrdmFsdWUsICtkZWNpbWFscyEpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBmb3JtYXRCeXRlcyhieXRlczogbnVtYmVyLCBkZWNpbWFscyA9IDIpOiBzdHJpbmcge1xuICAgIGlmIChieXRlcyA9PT0gMCkge1xuICAgICAgcmV0dXJuICcwIEJ5dGVzJztcbiAgICB9XG4gICAgY29uc3QgayA9IDEwMjQ7XG4gICAgY29uc3QgZG0gPSBkZWNpbWFscyA8IDAgPyAwIDogZGVjaW1hbHM7XG4gICAgY29uc3Qgc2l6ZXMgPSBGSUxFX1NJWkVTO1xuICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKGspKTtcblxuICAgIHJldHVybiBwYXJzZUZsb2F0KChieXRlcyAvIE1hdGgucG93KGssIGkpKS50b0ZpeGVkKGRtKSkgKyAnICcgKyBzaXplc1tpXTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cInBsYWNlaG9sZGVyLWZpbGVwaWNrZXIgZmlsZS1mb3JtYXRzXCIgKm5nSWY9XCJzaG93QWNjZXB0ZWRGb3JtYXRzIHx8IHNob3dNYXhGaWxlc051bWJlcjsgZWxzZSBub0Zvcm1hdFwiPlxuICAgIDxkaXYgKm5nSWY9XCJzaG93QWNjZXB0ZWRGb3JtYXRzXCI+e3thbGxvd2VkRmlsZXNQbGFjZWhvbGRlcn19IHt7YWNjZXB0fX08L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwic2hvd01heEZpbGVzTnVtYmVyXCI+e3ttYXhGaWxlc1BsYWNlaG9sZGVyfX0ge3ttYXhGaWxlc319XG4gICAgPC9kaXY+XG48L2Rpdj5cbjxuZy10ZW1wbGF0ZSAjbm9Gb3JtYXQ+XG4gICAgPGRpdiBjbGFzcz1cInBsYWNlaG9sZGVyLWZpbGVwaWNrZXIgZmlsZS1mb3JtYXRzXCI+Jm5ic3A7PC9kaXY+XG48L25nLXRlbXBsYXRlPlxuPG5iLXRhZy1saXN0ICpuZ0lmPVwiZmlsZXMubGVuZ3RoXCI+XG4gICAgPG5iLXRhZyBuYlRvb2x0aXA9e3tmaWxlLnNpemV8Ynl0ZX19IG5iVG9vbHRpcFBvc2l0aW9uPVwidG9wXCIgW25iVG9vbHRpcERpc2FibGVkXT1cImRpc3BsYXlGaWxlU2l6ZVwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBmaWxlIG9mIGZpbGVzXCIgW3JlbW92YWJsZV09XCIhZGlzYWJsZWRcIiBbdGV4dF09XCJnZXRGaWxlTmFtZShmaWxlKVwiIHN0YXR1cz1cInByaW1hcnlcIlxuICAgICAgICBhcHBlYXJhbmNlPVwiZmlsbGVkXCIgKHJlbW92ZSk9XCJyZW1vdmVGaWxlKGZpbGUpXCI+XG4gICAgPC9uYi10YWc+XG48L25iLXRhZy1saXN0PlxuPGRpdiBjbGFzcz1cInBsYWNlaG9sZGVyLWZpbGVwaWNrZXIgdGV4dC1jZW50ZXJcIiAqbmdJZj1cIiFmaWxlcy5sZW5ndGhcIj57e2VtcHR5UGxhY2Vob2xkZXJ9fTxicj48YnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDAuNXJlbTsgdGV4dC10cmFuc2Zvcm06IG5vbmU7XCIgbmJCdXR0b24gc2l6ZT1cInNtYWxsXCIgc2hhcGU9XCJyb3VuZFwiXG4gICAgICAgIHN0YXR1cz1cInByaW1hcnlcIj57e2J1dHRvblBsYWNlaG9sZGVyfX08bmItaWNvbiBwYWNrPVwiZXZhXCIgaWNvbj1cImNsb3VkLXVwbG9hZC1vdXRsaW5lXCIgbmJTdWZmaXg+XG4gICAgICAgIDwvbmItaWNvbj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cInBsYWNlaG9sZGVyLWZpbGVwaWNrZXIgbWF4RmlsZXNcIiAqbmdJZj1cImZpbGVzLmxlbmd0aD49bWF4RmlsZXMhXCI+XG4gICAgPG5iLWljb24gc3RhdHVzPVwiZGFuZ2VyXCIgcGFjaz1cImV2YVwiIGljb249XCJhbGVydC1jaXJjbGUtb3V0bGluZVwiPjwvbmItaWNvbj5cbiAgICB7e21heEZpbGVzV2FybmluZ01lc3NhZ2V9fSAoe3ttYXhGaWxlc319KS5cbjwvZGl2PlxuPGlucHV0ICNmaWxlSW5wdXRFbCBjbGFzcz1cImhpZGRlblwiICNmaWxlSW5wdXQgbmFtZT1cImZpbGVjb250cm9sXCIgdHlwZT1cImZpbGVcIiBbYXR0ci5tdWx0aXBsZV09XCJtdWx0aXBsZT8gJycgOiBudWxsXCJcbiAgICBbYXR0ci5hY2NlcHRdPVwiYWNjZXB0XCI+Il19