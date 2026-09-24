import { OnInit } from '@angular/core';
import { NbComponentSize } from '@nebular/theme';
import { TranslationService } from '../resources/translation.service';
import * as i0 from "@angular/core";
export declare class ProgressbarSpinnerComponent implements OnInit {
    private _translationService;
    id: string;
    constructor(_translationService: TranslationService);
    ngOnInit(): void;
    loading: boolean;
    status: string;
    size: NbComponentSize;
    message: string;
    value: number;
    displayValue: boolean;
    progressbarSize: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressbarSpinnerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressbarSpinnerComponent, "ngx-progressbar-spinner", never, { "loading": "loading"; "status": "status"; "size": "size"; "message": "message"; "value": "value"; "displayValue": "displayValue"; "progressbarSize": "progressbarSize"; }, {}, never, never, false, never>;
}
