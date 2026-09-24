import { Component, EventEmitter, HostListener, Input, Output, ViewChild, } from '@angular/core';
import { NbPopoverDirective, NbPosition } from '@nebular/theme';
import { makeId } from '../functions/functions';
import { getError } from '../resources/error-codes';
import { SelectGridPopoverComponent } from './select-grid-popover/select-grid-popover.component';
import { strings } from '../resources/strings';
import * as i0 from "@angular/core";
import * as i1 from "../resources/translation.service";
import * as i2 from "@nebular/theme";
import * as i3 from "@angular/forms";
import * as i4 from "../resources/resize-directive/resize-directive";
import * as i5 from "./select-grid-popover/select-grid-popover.component";
export class SelectGridComponent {
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
            !popoverContent?.contains(event.target)) {
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
SelectGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SelectGridComponent, deps: [{ token: i1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
SelectGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SelectGridComponent, selector: "ngx-select-grid", inputs: { columns: "columns", valueAttr: "valueAttr", multiple: "multiple", attributesForLabel: "attributesForLabel", source: "source", selected: "selected", disabled: "disabled", placeholder: "placeholder", searchEnabled: "searchEnabled", customWidth: "customWidth" }, outputs: { selectedChange: "selectedChange", onSelectionChanged: "onSelectionChanged" }, host: { listeners: { "click": "clickInside()", "document:click": "clickout($event)" } }, viewQueries: [{ propertyName: "popover", first: true, predicate: NbPopoverDirective, descendants: true }], ngImport: i0, template: "<div class=\"select-grid\" [id]=\"id\" (resized)=\"onGridResized()\">\r\n  <nb-form-field\r\n    [nbPopover]=\"popover\"\r\n    nbPopoverTrigger=\"noop\"\r\n    [nbPopoverPlacement]=\"position\"\r\n    (click)=\"toggleGridSelect()\"\r\n  >\r\n    <input\r\n      class=\"grid-select-input\"\r\n      nbInput\r\n      [placeholder]=\"placeholder\"\r\n      [disabled]=\"disabled\"\r\n      fullWidth\r\n      readonly\r\n      [(ngModel)]=\"inputValue\"\r\n      [name]=\"id\"\r\n    />\r\n    <nb-icon\r\n      class=\"grid-select-input\"\r\n      pack=\"eva\"\r\n      [icon]=\"gridSelectOpen ? 'chevron-up-outline' : 'chevron-down-outline'\"\r\n      nbSuffix\r\n    ></nb-icon>\r\n  </nb-form-field>\r\n</div>\r\n\r\n<ng-template #popover>\r\n  <ngx-select-grid-popover\r\n    [selectGridId]=\"id\"\r\n    [width]=\"getSelectGridWidth()\"\r\n    [columns]=\"columns\"\r\n    [multiple]=\"multiple\"\r\n    [source]=\"source\"\r\n    [searchEnabled]=\"searchEnabled\"\r\n    [selected]=\"selected\"\r\n    [valueAttr]=\"valueAttr\"\r\n    (gridSelectionChanged)=\"gridSelectionChanged($event)\"\r\n  ></ngx-select-grid-popover>\r\n</ng-template>\r\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .grid-select-input:hover{cursor:pointer}::ng-deep .select-grid-nb-popover{border:none;border-radius:0;background:unset;box-shadow:none;color:unset}::ng-deep .select-grid-nb-popover .arrow{display:none!important}\n"], dependencies: [{ kind: "component", type: i2.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i2.NbInputDirective, selector: "input[nbInput],textarea[nbInput]", inputs: ["fieldSize", "status", "shape", "fullWidth"] }, { kind: "component", type: i2.NbFormFieldComponent, selector: "nb-form-field" }, { kind: "directive", type: i2.NbSuffixDirective, selector: "[nbSuffix]" }, { kind: "directive", type: i2.NbPopoverDirective, selector: "[nbPopover]", inputs: ["nbPopover", "nbPopoverContext", "nbPopoverPlacement", "nbPopoverAdjustment", "nbPopoverTrigger", "nbPopoverOffset", "nbTooltipDisabled", "nbPopoverClass"], outputs: ["nbPopoverShowStateChange"], exportAs: ["nbPopover"] }, { kind: "directive", type: i4.ResizedDirective, selector: "[resized]", outputs: ["resized"] }, { kind: "component", type: i5.SelectGridPopoverComponent, selector: "ngx-select-grid-popover", inputs: ["width", "selectGridId", "columns", "multiple", "source", "searchEnabled", "selected", "valueAttr"], outputs: ["gridSelectionChanged"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SelectGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-select-grid', template: "<div class=\"select-grid\" [id]=\"id\" (resized)=\"onGridResized()\">\r\n  <nb-form-field\r\n    [nbPopover]=\"popover\"\r\n    nbPopoverTrigger=\"noop\"\r\n    [nbPopoverPlacement]=\"position\"\r\n    (click)=\"toggleGridSelect()\"\r\n  >\r\n    <input\r\n      class=\"grid-select-input\"\r\n      nbInput\r\n      [placeholder]=\"placeholder\"\r\n      [disabled]=\"disabled\"\r\n      fullWidth\r\n      readonly\r\n      [(ngModel)]=\"inputValue\"\r\n      [name]=\"id\"\r\n    />\r\n    <nb-icon\r\n      class=\"grid-select-input\"\r\n      pack=\"eva\"\r\n      [icon]=\"gridSelectOpen ? 'chevron-up-outline' : 'chevron-down-outline'\"\r\n      nbSuffix\r\n    ></nb-icon>\r\n  </nb-form-field>\r\n</div>\r\n\r\n<ng-template #popover>\r\n  <ngx-select-grid-popover\r\n    [selectGridId]=\"id\"\r\n    [width]=\"getSelectGridWidth()\"\r\n    [columns]=\"columns\"\r\n    [multiple]=\"multiple\"\r\n    [source]=\"source\"\r\n    [searchEnabled]=\"searchEnabled\"\r\n    [selected]=\"selected\"\r\n    [valueAttr]=\"valueAttr\"\r\n    (gridSelectionChanged)=\"gridSelectionChanged($event)\"\r\n  ></ngx-select-grid-popover>\r\n</ng-template>\r\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .grid-select-input:hover{cursor:pointer}::ng-deep .select-grid-nb-popover{border:none;border-radius:0;background:unset;box-shadow:none;color:unset}::ng-deep .select-grid-nb-popover .arrow{display:none!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }]; }, propDecorators: { clickInside: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2hhcmVkLWNvbXBvbmVudHMvc3JjL2xpYi9zZWxlY3QtZ3JpZC9zZWxlY3QtZ3JpZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zaGFyZWQtY29tcG9uZW50cy9zcmMvbGliL3NlbGVjdC1ncmlkL3NlbGVjdC1ncmlkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUlqRyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7QUFPL0MsTUFBTSxPQUFPLG1CQUFtQjtJQStFOUIsOEhBQThIO0lBRTlILFlBQW9CLG1CQUF1QztRQUF2Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBaEZuRCx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUF3QnJDLDhIQUE4SDtRQUV0SCxrQkFBYSxHQUFVLEVBQUUsQ0FBQyxDQUFDLGtDQUFrQztRQUM3RCxVQUFLLEdBQVksS0FBSyxDQUFDLENBQUMsZ0NBQWdDO1FBQ3hELFlBQU8sR0FBVSxFQUFFLENBQUM7UUFDcEIsY0FBUyxHQUFVLEVBQUUsQ0FBQztRQU05Qiw4SEFBOEg7UUFFdkgsZ0JBQVcsR0FBVyxFQUFFLENBQUMsQ0FBQywrQkFBK0I7UUFDekQsT0FBRSxHQUFXLGNBQWMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7UUFDaEUsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsYUFBUSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDN0IsY0FBUyxHQUFHLDBCQUEwQixDQUFDO1FBQ3ZDLG1CQUFjLEdBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2hELGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFL0IsOEhBQThIO1FBRTlHLFlBQU8sR0FBaUIsRUFBRSxDQUFDLENBQUMsdUNBQXVDO1FBQ25FLGNBQVMsR0FBVyxFQUFFLENBQUMsQ0FBQyx1Q0FBdUM7UUFDL0QsYUFBUSxHQUFZLEtBQUssQ0FBQyxDQUFDLDJDQUEyQztRQUN0RSx1QkFBa0IsR0FBYSxFQUFFLENBQUMsQ0FBQyxnRUFBZ0U7UUFlekcsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV0RCxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGdCQUFXLEdBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7UUFDM0Qsa0JBQWEsR0FBWSxLQUFLLENBQUMsQ0FBQyxpQ0FBaUM7UUFDakUsZ0JBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7UUFFaEUsOEhBQThIO1FBRTdHLHVCQUFrQixHQUNqQyxJQUFJLFlBQVksRUFBNEIsQ0FBQyxDQUFDLG9DQUFvQztJQUl0QixDQUFDO0lBN0UvRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBR0QsUUFBUSxDQUFDLEtBQVU7UUFDakIsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDMUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FDbEMsQ0FBQztRQUVGLElBQ0UsQ0FBQyxJQUFJLENBQUMsb0JBQW9CO1lBQzFCLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLHVCQUF1QixHQUFHLElBQUksQ0FBQyxFQUFFO1lBQ3BELENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQ3ZDO1lBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQTZCRCxJQUFhLE1BQU0sQ0FBQyxLQUFZO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQWEsUUFBUSxDQUFDLEtBQVk7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDLENBQUMsd0JBQXdCO0lBQzFCLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBa0JELFFBQVE7UUFDTiwrREFBK0Q7UUFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFO1lBQ3BELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ25CO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDbkI7UUFFRCwrRUFBK0U7UUFDL0UsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw4SEFBOEg7SUFFdEgsYUFBYTtRQUNuQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFDeEQsT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzFCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDO1lBQ3JFLElBQUksR0FBRyxFQUFFO2dCQUNQLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ3ZDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUMxQixDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRO29CQUFFLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQzs7b0JBQzdDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsOEhBQThIO0lBRXZILGdCQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVELDhIQUE4SDtJQUV2SCxnQkFBZ0I7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVNLGtCQUFrQjtRQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUM3QztZQUNILElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNoQixNQUFNLE9BQU8sR0FBdUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckUsSUFBSSxPQUFPO2dCQUFFLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3pDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRU0sYUFBYTtRQUNsQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRU0sb0JBQW9CLENBQUMsRUFBa0I7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1lBQzNCLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUTtZQUMzQixhQUFhLEVBQUUsRUFBRSxDQUFDLFlBQVk7U0FDL0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7aUhBektVLG1CQUFtQjtxR0FBbkIsbUJBQW1CLGdpQkFrQ25CLGtCQUFrQixnREMxRC9CLGlvQ0F1Q0E7NEZEZmEsbUJBQW1CO2tCQUwvQixTQUFTOytCQUNFLGlCQUFpQjt5R0FRM0IsV0FBVztzQkFEVixZQUFZO3VCQUFDLE9BQU87Z0JBTXJCLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkEwQlgsT0FBTztzQkFBckMsU0FBUzt1QkFBQyxrQkFBa0I7Z0JBY2IsT0FBTztzQkFBdEIsS0FBSztnQkFDVSxTQUFTO3NCQUF4QixLQUFLO2dCQUNVLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ1Usa0JBQWtCO3NCQUFqQyxLQUFLO2dCQUNPLE1BQU07c0JBQWxCLEtBQUs7Z0JBTU8sUUFBUTtzQkFBcEIsS0FBSztnQkFRSSxjQUFjO3NCQUF2QixNQUFNO2dCQUVTLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ1UsV0FBVztzQkFBMUIsS0FBSztnQkFFVSxhQUFhO3NCQUE1QixLQUFLO2dCQUNVLFdBQVc7c0JBQTFCLEtBQUs7Z0JBSVcsa0JBQWtCO3NCQUFsQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmJQb3BvdmVyRGlyZWN0aXZlLCBOYlBvc2l0aW9uIH0gZnJvbSAnQG5lYnVsYXIvdGhlbWUnO1xuaW1wb3J0IHsgbWFrZUlkIH0gZnJvbSAnLi4vZnVuY3Rpb25zL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBTZWxlY3RHcmlkU2VsZWN0aW9uTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2VsZWN0LWdyaWQubW9kZWwnO1xuaW1wb3J0IHsgZ2V0RXJyb3IgfSBmcm9tICcuLi9yZXNvdXJjZXMvZXJyb3ItY29kZXMnO1xuaW1wb3J0IHsgU2VsZWN0R3JpZFBvcG92ZXJDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1ncmlkLXBvcG92ZXIvc2VsZWN0LWdyaWQtcG9wb3Zlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JpZENvbHVtbiB9IGZyb20gJy4uL21vZGVscy9ncmlkLWNvbHVtbi5tb2RlbCc7XG5pbXBvcnQgeyBJR3JpZFNlbGVjdGlvbiB9IGZyb20gJy4uL21vZGVscy9ncmlkLm1vZGVsJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJy4uL3Jlc291cmNlcy90cmFuc2xhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IHN0cmluZ3MgfSBmcm9tICcuLi9yZXNvdXJjZXMvc3RyaW5ncyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1zZWxlY3QtZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QtZ3JpZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbGVjdC1ncmlkLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIGNsaWNrSW5zaWRlQ29tcG9uZW50ID0gZmFsc2U7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBjbGlja0luc2lkZSgpIHtcbiAgICB0aGlzLmNsaWNrSW5zaWRlQ29tcG9uZW50ID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgY2xpY2tvdXQoZXZlbnQ6IGFueSkge1xuICAgIHZhciBwb3BvdmVyQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgJ2dyaWQtcG9wb3Zlci1jb250ZW50LScgKyB0aGlzLmlkXG4gICAgKTtcblxuICAgIGlmIChcbiAgICAgICF0aGlzLmNsaWNrSW5zaWRlQ29tcG9uZW50ICYmXG4gICAgICBldmVudC50YXJnZXQuaWQgIT0gJ2dyaWQtcG9wb3Zlci1jb250ZW50LScgKyB0aGlzLmlkICYmXG4gICAgICAhcG9wb3ZlckNvbnRlbnQ/LmNvbnRhaW5zKGV2ZW50LnRhcmdldClcbiAgICApIHtcbiAgICAgIHRoaXMucG9wb3Zlci5oaWRlKCk7XG4gICAgICB0aGlzLmdyaWRTZWxlY3RPcGVuID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuY2xpY2tJbnNpZGVDb21wb25lbnQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQUklWQVRFIEZJRUxEUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHByaXZhdGUgc2VsZWN0ZWRJdGVtczogYW55W10gPSBbXTsgLy8gYXJyYXkgb2Ygc2VsZWN0ZWQgaXRlbXMvb2JqZWN0c1xuICBwcml2YXRlIGVycm9yOiBib29sZWFuID0gZmFsc2U7IC8vIGluZGljYXRvciBvZiBlcnJvcnMgaW4gY29uZmlnXG4gIHByaXZhdGUgX3NvdXJjZTogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGFueVtdID0gW107XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFZJRVcgQ0hJTEQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBAVmlld0NoaWxkKE5iUG9wb3ZlckRpcmVjdGl2ZSkgcG9wb3ZlciE6IE5iUG9wb3ZlckRpcmVjdGl2ZTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUFVCTElDIEZJRUxEUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBwdWJsaWMgc2VsZWN0TGFiZWw6IHN0cmluZyA9ICcnOyAvLyBsYWJlbCB0byBzaG93IGluIGlucHV0IGZpZWxkXG4gIHB1YmxpYyBpZDogc3RyaW5nID0gJ3NlbGVjdC1ncmlkLScgKyBtYWtlSWQoMTUpOyAvLyB1bmlxdWUgY29tcG9uZW50IGlkXG4gIHB1YmxpYyBncmlkU2VsZWN0T3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcG9zaXRpb24gPSBOYlBvc2l0aW9uLkJPVFRPTTtcbiAgcHVibGljIGNvbXBvbmVudCA9IFNlbGVjdEdyaWRQb3BvdmVyQ29tcG9uZW50O1xuICBwdWJsaWMgcG9wb3ZlckNvbnRleHQ6IGFueSA9IHsgc2VsZWN0R3JpZElkOiB0aGlzLmlkIH07XG4gIHB1YmxpYyBpbnB1dFZhbHVlOiBzdHJpbmcgPSAnJztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSU5QVVRTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBASW5wdXQoKSBwdWJsaWMgY29sdW1uczogR3JpZENvbHVtbltdID0gW107IC8vIGRlZmluaXRpb24gb2YgY29sdW1ucyBmb3IgZ3JpZCB0YWJsZVxuICBASW5wdXQoKSBwdWJsaWMgdmFsdWVBdHRyOiBzdHJpbmcgPSAnJzsgLy8gbmFtZSBvZiBrZXkgYXR0cmlidXRlIGluIGRhdGEgc291cmNlXG4gIEBJbnB1dCgpIHB1YmxpYyBtdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlOyAvLyBlbmFibGVzL2Rpc2FibGVzIG11bHRpcGxlIHNlbGVjdGlvbiBtb2RlXG4gIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGVzRm9yTGFiZWw6IHN0cmluZ1tdID0gW107IC8vIG5hbWVzIG9mIGF0dHJpYnV0ZXMgdG8gc2hvdyBpbiBpbnB1dCBsYWJlbCBmb3Igc2VsZWN0ZWQgaXRlbXNcbiAgQElucHV0KCkgc2V0IHNvdXJjZSh2YWx1ZTogYW55W10pIHtcbiAgICB0aGlzLl9zb3VyY2UgPSB2YWx1ZTtcbiAgfVxuICBnZXQgc291cmNlKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlO1xuICB9XG4gIEBJbnB1dCgpIHNldCBzZWxlY3RlZCh2YWx1ZTogYW55W10pIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLl9zZWxlY3RlZCk7XG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlKCk7XG4gIH0gLy8gY3VycmVudCBzZWxlY3RlZCBrZXlzXG4gIGdldCBzZWxlY3RlZCgpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG4gIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmcgPVxuICAgIHRoaXMuX3RyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ3NnUGxhY2Vob2xkZXInKTsgLy8gaW5wdXQgcGxhY2Vob2xkZXJcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaEVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTsgLy8gZW5hYmxlcy9kaXNhYmxlcyBzZWFyY2ggb3B0aW9uXG4gIEBJbnB1dCgpIHB1YmxpYyBjdXN0b21XaWR0aDogbnVtYmVyID0gMDsgLy8gY3VzdG9tIHBvcG92ZXIgd2lkdGhcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gT1VUUFVUUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBAT3V0cHV0KCkgcHVibGljIG9uU2VsZWN0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFNlbGVjdEdyaWRTZWxlY3Rpb25Nb2RlbD4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0R3JpZFNlbGVjdGlvbk1vZGVsPigpOyAvLyBmaXJlcyB3aGVuIHNlbGVjdGVkIGl0ZW1zIGNoYW5nZWRcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQ09NUE9ORU5UIENPTlNUUlVDVElPTiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90cmFuc2xhdGlvblNlcnZpY2U6IFRyYW5zbGF0aW9uU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBjaGVjayBpZiB0cmFuc2xhdGlvbnMgYXJlIGFscmVhZHkgbG9hZGVkIChmcm9tIGV4dGVybmFsIGFwcClcbiAgICBpZiAoIXRoaXMuX3RyYW5zbGF0aW9uU2VydmljZS5pc1RyYW5zbGF0aW9uc0xvYWRlZCgpKSB7XG4gICAgICB0aGlzLl90cmFuc2xhdGlvblNlcnZpY2Uuc2V0VHJhbnNsYXRpb25zKHN0cmluZ3MpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbHVlQXR0ci5sZW5ndGggPT0gMCkge1xuICAgICAgY29uc29sZS5lcnJvcihnZXRFcnJvcigzMDEpKTtcbiAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnNlbGVjdGVkKSkge1xuICAgICAgY29uc29sZS5lcnJvcihnZXRFcnJvcigzMDMpKTtcbiAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGlmIGF0dHJpYnV0ZXMgZm9yIGxhYmVsIGFyZSBub3Qgc2V0IHRha2UgYWxsIGF0dHJpYnV0ZXMgZnJvbSBvYmplY3QgYW5kIHNob3dcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVzRm9yTGFiZWwubGVuZ3RoID09IDAgJiYgdGhpcy5zb3VyY2UubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVzRm9yTGFiZWwgPSBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZVswXSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlKCk7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUFJJVkFURSBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBwcml2YXRlIHNldElucHV0VmFsdWUoKSB7XG4gICAgdmFyIHJvd0tleXMgPSBbXTtcbiAgICB0aGlzLmlucHV0VmFsdWUgPSAnJztcblxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnNlbGVjdGVkKSkgcm93S2V5cyA9IFt0aGlzLnNlbGVjdGVkXTtcbiAgICBlbHNlIHJvd0tleXMgPSBbLi4udGhpcy5zZWxlY3RlZF07XG5cbiAgICByb3dLZXlzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIHZhciByb3cgPSB0aGlzLnNvdXJjZS5maW5kKCh4OiBhbnkpID0+IHhbdGhpcy52YWx1ZUF0dHJdID09IGVsZW1lbnQpO1xuICAgICAgaWYgKHJvdykge1xuICAgICAgICB2YXIgdGV4dCA9ICcnO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXNGb3JMYWJlbC5mb3JFYWNoKChhdHRyKSA9PiB7XG4gICAgICAgICAgdGV4dCArPSByb3dbYXR0cl0gKyAnICc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHRoaXMuaW5wdXRWYWx1ZSArPSB0ZXh0ICsgJzsgJztcbiAgICAgICAgZWxzZSB0aGlzLmlucHV0VmFsdWUgKz0gdGV4dDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQVUJMSUMgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHB1YmxpYyBnZXRTZWxlY3RlZEl0ZW1zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW1zO1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIERPTSBMSVNURU5FUlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcHVibGljIHRvZ2dsZUdyaWRTZWxlY3QoKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnBvcG92ZXIudG9nZ2xlKCk7XG4gICAgICB0aGlzLmdyaWRTZWxlY3RPcGVuID0gdGhpcy5wb3BvdmVyLmlzU2hvd247XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldFNlbGVjdEdyaWRXaWR0aCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmN1c3RvbVdpZHRoID4gMCkgcmV0dXJuIHRoaXMuY3VzdG9tV2lkdGg7XG4gICAgZWxzZSB7XG4gICAgICBsZXQgd2lkdGggPSAxMDA7XG4gICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcbiAgICAgIGlmIChlbGVtZW50KSB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICByZXR1cm4gd2lkdGg7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uR3JpZFJlc2l6ZWQoKSB7XG4gICAgaWYgKHRoaXMuY3VzdG9tV2lkdGggPT0gMClcbiAgICAgIHRoaXMucG9wb3ZlckNvbnRleHQud2lkdGggPSB0aGlzLmdldFNlbGVjdEdyaWRXaWR0aCgpO1xuICB9XG5cbiAgcHVibGljIGdyaWRTZWxlY3Rpb25DaGFuZ2VkKGV2OiBJR3JpZFNlbGVjdGlvbikge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBldi5zZWxlY3RlZFJvd3MubWFwKCh4OiBhbnkpID0+IHhbdGhpcy52YWx1ZUF0dHJdKTtcbiAgICB0aGlzLnNldElucHV0VmFsdWUoKTtcblxuICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkLmVtaXQoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiB0aGlzLnNlbGVjdGVkLFxuICAgICAgc2VsZWN0ZWRJdGVtczogZXYuc2VsZWN0ZWRSb3dzLFxuICAgIH0pO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwic2VsZWN0LWdyaWRcIiBbaWRdPVwiaWRcIiAocmVzaXplZCk9XCJvbkdyaWRSZXNpemVkKClcIj5cclxuICA8bmItZm9ybS1maWVsZFxyXG4gICAgW25iUG9wb3Zlcl09XCJwb3BvdmVyXCJcclxuICAgIG5iUG9wb3ZlclRyaWdnZXI9XCJub29wXCJcclxuICAgIFtuYlBvcG92ZXJQbGFjZW1lbnRdPVwicG9zaXRpb25cIlxyXG4gICAgKGNsaWNrKT1cInRvZ2dsZUdyaWRTZWxlY3QoKVwiXHJcbiAgPlxyXG4gICAgPGlucHV0XHJcbiAgICAgIGNsYXNzPVwiZ3JpZC1zZWxlY3QtaW5wdXRcIlxyXG4gICAgICBuYklucHV0XHJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICByZWFkb25seVxyXG4gICAgICBbKG5nTW9kZWwpXT1cImlucHV0VmFsdWVcIlxyXG4gICAgICBbbmFtZV09XCJpZFwiXHJcbiAgICAvPlxyXG4gICAgPG5iLWljb25cclxuICAgICAgY2xhc3M9XCJncmlkLXNlbGVjdC1pbnB1dFwiXHJcbiAgICAgIHBhY2s9XCJldmFcIlxyXG4gICAgICBbaWNvbl09XCJncmlkU2VsZWN0T3BlbiA/ICdjaGV2cm9uLXVwLW91dGxpbmUnIDogJ2NoZXZyb24tZG93bi1vdXRsaW5lJ1wiXHJcbiAgICAgIG5iU3VmZml4XHJcbiAgICA+PC9uYi1pY29uPlxyXG4gIDwvbmItZm9ybS1maWVsZD5cclxuPC9kaXY+XHJcblxyXG48bmctdGVtcGxhdGUgI3BvcG92ZXI+XHJcbiAgPG5neC1zZWxlY3QtZ3JpZC1wb3BvdmVyXHJcbiAgICBbc2VsZWN0R3JpZElkXT1cImlkXCJcclxuICAgIFt3aWR0aF09XCJnZXRTZWxlY3RHcmlkV2lkdGgoKVwiXHJcbiAgICBbY29sdW1uc109XCJjb2x1bW5zXCJcclxuICAgIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiXHJcbiAgICBbc291cmNlXT1cInNvdXJjZVwiXHJcbiAgICBbc2VhcmNoRW5hYmxlZF09XCJzZWFyY2hFbmFibGVkXCJcclxuICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXHJcbiAgICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXHJcbiAgICAoZ3JpZFNlbGVjdGlvbkNoYW5nZWQpPVwiZ3JpZFNlbGVjdGlvbkNoYW5nZWQoJGV2ZW50KVwiXHJcbiAgPjwvbmd4LXNlbGVjdC1ncmlkLXBvcG92ZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==